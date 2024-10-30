---
title: Advanced CLI
description: How to use the advanced features of ops command line
weight: 10
draft: false
---

## OpenServerless Cli

OpenServerless offers a powerful command line interface named `ops` which
extends and embeds the OpenWhisk `wsk`.

Download instructions are available [here](/docs/installation/download/).

Let's see some advanced uses of `ops`.

OpenServerless access is usually configured logging into the platform with the `ops -login` command.

You can also configure access directly using the `ops -wsk` command.

There are two required properties to configure:

1. **API host** (name or IP address) for the OpenWhisk and OpenServerless
    deployment you want to use.

2. **Authorization key** (username and password) which grants you
    access to the OpenWhisk and OpenServerless API.

The API host ia the installationj host, the one you configure in
installation with `ops config apihost`

    ops -wsk property set --apihost <openwhisk_baseurl>

If you know your authorization key, you can configure the CLI to use it.
Otherwise, you will need to obtain an authorization key for most CLI
operations. The API key is visible in the file `~/.wskprops` after you
perform a `ops -login`. This file can be sourced to be read as
environment variables.

    source ~/.wskprops
    ops -wsk property set --auth $AUTH

**Tip:** The OpenWhisk and OpenServerless CLI stores properties in the
`~/.wskprops` configuration file by default. The location of this file
can be altered by setting the `WSK_CONFIG_FILE` environment variable.

The required properties described above have the following keys in the
`.wskprops` file:

- **APIHOST** - Required key for the API host value.

- **AUTH** - Required key for the Authorization key.

To verify your CLI setup, try `ops action list`.

## Configure the CLI to use an HTTPS proxy

The CLI can be setup to use an HTTPS proxy. To setup an HTTPS proxy, an
environment variable called `HTTPS_PROXY` must be created. The variable
must be set to the address of the HTTPS proxy, and its port using the
following format: `{PROXY IP}:{PROXY PORT}`.

## Configure the CLI to use client certificate

The CLI has an extra level of security from client to apihost, system
provides default client certificate configuration which deployment
process generated, then you can refer to below steps to use client
certificate:

    ops -wsk property set --cert <client_cert_path> --key <client_key_path>
