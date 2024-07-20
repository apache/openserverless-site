---
title: Linux Server
description: Install OpenServerless in a Linux server
weight: 20
---
## Prerequisites to install OpenServerless in a Linux server

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

5. You have to install a
   [public ssh key](/docs/installation/prereq/server/generic/#ssh) to access it
    without a password.

6. You have to configure
    [sudo](/docs/installation/prereq/server/generic/#sudo) to execute root
    commands without a password.

You can:

- get a server on any cloud provider or even install by yourself and
    then [configure it](/docs/installation/prereq/server/generic/)

- provision such a server with `ops`
  [on Amazon Web Services](/docs/installation/prereq/server/aws/)

- provision such a server with `ops` on 
  [on Google Cloud Platform](/docs/installation/prereq/server/gcp/)

Once you have such a server you can optionally (it is not required)
install [K3S](/docs/installation/prereq/server/k3s/) or
[MicroK8S](/docs/installation/prereq/server/mk8s/) in it.

Once you have configured you server, you can proceed
[configuring OpenServerless](/docs/installation/configure/) for the installation.
