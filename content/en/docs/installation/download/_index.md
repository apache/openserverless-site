---
title: Download
description: Download OpenServerless with ops CLI
weight: 10
draft: false
---
## Download and Install `ops`

### What is `ops`?

As you can guess it helps with operations: ops is the <strong>OP</strong>en<strong>S</strong>erverless CLI.

It is a task executor on steroids.

- it embeds task, wsk and  a lot of other utility commands (check with ops -help)
- automatically download and update command line tools, prerequisites and tasks
- taskfiles are organized in commands and subcommands, hierarchically and are powered by docopt
- it supports plugins

The predefined set of tasks are all you need to install and manage an OpenServerless cluster.

### Download links
You can install OpenServerless using its Command Line Interface, `ops`.

{{< blockquote warning >}}
Since we are in a preview phase, this is not an official link approved by the Apache Software Foundation.
{{< /blockquote >}}

Quick install in Linux, MacOS and Windows with WSL or GitBash:

```bash
curl -sL bit.ly/get-ops | bash
```

Quick install in Windows with PowerShell

Open a powershell. Then give these commands:

```powershell
Set-ExecutionPolicy Bypass - Scope Process -Force
irm bit.ly/get-ops-exe | iex
```

### After the installation

Once installed, in the first run `ops` will tell to update the tasks
executing:

`ops -update`

This command updates the OpenServerless "tasks" (its internal logic) to the
latest version. This command should be also executed frequently, as the
tasks are continuously evolving and expanding.

`ops` will suggest when to update them (at least once a day).

You normally just need to update the tasks but sometimes you also need
to update `ops` itself. The system will detect when it is the case and
tell you what to do.

### Where to find more details:

For more details, please visit the Github page of [Openserverless Cli](https://github.com/apache/openserverless-cli)