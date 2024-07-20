---
title: Server on AWS
description: Prerequisites to install OpenServerless in AWS
weight: 20
---
## Provision a Linux server in Amazon Web Services

You can provision a server suitable to install OpenServerless in cloud
provider [Amazon Web Services](https://aws.amazon.com/)
[ops](#download.adoc) as follows:

1. install `aws`, the [AWS CLI](#install-cli)

2. get [Access and Secret Key](#get-credentials)

3. [configure AWS](#configure)

4. [provision a server](#provision)

5. retrieve the [ip address](#retrieve-ip) to configure a DNS name

Once you have a Linux server up and running you can proceed
[configuring](/docs/installation/configure/) and
[installing OpenServerless](/docs/installation/install/cluster/).

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

So you need to: 

* access the AWS console 
  [following those instructions](https://repost.aws/knowledge-center/create-access-key)
create an access key and secret key;
* give to the credentials the minimum required permissions 
  [as described here](https://eksctl.io/usage/minimum-iam-policies/) to build an 
  EKS cluster.

You will end up with a couple of string as follows:

    Sample AWS Access Key ID: AKIAIOSFODNN7EXAMPLE Sample AWS Secret Access
    Key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

Take note of them as you need them for configuring out CLI.

### Configure AWS to provision a server{#configure}

Before you can provision a Linux server you have to configure AWS typing
the command:

    ops config aws

The system will then ask the following questions:

    *** Please, specify AWS Access Id and press enter.
    AKIAIOSFODNN7EXAMPLE
    
    *** Please, specify AWS Secret Key and press enter.
    wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
    *** Please, specify AWS Region to use and press enter.
    To get a list of valid values use:
      aws ec2 describe-regions --output table

    Just press enter for default [us-east-1]:

    *** Please, specify AWS public SSH key  and press enter.
    If you already have a public SSH key in AWS, provide its name here.
    If you do not have it, generate a key pair with the following command:
      ssh-keygen
    The public key defaults to ~/.ssh/id_rsa.pub and you can import with:
      aws ec2 import-key-pair --key-name nuvolaris-key --public-key-material --region=<your-region> fileb://~/.ssh/id_rsa.pub

    Just press enter for default [devkit-74s]:

    *** Please, specify AWS Image to use for VMs and press enter.
    The suggested image is an Ubuntu 22 valid only for us-east-1
    Please check AWS website for alternative images in other zones

    Just press enter for default [ami-052efd3df9dad4825]:

    *** Please, specify AWS Default user for image to use for VMs and press enter.
    Default user to access the selected image.

    Just press enter for default [ubuntu]:

    *** Please, specify AWS Instance type to use for VMs and press enter.
    The suggested instance type has 8GB and 2vcp
    To get a list of valid values, use:
    aws ec2 describe-instance-types --query 'InstanceTypes[].InstanceType' --output table

    Just press enter for default [t3a.large]:

    *** Please, specify AWS Disk Size to use for VMs and press enter.
    Just press enter for default [100]:

### Provision a server{#provision}

You can provision one or more servers using `ops`. The servers will use
the parameters you have just configured.

You can create a new server with:

    ops cloud aws vm-create <server-name>

> ❗ **IMPORTANT**
>
> Replace `<server-name>` with a name you choose, for example
    `ops-server`

The command will create a new server in AWS with the parameters you
specified in configuration.

You can also:

1. list servers you created with `ops cloud aws vm-list`

2. delete a server you created and you do not need anymore with
    `ops cloud aws vm-delete <server-name>`

### Retrieve IP{#retrieve-ip}

The server will be provisioned with an IP address assigned by AWS.

You can read the IP address of your server with

    ops cloud aws vm-getip <server-name>

You need this IP when [configuring a DNS name](/docs/installation/configure/dns/) for
the server.
