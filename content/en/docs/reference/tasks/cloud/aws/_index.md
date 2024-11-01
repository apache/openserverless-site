---
title: Aws
description: Create and Manage an Amazon Virtual Machines and Dns Zones
---

## Synopsis

```text
Usage:
  aws vm-list
  aws vm-create <name>
  aws vm-delete <name>
  aws vm-getip  <name>
  aws zone-create <zone>
  aws zone-delete <zone>
  aws zone-list  [<zone>]
  aws zone-update <zone> (--host=<host>|--wildcard) (--vm=<vm>|--ip=<ip>|--cname=<cname>)
```

## Commands

```
Commands:
  vm-list     lists the vm and their ips
  vm-create   create a vm
  vm-getip    get ip
  vm-delete   delete the vm
  zone-create create a zone - you will have to delegate the zone 
              from the parent zone assigning the nameservers
  zone-delete delete a zone
  zone-list   list zones
  zone-update update a zone with an ip, a cname or the ip of a vm
```
