---
title: Web Assets
description: How to handle frontend deployment
---
## Upload Web Assets

The `web` folder in the root of a project is used to deploy static
frontends. A static front-end is a collection of static asset under a
given folder that will be published in a web server under a path.

Every uses has associated a web accessible static area where you can
upload static assets.

You can upload a folder in this web area with

`ops web upload <folder>`

    Synopsis:

        Subcommand: ops web

        Commands to upload and manage static content.

        Usage:
          web upload <folder> [--quiet] [--clean]

        Commands:
          upload <folder>  Uploads a folder to the web bucket in OpenServerless.

        Options:
          --quiet   Do not print anything to stdout.
          --clean   Remove all files from the web bucket instead.
