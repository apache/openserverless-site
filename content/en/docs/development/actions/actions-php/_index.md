---
title: PHP
weight: 40
draft: true
---
This document is still 🚧 **work in progress** 🚧

# Creating and invoking PHP actions

The process of creating PHP actions is similar to that of [other
actions](#../../actions/index.adoc#the-basics). The following sections
guide you through creating and invoking a single PHP action, and
demonstrate how to bundle multiple PHP files and third party
dependencies.

PHP actions are executed using PHP 8.0, 7.4 or 7.3. The specific version
of PHP is listed in the CHANGELOG files in the [PHP runtime
repository](https://github.com/apache/openwhisk-runtime-php).

To use a PHP runtime, specify the `ops` CLI parameter `--kind` when
creating or updating an action. The available PHP kinds are:

- PHP 8.0: `--kind php:8.0`

- PHP 7.4: `--kind php:7.4`

- PHP 7.3: `--kind php:7.3`

An action is simply a top-level PHP function. For example, create a file
called `hello.php` with the following source code:

    <?php
    function main(array $args) : array
    {
        $name = $args["name"] ?? "stranger";
        $greeting = "Hello $name!";
        echo $greeting;
        return ["greeting" => $greeting];
    }

An action supports not only a JSON object but also a JSON arary as a
return value.

It would be a simple example that uses an array as a return value:

    <?php
    function main(array $args) : array
    {
        $arr=array("a","b","c");
        return $arr;
    }

You can also create a sequence action with actions accepting an array
param and returning an array result.

You can easily figure out the parameters with the following example:

    <?php
    function main(array $args) : array
    {
        $result = array_reverse($args);
        return $result;
    }

PHP actions always consume an associative array and return an
associative array. The entry method for the action is `main` by default
but may be specified explicitly when creating the action with the `ops`
CLI using `--main`, as with any other action type.

You can create an OpenWhisk and OpenServerless action called `helloPHP`
from this function as follows:

    ops action create helloPHP hello.php

The CLI automatically infers the type of the action from the source file
extension. For `.php` source files, the action runs using a PHP 7.4
runtime.

Action invocation is the same for PHP actions as it is for [any other
action](actions.md#the-basics).

    ops action invoke --result helloPHP --param name World

    {
      "greeting": "Hello World!"
    }

Find out more about parameters in the [Working with
Parameters](#../../../reference/parameters/index.adoc#working-with-parameters)
section.

# Packaging PHP actions in zip files

You can package a PHP action along with other files and dependent
packages in a zip file. The filename of the source file containing the
entry point (e.g., `main`) must be `index.php`. For example, to create
an action that includes a second file called `helper.php`, first create
an archive containing your source files:

    zip -r helloPHP.zip index.php helper.php

and then create the action:

    ops action create helloPHP --kind php:7.4 helloPHP.zip

# Including Composer dependencies

If your PHP action requires [Composer](https://getcomposer.org)
dependencies, you can install them as usual using `composer require`
which will create a `vendor` directory. Add this directory to your
action’s zip file and create the action:

    zip -r helloPHP.zip index.php vendor
    ops action create helloPHP --kind php:7.4 helloPHP.zip

The PHP runtime will automatically include Composer’s autoloader for
you, so you can immediately use the dependencies in your action code.
Note that if you don’t include your own `vendor` folder, then the
runtime will include one for you with the following Composer packages:

- guzzlehttp/guzzle

- ramsey/uuid

The specific versions of these packages depends on the PHP runtime in
use and is listed in the CHANGELOG files in the [PHP runtime
repository](https://github.com/apache/openwhisk-runtime-php).

# Built-in PHP extensions

The following PHP extensions are available in addition to the standard
ones:

- bcmath

- curl

- gd

- intl

- mbstring

- mongodb

- mysqli

- pdo\_mysql

- pdo\_pgsql

- pdo\_sqlite

- soap

- zip
