---
title: Scheduler
---
OpenServerless Operator offers the possibility to deploy a simple "scheduler" to invoke repetitive or one-shot OpenWhisk actions. For example, an action executing a SQL script to create a PostgreSQL Database or inserting reference data, or simply an action that sends notifications with an API call every day at the same time.

# How to Activate the Scheduler

Using the `ops` CLI, you can enable the scheduler with the following command:

```bash
ops config enable --cron

# if OpenServerless is not yet deployed
ops setup devcluster

# alternatively if OpenServerless is already deployed
ops update apply

```

By default, the internal scheduler executes a job every minute that starts searching for OpenWhisk actions with special annotations.

# How to Deploy a Repetitive Action

Let's assume we want to deploy an OpenWhisk action to be executed every 30 minutes. Suppose it's an action that simply prints something, like this:

```python
def main(args): 
    print('Hello from a repeated action')
    return {
        'body': 'action invoked'
    }
```

abd save it to a file called `scheduled-action.py`

To deploy the action and instruct OpenServerless to execute it every 30 minutes, issue the following command:

`ops action create scheduled-action scheduled-action.py -a cron "*/30 * * * *"`

So you can create the action in the usual way and at the end add -a cron yourCronExpression.

# How to Deploy a One-Shot Execution Action

Now suppose we want to execute the same action `scheduled-action.py` only once.

To deploy an action and request a single execution automatically via the OpenServerless Scheduler, issue the following command:

 `ops action create scheduled-action scheduled-action.py -a autoexec true`

If we now print activation logs with `ops activation poll`, we will see our action execution log:

```bash
Activation: 'scheduled' (ebd532139a464e9d9532139a46ae9d8a)
[
    "2024-03-08T07:28:02.050739962Z stdout: Hello from a scheduled action"
]
```

# Remarks

The Scheduler executes the action according to the following rules:

Actions are called in a non-blocking fashion. To verify execution and logs, use the command `ops activation list`.
Actions are invoked without any parameters. It is advised to deploy actions with self-contained parameters.
