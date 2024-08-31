---
title: App Deployment
description: Learn how to deploy your app on Apache Openserverless
weight: 60
draft: false
---
## App Deployment

### Packaging the App

With OpenServerless you can write a manifest file (in YAML) to have an
easy way to deploy applications.

In this last chapter of the tutorial we will package the code to easily
deploy the app, both frontend and actions.

### Start The Manifest File

Let’s create a "manifest.yaml" file in the `packages` directory which
will be used to describe the actions to deploy:

```yaml
packages:
  contact:
    actions:
      notify:
        function: contacts/notify.js
        web: true
        inputs:
          notifications:
            value: $NOTIFICATIONS
```

This is the basic manifest file with just the `notify` action. At the
top level we have the standard `packages` keyword, under which we can
define the packages we want. Until now we created all of our actions in
the `contact` package so we add it under `packages`.

Then under each package, the `actions` keyword is needed so we can add
our action custom names with the path to the code (with `function`).
Finally we also add `web: true` which is equivalent to `--web true` when
creating the action manually.

Finally we used the `inputs` keyword to define the parameters to inject
in the function.

If we apply this manifest file (we will see how soon), it will be the
same as the previous
`ops action create contact/notify <path-to-notify.js> -p notifications $NOTIFICATIONS --web true`.
You need to have the webhooks url in the `NOTIFICATIONS` environment
variable.

### The Submit Action

The submit action is quite straightforward:

```yaml
packages:
  contact:
    actions:
      ...
      submit:
        function: contact/submit.js
        web: true
```

### The Database Actions

Similarly to the `notify` and `submit` actions, let’s add to the
manifest file the two actions for the database. We also need to pass as
a package parameter the DB url, so we will use `inputs` key as before,
but at the package level:

```yaml
packages:
  contact:
    inputs:
      dbUri:
        type: string
        value: $POSTGRES_URL
    actions:
      ...
      write:
        function: contact/write.js
        web: true

      create-table:
        function: contact/create-table.js
        annotations:
          autoexec: true
```

Note the `create-table` action does not have the `web` set to true as it
is not needed to be exposed to the world. Instead it just has the
annotation for cron scheduler.

### The Sequences

Lastly, we created a sequence with `submit` and `notify` that we have to
specify it in the manifest file as well.

```yaml
packages:
  contact:
    inputs:
      ...

    actions:
      ...

    sequences:
      submit-write:
        actions: submit, write
        web: true
      submit-notify:
        actions: submit-write, notify
        web: true
```

We just have to add the `sequences` key at the `contact` level (next to
`actions`) and define the sequences we want with the available actions.

### Deployment

The final version of the manifest file is:

```yaml
packages:
  contact:
    inputs:
      dbUri:
        type: string
        value: $POSTGRES_URL
    actions:
      notify:
        function: contact/notify.js
        web: true
        inputs:
          notifications:
            value: $NOTIFICATIONS

      submit:
        function: contact/submit.js
        web: true

      write:
        function: contact/write.js
        web: true

      create-table:
        function: contact/create-table.js
        annotations:
          autoexec: true

    sequences:
      submit-write:
        actions: submit, write
        web: true
      submit-notify:
        actions: submit-write, notify
        web: true
```

`ops` comes equipped with a handy command to deploy an app:
`ops project deploy`.

It checks if there is a `packages` folder with inside a manifest file
and deploys all the specified actions. Then it checks if there is a
`web` folder and uploads it to the platform.

It does all what we did manually until now in one command.

So, from the top level directory of our app, let’s run (to also set the
input env var):

```bash
export POSTGRES_URL=<your-postgres-url>
export NOTIFICATIONS=<the-webhook>

ops project deploy

Packages and web directory present.
Success: Deployment completed successfully.
Found web directory. Uploading..
```

With just this command you deployed all the actions (and sequences) and
uploaded the frontend (from the web folder).

---
