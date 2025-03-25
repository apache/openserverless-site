---
title: Psql
description: OpenServerless PostrgreSQL Utilities.
---

## Synopsis

```text
Usage:
    psql describe <table> [--format=json|table]
    psql sql [<file>] [--format=json|table]
```

## Commands

```
    describe  perfoms a query to describe the given table if it exists in the user PostgresSQL database
    sql       submits a SQL snippet (like SELECT *, CREATE TABLE etc) from stdin or as a file and print-out the corresponding results
```

## Options

```
--format         Output data as table or as json. default is json
```
