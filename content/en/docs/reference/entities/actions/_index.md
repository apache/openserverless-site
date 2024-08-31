---
title: Actions
description: What Actions are and how to create and execute them
weight: 10
---
## Actions

Actions are stateless functions that run on the OpenWhisk and
OpenServerless platform. For example, an action can be used to detect
the faces in an image, respond to a database change, respond to an API
call, or post a Tweet. In general, an action is invoked in response to
an event and produces some observable output.

An action may be created from a function programmed using a number of
[supported languages and
runtimes](/docs/reference/index-runtimes), or from a
binary-compatible executable.

- The OpenServerless CLI makes it easy to create and invoke actions.
    Instructions for configuring and using the CLI are available
    [here](/docs/cli/).

- You can also use the [REST
    API](/docs/reference/rest_api/).

While the actual function code will be specific to a [language and
runtime](/docs/reference/index-runtimes/), the operations to
create, invoke and manage an action are the same regardless of the
implementation choice.

We recommend that you review [the cli](#../../cli/index.adoc) and read
[the tutorial](#../../tutorial/index.adoc) before moving on to advanced
topics.

### What you need to know about actions

- Functions should be stateless, or *idempotent*. While the system
    does not enforce this property, there is no guarantee that any state
    maintained by an action will be available across invocations. In
    some cases, deliberately leaking state across invocations may be
    advantageous for performance, but also exposes some risks.

- An action executes in a sandboxed environment, namely a container.
    At any given time, a single activation will execute inside the
    container. Subsequent invocations of the same action may reuse a
    previous container, and there may exist more than one container at
    any given time, each having its own state.

- Invocations of an action are not ordered. If the user invokes an
    action twice from the command line or the REST API, the second
    invocation might run before the first. If the actions have side
    effects, they might be observed in any order.

- There is no guarantee that actions will execute atomically. Two
    actions can run concurrently and their side effects can be
    interleaved. OpenWhisk and OpenServerless does not ensure any
    particular concurrent consistency model for side effects. Any
    concurrency side effects will be implementation-dependent.

- Actions have two phases: an initialization phase, and a run phase.
    During initialization, the function is loaded and prepared for
    execution. The run phase receives the action parameters provided at
    invocation time. Initialization is skipped if an action is
    dispatched to a previously initialized container — this is referred
    to as a *warm start*. You can tell if an invocation was a warm
    activation or a cold one requiring initialization by inspecting the
    activation record.

- An action runs for a bounded amount of time. This limit can be
    configured per action, and applies to both the initialization and
    the execution separately. If the action time limit is exceeded
    during the initialization or run phase, the activation’s response
    status is *action developer error*.

### Accessing action metadata within the action body

The action environment contains several properties that are specific to
the running action. These allow the action to programmatically work with
OpenWhisk and OpenServerless assets via the REST API, or set an internal
alarm when the action is about to use up its allotted time budget. The
properties are accessible via the system environment for all supported
runtimes: Node.js, Python, Swift, Java and Docker actions when using the
OpenWhisk and OpenServerless Docker skeleton.

- `__OW_API_HOST` the API host for the OpenWhisk and OpenServerless
    deployment running this action.

- `__OW_API_KEY` the API key for the subject invoking the action, this
    key may be a restricted API key. This property is absent unless
    requested with the annotation explicitly
    [`provide-api-key`](#../../reference/annotations/index.adoc#annotations-for-all-actions)

- `__OW_NAMESPACE` the namespace for the *activation* (this may not be
    the same as the namespace for the action).

- `__OW_ACTION_NAME` the fully qualified name of the running action.

- `__OW_ACTION_VERSION` the internal version number of the running
    action.

- `__OW_ACTIVATION_ID` the activation id for this running action
    instance.

- `__OW_DEADLINE` the approximate time when this action will have
    consumed its entire duration quota (measured in epoch milliseconds).
