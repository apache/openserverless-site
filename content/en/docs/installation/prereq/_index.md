---
title: Prerequisites
weight: 20
---
# Prerequisites to install OpenServerless

This page lists the prerequisites to install OpenServerless in various
environments.

You can install OpenServerless:

- for **development** in a [single node](#single-node) environment,
    either in your local machine or in a Linux server.

- for **production**, in a [multi node](#multi-node) environment
    provided by a Kubernetes cluster.

For **development** purposes, you can install a single node
OpenServerless deployment in the following environments as soon as the
following requirements are satisfied:

- To install in your [local machine](#install-local.adoc), you need
    [Docker Desktop](#prereq-docker.adoc)

- To install in a **single node** [Linux
    server](#install-server.adoc), you need a server with [passwordless
    ssh access and sudo](#prereq-server.adoc).

Our installer can automatically install a Kubernetes environment, using
[K3S](https://k3s.io), but if you prefer you can install a single-node
Kubernetes instance by yourself.

If you choose to install Kubernetes on your server, we provide support
for:

- [SuSE K3S](#prereq-k3s.adoc)

- [Canonical MicroK8S](#prereq-mk8s.adoc)

For **production** purposes, you need a multi-node Kubernetes cluster
that satisfies [those requirements](#kubernetes/index.adoc), accessible
with its `kubeconfig` file.

If you have such a cluster, you can install [OpenServerless in a
Kubernetes cluster](#../install/cluster/index.adoc)

If you do not have a cluster and you need to setup one, we provide
support for provisioning a suitable cluster that satisfied our
requirements for the following Kubernetes environments:

- [EKS in Amazon AWS](#kubernetes/eks/index.adoc)

- [AKS in Microsoft Azure](#kubernetes/aks/index.adoc)

- [GKE in Google Cloud](#kubernetes/gke/index.adoc)

- [RedHat OpenShift](#kubernetes/openshift/index.adoc)

Once you have a suitable Kubernetes cluster, you can proceed [installing
OpenServerless](#install.adoc).
