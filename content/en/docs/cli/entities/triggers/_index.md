---
title: Triggers
description: Event source that triggers an action execution
weight: 50
---
## Triggers

Now let’s see what a trigger is and how to use it.

We can define a **trigger** as an object representing an event source
that triggers the execution of **actions**. When activated by an event,
associated actions are executed.

In other words, a trigger is a mechanism that listens for specific
events or conditions and initiates actions in response to those events.
It acts as the starting point for a workflow.

## Example: Sending Slack Notifications

Let’s consider a scenario where we want to send Slack notifications when
users visit specific pages and submit a contact form.

### Step 1: Define the Trigger

We create a trigger named "PageVisitTrigger" that listens for events
related to user visits on our website. To create it, you can use the
following command:

```bash
ops trigger create PageVisitTrigger
```

Once the trigger is created, you can update it to add parameters, such
as the page parameter:

```bash
ops trigger update PageVisitTrigger --param page homepage
```

> 💡 **NOTE**
>
> Of course, there are not only `create` and `update`, but also `delete`,
and they work as expected, updating and deleting triggers. In the next
paragraph, we will also see the `fire` command, which requires you to
first create rules to do something useful.

### Step 2: Associate the Trigger with an Action

Next, we create an action named "SendSlackNotification" that sends a
notification to Slack when invoked. Then, we associate this action with
our "PageVisitTrigger" trigger, specifying that it should be triggered
when users visit certain pages.

To associate the trigger with an action, you can use the following
command:

```bash
ops rule create TriggerRule PageVisitTrigger SendSlackNotification
```

We’ll have a better understanding of this aspect in
[Rules](/docs/cli/entities/rules/index#rules)

In this example, whenever a user visits either the homepage or the
contact page, the "SendSlackNotification" action will be triggered,
resulting in a Slack notification being sent.

### Step 3: Firing your triggers

Triggers can be fired in two different ways:

- With the CLI:

    ```sh
    ops trigger fire <TRIGGER-NAME>
    ```

- With the API:

    ```sh
    curl -u $AUTH https://{API_HOST}/api/v1/namespaces/{namespace}/triggers/{triggerName}
    ```

    `API_HOST` is your Openwhisk url (`ops debug apihost`), `namespace` can be `_` to
    use your default namespace, and `triggerName` is obviously the trigger name.

    So if you create a trigger with name `event`, and you host on openserverless.dev,
    the URL to fire it would be:

    ```sh
    https://openserverless.dev/api/v1/namespaces/_/triggers/event
    ```

    See more details in the [REST API docs](/docs/reference/references/rest_api/_index.md#triggers).

> ⚠️ **WARN**
>
> Unfortunately, at the moment both options require authentication, which prevents
> triggers from being used as simple web hooks.

## Conclusion

Triggers provide a flexible and scalable way to automate workflows based
on various events. By defining triggers and associating them with
actions, you can create powerful applications that respond dynamically
to user interactions, system events, or any other specified conditions.
