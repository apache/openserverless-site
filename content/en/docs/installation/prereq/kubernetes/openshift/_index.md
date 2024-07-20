---
title: OpensShift
description: Prerequisites for RedHat™ OpenShift
---
[RedHat™ OpenShift](https://www.redhat.com/en/technologies/cloud-computing/openshift)
is a Kubernetes distribution offered by
[RedHat™](https://www.redhat.com), a division of IBM™.

OpenShift is available in a variety of cloud environment and provider,
[using its own installer](https://github.com/openshift/installer)

You can [install OpenServerless in OpenShift](/docs/installation/install/cluster/), provided you
have already installed OpenShift.

The procedure is the following:

1. Install OpenShift in any supported environment
   [following this guide](https://docs.openshift.com/container-platform/4.13/installing/index.html)

2. At the end of the installation, the installer will leave a
    `kubeconfig` file in a folder. You need to import it with the
    command.

```
ops cloud osh import <kubeconfig>
```

> 💡 **NOTE**
>
> in the command above, `<kubeconfig>` is the path to the generated `kubeconfig`.

---

3. Now, setup the required components (currently, `acme-openshift`) with:

```
ops cloud config setup
```

Once you have OpenShift up and running and you imported its kubeconfig
you can proceed [configuring](/docs/installation/configure/) and [installing
OpenServerless](/docs/installation/install/cluster/).
