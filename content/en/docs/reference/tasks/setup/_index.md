---
title: setup
---

  ops ent setup 

```
  setup devcluster [--uninstall|--status] 
  setup cluster [<context>] [--uninstall|--status]
  setup server <server> [<user>] [--uninstall|--status]
  setup status
  setup uninstall
  setup prereq
```

```
  setup cluster       deploy Apache OpenServerless in the Kubernetes cluster using the <context>, default the current
  setup devcluster    deploy Apache OpenServerless in a devcluster created locally
                      you need Docker Desktop available with at least 6G of memory assigned
  setup server        create a Kubernetes in server <server> and deploy Apache OpenServerless
                      the server must be accessible with ssh using the <user> with sudo power, default root
  setup status        show the status of the last installation
  setup uninstall     uninstall the last installation
  setup prereq        validate current configuration
```

```
  --uninstall         execute an uninstall instead of an installation 
  --status            show the status instead of an installation 
```

```
  kubernetes          kubernetes subcommands
```