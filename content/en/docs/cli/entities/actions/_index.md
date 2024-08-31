---
title: Actions
description: Functions, the core of OpenServerless
weight: 20
---
## Actions

An action can generally be considered as a function, a snippet of code,
or generally a method.

The `ops action` command is designed for managing actions, featuring
frequently utilized CRUD operations such as list, create, update, and
delete. We will illustrate these operations through examples using a
basic hello action. Let’s assume we have the following file in the
current directory:

The `hello.js` script with the following content:

```javascript
function main(args) {
    return { body: "Hello" }
}
```

## Simple Action Deployment

If we want to deploy this simple action in the package `demo`, let’s
execute:

```bash
$ ops package update demo
ok: updated package demo
$ ops action update demo/hello hello.js
ok: update action demo/hello
```

Note that we ensured the package exists before creating the action.

We can actually omit the package name. In this case, the package name is
`default`, which always exists in a namespace. However, we advise always
placing actions in some named package.

> 💡 **NOTE**
>
> We used `update`, but we could have used `create` if the action does not
exist because `update` also creates the action if it does not exist and
updates it if it is already there. Update here is similar to the `patch`
concept in REST API. However, `create` generates an error if an action
does not exist, while `update` does not, so it is practical to always
use `update` instead of `create` (unless we really want an error for an
existing action for some reason).

## How to Invoke Actions

Let’s try to run the action:

```bash
$ ops invoke demo/hello
{
    "body": "Hello"
}
```

Actually, the `invoke` command does not exist, or better, it’s just a
handy shortcut for `ops action invoke -r`.

If you try to run `ops action invoke demo/hello`, you get:

```bash
$ ops action invoke demo/hello
ok: invoked /_/demo/hello with id fec047bc81ff40bc8047bc81ff10bc85
```

You may wonder where the result is. In reality, in OpenServerless, all
actions are by default asynchronous, so what you usually get is the
**activation id** to retrieve the result once the action is completed.

To block the execution until the action is completed and get the result,
you can either use the flag `-r` or `--result`, or use `ops invoke`.

Note, however, that we are using `ops` to invoke an action, which means
all the requests are authenticated. You cannot invoke actions directly
without logging into the system first.

However, you can mark an action to be public by creating it with
`--web true` (see below).

### Public Actions

If you want an action to be public, you can do:

```bash
$ ops action update demo/hello hello.js --web true
ok: updated action demo/hello
$ ops url demo/hello
https://nuvolaris.dev/api/v1/web/mirella/demo/hello
```

and you can invoke it with:

```bash
$ curl -sL https://nuvolaris.dev/api/v1/web/dashboard/demo/hello
Hello
```

Note that the output is only showing the value of the body field. This
is because the web actions must follow a pattern to produce an output
suitable for web output, so the output should be under the key `body`,
and so on. Check the section on Web Actions for more information.

> 💡 **NOTE**
>
> Actually, `ops url` is a shortcut for `ops action get --url`. You can
use `ops action get` to retrieve a more detailed description of an
action in JSON format.

After `action create`, `action update`, and `action get` (and the
shortcuts `invoke` and `url`), we should mention `action list` and
`action delete`.

The `action list` command obviously lists actions and allows us to
delete them:

```bash
$ ops action list
/mirella/demo/hello                                                  private nodejs:18
$ ops action delete demo/hello
ok: deleted action demo/hello
```

## Conclusion

Actions are a core part of our entities. A ops action is a
self-contained and executable unit of code deployed on the ops
serverless computing platform.
