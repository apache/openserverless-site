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

Furthermore you will need a decent PC / Mac. 

Docker will need 4 Gb Ram and almost 40Gb of free space to run the cluster 
locally.

{{< blockquote info >}}
We introduced a special domain called `miniops.me`: this domain will always
resolve to 127.0.0.1.
This way the static service for the default namespace nuvolaris will be 
linking the `http://miniops.me` to the nuvolaris web bucket.  
Adding new users will add an ingress with host set to 
`http://<namespace>.miniops.me`.

{{< /blockquote >}}

{{< blockquote warning >}}
You cannot have ``https`` in a local installation.
If you enable it, the configuration will be ignored.
{{< /blockquote >}}

### Installation

The following command will perform a full local installation:

```bash
ops setup mini
```

Behind the scene, this command will write a cluster configuration file called 
`~/.ops/config.json` activating these services: `static`, `redis`, `postgres`, 
`ferretdb`, `minio`, `cron`, `milvus` constituting the common baseline for 
development tasks.

Wait until the command terminates. It will take minutes to complete, so be 
patient.

The installation will ends showing these informations:

```bash
*** Configuring Access to OpenServerless ***
apihost=http://miniops.me username=devel
Logging in http://miniops.me as devel
Successfully logged in as devel.
ok: whisk auth set. Run 'wsk property get --auth' to see the new value.
ok: whisk API host set to http://miniops.me
OpenServerless host and auth set successfully. You are now ready to use ops!
==================| UPLOAD RESULTS |==================
| FILES      : 4
| COMPLETED  : 4
| ERRORS     : 0
| SKIPPED    : 0
| EXEC. TIME : 46.70 ms
======================================================
Login with: ops ide login devel https://miniops.me
Password is saved in: /Users/openserverless/.ops/devel.password
Web URL is: http://devel.miniops.me
```

### Try your devel user

At the end of the setup, you'll have a local OpenServerless installation
with a `devel` user.

Open a browser to http://devel.miniops.me. You will see a page like this:

<img src="/welcome-mini.webp" width="700" alt="Welcome Mini" />

Take a minute to share on Linkedin your experience with the setup and to join
us on [Discord](https://discord.com/invite/PkD7CcHgGP).

### Troubleshooting

Usually the setup completes without errors. 

However, if `ops` is unable to complete the setup, you may see this message at 
the end:

```text
ops: Failed to run task "create": exit status 1
task execution error: ops: Failed to run task "create": exit status 1
ops: Failed to run task "devcluster": exit status 1
task execution error: ops: Failed to run task "devcluster": exit status 1
```

If this is your case, try to perform a uninstall / reinstall:

```bash
ops setup devcluster --uninstall
ops config reset
```

If this will not solve, please contact the community.

### Post install

[Check the tutorial](/docs/tutorial/) to learn how to use it.


### Uninstall and remove devcluster

This will actually remove the ops namespace and all the services from kind.
Useful to re-try an installation when something gone wrong.

```bash
ops setup devcluster --uninstall
ops config reset
```