---
title: Install
description: Install the ops CLI and create a local OpenServerless
weight: 10
draft: false
aliases:
  - /docs/installation/download/
---
## Install `ops`

{{< blockquote warning "DISCLAIMER" >}}
The prebuilt binaries published on the
[openserverless-cli releases](https://github.com/apache/openserverless-cli/releases)
page are **convenience builds** only. They are **not** official Apache releases,
they are **not** endorsed by the Apache Software Foundation, and they are
**not** meant to be production ready. The only official artifacts are the
source releases; build from source with `go install` if you need a supported,
production-grade installation.

Apache OpenServerless is also an effort undergoing **incubation** at the Apache
Software Foundation. Incubation is required of all newly accepted projects
until a further review indicates that the infrastructure, communications and
decision making process have stabilized in a manner consistent with other
successful ASF projects. While incubation status is not necessarily a
reflection of the completeness or stability of the code, it does indicate that
the project has yet to be fully endorsed by the ASF.
{{< /blockquote >}}

### What is `ops`?

As you can guess it helps with operations: ops is the <strong>OP</strong>en<strong>S</strong>erverless CLI.

It is a task executor on steroids.

- it embeds task, wsk and  a lot of other utility commands (check with ops -help)
- automatically download and update command line tools, prerequisites and tasks
- taskfiles are organized in commands and subcommands, hierarchically and are powered by docopt
- it supports plugins

The predefined set of tasks are all you need to install and manage an OpenServerless cluster.

### Install CLI

You install `ops` by building it from the official Apache sources with a Go
compiler. You need [Go](https://go.dev/dl/) installed first.

```bash
go install github.com/apache/openserverless-cli/cmd/ops@0.9.0
```

{{< details title="Installing a specific version" >}}
You can replace `0.9.0` with any other version you want to install, including
unreleased ones — for example a snapshot such as
`v0.9.0-2609031727.SNAPSHOT`. The available versions are the tags of the
[openserverless-cli](https://github.com/apache/openserverless-cli/tags)
repository.
{{< /details >}}

This installs `ops` into `$(go env GOPATH)/bin`. Make sure that directory is on
your `PATH`:

```bash
export PATH="$PATH:$(go env GOPATH)/bin"
```

### Download a convenience build

If you prefer not to build from source, prebuilt binaries for the most common
platforms are published as convenience builds at:

[https://github.com/apache/openserverless-cli/releases](https://github.com/apache/openserverless-cli/releases)

Download the archive matching your operating system and architecture, extract
the `ops` executable and place it in a directory on your `PATH`.

On **macOS**, binaries downloaded from the Internet are quarantined by
Gatekeeper and refuse to run. Remove the quarantine attribute before using
`ops`:

```bash
xattr -d com.apple.quarantine ops
```

### Check the installation

Once installed, check that `ops` is set up correctly:

```bash
$ ops -info
Welcome to ops! Setting up...
Cloning tasks...
Tasks downloaded successfully
ensuring prerequisite kubectl 1.33.1
ensuring prerequisite kind 0.30.0
ensuring prerequisite helm 3.18.0
...
OPS & OPS_CMD: /home/me/go/bin/ops
OPS_VERSION: 0.9.0
OPS_BRANCH: 0.9.0
OPS_BIN: /home/me/.ops/linux-amd64/bin
OPS_TMP: /home/me/.ops/tmp
OPS_HOME: /home/me/.ops
OPS_ROOT: /home/me/.ops/0.9.0/oplugins
OPS_REPO: http://github.com/apache/openserverless-task
OPS_PWD: /home/me
OPS_TASKS: 7e523adb9af3f17ae221220e9c17bce31fd92090
OPS_ROOT_PLUGIN: /home/me
```

The first run downloads what it needs — the tasks (its internal logic, a git
clone of `OPS_REPO`) and the prerequisite binaries such as `kubectl`, `kind` and
`helm` — caching them under `~/.ops`. Later runs start immediately.

Check that `OPS_REPO` is `http://github.com/apache/openserverless-task` and that
`OPS_BRANCH` matches the version you installed.

Use `ops -t` to list the available tasks.

### Keeping it up to date

`ops` will tell you when its tasks need updating:

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
