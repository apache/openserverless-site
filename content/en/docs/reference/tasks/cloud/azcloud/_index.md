---
title: Azcloud
description: Manage Azure Virtual Machines and DNS Zones
---

## Synopsis

```text
Usage:
  azcloud vm-list
  azcloud vm-ip <name>
  azcloud vm-create <name>
  azcloud vm-delete <name>
  azcloud vm-getip  <name>
  azcloud zone-create <zone>
  azcloud zone-delete <zone>
  azcloud zone-list  [<zone>]
  azcloud zone-update <zone> (--host=<host>|--wildcard) (--vm=<vm>|--ip=<ip>|--cname=<cname>)
```

## Commands

```
  vm-ip       create public ip
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
