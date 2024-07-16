---
title: Local Machine
---
This page describes how to install Nuvolaris on your local machine. The
services are limited and not accessible from the outside so it is an
installation useful only for development purposes.

# Prerequisite

Before installing, you need to:

- install [Docker](#prereq-docker.adoc).

- install [nuv](#download.adoc).

- [configure](#configure.adoc) the services you want

You cannot have `` https` `` and static publishing in a local
installation. If you enable them, the configuration will be ignored.

# Installation

Run the command:

    nuv setup devcluster

and wait until the command terminates.

# Post Install

- [Check the tutorial](#tutorial:index.adoc) to learn how to use it.

- To uninstall, execute the command:

<!-- -->

    nuv setup devcluster --uninstall
