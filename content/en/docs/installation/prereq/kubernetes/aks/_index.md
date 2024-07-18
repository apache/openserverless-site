---
title: Azure AKS
description: Prerequisites for Azure AKS
---
## Prerequisites to install OpenServerless in an Azure AKS Cluster

[Azure AKS](https://aws.amazon.com/eks/) is a pre-built Kubernetes
cluster offered by the cloud provider [Microsoft Azure](https://azure.microsoft.com/).

You can create an AKS Cluster in Microsoft Azure for installing using
OpenServerless using [ops](#download.adoc) as follows:

1. install `az`, the [Azure CLI](#install-cli)

2. [configure AKS](#configure)

3. [provision AKS](#provision)

4. optionally, retrieve the [load balancer address](#retrieve-lb) to
    configure a DNS name

Once you have AKS up and running you can proceed
[configuring](#configure.adoc) and [installing
OpenServerless](#install-cluster.adoc).

### Installing the Azure CLI{#install-cli}
Our CLI `ops` uses under the hood the [Azure
CLI](https://learn.microsoft.com/en-us/cli/azure/), so you need to
dowload and install it 
[following those instructions](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli).

Once installed, ensure it is available on the terminal executing the
following command:

    az version

you should receive something like this:

    {
      "azure-cli": "2.51.0",
      "azure-cli-core": "2.51.0",
      "azure-cli-telemetry": "1.1.0",
      "extensions": {}
    }

### Configuring Azure AKS{#configure}

Before provisioning your AKS cluster you need to configure AKS with the
command `ops config aks` answering to all the questions, as in the
following example:

    $ ops config aks
    *** Please, specify AKS Name for Cluster and Resource Group and press enter.
    Just press enter for default [nuvolaris]:

    *** Please, specify AKS number of worker nodes and press enter.
    Just press enter for default [3]:

    *** Please, specify AKS location and press enter.
    To get a list of valid values use:
      az account list-locations -o table

    Just press enter for default [eastus]:

    *** Please, specify AKS virtual machine type and press enter.
    To get a list of valid values use:
      az vm list-sizes --location <location> -o table
    where <location> is your current location.

    Just press enter for default [Standard_B4ms]:

    *** Please, specify AKS disk size in gigabyte and press enter.
    Just press enter for default [50]:

    *** Please, specify AKS public SSH key in AWS and press enter.
    If you already have a public SSH key provide its path here. If you do not have it, generate a key pair with the following command:
      ssh-keygen
    The public key defaults to ~/.ssh/id_rsa.pub.

    Just press enter for default [~/.ssh/id_rsa.pub]:

### Provisioning Azure AKS{#provision}

Once you have configured it, you can create the AKS cluster with the
command:

    ops cloud aks create

It will take around 10 minutes to be ready. Please be patient.

At the end of the process, you will have access directly to the created
Kubernetes cluster for installation.

### Retrieving the Load Balancer DNS name{#retrieve-lb}

Once the cluster is up and running, you need to retrieve the DNS name of
the load balancer.

You can read this with the command:

    ops cloud aks lb

Take note of the result as it is required for 
[configuring a dns name](/docs/installation/configure/dns/) for your cluster.

### Additional Commands

You can delete the created cluster with: `ops cloud aks delete`

You can extract again the cluster configuration, if you lose it,
reconfiguring the cluster and then using the command
`nuv cloud aks kubeconfig`.
