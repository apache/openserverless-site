---
title: Admin
description: Administer OpenServerless users.
---

## Synopsis

In OpenServerless, users are namespaces.
You can create namespaces and choose which services to enable.

```text
Usage:
  admin adduser <username> <email> <password> [--all] [--redis] [--mongodb] [--minio] [--postgres] [--milvus] [--storagequota=<quota>|auto]
  admin deleteuser <username>
  admin listuser [<username>]
  admin compact [--ttl=<ttl>|10]
  admin usage [--debug]
```

## Commands
```
  admin adduser       create a new user in OpenServerless with the username, email and password provided
  admin deleteuser    delete a user from the OpenServerless installation via the username provided
  admin listuser      list all the secrets of an user (default list all the users)
  admin compact       create a one shot job which executes couchdb compact against all available dbs
  admin usage         calculates and displays PVC disk usage statistics for bound volumes. Shows Total, Size and Available storage per PVC
```

## Options
```
  --all                   enable all services
  --redis                 enable redis
  --mongodb               enable mongodb
  --minio                 enable minio
  --postgres              enable postgres
  --milvus                enable milvus vector db
  --storagequota=<quota>
  --ttl=<seconds>         modify the job ttl after finished (defaults to 10 seconds)
  --debug         enable debug logging
```
