---
title: Linux Server
weight: 20
---
# Prerequisites to install OpenServerless in a Linux server

You can install OpenServerless on any server either in your intranet or
on in Internet running a Linux distribution, with the following
requirements:

1. You know the **IP address or DNS name** of the server on Internet or
    in your Intranet.

2. The server requires at least 8GB of memory and 30GB of disk space
    available.

3. It should be running a Linux distribution [supported by
    K3S](https://docs.k3s.io/installation/requirements).

4. You must open the firewall to access ports 80, 443 and 6443 (for
    K3S) or 16443 (for MicroK8S) from your machine.

5. You have to install a [public ssh
    key](#../../prereq/server/generic/index.adoc#sshkey) to access it
    without a password.

6. You have to configure
    [sudo](#../../prereq/server/generic/index.adoc#sudo) to execute root
    commands without a password.

You can:

- get a server on any cloud provider or even install by yourself and
    then [configure it](#:../../prereq/server/generic/index.adoc)

- provision such a server with `ops` [on Amazon Web
    Services](#../../prereq/server/aws/index.adoc)

- provision such a server with `ops` on [on Google Cloud
    Platform](#../../prereq/server/gcp/index.adoc)

Once you have such a server you can optionally (it is not required)
install [K3S](#../../prereq/server/k3s/index.adoc) or
[MicroK8S](#../../prereq/server/mk8s/index.adoc) in it.

Once you have configured you server, you can proceed [configuring
OpenServerless](#../../configure/index.adoc) for the installation.
