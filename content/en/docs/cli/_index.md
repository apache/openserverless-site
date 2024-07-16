---
title: CLI
weight: 30
---
## OpenServerless CLI

The `ops` command is the command line interface to OpenServerless

It let’s you to install and manipulate the components of the system.

If it is not already included in the development environment provided
you can [download the CLI suitable for your platform from here, and
install it](/docs/installation/download/)

## Login into the system

To start working with you have to login in some OpenServerless
installation.

The administrator should have provided with username, password and the
URL to access the system.

For example, let’s assume you are the user `mirella` and the system is
available on `https://nuvolaris.dev`.

In order to login type the following command and enter you password.

    ops -login https://nuvolaris.dev mirella
    Enter Password:

If the password is correct you are logged in the system and you can use
the commands described below.

## Next Steps

Once logged in, you can:

- learn how to manage OpenServerless
    [entities](/docs/cli/entities/)

- learn how to deploy [projects](/docs/cli/project/) and [web
    assets](/docs/cli/assets/)

- learn how to [administer the system](/docs/cli/admin/) and [debug
    the system](/docs/cli/debug/)
