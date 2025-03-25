---
title: Ferretdb
description: OpenServerless Ferret Db Development Utilities.
---

## Synopsis

```text
Usage:
    ferretdb find <collection> [--format=table|json]
    ferretdb submit <collection> <jsonfile>
    ferretdb delete <collection>
    ferretdb command [<jsonfile>] [--format=table|json]
```

## Commands

```
    ferretdb find         search all elements in FerretDb/MongoDb collection
    ferretdb submit       submit <file> to a FerretDb/MongoDb  collection
    ferretdb delete       empty the FerretDb/MongoDb collection
    ferretdb command      send a raw command from json file passed on stdin. See https://www.mongodb.com/docs/manual/reference/method/db.runCommand/#mongodb-method-db.runCommand
```

## Options

```
--format         Output data as table or json. default is json
```
