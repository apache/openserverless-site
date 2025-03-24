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

Usually, when working with relational databases, the best choice is to use a 
[schema migration system](https://en.wikipedia.org/wiki/Schema_migration). 
In our case, to keep things simple, we will emulate a migration using an action.

Now, we need to create a table to store the contact data: start by creating a 
new action called `create-table.js` in the `packages/contact` folder.

The directory structure have to be like this:

```shell
contact_us_app
├── packages
│   └── contact
│       ├── create-table.js
│       └── submit.js
└── web
    └── index.html
```

Put this content inside the `create-table.js` file:

```javascript
//--kind nodejs:default
//--param POSTGRES_URL $POSTGRES_URL

const { Client } = require('pg')

async function main(args) {
    console.log('Starting create-table action')
    const client = new Client({ connectionString: args.POSTGRES_URL });

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

    try {
        console.log(`Connecting to ${args.POSTGRES_URL}`);
        await client.connect();
        console.log('Connected to database');
        await client.query(createSchema);
        console.log('Schema demo created');
        await client.query(createTable);
        console.log('Contact table created');
        return { result: 'OK' };
    } catch (e) {
        if (e instanceof AggregateError) {
            for (const err of e.errors) {
                console.error('[ERROR] - ', err.message || err);
            }
        } else if (e instanceof Error) {
            console.error('[ERROR]  - ', e.message);
        } else {
            console.error('[ERROR] - ', e);
        }
        return { result: 'ERROR' };
    } finally {
        console.log('Closing connection');
        if (client) {
            await client.end();
        }
    }
}
```

{{< blockquote info>}}
You may have noticed here again the comments on top of the file. As said before,
these comments are used by `ops ide` to automatically handle the publishing of files
by calling `ops package` or `ops action` as needed.
In particular:
<ul>
<li><code>--kind nodejs:default</code> will ask OpenServerless to run this code on the nodejs default runtime.</li>
<li>the <code>--param POSTGRES_URL $POSTGRES_URL</code> will automatically fill in the parameters required by the action,
taking it's value from <code>ops</code>'s configuration file.</li>
</ul>
{{< /blockquote >}}


The action is [idempotent](https://en.wikipedia.org/wiki/Idempotence), so you
may call the action multiple times, but the schema and the table is created only
once.

You can deploy this action using `ops ide deploy` command.

```bash
ops ide deploy
```

The output will be like:
```shell
/home/openserverless/.ops/tmp/deploy.pid
PID 52906
> Scan:
>> Action: packages/contact/create-table.js
>> Action: packages/contact/submit.js
> Deploying:
>> Package: contact
$ $OPS package update contact 
ok: updated package contact
>>> Action: packages/contact/create-table.js
$ $OPS action update contact/create-table packages/contact/create-table.js --kind nodejs:default --param POSTGRES_URL $POSTGRES_URL
ok: updated action contact/create-table
>>> Action: packages/contact/submit.js
$ $OPS action update contact/submit packages/contact/submit.js --web true --kind nodejs:default
ok: updated action contact/submit
build process exited with code 0
UPLOAD ASSETS FROM web
==================| UPLOAD RESULTS |==================
| FILES      : 1
| COMPLETED  : 1
| ERRORS     : 0
| SKIPPED    : 0
| EXEC. TIME : 28.37 ms
======================================================
URL: http://opstutorial.localhost:80
```

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

If we want to invoke the `create-table` action, we can do it with
this command. 

```bash
ops action invoke contact/create-table
```
The output will be like:
```
ok: invoked /_/contact/create-table with id e67a6c6f5a9c4667ba6c6f5a9c46675b
```

The activation will return an id: in our case the id is `e67a6c6f5a9c4667ba6c6f5a9c46675b`.
You can retrieve the activation log with the command `ops activation logs <id>` or `ops activation logs --last` to retrieve
the last activation log.

```bash
ops activation logs e67a6c6f5a9c4667ba6c6f5a9c46675b
```
```shell
2025-03-17T23:28:03.390748125Z stdout: Starting create-table action
2025-03-17T23:28:03.391745125Z stdout: Connecting to postgresql://opstutorial:password@nuvolaris-postgres.nuvolaris.svc.cluster.local:5432/opstutorial
2025-03-17T23:28:03.405132167Z stdout: Connected to database
2025-03-17T23:28:03.406006792Z stdout: Schema demo created
2025-03-17T23:28:03.406601042Z stdout: Contact table created
2025-03-17T23:28:03.406604209Z stdout: Closing connection
..
```

We could run `ops activation poll` or `ops ide poll` to listen for new logs.

To check that the table is really there, and inspect it's schema you can 
use the `ops devel psql describe` tool:

```bash
ops devel psql describe "demo.contacts" --format=table
```

You should see:

```shell
┌───┬───────────────┬──────────────┬─────────────┬───────────────────┬─────────────┐
│   │ table_catalog │ table_schema │ column_name │ data_type         │ is_nullable │
├───┼───────────────┼──────────────┼─────────────┼───────────────────┼─────────────┤
│ 0 │ opstutorial   │ demo         │ id          │ integer           │ NO          │
│ 1 │ opstutorial   │ demo         │ name        │ character varying │ YES         │
│ 2 │ opstutorial   │ demo         │ email       │ character varying │ YES         │
│ 3 │ opstutorial   │ demo         │ phone       │ character varying │ YES         │
│ 4 │ opstutorial   │ demo         │ message     │ character varying │ YES         │
└───┴───────────────┴──────────────┴─────────────┴───────────────────┴─────────────┘
```

### The Action to Store the Data

We could just write the code to insert data into the table in the
`submit.js` action, but it’s better to have a separate action for that.

Let’s create a new file called `write.js` in the `packages/contact`
folder:

```javascript
// write.js

//--kind nodejs:default
//--param POSTGRES_URL $POSTGRES_URL

const {Client} = require('pg')

async function main(args) {
    const client = new Client({connectionString: args.POSTGRES_URL});

    // Connect to database server
    await client.connect();

    const {name, email, phone, message} = args;

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
ops ide deploy
```
```
/home/openserverless/.ops/tmp/deploy.pid
/Users/bruno/.ops/tmp/deploy.pid
PID 57700
> Scan:
>> Action: packages/contact/write.js
>> Action: packages/contact/create-table.js
>> Action: packages/contact/submit.js
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
build process exited with code 0
UPLOAD ASSETS FROM web
==================| UPLOAD RESULTS |==================
| FILES      : 1
| COMPLETED  : 1
| ERRORS     : 0
| SKIPPED    : 0
| EXEC. TIME : 28.92 ms
======================================================
URL: http://opstutorial.localhost:80
```

### Finalizing the Submit

Alright, we are almost done. We just need to create a pipeline of
`submit` → `write` actions. The `submit` action returns the 4 form
fields together with the HTML body. The `write` action expects those 4
fields to store them. Let’s put them together into a `sequence`:

```bash
ops action create contact/submit-write  --sequence contact/submit,contact/write --web true
```
```shell
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
```

```shell
actions
/opstutorial/contact/submit-write                                      private sequence
/opstutorial/contact/submit                                            private nodejs:21
/opstutorial/contact/create-table                                      private nodejs:21
/opstutorial/contact/write                                             private nodejs:21
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
```
```shell
<apihost>/api/v1/web/openserverless/contact/submit-write
```

Then we can update the `index.html` file. Change the form submit 
action with the url from the previous command:

```html
<form method="POST" action="/api/v1/web/opstutorial/contact/submit-write"
          enctype="application/x-www-form-urlencoded">
```

We just need to add `-write` to the action name.

Now give a `ops ide deploy` to publish all the modifications.

Try again to fill the contact form (with correct data) and submit it.
This time the data will be stored in the database.

### View data from db

If you want to retrieve data from your database, `ops` provides several
utilities under the `ops devel` command. They are useful to interact
with the integrated services, such as the database we are using.

For instance, to interact with PostgreSQL database, let’s run:

```bash
echo "SELECT * FROM demo.CONTACTS" | ops devel psql sql --format=table
```

You should see an output like this:
```shell
┌───┬────┬────────────────┬─────────────────────────┬─────────────┬──────────────────────────────┐
│   │ id │ name           │ email                   │ phone       │ message                      │
├───┼────┼────────────────┼─────────────────────────┼─────────────┼──────────────────────────────┤
│ 0 │ 1  │ OpenServerless │ user@openserverless.dev │ 39123123123 │ Hello Apache OpenServerless! │
└───┴────┴────────────────┴─────────────────────────┴─────────────┴──────────────────────────────┘
```

---
