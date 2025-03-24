---
title: App Deployment
description: Learn how to deploy your app on Apache Openserverless
weight: 60
draft: false
---

## App Deployment

### Deploy

Apache OpenServerless makes publishing a project a very simple operation. The project, organized in two main folders `packages` for the backend and `web` for the frontend, can be published immediately using the command `ops ide deploy`.

Once launched, the command takes care of:
- creating the packages
- preparing the actions with the relative dependencies
- publishing the actions

Through the use of files according to the [OpenWhisk manifests.yml standard](https://github.com/apache/openwhisk-wskdeploy/blob/master/docs/programming_guide.md#wskdeploy-utility-by-example), it is also possible to publish sequences, triggers and much more at the same time.

{{< blockquote info>}}
An OpenWhisk's manifest file can be useful to automate the deploy of sequences, triggers, rules. Action and packages are simpler to deploy using <code>ops ide deploy</code>
{{< /blockquote >}}

The `ops ide deploy` command also takes care of managing the parameters inserted in the annotations and injecting the variables from the configuration or from the .env file located in the `packages` folder.


### Packaging the App

Even if not necessary, we'll package both actions and sequences.
Let's create, inside the `packages` folder, two files:
- 01-actions.yaml
- 02-sequences.yaml

We'll do so, because actions are required to deploy sequences.

The directory structure should be like this:

```shell
contact_us_app
├── packages
│   ├── 01-actions.yaml
│   ├── 02-sequences.yaml
│   └── contact
│       ├── create-table.js
│       ├── notify.js
│       ├── submit.js
│       └── write.js
└── web
    └── index.html
```

### The Action Manifest File

Inside the `01-actions.yaml` put this content:

```yaml
packages:
  contact:
    inputs:
      POSTGRES_URL:
        type: string
        value: $POSTGRES_URL    

    actions:
      submit:
        function: contact/submit.js
        web: true

      write:
        function: contact/write.js
        web: true

      notify:
        function: contact/notify.js
        web: true
        inputs:
          NOTIFICATION_URL:
            type: string
            value: $NOTIFICATION_URL

      create-table:
        function: contact/create-table.js
```

At the top level we have the standard `packages` keyword,  under which 
we can define the packages we want. 
Until now we created all of our actions in the `contact` package so we 
add it under `packages`.

Then under each package, the `actions` keyword is needed so we can add
our action custom names with the path to the code (with `function`).
Finally we also add `web: true` which is equivalent to `--web true` when
creating the action manually.

Finally we used the `inputs` keyword to define the parameters to inject
in the function.

This file will be automatically deployed by the `ops ide deploy`
command. 

### The Sequences Manifest File

Inside the `01-actions.yaml` put this content:

```yaml
packages:
  contact:
    sequences:
      submit-write:
        actions: submit, write
        web: true
      submit-notify:
        actions: submit-write, notify
        web: true
```

At the top level we define the `packages` keyword and immediately after,
 the `contact` package.
We just have to add the `sequences` key at the `contact` level and define the sequences we want with the available actions.

Also this file will be automatically deployed by the `ops ide deploy`
command. 

### Test the deploy

To test the deploy, let's run again the command `ops ide deploy`:

```shell
ops ide deploy
```

```shell
/Users/openserverless/.ops/tmp/deploy.pid
PID 28177
> Scan:
>> Action: packages/contact/write.js
>> Action: packages/contact/create-table.js
>> Action: packages/contact/submit.js
>> Action: packages/contact/notify.js
> Deploying:
>> Package: contact
$ $OPS package update contact 
ok: updated package contact
>>> Action: packages/contact/write.js
$ $OPS action update contact/write packages/contact/write.js --kind nodejs:default --param POSTGRES_URL $POSTGRES_URL
ok: updated action contact/write
>>> Action: packages/contact/create-table.js
$ $OPS action update contact/create-table packages/contact/create-table.js --kind nodejs:default --param POSTGRES_URL $POSTGRES_URL
ok: updated action contact/create-table
>>> Action: packages/contact/submit.js
$ $OPS action update contact/submit packages/contact/submit.js --web true --kind nodejs:default
ok: updated action contact/submit
>>> Action: packages/contact/notify.js
$ $OPS action update contact/notify packages/contact/notify.js --param NOTIFICATION_URL $NOTIFICATION_URL
ok: updated action contact/notify
Found packages .env file. Reading it
>>> Manifest: packages/01-actions.yaml
$ $OPS -wsk project deploy --manifest packages/01-actions.yaml
Success: Deployment completed successfully.
>>> Manifest: packages/02-sequences.yaml
$ $OPS -wsk project deploy --manifest packages/02-sequences.yaml
Success: Deployment completed successfully.
build process exited with code 0
UPLOAD ASSETS FROM web
==================| UPLOAD RESULTS |==================
| FILES      : 1
| COMPLETED  : 1
| ERRORS     : 0
| SKIPPED    : 0
| EXEC. TIME : 35.72 ms
======================================================
URL: http://opstutorial.localhost:80
```

As you can see, after deploying the actions, the deployer will find
the manifest files and deploy them in [lexicographic order](https://en.wikipedia.org/wiki/Lexicographic_order).

---
