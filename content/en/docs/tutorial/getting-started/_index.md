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

Finally, we'll see how to activate external services using [Web hooks](https://en.wikipedia.org/wiki/Webhook).

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
storage, let’s run in the terminal:

```bash
ops config enable --postgres --static --minio --cron
```

This is the default set of services.

Since you should already have a deployment running, we have to update it
with the new services so they get deployed. Simply run:

```bash
ops update apply
```

And with just that (when it finishes), we have everything we need ready
to use!

{{< blockquote info>}}
If you've installed the local development environment using the instructions from
the [Docker installation page](/docs/installation/install/docker/) you've already
the base services enabled by default.
{{< /blockquote >}}

You can check what services are enabled with the command:

```bash
ops config status
```

This should be the output:

```
OPERATOR_COMPONENT_MINIO=true
OPERATOR_COMPONENT_MONGODB=true
OPERATOR_COMPONENT_POSTGRES=true
OPERATOR_COMPONENT_STATIC=true
OPERATOR_COMPONENT_CRON=true
OPERATOR_COMPONENT_REDIS=true
```

### Create a user 

If you don't have a user, it's the time to create one. We we'll use it to work on this tutorial.

{{< blockquote warning>}}
To create a user, we need to be the administrator, like described in [this section](/docs/cli/admin/).
{{< /blockquote >}}

```bash
ops admin adduser opstutorial <youremail> SimplePassword --all 
```

The output will be:

```
Generated OPSTUTORIAL user secrets.
Creating user opstutorial...
whiskuser.nuvolaris.org/opstutorial created
```

### Login as user

After user creation, it's time to perform ops login.

{{< blockquote info>}}
The `ops ide login` command will log you in on the server and dump the proper configuration of
active services for your user. The configuration is automatically used by `ops` for all the tasks.
You only need to run `ops ide login` once (unless you need to log in to another OpenServerless server or with another
OpenServerless user).
{{< /blockquote >}}

Change your APIHOST accordly, if you've specified a custom one during the system setup

```bash
ops ide login opstutorial http://localhost:80
```

```
*** Configuring Access to OpenServerless ***
apihost=http://localhost:80 username=opstutorial
Logging in http://localhost:80 as opstutorial
Enter Password: 
Successfully logged in as opstutorial.
ok: whisk auth set. Run 'wsk property get --auth' to see the new value.
ok: whisk API host set to http://localhost:80
OpenServerless host and auth set successfully. You are now ready to use ops!
```

### Cleaning Up

Once you are done and want to clean the services configuration, just
run:

```bash
ops config disable --postgres --static --minio --cron
```

---
