---
title: "Apache OpenServerless is the easiest way to build your cloud native AI application"
date: 2025-05-15
description: >
  Meet this portable, self-contained and complete cloud-native serverless platform built on Kubernetes.
---

If you have never heard of it, you may wonder: what is Apache OpenServerless?
The short answer is: a portable, self-contained and complete cloud-native serverless platform, built on top of Kubernetes and especially suitable to develop production-ready AI applications with minimal effort. Because of its portability and availability in every environment, including air-gapped ones, it shines when you have strong privacy and security constraints and need to build Private AI applications.

OpenServerless embraces the functional programming paradigm, enabling developers to build modular, stateless functions ideal for scalable AI workloads: this model aligns naturally with serverless architecture and simplifies the integration of both public and private LLMs - developers can invoke proprietary APIs like OpenAI or deploy and run private models locally, ensuring full control over sensitive data. A key strength is its ability to run GPU-accelerated runtimes, allowing execution of code directly on GPUs for high-performance inference or training tasks.

## The origins of Apache OpenServerless

The project [Apache OpenServerless](https://openserverless.apache.org/) is closely related to another serverless project: [Apache OpenWhisk](https://openwhisk.apache.org/). OpenWhisk is a portable serverless engine originally developed and open sourced by IBM, and later adopted and further developed by vendors of the calibre of Adobe, Naver, and Digital Ocean.

OpenWhisk is an excellent foundation to provide FaaS services and indeed it is adopted by many cloud providers as their serverless engine. It is also widely used in academia for research on serverless. It is highly scalable and extremely robust and reliable. However, OpenWhisk is not yet widely used because in itself is not a full platform: it is only a FaaS service and, while it is used by cloud providers, their users have little interest in making it available for wider use.

A team of contributors to OpenWhisk, working initially with the startup Nimbella (acquired by Digital Ocean), and later Nuvolaris, developed it further to make it widely accessible and more useful out-of-the-box, adding all the required components with the goal of making it a complete serverless environment. Indeed in general serverless is useful when it is coupled with storage, cache, database and frontend. Given the popularity of LLM based application development it has been also extended to fully support the development of AI applications.

The project was then donated to the [Apache Software Foundation](https://apache.org/) and released as Apache OpenServerless. Note in this text we sometimes omit Apache in the name, but always keep in mind that the full names of the projects are respectively Apache OpenWhisk and Apache OpenServerles, as they are both projects copyrighted by the Apache Software Foundation.

## What is in Apache OpenServerless?

To clarify the difference between OpenWhisk and OpenServerless you can think in this way: if OpenWhisk were Linux, then OpenServerless would be Ubuntu. In short, it is a distribution of OpenWhisk providing a Kubernetes operator to install and manage it, a rich CLI with integrated installation and development tools and a collection of starters to build AI applications.

You can see what is in openserverless in the picture below:

<img src="/openserverless-diagram.webp" alt="Apache OpenServerless Architecture" class="mb-2 img-fluid">

As you can note at the core there is OpenWhisk, providing the scalable FaaS service, composed of a set of controllers accepting requests and queuing them in [Kafka](https://kafka.apache.org/), and a set of invokers serving the requests on demand, instantiating runtimes. OpenServerless also adds a [Kubernetes](https://kubernetes.io/) Operator that manages all the systems. The main purpose of the operator is to deploy OpenWhisk, but also the integrated services. At the moment there is Redis (in the open [ValKey](https://valkey.io/) flavour), [Postgresql](https://www.postgresql.org/) (SQL database) and the MongoDB compatible adapter [FerretDB](https://ferretdb.io/) (NoSQL), the Vector Database [Milvus](https://milvus.io/) and an S3 object storage services. We currently support both [Minio](https://min.io/) and [Ceph](https://ceph.io/) as backends.

Also we have a special service, called streamer, designed to support SSE (server side events) commonly used with AI applications to stream answers from LLM.

The operator is actually pretty powerful as it is configurable, and allows for the creation and management of resources as it is able to create databases, buckets and redis prefixes in the environment it manages, and manage the secrets to access them.

OpenWhisk has a large set of runtimes but instead of supporting all of them, we focused and optimized the more used languages, typically Python, Javascript and PHP, and provided a rich set of libraries in order to use the integrated services.

The operator is controlled by a rich CLI, called ops. The name is a pun, a short of OPenServerless, but also Operation… and also what you say (“OoooPS!”) when you make a mistake. The CLI completes the picture as it is extremely powerful and even expandable with plugins. It manages the serverless resources as in OpenWhisk, but also includes the ability to install OpenServerless in multiple cloud providers and integrates powerful development tools. We will discuss it more in detail later.

## Installation and configuration

Let’s start from the installation: you install OpenWhisk with a helm chart on a set of well known Kubernetes clusters, like Amazon EKS, IBM IKS or OpenShift v4. You need a Kubernetes cluster, that should also be configured properly. Also the installer only installs the engine and no other services.

OpenServerless CLI is more complete. It installs OpenWhisk by deploying the operator in a Kubernetes cluster and sending a configuration. But it is also able to create a suitable cluster.

Indeed the documentation explains how to prepare a Kubernetes cluster on Amazon AWS, Microsoft Azure and Google GCP using the cli called ops: there is an interactive configuration, then ops builds a suitable cluster with all the parameters in place to install OpenServerless in it.

When installing OpenServerless, you can also select which services you want to enable, and many configuration parameters that are essential. All of this just using the ops CLI to set the configuration parameters before performing the installation.

After the installation, the CLI is useful to administer the cluster, adding new users, etc. Note that each user has a complete set of services included, so you do not only create an area (called namespace) for serverless functions but also a SQL database (and a No-SQL adapter), a Vector Database, a bucket for web content (public) and another for private data, a Redis prefix (to isolate your keys in Redis).

Note that the system supports a public area for web content using a dns configuration. You need a DNS domain for an OpenServerless installation, and you usually need to point the root of the domain (@) and a wildcard (*) to a load balancer accessing it. Each user will have a different web area to upload their web content, and a mapping to their serverless functions ('/api/my') suitable for deploying SPA applications with serverless backend support.

## Development tools

So far so good, but work would not be complete without suitable development tools. You can deploy each function easily but it is a bit painful to have to deploy each function separately. Furthermore, you have to provide each function with options to change the runtime type, the memory constraints, timeouts etc. OpenWhisk supports a manifest format to do that, but does not offer other facilities for deployment.

It is still possible to use the manifest, but we also added a configuration system based on conventions: just put your code in directories and the system will automatically build and deploy.

Also, in this case, the super powers of cli ops come to our rescue! The ops development tools allow us to incrementally publish all the functions we have written, to manage their dependencies, annotations during publication; as well as publish the web part of our application. Furthermore it is possible to integrate the build scripts of our Angular, React, or Svelte application so as to be invoked during the publication process. Other useful tools allow us to handle and interact with the integrated services (Postgresql, Minio, Redis).

## Conclusions and a new beginning

All of this looks interesting, but it is actually just the starting point for building AI applications, as this is our main focus. OpenServerless lays the groundwork by providing a flexible, event-driven foundation, but its real power emerges when applied to AI-centric workflows.

Our primary goal is to enable developers and data scientists to move beyond basic automation and toward complex AI systems that integrate reasoning, natural language understanding, and data processing. OpenServerless becomes a powerful platform for rapid experimentation, secure deployment, and scalable AI services. From RAG pipelines to autonomous agents, this environment is designed to evolve with the needs of modern AI, turning abstract ideas into production-ready solutions without the usual overhead of managing infrastructure or sacrificing control. 

## Authors

{{< authors/michele >}}
{{< authors/bruno >}}