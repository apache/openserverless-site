---
title: Runtimes under the hood
---
# Adding Action Language Runtimes

OpenWhisk and Nuvolaris supports [several languages and
runtimes](#index-runtimes.adoc) but there may be other languages or
runtimes that are important for your organization, and for which you
want tighter integration with the platform.

The platform is extensible and you can add new languages or runtimes
(with custom packages and third-party dependencies)

This guide describes the contract a runtime must satisfy. However all
the Nuvolaris runtimes are implemented the [using the ActionLoop
Proxy](#actions-actionloop.adoc). This proxy is implemented in Go,
already satifies the semantic of a runtime ands makes very easy to build
a new runtime. You just need to provide "launcher code" in your favorite
programming language and a compilation script (generally written in
python) for the initialization of an action. You are advised to use it
for your own runtimes and use the material of this document as reference
for the behaviour of a runtime.

## Runtime general requirements

The unit of execution for all functions is a [Docker
container](https://docs.docker.com) which must implement a specific
[Action interface](##action-interface) that, in general performs:

1. **[Initialization](##initialization)** - accepts an initialization
    payload (the code) and prepared for execution,

2. **[Activation](##activation)** - accepts a runtime payload (the
    input parameters) and

    - prepares the activation context,

    - runs the function,

    - returns the function result,

3. **[Logging](##logging)** - flushes all `stdout` and `stderr` logs
    and adds a frame marker at the end of the activation.

The specifics of the [Action interface](##action-interface) and its
functions are shown below.

## The runtimes manifest

Actions when created specify the desired runtime for the function via a
property called `kind`. When using the `nuv` CLI, this is specified as
`--kind <runtime-kind>`. The value is typically a string describing the
language (e.g., `nodejs`) followed by a colon and the version for the
runtime as in `nodejs:20` or `php:8.1`.

The manifest is a map of runtime family names to an array of specific
kinds. As an example, the following entry add a new runtime family
called `nodejs` with a single kind `nodejs:20`.

    {
      "nodejs": [{
        "kind": "nodejs:20",
        "default": true,
        "image": {
          "prefix": "openwhisk",
          "name": "action-nodejs-v20",
          "tag": "latest"
        }
      }]
    }

The `default` property indicates if the corresponding kind should be
treated as the default for the runtime family. The JSON `image`
structure defines the Docker image name that is used for actions of this
kind (e.g., `openwhisk/nodejs10action:latest` for the JSON example
above).

The standard test action is shown below in JavaScript. It should be
adapted for the new language and added to the [test artifacts
directory](../tests/dat/actions/unicode.tests) with the name
`<runtime-kind>.txt` for plain text file or `<runtime-kind>.bin` for a a
binary file. The `<runtime-kind>` must match the value used for `kind`
in the corresponding runtime manifest entry, replacing `:` in the kind
with a `-`. For example, a plain text function for `nodejs:20` becomes
`nodejs-20.txt`.

    function main(args) {
        var str = args.delimiter + " ☃ " + args.delimiter;
        console.log(str);
        return { "winter": str };
    }

An action consists of the user function (and its dependencies) along
with a *proxy* that implements a canonical protocol to integrate with
the OpenWhisk and Nuvolaris platform.

The proxy is a web server with two endpoints.

- It listens on port `8080`.

- It implements `/init` to initialize the container.

- It also implements `/run` to activate the function.

The proxy also prepares the execution context, and flushes the logs
produced by the function to stdout and stderr.

The initialization route is `/init`. It must accept a `POST` request
with a JSON object as follows:

    {
      "value": {
        "name" : String,
        "main" : String,
        "code" : String,
        "binary": Boolean,
        "env": Map[String, String]
      }
    }

- `name` is the name of the action.

- `main` is the name of the function to execute.

- `code` is either plain text or a base64 encoded string for binary
    functions (i.e., a compiled executable).

- `binary` is false if `code` is in plain text, and true if `code` is
    base64 encoded.

- `env` is a map of key-value pairs of properties to export to the
    environment. And contains several properties starting with the
    `__OW_` prefix that are specific to the running action.

  - `__OW_API_KEY` the API key for the subject invoking the action,
        this key may be a restricted API key. This property is absent
        unless explicitly
        [requested](#annotations.adoc#annotations-for-all-actions).

  - `__OW_NAMESPACE` the namespace for the *activation* (this may
        not be the same as the namespace for the action).

  - `__OW_ACTION_NAME` the fully qualified name of the running
        action.

  - `__OW_ACTION_VERSION` the internal version number of the running
        action.

  - `__OW_ACTIVATION_ID` the activation id for this running action
        instance.

  - `__OW_DEADLINE` the approximate time when this initializer will
        have consumed its entire duration quota (measured in epoch
        milliseconds).

The initialization route is called exactly once by the OpenWhisk and
Nuvolaris platform, before executing a function. The route should report
an error if called more than once. It is possible however that a single
initialization will be followed by many activations (via `/run`). If an
`env` property is provided, the corresponding environment variables
should be defined before the action code is initialized.

**Successful initialization:** The route should respond with `200 OK` if
the initialization is successful and the function is ready to execute.
Any content provided in the response is ignored.

**Failures to initialize:** Any response other than `200 OK` is treated
as an error to initialize. The response from the handler if provided
must be a JSON object with a single field called `error` describing the
failure. The value of the error field may be any valid JSON value. The
proxy should make sure to generate meaningful log message on failure to
aid the end user in understanding the failure.

**Time limit:** Every action in OpenWhisk and Nuvolaris has a defined
time limit (e.g., 60 seconds). The initialization must complete within
the allowed duration. Failure to complete initialization within the
allowed time frame will destroy the container.

**Limitation:** The proxy does not currently receive any of the
activation context at initialization time. There are scenarios where the
context is convenient if present during initialization. This will
require a change in the OpenWhisk and Nuvolaris platform itself. Note
that even if the context is available during initialization, it must be
reset with every new activation since the information will change with
every execution.

The proxy is ready to execute a function once it has successfully
completed initialization. The OpenWhisk and Nuvolaris platform will
invoke the function by posting an HTTP request to `/run` with a JSON
object providing a new activation context and the input parameters for
the function. There may be many activations of the same function against
the same proxy (viz. container). Currently, the activations are
guaranteed not to overlap — that is, at any given time, there is at most
one request to `/run` from the OpenWhisk and Nuvolaris platform.

The route must accept a JSON object and respond with a JSON object,
otherwise the OpenWhisk and Nuvolaris platform will treat the activation
as a failure and proceed to destroy the container. The JSON object
provided by the platform follows the following schema:

    {
      "value": JSON,
      "namespace": String,
      "action_name": String,
      "api_host": String,
      "api_key": String,
      "activation_id": String,
      "transaction_id": String,
      "deadline": Number
    }

- `value` is a JSON object and contains all the parameters for the
    function activation.

- `namespace` is the OpenWhisk and Nuvolaris namespace for the action
    (e.g., `whisk-system`).

- `action_name` is the [fully qualified
    name](reference.md#fully-qualified-names) of the action.

- `activation_id` is a unique ID for this activation.

- `transaction_id` is a unique ID for the request of which this
    activation is part of.

- `deadline` is the deadline for the function.

- `api_key` is the API key used to invoke the action.

The `value` is the function parameters. The rest of the properties
become part of the activation context which is a set of environment
variables constructed by capitalizing each of the property names, and
prefixing the result with `__OW_`. Additionally, the context must define
`__OW_API_HOST` whose value is the OpenWhisk and Nuvolaris API host.
This value is currently provided as an environment variable defined at
container startup time and hence already available in the context.

**Successful activation:** The route must respond with `200 OK` if the
activation is successful and the function has produced a JSON object as
its result. The response body is recorded as the [result of the
activation](actions.md#understanding-the-activation-record).

**Failed activation:** Any response other than `200 OK` is treated as an
activation error. The response from the handler must be a JSON object
with a single field called `error` describing the failure. The value of
the error field may be any valid JSON value. Should the proxy fail to
respond with a JSON object, the OpenWhisk and Nuvolaris platform will
treat the failure as an uncaught exception. These two failures modes are
distinguished by the value of the `response.status` in the activation
record which is `application error` if the proxy returned an `error`
object, and `action developer error` otherwise.

**Time limit:** Every action in OpenWhisk and Nuvolaris has a defined
time limit (e.g., 60 seconds). The activation must complete within the
allowed duration. Failure to complete activation within the allowed time
frame will destroy the container.

The proxy must flush all the logs produced during initialization and
execution and add a frame marker to denote the end of the log stream for
an activation. This is done by emitting the token
`XXX_THE_END_OF_A_WHISK_ACTIVATION_XXX` as the last log line for the
`stdout` *and* `stderr` streams. Failure to emit this marker will cause
delayed or truncated activation logs.

The [Action interface](##action-interface) is enforced via a canonical
test suite which validates the initialization protocol, the runtime
protocol, ensures the activation context is correctly prepared, and that
the logs are properly framed. Your runtime should extend this test
suite, and of course include additional tests as needed.

## Runtime proxy tests

The tests verify that the proxy can handle the following scenarios:

- Test the proxy can handle the identity functions (initialize and
    run).

- Test the proxy can handle pre-defined environment variables as well
    as initialization parameters.

- Test the proxy properly constructs the activation context.

- Test the proxy can properly handle functions with Unicode
    characters.

- Test the proxy can handle large payloads (more than 1MB).

- Test the proxy can handle an entry point other than `main`.

- Test the proxy does not permit re-initialization.

- Test the error handling for an action returning an invalid response.

- Test the proxy when initialized with no content.

The canonical test suite should be extended by the new runtime tests.
Additional tests will be required depending on the feature set provided
by the runtime.

Since the OpenWhisk and Nuvolaris platform is language and runtime
agnostic, it is generally not necessary to add integration tests. That
is the unit tests verifying the protocol are sufficient. However, it may
be necessary in some cases to modify the `nuv` CLI or other OpenWhisk
and Nuvolaris clients. In which case, appropriate tests should be added
as necessary. The OpenWhisk and Nuvolaris platform will perform a
generic integration test as part of its basic system tests. This
integration test will require a [test function](#the-test-action) to be
available so that the test harness can create, invoke, and delete the
action.
