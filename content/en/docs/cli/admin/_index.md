---
title: Admin
weight: 20
---
# Administration

If you are the administrator and you have access to the Kubernetes
cluster where [OpenServerless is
installed](#../../installation/index.adoc) you can administer the
system.

You have access to the `ops admin` subcommand with the following
synopsis:

    Subcommand: ops admin

    Usage:
      admin adduser <username> <email> <password> [--all] [--redis] [--mongodb] [--minio] [--postgres] [--storagequota=<quota>|auto]
      admin deleteuser <username>

    Commands:
      admin adduser       create a new user in OpenServerless with the username, email and password provided
      admin deleteuser    delete a user from the OpenServerless installation via the username provided

    Options:
      --all                   enable all services
      --redis                 enable redis
      --mongodb               enable mongodb
      --minio                 enable minio
      --postgres              enable postgres
      --storagequota=<quota>
