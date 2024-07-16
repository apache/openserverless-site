---
title: Configure OpenServerless
weight: 30
---
# Configuring OpenServerless Installation

This section guides configuring the OpenServerless installation.

Note that you can also skip this configuration, and install
OpenServerless without any configuration.

Once you configure the installation, you can proceed to [Install
OpenServerless](#install/index.adoc).

You can then reconfigure the system later.

# Minimal Configuration

Without any configuration, you get a minimal OpenServerless:

- only the serverless engine, no extra services

- accessible is only in `http`

You can:

- [configure a DNS name or wildcard](#dns/index.adoc) for your server
    or cluster, thus enabling SSL and static publishing.

- [enable some or all](#services/index.adoc) of the integrated
    services:

  - [Static](#services/index.adoc#static), publishing of static
        content

  - [REDIS](#services/index.adoc#redis), a powerful key-value store

  - [MinIO](#services/index.adoc#minio), an object storage

  - [Postgres](#services/index.adoc#postgres), a powerful SQL
        database

  - [FerretDB](#services/index.adoc#ferretdb) a NO-SQL, MongoDB
        compatible adapter for Postgres
