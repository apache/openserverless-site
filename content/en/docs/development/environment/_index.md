---
title: Environment
description: Admin as your companion in development journey
weight: 10
draft: true
---
Admin is your principal access gateway to MastroGPT env. Here, you can
build everything you need to deploy your code and integrate with OpenAI
API and with ops serverless and full scalable infrastucture.

If you already know how to use Admin env and prefere to see MastroGPT
spec for what concern devel and deploy, go on:
[Development](#../devel/index.adoc) and [Deploy](#../deploy/index.adoc)

# Homepage

<figure>
<img src="../images/HomePage.png" alt="HomePage" />
</figure>

As you can see, the homepage immediately showcases some of the key
features and is intentionally minimalistic. Everything you need to
kickstart your platform development journey is just a click away. Within
the "Actions" section, you’ll find the code you’ll be uploading
gradually as actions. Here, you can view a list of your actions, invoke
them, or make modifications as needed. Similarly, within the "Packages"
section, which you can think of as containers for actions, you’ll find
the same functionality.

- **Actions**: This section provides access to the code you’ll
    gradually upload as actions. Here, you can view, invoke, or modify
    your actions as needed.

- **Packages**: Think of this section as containers for your actions.
    Here, you can manage and organize your actions within packages.

- **Activations**: Serving as a log for your platform and code
    activities, activations track each invoked action. Utilize
    activations for debugging and monitoring purposes.

- **MastroGPT**: Immediate access to create GPT apps and explore demos
    crafted by our team and beta testers awaits you in this section.

# IDE

<figure>
<img src="../images/IDE2.png" alt="IDE" />
</figure>

Our platform offer a web ide fully integrated with your packages and web
folder. In this way, all code is immediately saved and available on
cloud. You need only an internet connection and all is ready, just code!
To access to web ide, simply click `IDE`. You’ll be redirected on our
tool from which a devcontainer with your code inside will start.

<figure>
<img src="../images/IDE.png" alt="IDE" />
</figure>

**Pic fac simile from codespace, will change**

# Actions

<figure>
<img src="../images/ActionList.png" alt="ActionList" />
</figure>

As mentioned above, actions are core part of your env. Inside an action
(that can be Java, Go, Python, Js and more), you can define all your
software functions.

To create one, just click `Create` under `Actions` on the sidebar. If
you need to understand better what is an action and how you can see the
CLI secton in this documentation.

# Packages

<figure>
<img src="../images/CreatePackage.png" alt="ActionList" />
</figure>

A package is a collection of related serverless actions. It serves as a
container for grouping together actions that share common functionality
or are designed to work together to accomplish a specific task or goal

# MastroGPTs app builder

<figure>
<img src="../images/GPTS.png" alt="GPTS" />
</figure>

In this section you can create code to interact with your own GPT
application! If you don’t know what a GPT app is, visit:
<https://openai.com/blog/introducing-gpts>

GPTs are AI application that use OpenAI capabilities inside a user app
and can call external API to ask infos or to make request.

## Creating a GPTs

To begin creating a GPT app, you can start from the OpenAI environment.
To unlock GPT’s capabilities, you’ll need a **Plus account**.

- Create an Action

<figure>
<img src="../images/createActionPizza.png" alt="create action" />
</figure>

Firstly, you need to define a new action that will be exposed to OpenAI.
This step is crucial as we’re developing a smart app that will request
information from these actions in real-time.

In this instance, we’re creating a simple function that will return
ingredients to prepare a pizza based on parameters such as the number of
people and pizza type.

- Deploy your actions as GPT spec

<figure>
<img src="../images/PizzaGPTspec.png" alt="create gpt spec" />
</figure>

To expose your code as an action callable from OpenAI, you need to
deploy it in our GPTs builder. It’s quite easy, simply go on
`GPT App builder`, insert a name for your app, select the action you
want to expose and click on `Build Spec`. Will be returned an https
link. Copy it somewhere, you need to paste on OpenAI env when creating
your GPTs

- Go to OpenAI

Visit <https://chat.openai.com/gpts>

- Click on Create

<figure>
<img src="../images/CreateGPT1.png" alt="create gpt" />
</figure>

By clicking on the create button, located at the top-right, you’ll
initiate the creation process for your app. Here, you’ll need to provide
a description of your app, define a name, and instructions. Instructions
here are intended as prompt instructions.

- Configure Actions

<figure>
<img src="../images/CreateGPT2.png" alt="create action" />
</figure>

Your GPTs can make external API calls to retrieve information in
real-time when users request it. For example, in our PizzaGPTs
application, a user might ask for ingredients to prepare a pizza. To
obtain this response, OpenAI will call your OpenServerless actions, as
mentioned previously.

- Import your action url

<figure>
<img src="../images/CreateGPT3.png" alt="create action" />
</figure>

Almost done! It’s time to paste your action url built before as
suggested in this pic. Once done, just click on `Save` button on the
top-right!

- Test your app

<figure>
<img src="../images/InvokeActionGPT.png" alt="invoke action gpt" />
</figure>

If all is correct, now your GPTs is capable of calling your
OpenServerless action when needed!
