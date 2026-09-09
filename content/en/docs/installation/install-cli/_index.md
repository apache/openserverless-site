---
title: Install
description: Install the ops CLI and create a local OpenServerless
weight: 10
draft: false
aliases:
  - /docs/installation/download/
---
## Install `ops`

### What is `ops`?

As you can guess it helps with operations: ops is the <strong>OP</strong>en<strong>S</strong>erverless CLI.

It is a task executor on steroids.

- it embeds task, wsk and  a lot of other utility commands (check with ops -help)
- automatically download and update command line tools, prerequisites and tasks
- taskfiles are organized in commands and subcommands, hierarchically and are powered by docopt
- it supports plugins

The predefined set of tasks are all you need to install and manage an OpenServerless cluster.

### Install with `go install`

You install `ops` by building it from the official Apache sources with a Go
compiler. You need [Go](https://go.dev/dl/) installed first.

```bash
go install github.com/apache/openserverless-cli/cmd/ops@0.9.0
```

You can replace `0.9.0` with any other version you want to install, including
unreleased ones — for example a snapshot such as
`v0.9.0-2609031727.SNAPSHOT`. The available versions are the tags of the
[openserverless-cli](https://github.com/apache/openserverless-cli/tags)
repository.

This installs `ops` into `$(go env GOPATH)/bin`. Make sure that directory is on
your `PATH`:

```bash
export PATH="$PATH:$(go env GOPATH)/bin"
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

## Create a local OpenServerless

If you have [Docker](https://docs.docker.com/get-started/get-docker/) installed,
you can now create a complete OpenServerless on your own machine with a single
command:

```bash
ops setup mini
```

This is the fastest way to get a working system, and the recommended starting
point: it installs everything locally, so you can try OpenServerless without a
cluster and without a cloud account.

When it finishes, follow the [Quick Start](/docs/installation/quickstart/) to
deploy your first action.

To install on a real cluster instead — Kubernetes, K3s, MicroK8s, EKS, AKS, GKE
and more — check the [prerequisites](/docs/installation/prereq/) and then the
[installation guides](/docs/installation/install/).

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
