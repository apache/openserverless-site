---
title: Google GKE
description: Prerequisites for Google GKE
---
## Prerequisites to install OpenServerless in a Google GKE Cluster

[Google GKE](https://cloud.google.com/kubernetes-engine) is a pre-built
Kubernetes cluster offered by the cloud provider [Google Cloud Platform
(GCP)](https://cloud.google.com/gcp).

You can create a GKE Cluster in GCP for installing using OpenServerless using
[ops](#download.adoc) as follows:

1. install the [GCloud CLI](#install-cli)

2. [configure GKE](#configure)

3. [provision GKE](#provision)

4. optionally, retrieve the [load balancer address](#retrieve-lb) to
    configure a DNS name

Once you have GKE up and running you can proceed
[configuring](#configure.adoc) and [installing
OpenServerless](#install-cluster.adoc).

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

### Configuring GKE{#configure}

Before starting, you need to create a project in Google Cloud. Then, to
install GKE you need to configure `ops` for GKE with the command
`ops config gke` answering to all the questions, as in the following
example:

    $ ops config gke
    *** Please, specify GCloud Project Id and press enter.
    nuvolaris
    *** Please, specify GCloud Cluster Name and press enter.
    The cluster name must be unique.

    Just press enter for default [nuvolaris]:

    *** Please, specify GCloud Cluster Zone and press enter.
    To get a list of valid values use:
      gcloud compute zones list

    Just press enter for default [us-east1]:

    *** Please, specify GCloud number of worker nodes and press enter.
    Just press enter for default [3]:

    *** Please, specify GKE virtual machine type and press enter.
    To get a list of valid values, use:
      gcloud compute machine-types list

    Just press enter for default [e2-standard-2]:

    *** Please, specify GKE disk size in gigabyte and press enter.
    Just press enter for default [50]:

### Provisioning Google GKE{#provision}

Once you have configured it, you can create the EKS cluster with the
command:

    ops cloud gke create

It will take around 10 minutes to be ready. Please be patient.

At the end of the process, you will have access directly to the created
Kubernetes cluster for installation.

### Retrieving the Load Balancer DNS name{#retrieve-lb}
Once the cluster is up and running, you need to retrieve the DNS name of
the load balancer.

You can read this with the command:

    ops cloud gke lb

Take note of the result as it is required for [configuring a dns
name](#configure-dns.adoc) for your cluster.

### Additional Commands

You can delete the created cluster with: `ops cloud gke delete`

You can extract again the cluster configuration, if you lose it,
reconfiguring the cluster and then using the command
`ops cloud gke kubeconfig`.
