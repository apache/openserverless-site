---
title: Services
description: Configure OpenServerless services
---
## Configuring OpenServerless services

After you satisfied the [prerequisites](#../../prereq/index.adoc) and
before you actually [install](#../../install/index.adoc) OpenServerless, you
have to select which services you want to install:

- [Static](#static), publishing of static assets

- [Redis](#redis), a storage service

- [MinIO](#minio) an object storage service

- [Postgres](#postgres) a relational SQL database

- [FerretDB](#ferretdb) A MongoDB-compatible adapter for Postgres

You can enable all the services with:

    ops config enable --all

or disable all of them with:

    ops config disable --all

Or select the services you want, as follows.

### Static Asset Publishing{#static}

The static service allows you to publish static asset.

> 💡 **NOTE**
>
> you need to setup a [a wildcard DNS name](/docs/installation/configure/dns/#register-dns) 
> to be able to access them from Internet.

You can enable the Static service with:

    ops config enable --static

and disable it with:

    ops config disable --static

### Redis{#redis}
[Redis](https://redis.io), is a fast, in-memory key-value store, usually
used as cache, but also in some cases as a (non-relational) database.

Enable REDIS:

    ops config enable --redis

Disable REDIS:

    ops config disable --redis

### MinIO{#minio}
[MinIO](https://min.io) is an object storage service

Enable minio:

    ops config enable --minio

Disable minio:

    ops config disable --minio

### Postgres{#postgres}
[Postgres](https://www.postgresql.org) is an SQL (relational) database.

Enable postgres:

    ops config enable --postgres

Disable postgres:

    ops config disable --postgres

### FerretDB{#ferret}
[FerretDB](https://www.ferretdb.io) is a MongoDB-compatible adapter for
Postgres. It created a document-oriented database service on top of
Postgres.

> 💡 **NOTE**
>
> Since FerretDB uses Postgres as its storage, if you enable it, also the
> service Postgresql will be enabled as it is required.

Enable MongoDB api with FerretDB:

    ops config enable --mongodb

Disable MongoDB api with FerretDB:

    ops config disable --mongodb
