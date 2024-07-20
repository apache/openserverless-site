---
title: Rules
description: Connection rules between triggers and actions
weight: 60
---
## Rules

Once we have a trigger and some actions, we can create rules for the
trigger. A rule connects the trigger with an action, so if you fire the
trigger, it will invoke the action. Let’s see this in practice in the
next listing.

### Create data

First of all, create a file called **alert.js**.

```javascript
function main() {
    console.log("Suspicious activity!");
    return {
        result: "Suspicious activity!"
    };
}
```

Then, create a OpenServerless action for this file:

```bash
ops action create alert alert.js
```

Now, create a trigger that we’ll call **notifyAlert**:

```bash
ops trigger create notifyAlert
```

Now, all is ready, and now we can create our rule! The syntax follows
this pattern: "ops rule create {ruleName} {triggerName} {actionName}".

```bash
ops rule create alertRule notifyAlert alert
```

### Test your rule

Our environment can now be alerted if something suspicious occurs!
Before starting, let’s open another terminal window and enable polling
(with the command `ops activation poll`) to see what happens.

```bash
$ ops activation poll
Enter Ctrl-c to exit.
Polling for activation logs
```

It’s time to fire the trigger!

```bash
$ ops trigger fire notifyAlert
ok: triggered /notifyAlert with id 86b8d33f64b845f8b8d33f64b8f5f887
```

Now, go to see the result! Check the terminal where you are polling
activations now!

```bash
Enter Ctrl-c to exit.
Polling for activation logs

Activation: 'alert' (dfb43932d304483db43932d304383dcf)
[
    "2024-02-20T03:15.15472494535Z stdout: Suspicious activity!"
]
```

## Conclusion

> 💡 **NOTE**
>
> As with all the other commands, you can execute `list`, `update`, and
`delete` by name.

A trigger can enable multiple rules, so firing one trigger actually
activates multiple actions. Rules can also be enabled and disabled
without removing them. As in the last example, let’s try to disable the
first rule and fire the trigger again to see what happens.

```bash
$ ops rule disable alertRule    
ok: disabled rule alertRule
$ ops trigger fire notifyAlert  
ok: triggered /_/notifyAlert with id 0f4fa69d910f4c738fa69d910f9c73af
```

- Disabling the rule.

- Firing the trigger again.

In the activation polling window, we can see that no action is executed
now. Of course, we can enable the rule again with:

    ops rule enable alertRule
