---
title: Minio
description: OpenServerless Minio/S3 Development Utilities.
---

## Synopsis

```text
Usage:
    minio ls [--format=table|json]
    minio lsb <bucket> [--format=table|raw|json]
    minio rm <bucket> <file>
    minio mv <bucket> <file> <dest_bucket> <dest_file>
    minio cp <bucket> <file> <dest_bucket> <dest_file>
    minio put <localfile> <bucket> <file>
    minio get <bucket> <file>
    minio clean <bucket> [<regexp>] [--dryrun]
```

## Commands

```
    ls       retrieve the list of all the user buckets
    lsb      retrieve the content of the specified bucket (recursively)
    rm       remove the given file from the specified bucket
    mv       move a file from a bucket to another
    cp       copy a file from a bucket to another
    put      upload a localfile into the bucket/file
    get      download a bucket file locally
    clean    removes matching files (default pattern is .*) from the specified bucket (recursively)
```

## Options

```
--format         Output data as table or as json. default is json
```
