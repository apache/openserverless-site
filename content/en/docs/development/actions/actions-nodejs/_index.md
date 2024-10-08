---
title: Nodejs
weight: 30
draft: true
---
## Creating and invoking JavaScript actions

This document is still 🚧 **work in progress** 🚧

The process of creating JavaScript actions is similar to that of [other
actions](#../../actions/index.adoc#the-basics). The following sections
guide you through creating and invoking a single JavaScript action, and
demonstrate how to bundle multiple JavaScript files and third party
dependencies.

1. Create a JavaScript file with the following content. For this
    example, the file name is `hello.js`.

<!-- -->

    function main() {
        return { msg: 'Hello world' };
    }

An action supports not only a JSON object but also a JSON array as a
return value.

It would be a simple example that uses an array as a return value:

    function main(params) {
      return ["a", "b"];
    }

You can also create a sequence action with actions accepting an array
param and returning an array result.

You can easily figure out the parameters with the following example:

    /**
     * Sort a set of lines.
     * @param lines An array of strings to sort.
     */
    function main(msg) {
        var lines = msg || [];
        lines.sort();
        return lines;
    }

The JavaScript file might contain additional functions. However, by
convention, a function called `main` must exist to provide the entry
point for the action.

1. Create an action from the following JavaScript function. For this
    example, the action is called `hello`.

<!-- -->

    ops action create hello hello.js
    ok: created action hello

The CLI automatically infers the type of the action by using the source
file extension. For `.js` source files, the action runs by using a
Node.js runtime. You may specify the Node.js runtime to use by
explicitly specifying the parameter `--kind nodejs:18`, or
`--kind nodejs:20`.

# Creating asynchronous actions

JavaScript functions that run asynchronously may need to return the
activation result after the `main` function has returned. You can
accomplish this by returning a Promise in your action.

1. Save the following content in a file called `asyncAction.js`.

<!-- -->

    function main(args) {
         return new Promise(function(resolve, reject) {
           setTimeout(function() {
             resolve({ done: true });
           }, 2000);
        })
     }

Notice that the `main` function returns a Promise, which indicates that
the activation hasn’t completed yet, but is expected to in the future.

The `setTimeout()` JavaScript function in this case waits for two
seconds before calling the callback function. This represents the
asynchronous code and goes inside the Promise’s callback function.

The Promise’s callback takes two arguments, resolve and reject, which
are both functions. The call to `resolve()` fulfills the Promise and
indicates that the activation has completed normally.

A call to `reject()` can be used to reject the Promise and signal that
the activation has completed abnormally.

1. Run the following commands to create the action and invoke it:

<!-- -->

    ops action create asyncAction asyncAction.js

    ops action invoke --result asyncAction

    {
        "done": true
    }

Notice that you performed a blocking invocation of an asynchronous
action.

1. Fetch the activation log to see how long the activation took to
    complete:

<!-- -->

    ops activation list --limit 1 asyncAction

    ops activation get 64581426b44e4b3d981426b44e3b3d19

     {
         "start": 1552762003015,
         "end":   1552762005048,
         ...
     }

Comparing the `start` and `end` time stamps in the activation record,
you can see that this activation took slightly over two seconds to
complete.

# Using actions to call an external API

The examples so far have been self-contained JavaScript functions. You
can also create an action that calls an external API.

This example invokes a Yahoo Weather service to get the current
conditions at a specific location.

1. Save the following content in a file called `weather.js`.

<!-- -->

    var request = require('request');

    function main(params) {
        var location = params.location || 'Vermont';
        var url = 'https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '")&format=json';

        return new Promise(function(resolve, reject) {
            request.get(url, function(error, response, body) {
                if (error) {
                    reject(error);
                }
                else {
                    var condition = JSON.parse(body).query.results.channel.item.condition;
                    var text = condition.text;
                    var temperature = condition.temp;
                    var output = 'It is ' + temperature + ' degrees in ' + location + ' and ' + text;
                    resolve({msg: output});
                }
            });
        });
    }

Note that the action in the example uses the JavaScript `request`
library to make an HTTP request to the Yahoo Weather API, and extracts
fields from the JSON result. See the JavaScript [reference](#reference)
for the Node.js packages available in the runtime environment.

This example also shows the need for asynchronous actions. The action
returns a Promise to indicate that the result of this action is not
available yet when the function returns. Instead, the result is
available in the `request` callback after the HTTP call completes, and
is passed as an argument to the `resolve()` function.

1. Create an action from the `weather.js` file:

<!-- -->

    ops action create weather weather.js

1. Use the following command to run the action, and observe the output:

<!-- -->

    ops action invoke --result weather --param location "Brooklyn, NY"

Using the `--result` flag means that the value returned from the action
is shown as output on the command-line:

    {
        "msg": "It is 28 degrees in Brooklyn, NY and Cloudy"
    }

This example also passed a parameter to the action by using the
`--param` flag and a value that can be changed each time the action is
invoked. Find out more about parameters in the [Working with
Parameters](#../../../reference/parameters/index#working-with-parameters)
section.

# Packaging actions as Node.js modules with NPM libraries

Instead of writing all your action code in a single JavaScript source
file, actions can be deployed from a zip file containing a [Node.js
module](https://nodejs.org/docs/latest-v10.x/api/modules.html#modules_modules).

Archive zip files are extracted into the runtime environment and
dynamically imported using `require()` during initialisation. **Actions
packaged as a zip file MUST contain a valid `package.json` with a `main`
field used to denote the [module index
file](https://nodejs.org/docs/latest-v10.x/api/modules.html#modules_folders_as_modules)
to return.**

Including a `node_modules` folder in the zip file means external NPM
libraries can be used on the platform.

## Simple Example

- Create the following `package.json` file:

<!-- -->

    {
      "name": "my-action",
      "main": "index.js",
      "dependencies" : {
        "left-pad" : "1.1.3"
      }
    }

- Create the following `index.js` file:

<!-- -->

    function myAction(args) {
        const leftPad = require("left-pad")
        const lines = args.lines || [];
        return { padded: lines.map(l => leftPad(l, 30, ".")) }
    }

    exports.main = myAction;

Functions are exported from a module by setting properties on the
`exports` object. The `--main` property on the action can be used to
configure the module function invoked by the platform (this defaults to
`main`).

- Install module dependencies using NPM.

<!-- -->

    npm install

- Create a `.zip` archive containing all files (including all
    dependencies).

<!-- -->

    zip -r action.zip *

> Please note: Using the Windows Explorer action for creating the zip
> file will result in an incorrect structure. OpenWhisk and
> OpenServerless zip actions must have `package.json` at the root of the
> zip, while Windows Explorer will put it inside a nested folder. The
> safest option is to use the command line `zip` command as shown above.

- Create the action from the zip file.

<!-- -->

    ops action create packageAction --kind nodejs:20 action.zip

When creating an action from a `.zip` archive with the CLI tool, you
must explicitly provide a value for the `--kind` flag by using
`nodejs:18`, or `nodejs:20`.

- Invoke the action as normal.

<!-- -->

    ops action invoke --result packageAction --param lines "[\"and now\", \"for something completely\", \"different\" ]"

    {
        "padded": [
            ".......................and now",
            "......for something completely",
            ".....................different"
        ]
    }

## Handling NPM Libraries with Native Dependencies

Node.js libraries can import native dependencies needed by the modules.
These native dependencies are compiled upon installation to ensure they
work in the local runtime. Native dependencies for NPM libraries must be
compiled for the correct platform architecture to work in Apache
OpenWhisk and OpenServerless.

There are two approaches to using libraries with native dependencies…

1. Run `npm install` inside a Docker container from the platform
    images.

2. Building custom runtime image with libraries pre-installed.

**The first approach is easiest but can only be used when a zip file
containing all source files and libraries is less than the action size
limit (48MB).**

### Running `npm install` inside runtime container

- Run the following command to bind the local directory into the
    runtime container and run `npm install`.

<!-- -->

    docker run -it -v $PWD:/nodejsAction openwhisk/action-nodejs-v10 "npm install"

This will leave a `node_modules` folder with native dependencies
compiled for correct runtime.

- Zip up the action source files including `node_modules` directory.

<!-- -->

    zip -r action.zip *

- Create new action with action archive.

<!-- -->

    ops action create my-action --kind nodejs:20 action.zip

### Building custom runtime image

- Create a `Dockerfile` with the `npm install` command run during
    build.

<!-- -->

    FROM openwhisk/action-nodejs-v10

    RUN npm install <LIB_WITH_NATIVE_DEPS>

- Build and push the image to Docker Hub.

<!-- -->

    docker build -t <USERNAME>/custom-runtime .
    docker push <USERNAME>/custom-runtime

- Create new action using custom runtime image.

<!-- -->

    ops action create my-action --docker <USERNAME>/custom-runtime action.zip

**Make sure the `node_modules` included in the `action.zip` does not
include the same libraries folders.**

# Using JavaScript Bundlers to package action source files

Using a JavaScript module bundler can transform application source files
(with external dependencies) into a single compressed JavaScript file.
This can lead to faster deployments, lower cold-starts and allow you to
deploy large applications where individual sources files in a zip
archive are larger than the action size limit.

Here are the instructions for how to use three popular module bundlers
with the Node.js runtime. The “left pad” action example will be used as
the source file for bundling along with the external library.

## Using rollup.js (<https://rollupjs.org>)

- Re-write the `index.js` to use ES6 Modules, rather than CommonJS
    module format.

<!-- -->

    import leftPad from 'left-pad';

    function myAction(args) {
      const lines = args.lines || [];
      return { padded: lines.map(l => leftPad(l, 30, ".")) }
    }

    export const main = myAction

*Make sure you export the function using the `const main = ...` pattern.
Using `export {myAction as main}` does not work due to tree-shaking. See
this [blog
post](https://boneskull.com/rollup-for-javascript-actions-on-openwhisk/)
for full details on why this is necessary.*

- Create the Rollup.js configuration file in `rollup.config.js` with
    the following contents.

<!-- -->

    import commonjs from 'rollup-plugin-commonjs';
    import resolve from 'rollup-plugin-node-resolve';

    export default {
      input: 'index.js',
      output: {
        file: 'bundle.js',
        format: 'cjs'
      },
      plugins: [
        resolve(),
        commonjs()
      ]
    };

- Install the Rollup.js library and plugins using NPM.

<!-- -->

    npm install rollup rollup-plugin-commonjs rollup-plugin-node-resolve --save-dev

- Run the Rollup.js tool using the configuration file.

<!-- -->

    npx rollup --config

- Create an action using the bundle source file.

<!-- -->

    ops action create my-action bundle.js --kind nodejs:20

- Invoke the action as normal. Results should be the same as the
    example above.

<!-- -->

    ops action invoke my-action --result --param lines "[\"and now\", \"for something completely\", \"different\" ]"

## Using webpack (<https://webpack.js.org/>)

- Change `index.js` to export the `main` function using as a global
    reference.

<!-- -->

    const leftPad = require('left-pad');

    function myAction(args) {
      const lines = args.lines || [];
      return { padded: lines.map(l => leftPad(l, 30, ".")) }
    }

    global.main = myAction

This allows the bundle source to “break out” of the closures Webpack
uses when defining the modules.

- Create the Webpack configuration file in `webpack.config.js` with
    the following contents.

<!-- -->

    module.exports = {
      entry: './index.js',
      target: 'node',
      output: {
        filename: 'bundle.js'
      }
    };

- Install the Webpack library and CLI using NPM.

<!-- -->

    npm install webpack-cli --save-dev

- Run the Webpack tool using the configuration file.

<!-- -->

    npx webpack --config webpack.config.js

- Create an action using the bundle source file.

<!-- -->

    ops action create my-action dist/bundle.js --kind nodejs:20

- Invoke the action as normal. Results should be the same as the
    example above.

<!-- -->

    ops action invoke my-action --result --param lines "[\"and now\", \"for something completely\", \"different\" ]"

## Using parcel (<https://parceljs.org/>)

- Change `index.js` to export the `main` function using as a global
    reference.

<!-- -->

    const leftPad = require('left-pad');

    function myAction(args) {
      const lines = args.lines || [];
      return { padded: lines.map(l => leftPad(l, 30, ".")) }
    }

    global.main = myAction

This allows the bundle source to “break out” of the closures Parcel uses
when defining the modules.

- Install the Parcel library using NPM.

<!-- -->

    npm install parcel-bundler --save-dev

- Run the Parcel tool using the configuration file.

<!-- -->

     npx parcel index.js

- Create an action using the bundle source file.

<!-- -->

    ops action create my-action dist/index.js --kind nodejs:20

- Invoke the action as normal. Results should be the same as the
    example above.

<!-- -->

    ops action invoke my-action --result --param lines "[\"and now\", \"for something completely\", \"different\" ]"

# Reference

JavaScript actions can be executed in Node.js version 18 or 20.
Currently actions are executed by default in a Node.js version 20
environment.

## Node.js version 18 environment

The Node.js version 18 environment is used if the ‘--kind\` flag is
explicitly specified with a value of \`nodejs:18’ when creating or
updating an Action.

The following packages are pre-installed in the Node.js version 18
environment:

- [openwhisk](https://www.npmjs.com/package/openwhisk) - JavaScript
    client library for the OpenWhisk and OpenServerless platform.
    Provides a wrapper around the OpenWhisk and OpenServerless APIs.

## Node.js version 20 environment

The Node.js version 20 environment is used if the ‘--kind\` flag is
explicitly specified with a value of \`nodejs:20’ when creating or
updating an Action.

The following packages are pre-installed in the Node.js version 20
environment:

- [openwhisk](https://www.npmjs.com/package/openwhisk) - JavaScript
    client library for the OpenWhisk and OpenServerless platform.
    Provides a wrapper around the OpenWhisk and OpenServerless APIs.
