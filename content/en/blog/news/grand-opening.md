---
title: Apache OpenServerless started
date: 2024-07-09
description: >
   The project Apache OpenServerless is now active
---

The Apache OpenServerless project's goal is to build a serverless distribution that runs in all major flavors of Kubernetes in public and private clouds, and in any virtual machine running Linux in any cloud.  It is not just a serverless engine, but a complete set of integrated tools to easily build cloud-native applications, with a focus on building AI applications.

Specifically, we are building on top of Apache OpenWhisk, which includes Apache Kafka and Apache CouchDB as components, adding Apache APISix as an API gateway, and a set of custom runtimes.

We have a Kubernetes operator to manage all the components, and a rich CLI to support installation and development. 

We have a strong focus on development tools: the system includes support for developing full-stack applications in web-based IDEs using the DevContainer standard, with built-in full-stack hot reload (both backend and front-end). 

We will have a set of starters that support the development of AI applications based on LLM. Furthermore, since many AI applications are basically a coreography of functions, something well supported in the serverless world, we will have a workflow generator to easily develop applications.

The project is already running at the Apache Software Foundation and we are in the process of migrating the contributed code base.

Our home is https://github.com/apache/openserverless

Join us by subscribing to our mailing list sending an email to

```
dev-subscribe@openserverless.apache.org
```