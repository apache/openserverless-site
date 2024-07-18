---
title: Configure OpenServerless
weight: 30
---
## Configuring OpenServerless Installation

This section guides configuring the OpenServerless installation.

Note that you can also skip this configuration, and install
OpenServerless without any configuration.

Once you configure the installation, you can proceed to 
[Install OpenServerless](/docs/installation/install/).

You can then reconfigure the system later.

### Minimal Configuration

Without any configuration, you get a minimal OpenServerless:

- only the serverless engine, no extra services

- accessible is only in `http`

You can:

- [configure a DNS name or wildcard](/docs/installation/configure/dns/) for your server
    or cluster, thus enabling SSL and static publishing.

- [enable some or all](/docs/installation/configure/services/) of the integrated
    services:

  - [Static](/docs/installation/configure/services/#static), publishing of static
        content

  - [REDIS](/docs/installation/configure/services/#redis), a powerful key-value store

  - [MinIO](/docs/installation/configure/services/#minio), an object storage

  - [Postgres](/docs/installation/configure/services/#postgres), a powerful SQL
        database

  - [FerretDB](/docs/installation/configure/services/#ferretdb) a NO-SQL, MongoDB
        compatible adapter for Postgres
