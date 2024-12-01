---
title: Use database
description: Store data into a relational database
weight: 40
draft: false
---
## Use database

### Storing the Message in the Database

We are ready to use the database that we enabled at the beginning of the
tutorial.

Since we are using a relational database, we need to create a table to
store the contact data. We can do that by creating a new action called
`create-table.js` in the `packages/contact` folder:

```javascript
const { Client } = require('pg')

async function main(args) {
    const client = new Client({ connectionString: args.dbUri });

    const createSchema = `CREATE SCHEMA IF NOT EXISTS demo;`

    const createTable = `
    CREATE TABLE IF NOT EXISTS demo.contacts (
        id serial PRIMARY KEY,
        name varchar(50),
        email varchar(50),
        phone varchar(50),
        message varchar(300)
    );
    `
    // Connect to database server
    await client.connect();
    console.log('Connected to database');

    try {
        await client.query(createTable);
        console.log('Contact table created');
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        client.end();
    }
}
```

We just need to run this once, therefore it doesn’t need to be a web
action. Here we can take advantage of the `cron` service we enabled!
There are also a couple of console logs that we can check out.

With the cron scheduler you can annotate an action with 2 kinds of
labels. One to make OpenServerless periodically invoke the action, the
other to automatically execute an action once, on creation.

Let’s create the action with the latter, which means annotating the
action with `autoexec true`:

```bash
ops action create contact/create-table create-table.js -a autoexec true
ok: created action contact/create-table
```

With `-a` you can add "annotations" to an action. OpenServerless will
invoke this action as soon as possible, so we can go on.

In OpenServerless an action invocation is called an `activation`. You
can keep track, retrieve information and check logs from an action with
`ops activation`. For example, with:

```bash
ops activation list
```

You can retrieve the list of invocations. For caching reasons the first
time you run the command the list might be empty. Just run it again and
you will see the latest invocations (probably some `hello` actions from
the deployment).

If we want to make sure `create-table` was invoked, we can do it with
this command. The cron scheduler can take up to 1 minute to run an
`autoexec` action, so let’s wait a bit and run `ops activation list`
again.

```bash
ops activation list

Datetime            Activation ID                    Kind      Start Duration   Status  Entity
2023-10-02 09:52:01 1f02d3ef5c32493682d3ef5c32b936da nodejs:18 cold  312ms      success openserverless/create-table:0.0.1
..
```

Or we could run `ops activation poll` to listen for new logs.

```bash
ops activation poll

Enter Ctrl-c to exit.
Polling for activation logs
```

When the logs from the `create-table` action appear, we can stop the
command with `Ctrl-c`.

Each activation has an `Activation ID` which can be used with other
`ops activation` subcommands or with the `ops logs` command.

We can also check out the logs with either `ops logs <activation-id>` or
`ops logs --last` to quickly grab the last activation’s logs:

```bash
ops logs --last

2023-10-15T14:41:01.230674546Z stdout: Connected to database
2023-10-15T14:41:01.238457338Z stdout: Contact table created
```

### The Action to Store the Data

We could just write the code to insert data into the table in the
`submit.js` action, but it’s better to have a separate action for that.

Let’s create a new file called `write.js` in the `packages/contact`
folder:

```javascript
const { Client } = require('pg')

async function main(args) {
    const client = new Client({ connectionString: args.dbUri });

    // Connect to database server
    await client.connect();

    const { name, email, phone, message } = args;

    try {
        let res = await client.query(
            'INSERT INTO demo.contacts(name,email,phone,message) VALUES($1,$2,$3,$4)',
            [name, email, phone, message]
        );
        console.log(res);
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        client.end();
    }

    return {
        body: args.body,
        name,
        email,
        phone,
        message
        };
}
```

Very similar to the create table action, but this time we are inserting
data into the table by passing the values as parameters. There is also a
`console.log` on the response in case we want to check some logs again.

Let’s deploy it:

```bash
ops action create contact/write write.js
ok: created action contact/write
```

### Finalizing the Submit

Alright, we are almost done. We just need to create a pipeline of
`submit` → `write` actions. The `submit` action returns the 4 form
fields together with the HTML body. The `write` action expects those 4
fields to store them. Let’s put them together into a `sequence`:

```bash
ops action create contact/submit-write  --sequence contact/submit,contact/write --web true
ok: created action contact/submit-write
```

With this command we created a new action called `submit-write` that is
a sequence of `submit` and `write`. This means that OpenServerless will
call in a sequence `submit` first, then get its output and use it as
input to call `write`.

Now the pipeline is complete, and we can test it by submitting the form
again. This time the data will be stored in the database.

Note that `write` passes on the HTML body so we can still see the thank
you message. If we want to hide it, we can just remove the `body`
property from the return value of `write`. We are still returning the
other 4 fields, so another action can use them (spoiler: it will happen
next chapter).

Let’s check out again the action list:

```bash
ops action list

actions
/openserverless/contact/submit-write                  private sequence
/openserverless/contact/write                         private nodejs:18
/openserverless/contact/create-table                  private nodejs:18
/openserverless/contact/submit                        private nodejs:18
```

You probably have something similar. Note the submit-write is managed as
an action, but it’s actually a sequence of 2 actions. This is a very
powerful feature of OpenServerless, as it allows you to create complex
pipelines of actions that can be managed as a single unit.

### Trying the Sequence

As before, we have to update our `index.html` to use the new action.
First let’s get the URL of the `submit-write` action:

```bash
ops url contact/submit-write
<apihost>/api/v1/web/openserverless/contact/submit-write
```

Then we can update the `index.html` file:

```html
---     <form method="POST" action="/api/v1/web/openserverless/contact/submit"
              enctype="application/x-www-form-urlencoded"> <-- old
+++     <form method="POST" action="/api/v1/web/openserverless/contact/submit-write"
              enctype="application/x-www-form-urlencoded"> <-- new
```

We just need to add `-write` to the action name.

Try again to fill the contact form (with correct data) and submit it.
This time the data will be stored in the database.

If you want to retrive info from you database, ops provides several
utilities under the `ops devel` command. They are useful to interact
with the integrated services, such as the database we are using.

For instance, let’s run:

```bash
ops devel psql sql "SELECT * FROM demo.CONTACTS"

[{'id': 1, 'name': 'OpenServerless', 'email': 'info@nuvolaris.io', 'phone': '5551233210', 'message': 'This is awesome!'}]
```
---
