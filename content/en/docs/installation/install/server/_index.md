---
title: Linux Server
description: Install on a Linux Server
weight: 20
---
## Server Installation
This page describes how to install OpenServerless on a Linux server
accessible with SSH.

This is a single node installation, so it is advisable only for
development purposes.

### Prerequisites

Before installing, you need to:

1. install the OpenServerless CLI [ops](/docs/installation/download/);

2. provision a [server running a Linux operating system](/docs/installation/prereq/server/), 
   either a virtual machine or a physical server, and you know its IP address 
   or DNS name;

3. configure it to have [passwordless ssh access and sudo rights](/docs/installation/prereq/server/generic/);

4. open the firewall to have access to ports 80, 443 and 6443 or 16443
    from your client machine;

5. [configure](/docs/installation/configure/dns/) the DNS name for the server and choose
    the services you want to enable;

### Installation

If the prerequisites are satisfied, execute the dommand:

    ops setup server <server> <user>

> ❗ **IMPORTANT**
>
> Replace in the command before `<server>` with the IP address or DNS name
used to access the server, and `<user>` with the username you have to
use to access the server

Wait until the command completes and you will have OpenServerless up and
running.

### Post Install

- [Check the tutorial](/docs/tutorial/) to learn how to use it.

- To uninstall, execute the command:

```
ops setup server <server> <user> --uninstall
```