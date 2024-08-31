---
title: Install MicroK8S
description: Prerequisites to install OpenServerless in K8S
weigth: 50
---
## Install MicroK8S in a server

You can install OpenServerless as
[described here](/docs/installation/install/server) and you do not need to
install any Kubernetes in it, as it is installed as part of the procedure. In
this case it installs K3S.

But you can [install MicroK8S](#install-k8s) instead, if you
prefer. Check here for [informations about MicroK8S](https://microk8s.io/).

If you install MicroK8S in your server, you can then proceed
[configuring](/docs/installation/configure/) and then installing OpenServerless
[as in any other Kubernetes cluster](/docs/installation/install/cluster/).

### Installing MicroK8S in a server{#install-k8s}

Before installing ensure you have 
[satisfied the prerequisites](/docs/installation/prereq/server/), most notably:

1. you know the **IP address or DNS name**

2. you have passwordless access with ssh

3. you have an user with passwordless sudo rights

4. you have opened the port **16443** in the firewall

Furthermore, since MicroK8S is installed using `snap`, you also need to
[install `snap`](https://snapcraft.io/docs/installing-snapd).

> 💡 **NOTE**
>
> While `snap` is available for many linux distributions, it is typically
pre-installed and well supported in in Ubuntu and its derivatives. So we
recommend MicroK8S only if you are actually using an Ubuntu-like Linux
distribution.

If you system is suitable to run MicroK8S you can use the following
subcommand to install in the server:

    ops cloud mk8s create SERVER=<server> USERNAME=<username>

where `<server>` is **IP address or DNS name** to access the server, and
`<username>` is the user you use to access the server.

Those informations should have been provided when provisioning the
server.

> ❗ **IMPORTANT**
>
> If you installed a Kubernetes cluster in the server in this way, you
should proceed installing OpenServerless as in 
[a Kubernetes cluster](/docs/installation/install/cluster), **not** as a server.

The installation retrieves also a kubernets configuration file so you
can proceed to installing it without any other step involved.

### Additional Commands

In addition to `create` you have available also the following
subcommands:

- `ops cloud mk8s delete SERVER=<server> USERNAME=<username>`:
    uninstall K3S from the server

- `ops cloud mk8s kubeconfig SERVER=<server> USERNAME=<username>`:
    retrieve the kubeconfig from the MicroK8S server

- `ops cloud mk8s info`: informations about the server

- `ops cloud mk8s status`: status of the server
