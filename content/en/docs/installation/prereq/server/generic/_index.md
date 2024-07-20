---
title: SSH and Sudo
description: General prerequisites to install OpenServerless
weight: 10
---
## Configure a generic Linux server to install OpenServerless

If you have access to a generic Linux server, to be able to install
Nuvolaris it needs to:

1. be accessible without a password with `ssh`

2. be able to run root commands without a password with `sudo`

3. open the ports 80, 443 and 6443 or 16443

If your server does not already satisfy those requirements, read below
for information how to create a [sshkey](#sshkey),
[configure sudo](#sudo) and [open the firewall](#firewall)

### Installing a public SSH key{#sshkey}

To connect to a server without a password using `openssh` (used by the
installer), you need a couple of files called **ssh keys**.

You can generate them on the command line using this command:

    ssh-keygen

It will create a couple of files, typically called:

- `~/.ssh/id_rsa`

- `~/.ssh/id_rsa.pub`

where `~` is your home directory.

You have to keep secret the `id_rsa` file because it is the private key
and contains the information to identify you uniquely. Think to is as
your password.

You can copy the `id_rsa.pub` in the server or even share it publicly,
as it is the public key. Think to it as your login name, and adding this
file to the server adds you to the users who can login into it.

Once you have generated the public key, access your server, then edit
the file `~/.ssh/authorized_keys` adding the public key to it.

It is just one line, contained in the `id_rsa.pub` file.

Create the file if it does not exist. Append the line to the file (as a
single line) if it already exists. Do not remove other lines if you do
not want to remove access to other users.

### Configure Sudo {#sudo}

You normally access Linux servers using a user that is **not** `root`
(the system administrator with unlimited power on the system).

Depending on the system, the user to use to access be `ubuntu`,
`ec2-user`, `admin` or something else entirely. However if you have
access to the server, the information of which user to use should have
been provided, including a way to access to the `root` user.

You need to give this user the right to execute commands as `root`
without a password, and you do this by configuring the command `sudo`.

You usually have either access to root with the `su` command, or you can
execute `sudo` with a password.

Type either `su` or `sudo bash` to become root and edit the file
`/etc/sudoers` adding the following line:

    <user> ALL=(ALL) NOPASSWD:ALL

where `<user>` is the user you use to log into the system.

### Open the firewall {#firewall}

You need to open the following ports in the firewall of the server:

- 443 for HTTPS

- 80 for HTTP and provisioning certificates

- 6443 (K3S) or 16443 (MicroK8S) for Kubernetes

For information on how to open the firewall, please consult the
documentation of your cloud provider or contact your system
administrator, as there are no common procedures and they depends on the
cloud provider.
