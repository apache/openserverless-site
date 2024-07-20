---
title: Packages
description: How to group actions and their related files
weight: 10
---
## Packages

OpenServerless groups actions and feeds in **packages** under a
namespace. It is conceptually similar to a folder containing a group of
related files.

A package allows you to:

- Group related actions together.

- Share parameters and annotations (each action sees the parameters
    assigned to the package).

- Provide web actions with a common prefix in the URL to invoke them.

For example, we can create a package `demo-package` and assign a
parameter:

```bash
$ ops package create demo-package -p email no-reply@nuvolaris.io
ok: created package demo-package
```

This command creates a new package with the specified name.

### Package Creation, Update, and Deletion

Let’s proceed with the commands to list, get information, update, and
finally delete a package:

First, let’s list our packages:

```bash
$ ops package list

packages
/openserverless/demo-package/ private
```

If you want to update a package by adding a parameter:

```bash
$ ops package update demo-package -p email info@nuvolaris.io

ok: updated package demo-package
```

Let’s retrieve some package information:

```bash
$ ops package get demo-package -s
package /openserverless/demo-package/sample:
    (parameters: *email)
```

Note the final `-s`, which means "summarize."

Finally, let’s delete a package:

```bash
$ ops package delete demo-package

ok: deleted package demo-package
```

### Adding Actions to the Package

Actions can be added to a package using this command:

```bash
ops action create <package-name>/<action-name>
```

This associates an existing action with the specified package.

### Using Packages

Once a package is created, actions within it can be invoked using their
full path, with this schema: `<package-name>/<action-name>`. This allows
organizing actions hierarchically and avoiding naming conflicts.

## Conclusion

Packages in OpenServerless provide a flexible and organized way to
manage actions and their dependencies. Using the Ops CLI, you can
efficiently create, add actions, and manage package dependencies,
simplifying the development and management of serverless applications.
