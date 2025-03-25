---
title: Ide
description: OpenServerless Ide Development Utilities.
---

## Synopsis

```text
Usage:
    ide login [<username>] [<apihost>]
    ide devel [--fast] [--dry-run]
    ide deploy [<action>] [--dry-run]
    ide undeploy [<action>] [--dry-run]
    ide clean
    ide setup 
    ide serve
    ide poll
    ide shell
    ide kill
    ide python
    ide nodejs
```

## Commands

```
    ide login               login in openserverless
    ide devel               activate development mode
    ide deploy              deploy everything or just one action
    ide undeploy            undeploy everything or just one action
    ide clean               clean the temporay files
    ide setup               setup the ide
    ide serve               serve web area
    ide kill                kill current devel or deploy job
    ide poll                poll for logs
    ide shell               start a shell with current env
    ide python              python subcommands
    ide nodejs              nodejs subcommands
```

## Options

```
--fast          Skip the initial deployment step and go in incremental update mode
--dry-run       Simulates the execution without making any actual changes 
```
