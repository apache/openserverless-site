---
title: Redis
description: OpenServerless Redis Development Utilities.
---

## Synopsis

```text
Usage:
    redis prefix
    redis command <command>
```

## Commands

```
    prefix   print the redis prefix to use when submitting REDIS command to persist/retrieves value from user REDIS reserved partition
    command  execute a redis command (@see https://redis.io/commands/), eg 'SET prefix:key value' or 'GET prefix:key value'. Key names should always start with the user assigned prefix (@see ops devel redis prefix)
```
