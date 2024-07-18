---
title: Generic Kubernetes
description: Prerequisites for all Kubernetes
---
## Kubernetes Cluster requirements

OpenServerless installs in any Kubernetes cluster which satisfies the
following requirements:

- `cluster-admin` access

- at least 3 worker nodes with 4GB of memory each

- support for block storage configured as default storage class

- support for LoadBalancer services

- the [nginx ingress](https://github.com/kubernetes/ingress-nginx)
    already installed

- the [cert manager](https://cert-manager.io/) already installed

Once you have such a cluster, you need to retrieve the IP address of the
Load Balancer associated with the Nginx Ingress. In the default
installation, it is installed in the namespace `nginx-ingress` and it is
called `ingress-nginx-controller`.

In the default installation you can read the IP address with the
following command:

    kubectl -n ingress-nginx get svc ingress-nginx-controller

If you have installed it in some other namespace or with another name,
change the command accordingly.

The result should be something like this:

    NAME                       TYPE           CLUSTER-IP   EXTERNAL-IP    PORT(S)                      AGE
    ingress-nginx-controller   LoadBalancer   10.0.9.99    20.62.156.19   80:30898/TCP,443:31451/TCP   4d1h

Take note of the value under **EXTERNAL-IP** as you need it in the next
step of installation, [configuring DNS](/docs/installation/configure/dns/).
