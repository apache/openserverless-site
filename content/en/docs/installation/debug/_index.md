---
title: Troubleshooting
description: How to diagnose and solve issues
---
## Debug

This document gives you hints for diagnostics and solving issues, using
the (hidden) subcommand `debug`.

Note it is technical and assumes you have some knowledge of how
Kubernetes operates.

### Watching

While installing, you can watch the installation (opening another
terminal) with the command:

    ops debug watch

Check that no pods will go in error while deploying.

### Configuration

You can inspect the configuration with the `ops debug subcommand`

- **API host**: `ops debug apihost`

- **Static Configuration**: `ops debug config`.

- **Current Status**: `ops debug status`

- **Runtimes**: `ops debug runtimes`

- **Load Balancer**: `ops debug lb`

- **Images**: `ops debug images`

### Logs

You can inspect logs with `ops debug log` subcommand. Logs you can show:

- **operator**: `ops debug log operator` (continuously:
    `ops debug log foperator`)

- **controller**: `ops debug log controller` (continuously:
    `ops debug log fcontroller`)

- **database**: `ops debug log couchdb` (continuously:
    `ops debug log fcouchdb`)

- **certificate manager**: `ops debug log certman`
    (continuously: `ops debug log fcertmap`)

### Kubernetes

You can detect which Kubernetes are you using with:

`ops debug detect`

You can then inspect Kubernetes objects with:

- **namespaces**: `ops debug kube ns`

- **nodes**: `ops debug kube nodes`

- **pod**: `ops debug kube pod`

- **services**: `ops debug kube svc`

- **users**: `ops debug kube users`

You can enter a pod by name (use `kube pod` to find the name) with:

    ops debug kube exec P=<pod-name>

### Kubeconfig

Usually, `ops` uses a hidden kubeconfig so does not override your
Kubernetes configuration.

If you want to go more in-depth and you are knowledgeable of Kubernetes,
you can export the kubeconfig with `ops debug export F=<file>`.

You can **overwrite your kubeconfig** (be aware there is no backup) with
`ops debug export F=-`.
