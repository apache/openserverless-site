---
title: Naming And Limits
---
# System details

The following sections provide more details about the OpenWhisk and
Nuvolaris system.

## Entities

### Namespaces and packages

OpenWhisk and Nuvolaris actions, triggers, and rules belong in a
namespace, and optionally a package.

Packages can contain actions and feeds. A package cannot contain another
package, so package nesting is not allowed. Also, entities do not have
to be contained in a package.

In Nuvolaris a namespace corresponds to an user. You can create users
with the [admin subcommand](#cli:admin.adoc) of the CLI.

The fully qualified name of an entity is
`/namespaceName[/packageName]/entityName`. Notice that `/` is used to
delimit namespaces, packages, and entities.

If the fully qualified name has three parts:
`/namespaceName/packageName/entityName`, then the namespace can be
entered without a prefixed `/`; otherwise, namespaces must be prefixed
with a `/`.

For convenience, the namespace can be left off if it is the user’s
*default namespace*.

For example, consider a user whose default namespace is `/myOrg`.
Following are examples of the fully qualified names of a number of
entities and their aliases.

<table>
<colgroup>
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Fully qualified name</th>
<th style="text-align: left;">Alias</th>
<th style="text-align: left;">Namespace</th>
<th style="text-align: left;">Package</th>
<th style="text-align: left;">Name</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td
style="text-align: left;"><p><code>/whisk.system/cloudant/read</code></p></td>
<td style="text-align: left;"></td>
<td style="text-align: left;"><p><code>/whisk.system</code></p></td>
<td style="text-align: left;"><p><code>cloudant</code></p></td>
<td style="text-align: left;"><p><code>read</code></p></td>
</tr>
<tr class="even">
<td
style="text-align: left;"><p><code>/myOrg/video/transcode</code></p></td>
<td style="text-align: left;"><p><code>video/transcode</code></p></td>
<td style="text-align: left;"><p><code>/myOrg</code></p></td>
<td style="text-align: left;"><p><code>video</code></p></td>
<td style="text-align: left;"><p><code>transcode</code></p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p><code>/myOrg/filter</code></p></td>
<td style="text-align: left;"><p><code>filter</code></p></td>
<td style="text-align: left;"><p><code>/myOrg</code></p></td>
<td style="text-align: left;"></td>
<td style="text-align: left;"><p><code>filter</code></p></td>
</tr>
</tbody>
</table>

You will be using this naming scheme when you use the OpenWhisk and
Nuvolaris CLI, among other places.

### Entity names

The names of all entities, including actions, triggers, rules, packages,
and namespaces, are a sequence of characters that follow the following
format:

- The first character must be an alphanumeric character, or an
    underscore.

- The subsequent characters can be alphanumeric, spaces, or any of the
    following: `_`, `@`, `.`, `-`.

- The last character can’t be a space.

More precisely, a name must match the following regular expression
(expressed with Java metacharacter syntax):
`\A([\w]|[\w][\w@ .-]*[\w@.-]+)\z`.

## System limits

### Actions

OpenWhisk and Nuvolaris has a few system limits, including how much
memory an action can use and how many action invocations are allowed per
minute.

**Note:** On Openwhisk 2.0 with the scheduler service, **concurrent** in
the table below really means the max containers that can be provisioned
at once for a namespace. The api *may* be able to accept more
activations than this number at once depending on a number of factors.

The following table lists the default limits for actions.

<table style="width:99%;">
<colgroup>
<col style="width: 5%" />
<col style="width: 74%" />
<col style="width: 9%" />
<col style="width: 3%" />
<col style="width: 4%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">limit</th>
<th style="text-align: left;">description</th>
<th style="text-align: left;">configurable</th>
<th style="text-align: left;">unit</th>
<th style="text-align: left;">default</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>timeout</p></td>
<td style="text-align: left;"><p>a container is not allowed to run
longer than N milliseconds</p></td>
<td style="text-align: left;"><p>per action</p></td>
<td style="text-align: left;"><p>milliseconds</p></td>
<td style="text-align: left;"><p>60000</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>memory</p></td>
<td style="text-align: left;"><p>a container is not allowed to allocate
more than N MB of memory</p></td>
<td style="text-align: left;"><p>per action</p></td>
<td style="text-align: left;"><p>MB</p></td>
<td style="text-align: left;"><p>256</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>logs</p></td>
<td style="text-align: left;"><p>a container is not allowed to write
more than N MB to stdout</p></td>
<td style="text-align: left;"><p>per action</p></td>
<td style="text-align: left;"><p>MB</p></td>
<td style="text-align: left;"><p>10</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>instances</p></td>
<td style="text-align: left;"><p>an action is not allowed to have more
containers than this value (<strong>new scheduler
only</strong>)</p></td>
<td style="text-align: left;"><p>per action</p></td>
<td style="text-align: left;"><p>number</p></td>
<td style="text-align: left;"><p>namespace concurrency limit</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>concurrent</p></td>
<td style="text-align: left;"><p>no more than N activations may be
submitted per namespace either executing or queued for
execution</p></td>
<td style="text-align: left;"><p>per namespace</p></td>
<td style="text-align: left;"><p>number</p></td>
<td style="text-align: left;"><p>100</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>minuteRate</p></td>
<td style="text-align: left;"><p>no more than N activations may be
submitted per namespace per minute</p></td>
<td style="text-align: left;"><p>per namespace</p></td>
<td style="text-align: left;"><p>number</p></td>
<td style="text-align: left;"><p>120</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>codeSize</p></td>
<td style="text-align: left;"><p>the maximum size of the action
code</p></td>
<td style="text-align: left;"><p>configurable, limit per action</p></td>
<td style="text-align: left;"><p>MB</p></td>
<td style="text-align: left;"><p>48</p></td>
</tr>
<tr class="even">
<td style="text-align: left;"><p>parameters</p></td>
<td style="text-align: left;"><p>the maximum size of the parameters that
can be attached</p></td>
<td style="text-align: left;"><p>not configurable, limit per
action/package/trigger</p></td>
<td style="text-align: left;"><p>MB</p></td>
<td style="text-align: left;"><p>1</p></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><p>result</p></td>
<td style="text-align: left;"><p>the maximum size of the action
result</p></td>
<td style="text-align: left;"><p>not configurable, limit per
action</p></td>
<td style="text-align: left;"><p>MB</p></td>
<td style="text-align: left;"><p>1</p></td>
</tr>
</tbody>
</table>

### Per action timeout (ms) (Default: 60s)

- The timeout limit N is in the range \[100ms..300000ms\] and is set
    per action in milliseconds.

- A user can change the limit when creating the action.

- A container that runs longer than N milliseconds is terminated.

### Per action memory (MB) (Default: 256MB)

- The memory limit M is in the range from \[128MB..512MB\] and is set
    per action in MB.

- A user can change the limit when creating the action.

- A container cannot have more memory allocated than the limit.

### Per action max instance concurrency (Default: namespace limit for concurrent invocations) **Only applicable using new scheduler**

- The max containers that will be created for an action before
    throttling in the range from \[1..concurrentInvocations limit for
    namespace\]

- By default the max allowed containers / server instances for an
    action is equal to the namespace limit.

- A user can change the limit when creating the action.

- Defining a lower limit than the namespace limit means your max
    container concurrency will be the action defined limit.

- If using actionConcurrency &gt; 1 such that your action can handle
    multiple requests per instance, your true concurrency limit is
    actionContainerConcurrency \* actionConcurrency.

- The actions within a namespaces containerConcurrency total do not
    have to add up to the namespace limit though you can configure it
    that way to guarantee an action will get exactly the action
    container concurrency.

- For example with a namespace limit of 30 with 2 actions each with a
    container limit of 20; if the first action is using 20, there will
    still be space for 10 for the other.

### Per action logs (MB) (Default: 10MB)

- The log limit N is in the range \[0MB..10MB\] and is set per action.

- A user can change the limit when creating or updating the action.

- Logs that exceed the set limit are truncated and a warning is added
    as the last output of the activation to indicate that the activation
    exceeded the set log limit.

### Per action artifact (MB) (Default: 48MB)

- The maximum code size for the action is 48MB.

- It is recommended for a JavaScript action to use a tool to
    concatenate all source code including dependencies into a single
    bundled file.

### Per activation payload size (MB) (Fixed: 1MB)

- The maximum POST content size plus any curried parameters for an
    action invocation or trigger firing is 1MB.

### Per activation result size (MB) (Fixed: 1MB)

- The maximum size of a result returned from an action is 1MB.

### Per namespace concurrent invocation (Default: 100)

- The number of activations that are either executing or queued for
    execution for a namespace cannot exceed 100.

- A user is currently not able to change the limits.

### Invocations per minute (Fixed: 120)

- The rate limit N is set to 120 and limits the number of action
    invocations in one minute windows.

- A user cannot change this limit when creating the action.

- A CLI or API call that exceeds this limit receives an error code
    corresponding to HTTP status code `429: TOO MANY REQUESTS`.

### Size of the parameters (Fixed: 1MB)

- The size limit for the parameters on creating or updating of an
    action/package/trigger is 1MB.

- The limit cannot be changed by the user.

- An entity with too big parameters will be rejected on trying to
    create or update it.

### Per Docker action open files ulimit (Fixed: 1024:1024)

- The maximum number of open files is 1024 (for both hard and soft
    limits).

- The docker run command use the argument `--ulimit nofile=1024:1024`.

- For more information about the ulimit for open files see the [docker
    run](https://docs.docker.com/engine/reference/commandline/run)
    documentation.

### Per Docker action processes ulimit (Fixed: 1024)

- The maximum number of processes available to the action container is
    1024.

- The docker run command use the argument `--pids-limit 1024`.

- For more information about the ulimit for maximum number of
    processes see the [docker
    run](https://docs.docker.com/engine/reference/commandline/run)
    documentation.

### Triggers

Triggers are subject to a firing rate per minute as documented in the
table below.

<table>
<colgroup>
<col style="width: 14%" />
<col style="width: 26%" />
<col style="width: 30%" />
<col style="width: 11%" />
<col style="width: 16%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">limit</th>
<th style="text-align: left;">description</th>
<th style="text-align: left;">configurable</th>
<th style="text-align: left;">unit</th>
<th style="text-align: left;">default</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><p>minuteRate</p></td>
<td style="text-align: left;"><p>no more than N triggers may be fired
per namespace per minute</p></td>
<td style="text-align: left;"><p>per user</p></td>
<td style="text-align: left;"><p>number</p></td>
<td style="text-align: left;"><p>60</p></td>
</tr>
</tbody>
</table>

### Triggers per minute (Fixed: 60)

- The rate limit N is set to 60 and limits the number of triggers that
    may be fired in one minute windows.

- A user cannot change this limit when creating the trigger.

- A CLI or API call that exceeds this limit receives an error code
    corresponding to HTTP status code `429: TOO MANY REQUESTS`.
