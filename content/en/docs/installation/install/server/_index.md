---
title: Linux Server
---
This page describes how to install Nuvolaris on a Linux server
accessible with SSH.

This is a single node installation, so it is advisable only for
development purposes.

# Prerequisite

Before installing, you need to:

1. install the Nuvolaris CLI [nuv](#download.adoc).

2. provision a [server running a Linux operating
    system](#prereq-server.adoc), either a virtual machine or a physical
    server, and you know its IP address or DNS name

3. configure it to have passwordless ssh access and sudo rights

4. open the firewall to have access to ports 80, 443 and 6443 or 16443
    from your client machine

5. [configure](#configure.adoc) the DNS name for the server and choose
    the services you want to enable

# Installation

If the prerequisites are satisfied, execute the dommand:

    nuv setup server <server> <user>

Replace in the command before `<server>` with the IP address or DNS name
used to access the server, and `<user>` with the username you have to
use to access the server

Wait until the command completes and you will have Nuvolaris up and
running.

# Post Install

- [Check the tutorial](#tutorial:index.adoc) to learn how to use it.

- To uninstall, execute the command:

<!-- -->

    nuv setup server <server> <user> --uninstall
