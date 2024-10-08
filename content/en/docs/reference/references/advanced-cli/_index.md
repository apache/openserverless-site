---
title: Advanced CLI
---
# Nuvolaris CLI

Nuvolaris offers a powerful command line interface named `nuv` which
extends and embeds the OpenWhisk `wsk`.

You can download it from [here](#installation:download.adoc).

We can see here some advanced uses of `nuv`.

Nuvolaris access is usually configure logging into it with the
`nuv -login`.

You can also configure access directly using the `nuv -wsk` command.

There are two required properties to configure:

1. **API host** (name or IP address) for the OpenWhisk and Nuvolaris
    deployment you want to use.

2. **Authorization key** (username and password) which grants you
    access to the OpenWhisk and Nuvolaris API.

The API host ia the installationj host, the one you configure in
installation with `nuv config apihost`

    nuv -wsk property set --apihost <openwhisk_baseurl>

If you know your authorization key, you can configure the CLI to use it.
Otherwise, you will need to obtain an authorization key for most CLI
operations. The API key is visible in the file `~/.wskprops` after you
perform a `nuv -login`. This file can be sourced to be read as
environment variables.

    source ~/.wskprops
    nuv -wsk property set --auth $AUTH

**Tip:** The OpenWhisk and Nuvolaris CLI stores properties in the
`~/.wskprops` configuration file by default. The location of this file
can be altered by setting the `WSK_CONFIG_FILE` environment variable.

The required properties described above have the following keys in the
`.wskprops` file:

- **APIHOST** - Required key for the API host value.

- **AUTH** - Required key for the Authorization key.

To verify your CLI setup, try `nuv action list`.

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

    nuv -wsk property set --cert <client_cert_path> --key <client_key_path>
