---
title: Kubernetes cluster
weight: 20
---
This section describes how to install Nuvolaris on a Kubernetes Cluster

# Prerequisite

Before installing, you need to:

- [Provision](#prereq-kubernetes.adoc) a Kubernetes Cluster

- [Configure](#configure.adoc) the installation

- install [Download and install](#download.adoc) Nuvolaris CLI, `nuv`.

# Installation

If you have a Kubernetes cluster directly accessible with its
configuration, or you provisioned a cluster in some cloud using `nuv`
embedded tools, you just need to type:

    nuv setup cluster

Sometimes the kubeconfig includes access to multiple Kubernetes
instances, each one identified by a different `<context>` name. You can
install the Nuvolaris cluster in a specified `<context>` with:

    nuv setup cluster <context>

# Post Install

- [Check the tutorial](#tutorial:index.adoc) to learn how to use it.

- To uninstall, execute the command:

<!-- -->

    nuv setup cluster --uninstall
