---
title: Kubernetes Cluster
description: Install OpenServerless in a Kubernetes cluster
weight: 30
---
## Prerequisites to install OpenServerless in a Kubernetes cluster

You can install OpenServerless in any Kubernetes cluster which 
[satisfy some requirements](/docs/installation/prereq/kubernetes/cluster/).

Kubernetes clusters are available pre-built from a variety of cloud
providers. We provide with our `ops` tool the commands to install a
Kubernetes cluster ready for OpenServerless in the following
environments:

- [Amazon EKS](/docs/installation/prereq/kubernetes/eks/)

- [Azure AKS](/docs/installation/prereq/kubernetes/aks/)

- [Google GKE](/docs/installation/prereq/kubernetes/gke/)

- [RedHat OpenShift](/docs/installation/prereq/kubernetes/openshift/)

You can also provision a suitable cluster by yourself, in any cloud or
on premises, ensuring the prerequites are satisfied.

Once provisioned, you will receive a configuration file to access the
cluster, called `kubeconfig`.

This file should be placed in `~/.kube/config` to give access to the
cluster

If you have this file, you can check if you have access to the cluster
with the command:

    ops debug kube info

You should see something like this:

    Kubernetes control plane is running at https://xxxxxx.yyy.us-east-1.eks.amazonaws.com

Once you have got access to the Kubernetes cluster, either installing
one with out commands or provisioning one by yourself, you can proceed
[configuring the installation](/docs/installation/configure/) and then
[installing OpenServerless](/docs/installation/install/cluster/) in the
cluster.
