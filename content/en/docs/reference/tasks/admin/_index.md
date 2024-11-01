---
title: Admin
description: Administer OpenServerless users.
---

## Synopsis

In OpenServerless, users are namespaces.
You can create namespaces and choose which services to enable.

```text
Usage:
  admin adduser <username> <email> <password> [--all] [--redis] [--mongodb] [--minio] [--postgres] [--storagequota=<quota>|auto]
  admin deleteuser <username>
```

## Commands
```
  admin adduser       create a new user in OpenServerless with the username, email and password provided
  admin deleteuser    delete a user from the OpenServerless installation via the username provided
```

## Options
```
  --all                   enable all services
  --redis                 enable redis
  --mongodb               enable mongodb
  --minio                 enable minio
  --postgres              enable postgres
  --storagequota=<quota>
```
