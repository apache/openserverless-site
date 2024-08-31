---
title: Server on GCP
description: Prerequisites to install OpenServerless in Google Cloud
weight: 30
---

## Provision a Linux Server in Google Cloud

You can provision a server suitable to install OpenServerless in cloud
provider [Google Cloud Platform (GCP)](https://cloud.google.com/gcp) as
follows:

1. install the [GCloud CLI](#install-cli)

2. Enable [Gcloud services](#enable-services)

3. [configure GKE](#configure)

4. [provision a server](#provision)

5. retrieve the [IP address](#retrieve-ip) to configure a DNS name

Once you have Linux server up and running you can proceed
[configuring](/docs/installation/configure) and
[installing OpenServerless](/docs/installation/install/cluster/).

### Installing the GCloud CLI{#install-cli}

Our cli `ops` uses under the hood the [GCloud CLI version
2](https://cloud.google.com/sdk/gcloud), so you need to dowload and
install it [following those
instructions](https://cloud.google.com/sdk/docs/install).

Once installed, ensure it is available on the terminal executing the
following command:

    gcloud version

you should receive something like this:

    Google Cloud SDK 443.0.0 beta 2023.08.11 bq 2.0.96
    bundled-python3-unix 3.9.16 core 2023.08.11 gcloud-crc32c 1.0.0
    gke-gcloud-auth-plugin 0.5.5 gsutil 5.25

### Enabling gcloud services{#enable-services}

You need to enable the following permissions for Google Cloud

    gcloud services enable cloudresourcemanager.googleapis.com
    gcloud services enable dns.googleapis.com
    gcloud services enable iamcredentials.googleapis.com
    gcloud services enable iam.googleapis.com
    gcloud services enable servicemanagement.googleapis.com
    gcloud services enable serviceusage.googleapis.com
    gcloud services enable storage-api.googleapis.com
    gcloud services enable storage-component.googleapis.com
    gcloud services enable deploymentmanager.googleapis.com
    gcloud services enable resourcemanager.projects.delete

### Configuring GKE to provision a server{#configure}

Before you can provision a Linux server you have to configure AWS typing
the command:

    ops config gcloud

The system will then ask the following questions:

    *** Please, specify GCloud Project Id and press enter.
    nuvolaris
    *** Please, specify GCloud Zone and press enter.
    To get a list of valid values use:
      gcloud compute zones list

    Just press enter for default [us-east1-d]:

    *** Please, specify GCloud virtual machine type and press enter.
    To get a list of valid values, use:
      gcloud compute machine-types list

    Just press enter for default [n2-standard-4]:

    *** Please, specify GCloud disk size in gigabyte and press enter.
    Just press enter for default [200]:

    *** Please, specify GCloud public SSH key and press enter.
    If you already have a public SSH key provide its path here. If you do not have it, generate a key pair with the following command:
      ssh-keygen
    The public key defaults to ~/.ssh/id_rsa.pub.

    Just press enter for default [/home/ubuntu/.ssh/id_rsa.pub]:

### Provision a server{#provision}

You can provision one or more servers using `ops`. The servers will use
the parameters you have just configured.

You can create a new server with:

    ops cloud gcloud vm-create <server-name>

> ❗ **IMPORTANT**
>
> Replace `<server-name>` with a name you choose, for example
    `ops-server`

The command will create a new server in Google Cloud with the parameters
you specified in configuration.

You can also:

1. list servers you created with `ops cloud gcloud vm-list`

2. delete a server you created and you do not need anymore with
    `ops cloud gcloud vm-delete <server-name>`

### Retrieve IP{#retrieve-ip}

The server will be provisioned with an IP address assigned by Google
Cloud.

You can read the IP address of your server with

    ops cloud gcloud vm-getip <server-name>

You need this IP when [configuring a DNS name](/docs/installation/configure/dns/) for
the server.
