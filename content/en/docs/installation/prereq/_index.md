---
title: Prerequisites
description;: The list of requirements to install OpenServerless
weight: 20
---
## Prerequisites to install OpenServerless

This page lists the prerequisites to install OpenServerless in various
environments.

You can install OpenServerless:

- for **development** in a [single node](#single-node-development-installation) environment,
    either in your local machine or in a Linux server.

- for **production**, in a [multi node](#multi-node-production-installation) environment
    provided by a Kubernetes cluster.

### Single Node development installation

For **development** purposes, you can install a single node
OpenServerless deployment in the following environments as soon as the
following requirements are satisfied:

- To install in your [local machine](/docs/installation/install/local/), you need
    [Docker Desktop](/docs/installation/prereq/docker/)

- To install in a **single node**
  [Linux server](/docs/installation/install/server/), you need a server with [passwordless ssh access and sudo](/docs/installation/prereq/server/).

Our installer can automatically install a Kubernetes environment, using
[K3S](https://k3s.io), but if you prefer you can install a single-node
Kubernetes instance by yourself.

If you choose to install Kubernetes on your server, we provide support
for:

- [SuSE K3S](/docs/installation/prereq/k3s/)

- [Canonical MicroK8S](/docs/installation/prereq/mk8s)

### Multi Node production installation

For **production** purposes, you need a multi-node Kubernetes cluster
that satisfies [those requirements](/docs/installation/prereq/kubernetes/),
accessible with its `kubeconfig` file.

If you have such a cluster, you can install
[OpenServerless in a Kubernetes cluster](/docs/installation/install/cluster/)

If you do not have a cluster and you need to setup one, we provide
support for provisioning a suitable cluster that satisfied our
requirements for the following Kubernetes environments:

- [EKS in Amazon AWS](/docs/installation/prereq/kubernetes/eks/)

- [AKS in Microsoft Azure](/docs/installation/prereq/kubernetes/aks/)

- [GKE in Google Cloud](/docs/installation/prereq/kubernetes/gke/)

- [RedHat OpenShift](/docs/installation/prereq/kubernetes/openshift/)

Once you have a suitable Kubernetes cluster, you can proceed
[installing OpenServerless](/docs/installation/install/).
