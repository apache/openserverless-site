---
title: Install K3S
description: Prerequisites to install OpenServerless in K3S
weight: 40
---
## Install K3S in a server

You can install OpenServerless as [described
here](#../../../install/server/index.adoc), and you do not need to
install any Kubernetes in it, as it is installed as part of the
procedure. In this case it installs [K3S](https://k3s.io).

Or you can [install K3S in advance](#installing-k3s), and then proceed
[configuring](#../../../configure/index.adoc) and then installing
OpenServerless [as in any other Kubernetes
cluster](#../../../install/cluster/index.adoc).

### Installing K3S in a server{#installing-k3s}

Before installing ensure you have [satified the
prerequisites](#../../../prereq/index.adoc), most notably:

1. you know the **IP address or DNS name**

2. your server operating system satisfies the [K3S
    requirements](https://docs.k3s.io/installation/requirements)

3. you have passwordless access with ssh

4. you have a user with passwordless sudo rights

5. you have opened the port 6443 in the firewall

Then you can use the following subcommand to install in the server:

    ops cloud k3s create SERVER=<server> USERNAME=<username>

where `<server>` is the **IP address or DNS name** to access the server,
and `<username>` is the user you use to access the server.

Those pieces of information should have been provided when provisioning
the server.

> ❗ **IMPORTANT**
>
> If you installed a Kubernetes cluster in the server this way, you should
proceed installing OpenServerless as in 
[a Kubernetes cluster](/docs/installation/install/cluster/), **not** 
as a server.

The installation retrieves also a Kubernetes configuration file, so you
can proceed to installing it without any other step involved.

### Additional Commands

In addition to `create` the following subcommands are also available:

- `ops cloud k3s delete SERVER=<server> USERNAME=<username>`:
    uninstall K3S from the server

- `ops cloud k3s kubeconfig SERVER=<server> USERNAME=<username>`:
    retrieve the kubeconfig from the K3S server

- `ops cloud k3s info`: some information about the server

- `ops cloud k3s status`: status of the server
