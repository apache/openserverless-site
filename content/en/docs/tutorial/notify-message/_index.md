---
title: Sending notifications
description: Sending notifications on user interaction
weight: 50
draft: false
---

{{< blockquote warning>}}
<strong>This page is under review.</strong><br/>
<br/>
Several changes have been made to the project since its first draft and therefore the
tutorial needs to be updated to the publishing system.
{{< /blockquote >}}

## Sending notifications

### Contact notification

It would be great if we receive a notification when an user tries to
contact us. For this tutorial we will pick slack to receive a message
when it happens.

We need to:

- have a slack workspace where we can send messages;

- create a slack app that will be added to the workspace;

- activate a webhook for the app that we can trigger from an action;

Check out the following scheme for the steps:

![Slack Webhook](/docs/tutorial/images/slackurl.png)

Once we have a webhook we can use to send messages we can proceed to
create a new action called `notify.js` (in the `packages/contact`
folder):

```javascript
// notify.js
function main(args) {
    const { name, email, phone, message } = args;

    let text = `New contact request from ${name} (${email}, ${phone}):\n${message}`;
    console.log("Built message", text);

    return fetch(args.notifications, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    })
        .then(response => {
            if (!response.ok) {
                console.log("Error sending message. Status code:", response.status);
            } else {
                console.log("Message sent successfully");
            }
            return {
                body: args.body,
            };
        })
        .catch(error => {
            console.log("Error sending message", error);
            return {
                body: error,
            };
        });
}
```

This action has the `args.notifications` parameter, which is the
webhook. It also has the usual 4 form fields parameters that receives in
input, used to build the text of the message. The action will return the
body of the response from the webhook.

We’ve also put some logs that we can use for debugging purposes.

Let’s first set up the action:

```bash
ops action create contact/notify notify.js -p notifications <your webhook>
ok: created action contact/notify
```

We are already setting the `notifications` parameter on action creation,
which is the webhook. The other one is the text that the submit action
will give in input at every invocation.

### Creating Another Action Sequence

We have developed an action that can send a Slack message as a
standalone action, but we designed it to take the output of the submit
action and return it as is. Time to extend the previous sequence!

Note that it will send messages for every submission, even for incorrect
inputs, so we will know if someone is trying to use the form without
providing all the information. But we will only store the fully
validated data in the database.

Let’s create the sequence, and then test it:

```bash
ops action create contact/submit-notify --sequence contact/submit-write,contact/notify --web true
ok: created action contact/submit-notify
```

We just created a new sequence `submit-notify` from the previous
sequence `submit-write` and the new `notify`.

If you want to get more info about this sequence, you can use the
`ops action get` command:

```bash
ops action get contact/submit-notify

{
    "namespace": "openserverless/contact",
    "name": "submit-notify",
    "version": "0.0.1",
    "exec": {
        "kind": "sequence",
        "components": [
            "/openserverless/contact/submit-write",
            "/openserverless/contact/notify"
        ]
    },
    ...
}
```

See how the `exec` key has a `kind` of `sequence` and a list of
`components` that are the actions that compose the sequence.

Now to start using this sequence instead of using the submit action, we
need to update the `web/index.html` page to invoke the new sequence.

As before let’s grab the url:

```bash
ops url contact/submit-notify
<apihost>/api/v1/web/openserverless/contact/submit-notify
```

And update the `index.html`:

```html
---            <form method="POST" action="/api/v1/web/openserverless/contact/submit-write"
                enctype="application/x-www-form-urlencoded"> <-- old
+++            <form method="POST" action="/api/v1/web/openserverless/contact/submit-notify"
                enctype="application/x-www-form-urlencoded"> <-- new
```

Don’t forget to re-upload the web folder with `ops util upload web/`.

Now try to fill out the form again and press send! It will execute the
sequence and you will receive the message from your Slack App.

The tutorial introduced you to some utilities to retrieve information
and to the concept of `activation`. Let’s use some more commands to
check out the logs and see if the message was really sent.

The easiest way to check for all the activations that happen in this app
with all their logs is:

```bash
ops activation poll

Enter Ctrl-c to exit.
Polling for activation logs
```

This command polls continuously for log messages. If you go ahead and
submit a message in the app, all the actions will show up here together
with their log messages.

To also check if there are some problems with your actions, run a couple
of times `ops activation list` and check the `Status` of the
activations. If you see some `developer error` or any other errors, just
grab the activation ID and run `ops logs <activation ID>`.

---