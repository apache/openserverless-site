---
title: Server on Azure
description: Prerequisites to install OpenServerless in Azure
weight: 20
---

## Provision a Linux server in Azure Cloud Platform

You can provision a server suitable to install OpenServerless in cloud
provider [Azure](https://azure.microsoft.com/)
[ops](#download.adoc) as follows:

1. install `az`, the [Azure CLI](#install-cli)

2. get [Access and Secret Key](#connect-subscription)

3. [configure Azure](#configure)

4. [provision a server](#provision)

5. retrieve the [ip address](#retrieve-ip) to configure a DNS name

Once you have a Linux server up and running you can proceed
[configuring](/docs/installation/configure/) and
[installing OpenServerless](/docs/installation/install/cluster/).

### Installing the Azure CLI{#install-cli}

Our cli `ops` uses under the hood the [az](https://learn.microsoft.com/en-us/cli/azure),
command so you need to dowload and install it [following those
instructions](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli).

Once installed, ensure it is available on the terminal executing the
following command:

    az version

you should receive something like this:

    {
        "azure-cli": "2.64.0",
        "azure-cli-core": "2.64.0",
        "azure-cli-telemetry": "1.1.0",
        "extensions": {
            "ssh": "2.0.5"
        }
    }

Ensure the version is at least 2.64.0

### Connect a subscription{#connect-subscription}

Next step is to connect `az` to a valid Azure subscription. Azure
supports [several authentication methods](https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli): check
which one you prefer.

The easiest is the one described in [Sign in interactively](https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli-interactively):

   az login

This will open a browser and you will asked to login to you azure account. Once logged in, the `az` command will be
automatically connected to the choosen subscription.

To check if the `az` command is properly connected to your subscription, check the output of this command:

```
   $ az account list --query "[].{subscriptionId: id, name: name, user: user.name}" --output table

   SubscriptionId                        Name                         User
   ------------------------------------  ---------------------------  -------------------------
   xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx  Microsoft Azure Sponsorship  openserverless@apache.org
```

### Configuring Azure to provision a server{#configure}

Before you can provision a Linux server you have to configure Openserverless for Azure typing
the command:

    ops config azcloud

The system will then ask the following questions:

```
   *** Please, specify Azure Project Id and press enter.
   Azure Project Id: openserverless-k3s
   *** Please, specify Azure Zone and press enter.
   To get a list of valid values use:
      az account list-locations -o table
   
   Just press enter for default [eastus]:
   Azure Zone:

   *** Please, specify Azure virtual machine type and press enter.
   To get a list of valid values, use:
     az vm list-sizes --location <location> -o table
   where <location> is your current location.
   
   Just press enter for default [Standard_B4ms]:
   Azure virtual machine type:
   
   *** Please, specify Azure vm disk size in gigabyte and press enter.
   Just press enter for default [50]:
   Azure vm disk size in gigabyte:
   
   *** Please, specify Azure Cloud public SSH key and press enter.
   If you already have a public SSH key provide its path here. If you do not have it, generate a key pair with the following command:
     ssh-keygen
   The public key defaults to ~/.ssh/id_rsa.pub.
   
   Just press enter for default [~/.ssh/id_rsa.pub]:
   Azure Cloud public SSH key:
   
   *** Please, specify Azure Cloud VM image and press enter.
   Just press enter for default [Ubuntu2204]:
   Azure Cloud VM image:
```

### Provision a server{#provision}

You can provision one or more servers using `ops`. The servers will use
the parameters you have just configured.

You can create a new server with:

```bash
    ops cloud azcloud vm-create <server-name>
```

{{< blockquote important >}}
Replace `<server-name>` with a name you choose, for example
`ops-server`
{{< /blockquote >}}

The command will create a new server in Azure Cloud with the parameters
you specified in configuration.

You can also:

1. list servers you created with `ops cloud azcloud vm-list`

2. delete a server you created and you do not need anymore with
   `ops cloud azcloud vm-delete <server-name>`

### Retrieve IP{#retrieve-ip}

The server will be provisioned with an IP address assigned by Azure
Cloud.

You can read the IP address of your server with

    ops cloud azcloud vm-getip <server-name>

You need this IP when [configuring a DNS name](/docs/installation/configure/dns/) for
the server.

