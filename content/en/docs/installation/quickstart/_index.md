---
title: Quick Start
description: Fast path to install a self-hosted OpenServerless 
weight: 5
---
## Quick Start

This is a quick start guide to the installation process, targeting
experienced users in a hurry.

It provides a high-level overview of the installation process, omitting
advanced of details. The missing pieces are covered in the rest of the
documentation.

Of course, if this guide is not enough and things fail, you can always
apply the rule: "if everything fails, read the manual".

## Prerequisites

Start ensuring the prerequsites are satisfied:

- [Download and install](/docs/installation/download/) ops, the
    OpenServerless CLI, picking version suitable for your environment.
    We support 64-bit versions of recent Windows, MacOS and major Linux
    distributions.

- Check that ops is correctly installed: open the terminal and write:

    ops -info

- Configure the services you want to enable. By default,
    OpenServerless will install only the serverless engine, accessible
    in http with no services enabled.

If you want to enable all the services, use:

    ops config enable --all

otherwise pick the services you want, among `--redis`, `--mongodb`,
`--minio`, `--cron`, `--postgres`. Note that `--mongodb` is actually
[FerretDB](https://www.ferretdb.com/) and requires Postgres which is
implicitly also enabled. More details [here](/docs/installation/configure).

Now, choose where to install OpenServerless.

Your options are:

- [locally](#locally) in your workstation;

- in a Linux [server](#server) in your intranet

- in a Linux [server](#internet-server) available on Internet

- in a Kubernetes [cluster](#cluster) in your intranet

- in [cloud](#cloud-cluster), where you can provision a Kubernetes
    cluster

## Local Installation

If you have a **decent** workstation (with at least 16GB of memory)
running a **recent** **64-bit** operating system, you can install
[Docker Desktop](https://www.docker.com/products/docker-desktop/) and
then install OpenServerless in it. Once you have:

1. installed the CLI

2. configured the services

3. installed Docker Desktop

Make sure Docker Desktop its running before the next operation. You can
install OpenServerless and its services in Docker with just this
command:

    ops setup devcluster

Once it is installed, you can proceed to read the
[tutorial](#../../tutorial/index.adoc) to learn how to code with it.

NOTE: At least 16GB of memory is ideal, but if you know what you’re
doing and can tolerate inefficiency, you can install with less using:

    export PREFL_NO_MEM_CHECK=1
    export PLEFL_NO_CPU_CHECK=1

## Internet Server Configuration

If you have access to a server on the Internet, you will know its **IP
address**.

Many cloud providers also give you a DNS name usually derived by the IP
and very hard to remember such as
`ec2-12-34-56-78.us-west-2.compute.amazonaws.com`.

Once you got the IP address and the DNS name, you can give to your
server a bettername [using a domain name
provider](https://en.wikipedia.org/wiki/List_of_managed_DNS_providers).
We cannot give here precise instructions as there are many DNS providers
and each has different rules to do the setup. Check with your chosen
domain name provider.

If you have this name, configure it and enable DNS with:

    ops config apihost <dns-name> --tls=<email-address>

> ❗ **IMPORTANT**
>
> Replace the `<dns-name>` with the actual DNS name, without using
prefixes like `http://` or suffixes like `:443`. Also, replace
`<email-address>` with your actual email address.

then proceed with the server installation.

## Server Installation

Once you got access to a Linux server with:

1. An IP address or DNS name, referred to as `<server>`

2. Passwordless access with `ssh` to a Linux user `<user>`

3. At least 8GB of memory and 50GB of disk space available

4. The user `<user>` has passwordless `sudo` rights

5. The firewall that allows traffic to ports 80, 443 and 6443

6. **Without** any Docker or Kubernetes installed

7. **Without** any Web server or Web application installed

then you can install OpenServerless in it.

The server can be physical or virtual. We need Kubernetes in it but the
installer takes care of installing also a flavor of Kubernetes,
[K3S](https://k3s.io), courtesy of
[K3Sup](https://github.com/alexellis/k3sup).

To install OpenServerless, first check you have access to the server
with:

    ssh <user>@<server> sudo hostname

You should see no errors and read the internal hostname of your server.

If you do not receive errors, you can proceed to install OpenServerless
with this command:

    ops setup server <server> <user>

> ❗ **IMPORTANT**
>
> Replace in the commands `<server>` with the address of your server, and
`<user>` with the actual user to use in your server. The `<server>` can
be the same as `<dns-name>` you have configured in the previous
paragraph, if you did so, or simply the IP address of a server on your
intranet

Now wait until the installation completes. Once it is installed, you can
proceed to read the [tutorial](#tutorial:index.adoc) to learn how to
code with it.

## Cloud Cluster Provisioning

If you have access to a cloud provider, you can set up a Kubernetes
cluster in it. The Kubernetes cluster needs to satisfy certain
[prerequisites](#../prereq/kubernetes/cluster/index.adoc) to be able to
install OpenServerless with no issues.

We provide the support to easily configure and install a compliant
Kubernetes cluster for the following clouds:

- [Amazon AWS](#aws)

- [Microsoft Azure](#azure)

- [Google Cloud](#gcloud)

At the end of the installation you will have available and accessible a
Kubernetes Cluster able to install OpenServerless, so proceed with a
[cluster installation](#cluster).

### Amazon AWS

Configure and install an Amazon EKS cluster on Amazon AWS with:

    ops config eks
    ops cloud eks create

then [install the cluster](#cluster).

### Azure AKS

Configure and install an Azure AKS cluster on Microsoft Azure with:

    ops config aks
    ops cloud aks create

then [install the cluster](#cluster).

### Google Cloud GKE

Configure and install a Google Cloud GKE with:

    ops config gke
    ops cloud gke create

then [install the cluster](#cluster).

## Cluster Install

In short, if you have access to kubernetes cluster, you can install
OpenServerless with:

    ops setup cluster

For a slightly longer discussion, checking prerequisites before
installing, read on.

### Prerequisites to install

If you have access to a Kubernetes cluster with:

1. Access to the `cluster-admin` role

2. Block storage configured as the default storage class

3. The `nginx-ingress` installed

4. Knowledge of the IP address of your `nginx-ingress` controller

you can install OpenServerless in it. You can read [more details
here](#../prereq/kubernetes/cluster/index.adoc).

You can get this access either by provisioning a Kubernetes cluster in
[cloud](#cloud-cluster) or getting access to it from your system
administrator.

Whatever the way you get access to your Kubernetes cluster, you will end
up with a configuration file which is usually stored in a file named
`.kube/config` in your home directory. This file will give access to the
Kubernetes cluster to install OpenServerless.

### Performing the installation

To install, first, verify you have actually access to the Kubernetes
cluster, by running this command:

    ops debug kube info

You should get information about your cluster, something like this:

Kubernetes control plane is running at
`\https://api.nuvolaris.osh.n9s.cc:6443`

Now you can finally install OpenServerless with the command:

    ops setup cluster

Wait until the process is complete and if there are no errors,
OpenServerless is installed and ready to go.

Once it is installed, you can proceed to read the
[Tutorial](#../../tutorial/index.adoc) to learn how to code with it.
