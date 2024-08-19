---
title: About Apache OpenServerless
linkTitle: About
menu: {main: {weight: 10}}
---

{{% blocks/cover promo_image="openserverless-diagram.png" title="About Apache OpenServerless" image_anchor="smart" height="auto" %}}

{.mt-5}

{{% /blocks/cover %}}

{{% blocks/lead %}}


{{% imgproccenter openserverless-diagram Fit "800x600"  %}}
<br>A complete Serverless Development Environment for Any Cloud and Any Kubernetes
{{% /imgproccenter %}}


{{% /blocks/lead %}}

{{% blocks/lead %}}

Managed by a Kubernetes Operator
{.h1 .text-center}

{.text-left}

<br/>
Here are some of the operator's strong points:
<br/>
<br/>
The first operator capable of configuring a complete OpenWhisk distribution on various versions of Kubernetes, both on cloud providers and on bare metal.
<br/>
<br/>
The operator takes care of resources setup and mainteinance.
<br/>
<br/>
Allows you to configure a set of resources to be used for the development / deployment of cloud native applications based on the OpenWhisk serverless engine: redis, postgresql, minio and much more!


{{% /blocks/lead %}}

{{% blocks/lead %}}

A super-powered CLI extensible with plugins
{.h1 .text-center}
<br/>

The <strong>ops</strong> cli is more than a standard cli: infact it is...
<br/>
<br/>
<strong>rich</strong> - yes, it includes installation, system administration, debugging, developing tools and much much more!
<br/>
<strong>extensible</strong> - easily extendable by writing simple plugins in shell or javascript.
<br/>
<strong>whisk-ready</strong> - it includes all openwhisk tools.
<br/>
<div class="ops-asciinema-ext">
{{% asciinema src="ops" cols="80" rows="25" %}}
</div>



{{% /blocks/lead %}}

{{% blocks/lead %}}

{{% imgproccenter openwhisk Fit "508x512" %}}
{{% /imgproccenter %}}
<br>
Built around <a href="https://openwhisk.apache.org">Apache OpenWhisk</a>, a production-ready and widely deployed serverless engine providing all the patterns and best practices for scalable cloud-native applications.



{{% /blocks/lead %}}


{{% blocks/section %}}

Available everywhere
{.h1 .text-center}

You can install OpenServerless everywhere: from your local Windows / Mac / Linux machine for development and testing,
to powerful multi node Kubernetes cluster on premise or on your favorite Cloud Provider (AKS, AWS , GKS are fully supported)
{.text-center}

{{% imgproccenter gke_aks_aws_kube Fit "508x512" %}}
{{% /imgproccenter %}}

{{% /blocks/section %}}
