---
title: Activations
description: Detailed records of action executions
weight: 30
---
## Activations

When an event occurs that triggers a function, ops creates an activation
record, which contains information about the function execution, such as
input parameters, output results, and any metadata associated with the
activation. It’s something similar to the classic concept of `log`.

## How activations work

When invoking an action with `ops action invoke`, you’ll receive only an
invocation id as an answer.

This invocation id allows you to read results and outputs produced by
the execution of an action.

Let’s demonstrate how it works by modifying the `hello.js` file to add a
command to log some output.

```javascript
function main(args) {
    console.log("Hello")
    return { "body": "Hello" }
}
```

Now, let’s deploy and invoke it (with a parameter `hello=world`) to get
the activation id:

```bash
$ ops action update demo/hello hello.js
ok: updated action demo/hello
$ ops action invoke demo/hello
ok: invoked /_/demo/hello with id 0367e39ba7c74268a7e39ba7c7126846
```

Associated with every invocation, there is an activation id (in the
example, it is `0367e39ba7c74268a7e39ba7c7126846`).

We use this id to retrieve the results of the invocation with
`ops activation result` or its shortcut, just `ops result`, and we can
retrieve the logs using `ops activation logs` or just `ops logs`.

```bash
$ ops result 0367e39ba7c74268a7e39ba7c7126846
{
    "body": "Hello"
}
$ ops logs 0367e39ba7c74268a7e39ba7c7126846
2024-02-17T20:01:31.901124753Z stdout: Hello
```

### List of activations

You can list the activations with `ops activation list` and limit the
number with `--limit` if you are interested in a subset.

```bash
$ ops activation list --limit 5
Datetime            Activation ID                    Kind      Start Duration   Status  Entity
2024-02-17 20:01:31 0367e39ba7c74268a7e39ba7c7126846 nodejs:18 warm  8ms        success dashboard/hello:0.0.1
2024-02-17 20:00:00 f4f82ee713444028b82ee71344b0287d nodejs:18 warm  5ms        success dashboard/hello:0.0.1
2024-02-17 19:59:54 98d19fe130da4e93919fe130da7e93cb nodejs:18 cold  33ms       success dashboard/hello:0.0.1
2024-02-17 17:40:53 f25e1f8bc24f4f269e1f8bc24f1f2681 python:3  warm  3ms        success dashboard/index:0.0.2
2024-02-17 17:35:12 bed3213547cc4aed93213547cc8aed8e python:3  warm  2ms        success dashboard/index:0.0.2
```

Note also the `--since` option, which is useful to show activations from
a given timestamp (you can obtain a timestamp with `date +%s`).

Since it can be quite annoying to keep track of the activation id, there
are two useful alternatives.

With `ops result --last` and `ops logs --last`, you can retrieve just
the last result or log.

### Polling activations

With `ops activation poll`, the CLI starts a loop and displays all the
activations as they happen.

```bash
$ ops activation poll

Enter Ctrl-c to exit.
Polling for activation logs
```

## Conclusion

Activations provide a way to monitor and track the execution of
functions, enabling understanding of how code behaves in response to
different events and allowing for debugging and optimizing serverless
applications.
