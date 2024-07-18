---
title: Local Machine
description: Install OpenServerless on a local machine
weight: 10
---
### Local Installation

This page describes how to install OpenServerless on your local machine. The
services are limited and not accessible from the outside so it is an
installation useful only for development purposes.

### Prerequisites

Before installing, you need to:

- install [Docker](/docs/installation/prereq/docker/).

- install [ops](/docs/installation/download/).

- [configure](/docs/installation/configure/) the services you want

> 💡 **NOTE**
>
> You cannot have ``https`` and static publishing in a local
installation. If you enable them, the configuration will be ignored.

### Installation

Run the command:

    ops setup devcluster

and wait until the command terminates.

### Post install

[Check the tutorial](/docs/tutorial/) to learn how to use it.

To uninstall, execute the command:

    ops setup devcluster --uninstall
