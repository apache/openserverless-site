---
title: DNS and SSL
description: Configuring DNS and SSL
---
## Configuring DNS and SSL{#dns-and-ssl}
You can use OpenServerless as just as a serverless engine, and use the
default IP or DNS provided when provisioned your server or cluster. If
you do so, only http is avaialble, and it is not secure.

If you want your server or cluster is available with a well-known
internet name, you can associate the **IP address** or the "ugly"
default DNS name of serveres or clusters to a DNS name of your choice,
to use it also to publish the static front-end of your server.

Furthermore, once you decided for a DNS name for your server, you can
enable the provisioning of an SSL certificate so you server will be
accessible with `https`.

In order to configure the DNS and the SSL the steps are:

1. [retrieve the IP address or the the DNS name](#ip-or-dns) of your
    server or cluster

2. [register a DNS name](#register-dns) of your choice with your
    registration name provider

3. [configure OpenServerless](#configure-apihost) so he knows of the DNS and
    SSL and can use it

### Retrieving the IP address or the DNS name{#ip-or-dns}
If OpenServerless is installed in your local machine with Docker, cannot
configure any DNS nor SSL, so you can proceed [configuring the
services](/docs/installation/configure/services/).

If OpenServerless is installed in a single server, after you 
[satisfied the server prerequisites](/docs/installation/prereq/server/) you will
know the **IP address or DNS name of you server**.

If OpenServerless is installed in a Kubernetes cluster, after you 
[satisfied the server cluster](/docs/installation/prereq/server/) prerequisites 
you know either the **IP address or the DNS name of the load balancer**.

### Register a DNS name or wildcard{#register-dns}
Using the address of your server or cluster, you need either to
configure a DNS name your already own or [contact a domain name
registrar](https://www.icann.org/en/accredited-registrars) to register a
new DNS name dedicated to your server or cluster.

You need at least one DNS name in a domain you control, for example
`nuvolaris.example.com` that points to you IP or address.

Note that:

- If you have an IP address to your load balancer you need to
    configure an `A` record mapping `nuvolaris.example.com` to the IP
    address of your server.

- If you have a DNS name to your load balancer, you need to configure
    a `CNAME` record mapping `nuvolaris.example.com` to the DNS name of
    your server.

> 💡 **NOTE**
>
> If you are registering a dedicated domain name for your cluster, you are
advised to register wildcard name (`*`) for every domain name in
`example.com` will resolve to your server.

Registering a wildcard is required to get a different website for for
multiple users.

### Configure OpenServerless to use your DNS and and enable SSL{#configure-apihost}
Once you registrered a single DNS (for example `openserverless.example.com`)
or a wildcard DNS name (for example `*.example.com`) you can communicate
to the installer what is the main DNS name of your cluster or server, as
it is not able to detect it automatically. We call this the `<apihost>`

> 💡 **NOTE**
>
> If you have registered a single DNS name, like `openserverless.example.com` 
> use this name as `<apihost>`.
>
> If you have registered a wildcard DNS name, you have to choose a DNS
> name to be used as `<apihost>`.
>
> We recommended you use a name starting with `api` since to avoid
> clashes, user and domain names starting with `api` are reserved. So if
> you have a `*.example.com` wildcard DNS available, use `api.example.com`
> as your `<apihost>`

Once you decided what is your API host, you can configure this as
follows:

    ops config apihost <apihost>

This configuration will assign a well know DNS name as access point of
your OpenServerless cluster. However note it does **NOT** enable SSL.
Accessing to your cluster will happen using HTTP.

Since requests contain sensitive information like security keys, this is
**highly insecure**. You hence do this only for development or testing
but **never** for production.

Once you have a DNS name, enabling `https` is pretty easy, since we can
do it automatically using the free service `Let's Encrypt`. We have
however to provide a valid email address `<email>`.

Once you know your `<apihost>` and the `<email>` to receive
communications from Let’s Encrypt (mostly, when a domain name is
invalidated and needs to be renewed), you can configure your apihost and
enable SSL as follows:

    ops config apihost <apihost> --tls=<email>

Of course, replace the `<apihost>` with the actual DNS name you
registered, and `<email>` with your email address
