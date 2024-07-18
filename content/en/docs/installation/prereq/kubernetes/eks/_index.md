---
title: Amazon EKS
description: Prerequisites for Amazon EKS
---
## Prerequisites to install OpenServerless in an Amazon EKS Cluster

[Amazon EKS](https://aws.amazon.com/eks/) is a pre-built Kubernetes
cluster offered by the cloud provider [Amazon Web
Services](https://aws.amazon.com/).

You can create an EKS Cluster in Amazon AWS for installing using
OpenServerless using [ops](/docs/installation/download/) as follows:

1. install `aws`, the [AWS CLI](#install-cli)

2. get [Access and Secret Key](#get-credentials)

3. [configure EKS](#configure)

4. [provision EKS](#provision)

5. optionally, retrieve the [load balancer address](#retrieve-lb) to
    configure a DNS name

Once you have EKS up and running you can proceed
[configuring](#configure.adoc) and [installing
OpenServerless](#install-cluster.adoc).

### Installing the AWS CLI{#install-cli}

Our cli `ops` uses under the hood the [AWS CLI version
2](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html),
so you need to dowload and install it [following those
instructions](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

Once installed, ensure it is available on the terminal executing the
following command:

    aws --version

you should receive something like this:

    aws-cli/2.9.4 Python/3.9.11 Linux/5.19.0-1025-aws exe/x86_64.ubuntu.22 prompt/off

Ensure the version is at least 2.

### Getting the Access and Secret key{#get-credentials}

Next step is to retrieve credentials, in the form of an access key and a
secret key.

So you need to: \* access the AWS console [following those
instructions](https://repost.aws/knowledge-center/create-access-key)
create an access key and secret key, \* give to the credentials the
minimum required permissions [as described
here](https://eksctl.io/usage/minimum-iam-policies/) to build an EKS
cluster.

You will end up with a couple of string as follows:

    Sample AWS Access Key ID: AKIAIOSFODNN7EXAMPLE Sample AWS Secret Access
    Key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

Take note of them as you need them for configuring out CLI.

### Configuring Amazon EKS{#configure}

Once you have the access and secret key you can configure EKS with the
command `ops config eks` answering to all the questions, as in the
following example:

    $ ops config eks
    *** Please, specify AWS Access Id and press enter.
    AKIAIOSFODNN7EXAMPLE
    *** Please, specify AWS Secret Key and press enter.
    wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
    *** Please, specify AWS Region to use and press enter.
    To get a list of valid values use:
      aws ec2 describe-regions --output table

    Just press enter for default [us-east-2]:

    *** Please, specify AWS public SSH key  and press enter.
    If you already have a public SSH key in AWS, provide its name here.
    If you do not have it, generate a key pair with the following command:
      ssh-keygen
    The public key defaults to ~/.ssh/id_rsa.pub and you can import with:
      aws ec2 import-key-pair --key-name nuvolaris-key --public-key-material --region=<your-region> fileb://~/.ssh/id_rsa.pub

    Just press enter for default [nuvolaris-key]:

    *** Please, specify EKS Name for Cluster and Node Group and press enter.
    Just press enter for default [nuvolaris]:

    *** Please, specify EKS region and press enter.
    To get a list of valid values use:
      aws ec2 describe-regions --output table

    Just press enter for default [us-east-1]:

    *** Please, specify EKS number of worker nodes and press enter.
    Just press enter for default [3]:

    *** Please, specify EKS virtual machine type and press enter.
    To get a list of valid values, use:
      aws ec2 describe-instance-types --query 'InstanceTypes[].InstanceType' --output table

    Just press enter for default [m5.xlarge]:

    *** Please, specify EKS disk size in gigabyte and press enter.
    Just press enter for default [50]:

    *** Please, specify EKS Kubernetes Version and press enter.
    Just press enter for default [1.25]:

### Provisioning Amazon EKS{#provision}

Once you have configured it, you can create the EKS cluster with the
command:

    ops cloud eks create

It will take around 20 minutes to be ready. Please be patient.

At the end of the process, you will have access directly to the created
Kubernetes cluster for installation.

### Retrieving the Load Balancer DNS name{#retrieve-lb}

Once the cluster is up and running, you need to retrieve the DNS name of
the load balancer.

You can read this with the command:

    ops cloud eks lb

Take note of the result as it is required for 
[configuring a dns name](/docs/installation/configure/dns/) for your cluster.

### Additional Commands

You can delete the created cluster with: `ops cloud eks delete`

You can extract again the cluster configuration, if you lose it,
reconfiguring the cluster and then using the command
`ops cloud eks kubeconfig`.
