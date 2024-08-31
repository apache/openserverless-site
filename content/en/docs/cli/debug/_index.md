---
title: Debugging
description: Utilities to troubleshoot OpenServerless' cluster
---
The `ops debug` subcomand gives access to many useful debugging
utilities as follow:

You need access to the Kubernetes cluster where OpenServerless is
installed.

    ops debug: available subcommands:
    * apihost:                show current apihost
    * certs:                  show certificates
    * config:                 show deployed configuration
    * images:                 show current images
    * ingress:                show ingresses
    * kube:                   kubernetes support subcommand prefix
    * lb:                     show ingress load balancer
    * log:                    show logs
    * route:                  show openshift route
    * runtimes:               show runtimes
    * status:                 show deployment status
    * watch:                  watch nodes and pod deployment
    * operator:version:       show operator versions

The `ops debug kube` subcommand also gives detailed informations about
the underlying Kubernetes cluster:

    ops debug kube: available subcommands:
    * ctl:            execute a kubectl command, specify with CMD=<command>
    * detect:         detect the kind of kubernetes we are using
    * exec:           exec bash in pod P=...
    * info:           show info
    * nodes:          show nodes
    * ns:             show namespaces
    * operator:       describe operator
    * pod:            show pods and related
    * svc:            show services, routes and ingresses
    * users:          show openserverless users custom resources
    * wait:           wait for a value matching the given jsonpath on the specific resources under the namespace openserverless
