---
title: Services
---
# Configuring Nuvolaris services

After you satisfied the [prerequisites](#../../prereq/index.adoc) and
before you actually [install](#../../install/index.adoc) Nuvolaris, you
have to select which services you want to install:

- [Static](#static), publishing of static assets

- [???](#redis), a storage service

- [???](#minio) an object storage service

- [???](#postgres) a relational SQL database

- [???](#ferretdb) A MongoDB-compatible adapter for Postgres

You can enable all the services with:

    nuv config enable --all

or disable all of them with:

    nuv config disable --all

Or select the services you want, as follows.

The static service allows you to publish static asset.

you need to setup a [a wildcard DNS
name](#../dns/index.adoc#register-dns) to be able to access them from
Internet.

You can enable the Static service with:

    nuv config enable --static

and disable it with:

    nuv config disable --static

[Redis](https://redis.io), is a fast, in-memory key-value store, usually
used as cache, but also in some cases as a (non-relational) database.

Enable REDIS:

    nuv config enable --redis

Disable REDIS:

    nuv config disable --redis

[MinIO](https://min.io) is an object storage service

Enable minio:

    nuv config enable --minio

Disable minio:

    nuv config disable --minio

[Postgres](https://www.postgresql.org) is an SQL (relational) database.

Enable postgres:

    nuv config enable --postgres

Disable postgres:

    nuv config disable --postgres

[FerretDB](https://www.ferretdb.io) is a MongoDB-compatible adapter for
Postgres. It created a document-oriented database service on top of
Postgres.

Since FerretDB uses Postgres as its storage, if you enable it, also the
service Postgresql will be enabled as it is required.

Enable MongoDB api with FerretDB:

    nuv config enable --mongodb

Disable MongoDB api with FerretDB:

    nuv config disable --mongodb
