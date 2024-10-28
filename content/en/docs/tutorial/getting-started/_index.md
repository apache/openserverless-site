---
title: Getting started
description: Let's start building a sample application
weight: 10
draft: false
---

## Getting started

### Build a sample Application

Imagine we have a static website and need server logic to store contacts
and validate data. This would require a server, a database and some code
to glue it all together. With a serverless approach, we can just
sprinkle little functions (that we call actions) on top of our static
website and let OpenServerless take care of the rest. No more setting up
VMs, backend web servers, databases, etc.

In this tutorial, we will see how you can take advantage of several
services which are already part of a OpenServerless deployment and
develop a contact form page for users to fill it with their emails and
messages, which are then sent via email to us and stored in a database.

### Openserverless CLI: Ops

Serverless development is mostly performed on the CLI, and
OpenServerless has its tool called `ops`. It’s a command line tool that
allows you to deploy (and interact with) the platform seamlessly to the
cloud, locally and in custom environments.

Ops is cross-platform and can be installed on Windows, Linux and MacOS.
You can find the project and the sources on
[Apache OpenServerless Cli Github page](https://github.com/apache/openserverless-cli)

### Deploy OpenServerless

To start using OpenServerless you can refer to the [Installation
Guide](/docs/installation/). You can follow the local
installation to quickly get started with OpenServerless deployed on your
machine, or if you want to follow the tutorial on a deployment on cloud
you can pick one of the many supported cloud provider. Once installed
come back here!

### Enabling Services

After installing OpenServerless on a local machine with Docker or on a 
supported cloud, you can enable or disable the services offered by the platform. 
As we will use Postgres database, the Static content with the Minio S3 compatible 
storage and a cron scheduler, let’s run in the terminal:

```bash
ops config enable --postgres --static --minio --cron
```

Since you should already have a deployment running, we have to update it
with the new services so they get deployed. Simply run:

```bash
ops update apply
```

And with just that (when it finishes), we have everything we need ready
to use!

### Cleaning Up

Once you are done and want to clean the services configuration, just
run:

```bash
ops config disable --postgres --static --minio --cron
```

---
