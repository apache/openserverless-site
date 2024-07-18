---
title: Packages
weight: 50
---
# Using and creating packages

In OpenWhisk and Nuvolaris, you can use packages to bundle together a
set of related actions, and share them with others.

A package can include *actions* and *feeds*. - An action is a piece of
code that runs on OpenWhisk and Nuvolaris. For example, the Cloudant
package includes actions to read and write records to a Cloudant
database. - A feed is used to configure an external event source to fire
trigger events. For example, the Alarm package includes a feed that can
fire a trigger at a specified frequency.

Every OpenWhisk and Nuvolaris entity, including packages, belongs in a
*namespace*, and the fully qualified name of an entity is
`/namespaceName[/packageName]/entityName`. Refer to the [naming
guidelines](#reference.adoc#openwhisk-entities) for more information.

The following sections describe how to browse packages and use the
triggers and feeds in them. In addition, if you are interested in
contributing your own packages to the catalog, read the sections on
creating and sharing packages.

## Browsing packages

Several packages are registered with OpenWhisk and Nuvolaris. You can
get a list of packages in a namespace, list the entities in a package,
and get a description of the individual entities in a package.

1. Get a list of packages in the `/nuvolaris` namespace.

<!-- -->

    $ nuv package list /nuvolaris

    packages
    /nuvolaris/openai                                       private
    /nuvolaris/mastrogpt                                    private
    /nuvolaris/examples                                     private

1. Get a list of entities in the `/nuvolaris/openai` package.

<!-- -->

    $ nuv package get --summary /nuvolaris/openai
    package /nuvolaris/openai
       (parameters: none defined)
     action /nuvolaris/openai/models
       (parameters: none defined)
     action /nuvolaris/openai/chat
       (parameters: none defined)

**Note**: Parameters listed under the package with a prefix `*` are
predefined, bound parameters. Parameters without a `*` are those listed
under the [annotations](#annotations.adoc) for each entity. Furthermore,
any parameters with the prefix `**` are finalized bound parameters. This
means that they are immutable, and cannot be changed by the user. Any
entity listed under a package inherits specific bound parameters from
the package. To view the list of known parameters of an entity belonging
to a package, you will need to run a `get --summary` of the individual
entity.

1. Get a description of the `/nuvolaris/openai/chat` action.

<!-- -->

    $ nuv action get --summary /nuvolaris/openai/chat
    action /nuvolaris/openai/chat: Returns a result based on parameters OPENAI_API_HOST and OPENAI_API_KEY
       (parameters: **OPENAI_API_HOST, **OPENAI_API_KEY)

*NOTE*: Notice that the parameters listed for the action `read` were
expanded upon from the action summary compared to the package summary
above. To see the official bound parameters for actions and triggers
listed under packages, run an individual get summary for the particular
entity.

## Creating a package

A package is used to organize a set of related actions and feeds. It
also allows for parameters to be shared across all entities in the
package.

To create a custom package with a simple action in it, try the following
example:

1. Create a package called `custom`.

<!-- -->

    $ nuv package create custom
    ok: created package custom

1. Get a summary of the package.

<!-- -->

    $ nuv package get --summary custom
    package /myNamespace/custom
       (parameters: none defined)

Notice that the package is empty.

1. Create a file called `identity.js` that contains the following
    action code. This action returns all input parameters.

<!-- -->

    function main(args) { return args; }

1. Create an `identity` action in the `custom` package.

<!-- -->

    $ nuv action create custom/identity identity.js
    ok: created action custom/identity

Creating an action in a package requires that you prefix the action name
with a package name. Package nesting is not allowed. A package can
contain only actions and can’t contain another package.

1. Get a summary of the package again.

<!-- -->

    $ nuv package get --summary custom
    package /myNamespace/custom
      (parameters: none defined)
     action /myNamespace/custom/identity
      (parameters: none defined)

You can see the `custom/identity` action in your namespace now.

1. Invoke the action in the package.

<!-- -->

    $ nuv action invoke --result custom/identity
    {}

You can set default parameters for all the entities in a package. You do
this by setting package-level parameters that are inherited by all
actions in the package. To see how this works, try the following
example:

1. Update the `custom` package with two parameters: `city` and
    `country`.

<!-- -->

    $ nuv package update custom --param city Austin --param country USA
    ok: updated package custom

1. Display the parameters in the package and action, and see how the
    `identity` action in the package inherits parameters from the
    package.

<!-- -->

    $ nuv package get custom
    ok: got package custom
    ...
    "parameters": [
        {
            "key": "city",
            "value": "Austin"
        },
        {
            "key": "country",
            "value": "USA"
        }
    ]
    ...

    $ nuv action get custom/identity
    ok: got action custom/identity
    ...
    "parameters": [
        {
            "key": "city",
            "value": "Austin"
        },
        {
            "key": "country",
            "value": "USA"
        }
    ]
    ...

1. Invoke the identity action without any parameters to verify that the
    action indeed inherits the parameters.

<!-- -->

    $ nuv action invoke --result custom/identity
    {
        "city": "Austin",
        "country": "USA"
    }

1. Invoke the identity action with some parameters. Invocation
    parameters are merged with the package parameters; the invocation
    parameters override the package parameters.

<!-- -->

    $ nuv action invoke --result custom/identity --param city Dallas --param state Texas
    {
        "city": "Dallas",
        "country": "USA",
        "state": "Texas"
    }

## Sharing a package

After the actions and feeds that comprise a package are debugged and
tested, the package can be shared with all OpenWhisk and Nuvolaris
users. Sharing the package makes it possible for the users to bind the
package, invoke actions in the package, and author OpenWhisk and
Nuvolaris rules and sequence actions.

1. Share the package with all users:

<!-- -->

    $ nuv package update custom --shared yes
    ok: updated package custom

1. Display the `publish` property of the package to verify that it is
    now true.

<!-- -->

    $ nuv package get custom
    ok: got package custom
    ...
    "publish": true,
    ...

Others can now use your `custom` package, including binding to the
package or directly invoking an action in it. Other users must know the
fully qualified names of the package to bind it or invoke actions in it.
Actions and feeds within a shared package are *public*. If the package
is private, then all of its contents are also private.

1. Get a description of the package to show the fully qualified names
    of the package and action.

<!-- -->

    $ nuv package get --summary custom
    package /myNamespace/custom: Returns a result based on parameters city and country
       (parameters: *city, *country)
     action /myNamespace/custom/identity
       (parameters: none defined)

In the previous example, you’re working with the `myNamespace`
namespace, and this namespace appears in the fully qualified name.
