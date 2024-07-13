---
title: Assembling the lab for OpenServerless
date: 2024-07-12
description: >
    Our first code drop is available: the development environment!
---

<img src="/blog/devenv.png" alt="Development environment as a laboratory" class="mb-2 img-fluid">



OpenServerless is a complex project. It has a lot of moving parts and relies heavily on Kubernetes.

There are many subprojects, and each subproject has a complex set of dependencies.  Setting up all those dependencies is usually complex and time consuming.

I have worked in a project where it used to take literally a couple of days to get everything ready to code. Also, you were never sure that everything was set up correctly because the dependencies were constantly changing.

For this reason, we have made a special effort to provide an easy and consistent way to have a standardized development environment for OpenServerless.

## The Development Virtual Machine

We considered a few options for setting up the development environment.

The first option is of course a setup script, but since you may be working on Linux, Windows or Mac, this approach turns out to be difficult and fragile.

The second option is to use Docker, and indeed for a while we used a Docker image in DevContainer format as our development environment. We also set up a Kubernetes development cluster using Kind, that is, "Kubernetes-in-Docker".

However, this approach proved to be slow and with a number of problems related to Docker. So we gradually moved to using a full virtual machine. And this is the approach we are taking with OpenServerless.

The development environment is a virtual machine initialized with a [cloud-init](https://cloud-init.io/) script. Cloud-init is a standard for initializing a virtual machine in the cloud. 

Using this cloud-init script you can actually run a developmnt environment basically in any cloud provider, if you want a shared one. 

Or, if you want to use your local machine, assuming you have at least 16GB of memory, you can launch the VM and initialize it with Cloud-Init in Linux, Windows and Mac using [multipass](https://multipass.run/).

THe README of [Apache OpenServerless](https://github.com/apache/openserverless) is indeed entirely devoted to setup the development virtual machine with Multipass and Cloud-Init.

## What is in the development machine?

Using this cloud-init script, you can actually run a development environment in basically any cloud provider if you want a shared one. 

Or if you want to use your local machine, assuming you have at least 16GB of memory, you can start the VM and initialize it with cloud-init in Linux, Windows and Mac using [multipass](https://multipass.run/).

The README for [Apache OpenServerless] (https://github.com/apache/openserverless) is actually entirely devoted to setting up the development virtual machine with Multipass and Cloud-Init.

## What is in the development machine?

The development machine is actually packed with goodies. For a start, it includes Kubernetes in the form of [K3S](https://k3s.io), a lightweight but full-featured version of Kubernetes. Well, technically, K3S is an API-compatible, work-alike sister re-implementation of Kubernetes, but for all practical purposes, it IS Kubernetes.

But we need more than Kubernetes. We have a number of subprojects, and for each one, there's a different set of tools and programming languages that need to be set up. We used to have a script to setup these dependencies, but since it turned out to be tedious to update, we switched to using [the package manager Nix] (https://nixos.org/download/). This is a tool that allows you to set up development environments (actually any environment) declaratively by writing a script `shell.nix`, the Nix language that defines the development environment. The virtual machines also include nix, and also a tool called `direnv` to automatically configure nix, calling a different `shell.nix` every time you change a directory.

Last but not least, we use [VSCode](https://code.visualstudio.com/) as it provides remote development features and allows you to work in the virtual machine as if it were a local folder. Instructions for setting up VSCode to use the virtual machine are provided in the README.


It is also worth mentioning that since we use [task](https://taskfile.dev/) a build tool everywhere, we included it in the VM. There is also a license manager [license-eye](https://github.com/apache/skywalking-eyes) to ensure that all files are properly licensed under the Apache license.
