---
title: Docker
description: Install OpenServerless on a local machine
weight: 10
---

## Local Docker installation

This page describes how to install OpenServerless on your local machine. The
services are limited and not accessible from the outside so it is an
installation useful only for <b>development purposes</b>.

### Prerequisites

Before installing, you need to:

- install [Docker](/docs/installation/prereq/docker/).

- install [ops](/docs/installation/download/).

- perform a minimal configuration. For more details about this,
  check [Configure the services](/docs/installation/configure/).

{{< blockquote info >}}
The static service works perfectly for the default namespace nuvolaris which is linking the http://localhost to the 
nuvolaris web bucket. With this setup adding new users will add an ingress with host set to 
namespace.localhost, that in theory could also work if the host file of the development machine is configured 
to resolve it to the 127.0.0.1 ip address.
{{< /blockquote >}}


{{< blockquote warning >}}
You cannot have ``https`` in a local installation.
If you enable it, the configuration will be ignored.
{{< /blockquote >}}

### Installation

Run the commands:

1. Minimal configuration

```bash
ops config minimal
```

Behind the scene, this command will write a cluster configuration file called `~/.ops/config.json` activating these 
services: `static`, `redis`, `postgres`, `ferretdb`, `minio`, `cron` constituting the common baseline for development 
tasks.

2. Setup the cluster

```bash
ops setup devcluster
```

and wait until the command terminates.

{{< details title="Click here to see a log sample of the setup">}}

```bash
ops setup devcluster
Creating cluster "nuvolaris" ...
 ✓ Ensuring node image (kindest/node:v1.25.3) 🖼
 ✓ Preparing nodes 📦 📦
 ✓ Writing configuration 📜
 ✓ Starting control-plane 🕹️
 ✓ Installing CNI 🔌
 ✓ Installing StorageClass 💾
 ✓ Joining worker nodes 🚜
 ✓ Waiting ≤ 1m0s for control-plane = Ready ⏳
 • Ready after 1s 💚
Set kubectl context to "kind-nuvolaris"
You can now use your cluster with:

kubectl cluster-info --context kind-nuvolaris --kubeconfig /Users/bruno/.ops/tmp/kubeconfig

Thanks for using kind!

[...continue]
```

> 💡 **NOTE**
>
> The log will continue because, after kind is up and running, OpenServerless namespace and relative services are
> installed inside.

It will take some minute to complete, so be patient.

{{< /details >}}

### Troubleshooting

Usually the setup completes without errors. 

However, if `ops` is unable to complete the setup, you may see this message at the end:

```text
ops: Failed to run task "create": exit status 1
task execution error: ops: Failed to run task "create": exit status 1
ops: Failed to run task "devcluster": exit status 1
task execution error: ops: Failed to run task "devcluster": exit status 1
```

If this is your case, try to perform a uninstall / reinstall:

```bash
ops setup cluster --uninstall
ops config reset
ops config minimal
ops setup devcluster
```

If this will not solve, please contact the community.

### Post install

[Check the tutorial](/docs/tutorial/) to learn how to use it.

### Uninstall

To uninstall you may:

#### Uninstall devcluster

This will actually remove the ops namespace and all the services from kind.
Useful to re-try an installation when something gone wrong.

```bash
ops setup cluster --uninstall
ops config reset
```

#### Remove devcluster

This will actually remove the nodes from kind:

```bash
ops setup devcluster --uninstall
```