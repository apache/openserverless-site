---
title: Kubernetes cluster
description: Install OpenServerless on a Kubernetes Cluster
weight: 30
---
## Cluster Installation
This section describes how to install OpenServerless on a Kubernetes Cluster

### Prerequisites

Before installing, you need to:

- [Provision](/docs/installation/prereq/kubernetes/) a Kubernetes Cluster

- [Configure](/docs/installation/configure/) the installation

- install [Download and install](/docs/installation/download/) OpenServerless CLI, `ops`.

### Installation

If you have a Kubernetes cluster directly accessible with its
configuration, or you provisioned a cluster in some cloud using `ops`
embedded tools, you just need to type:

    ops setup cluster

Sometimes the kubeconfig includes access to multiple Kubernetes
instances, each one identified by a different `<context>` name. You can
install the OpenServerless cluster in a specified `<context>` with:

    ops setup cluster <context>

### Post Install

- [Check the tutorial](/docs/tutorial) to learn how to use it.

- To uninstall, execute the command:

```
ops setup cluster --uninstall
```