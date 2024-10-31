---
title: About Apache OpenServerless
linkTitle: About
menu: { main: { weight: 10 } }
---

{{% blocks/cover promo_image="background.png"  title="Apache OpenServerless (incubating)" %}}

{.mt-5}

{{% /blocks/cover %}}

{{% blocks/lead %}}

{{% imgproccenter openserverless-diagram.webp "Fit" "3456x1728" "rounded-image"  %}}
{{% /imgproccenter %}}

<br/>A complete Serverless Development Environment for Any Cloud and Any Kubernetes



{{% /blocks/lead %}}

{{% blocks/lead %}}

# Managed by a Kubernetes Operator {.text-center}

Here are some of the operator's strong points:

The first operator capable of configuring a complete OpenWhisk distribution on various versions of Kubernetes, 
both on cloud providers and on bare metal.

The operator takes care of resources setup and maintenance.

Allows you to configure a set of resources to be used for the development / deployment of cloud native applications 
based on the OpenWhisk serverless engine: redis, postgresql, minio and much more!


{{% /blocks/lead %}}

{{% blocks/lead %}}

# A super-powered CLI extensible with plugins {.text-center}
<br/>

The <strong>ops</strong> cli is more than a standard cli: infact it is...


_RICH_ - yes, it includes installation, system administration, debugging, developing tools and much much
more!

_EXTENSIBLE_ - easily extendable by writing simple plugins in shell or javascript.


WHISK-READY - it includes all openwhisk tools.


<div class="ops-asciinema-ext">
{{% asciinema src="ops" cols="80" rows="25" %}}
</div>



{{% /blocks/lead %}}

{{% blocks/lead %}}

{{% imgproccenter openwhisk %}}
{{% /imgproccenter %}}

Built around <a href="https://openwhisk.apache.org">Apache OpenWhisk</a>, a production-ready and widely deployed
serverless engine providing all the patterns and best practices for scalable cloud-native applications.

{{% /blocks/lead %}}


{{% blocks/lead %}}

# Available everywhere {.text-center}

You can install OpenServerless everywhere: from your local Windows / Mac / Linux machine for development and testing,
to powerful multi node Kubernetes cluster on premise or on your favorite Cloud Provider (AKS, AWS , GKS are fully
supported)



{{% imgproccenter gke_aks_aws_kube.svg "" "" "rounded-image"  %}}
{{% /imgproccenter %}}

{{% /blocks/lead %}}

