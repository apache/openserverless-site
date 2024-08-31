---
title: Entities
description: The parts that OpenServerless applications are made of
weight: 10
---
## Entities

OpenServerless applications are composed by some "entities" that you can
manipulate either using a command line interface or programmatically
with code.

The command line interface is the `ops` command line tools, that can be
used directly on the command line or automated through scripts. You can
also a REST API crafted explicitly for OpenServerless.

The entities available in OpenServerless are:

- [Packages](/docs/cli/entities/packages/): They serve as a means of
    grouping actions together, facilitating the sharing of parameters,
    annotations, etc. Additionally, they offer a base URL that can be
    utilized by web applications.

- [Actions](/docs/cli/entities/actions/): These are the fundamental
    components of a OpenServerless application, capable of being written
    in any programming language. Actions accept input and produce
    output, both formatted in JSON.

- [Activations](/docs/cli/entities/activations/): Each action invocations
    produces an activation id that can be listed. Action output and
    results logged and are associated to activations and can be
    retrieved providing an activativation id.

- [Sequences](/docs/cli/entities/sequences/): Actions can be
    interconnected, where the output of one action serves as the input
    for another, effectively forming a sequence.

- [Triggers](/docs/cli/entities/triggers/): Serving as entry points with
    distinct names, triggers are instrumental in activating multiple
    actions.

- [Rules](/docs/cli/entities/rules/): Rules establish an association
    between a trigger and an action. Consequently, when a trigger is
    fired, all associated actions are invoked accordingly.

## The `ops` command

Let’s now provide an overview of OpenServerless' command line interface,
focusing on the `ops` command.

The command can be dowloaded in precompile binary format for many
platform following the `Download` button on <https://www.nuvolaris.io/>

The `ops` command is composed of many commands, each one with many
subcommands. The general format is:

```bash
ops <entity> <command> <parameters> <flags>
```

Note that `<parameters>` and `<flags>` are different for each
`<command>`, and for each `<entity>` there are many subcommands.

The CLI shows documention in the form of help output if you do not
provide enough parameters to it. Start with `ops` to get the list of the
main commands. If you type the `ops <entity>` get the help for that
entity, and so on.

For example, let’s see `ops` output (showing the command) and the more
frequently used command, `action`, also showing the more common
subcommands, shared with many others:

```bash
$ ops
Welcome to Ops, the all-mighty OpenServerless Build Tool

The top level commands all have subcommands.
Just type ops <command> to see its subcommands.

Commands:
    action      work with actions
    activation  work with activations
    invoke      shorthand for action invoke (-r is the default)
    logs        shorthand for activation logs
    package     work with packages
    result      shorthand for activation result
    rule        work with rules
    trigger     work with triggers
    url         get the url of a web action$ wsk action
```

There are many more sub commands used for aministrative purposes. In
this documentation we only focus on the subcommands used to manage the
main entities of OpenServerless.

Keep in mind that commands represent entities, and their subcommands
follow the CRUD model (Create, Retrieve via get/list, Update, Delete).
This serves as a helpful mnemonic to understand the `ops` command’s
functionality. While there are exceptions, these will be addressed
throughout the chapter’s discussion. Note however that some subcommand
may have some specific flags.

## Naming Entities

Let’s see how entities are named.

Each user also has a **namespace**, and everything a user creates,
belongs to it.

The namespace is usually created by a system administrator.

Under a namespace you can create triggers, rules, actions and packages.

Those entities will have a name like this:

- `/mirella/demo-triggger`

- `/mirella/demo-rule`

- `/mirella/demo-package`

- `/mirella/demo-action`

When you create a package, you can put under it actions and feeds. Those
entities are named

- `/mirella/demo-package/demo-action`

- `/mirella/demo-package/demo-feed`

> 💡 **NOTE**
>
> In the commands you do not require to specify a namespace. If your user
is `mirella`, your namespace is `/mirella`, and You type `demo-package`
to mean `/mirella/demo-package`, and `demo-package/demo-action` to mean
`/mirella/demo-package/demo-action`.
