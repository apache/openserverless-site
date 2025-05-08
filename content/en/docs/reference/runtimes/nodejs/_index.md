---
title: NodeJS
description: 
weight: 50
---

<!--
#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
-->

## Creating and invoking JavaScript actions

The process of creating JavaScript actions is similar to that of other actions.
The following sections guide you through creating and invoking a single JavaScript action,
and demonstrate how to bundle multiple JavaScript files and third party dependencies.

1. Create a package `directory`. Create a JavaScript file with the following content inside our `packages/nodejs`. For this example, the file name is `hello.js`.

  ```javascript
  //--web true
  //--kind nodejs:default
  function main() {
      return { msg: 'Hello world' };
  }
  ```

  The JavaScript file might contain additional functions.
  However, by convention, a function called `main` must exist to provide the entry point for the action.

  You directory structure should looks like this:

  ```shell
  nodejs_app
  └── packages
      └── nodejs
          └── hello.js

  ```

2. Create an action from the following JavaScript function. For this example, the action is called `hello`.

  ```
  /home/openserverless/.ops/tmp/deploy.pid
  PID 278075
  > Scan:
  >> Action: packages/nodejs/hello.js
  > Deploying:
  >> Package: nodejs
  $ $OPS package update nodejs 
  ok: updated package nodejs
  >>> Action: packages/nodejs/hello.js
  $ $OPS action update nodejs/hello packages/nodejs/hello.js --web true --kind nodejs:default
  ok: updated action nodejs/hello
  build process exited with code 0
  UPLOAD ASSETS FROM web
  ==================| UPLOAD RESULTS |==================
  | FILES      : 0
  | COMPLETED  : 0
  | ERRORS     : 0
  | SKIPPED    : 0
  | EXEC. TIME : 2.37 ms
  ======================================================
  URL: http://opstutorial.localhost:80
  ```

  Note: To use a specific version of NodeJs runtime, change the kind property `--kind nodejs:18`, or `--kind nodejs:20` in the `hello.js` file.



## Creating asynchronous actions

JavaScript functions that run asynchronously may need to return the activation result after the `main` function has returned. You can accomplish this by returning a Promise in your action.

1. Save the following content in a file called `asyncAction.js` inside the folder `packages/nodejs`.

  ```javascript
  //--web true
  //--kind nodejs:default
  function main(args) {
       return new Promise(function(resolve, reject) {
         setTimeout(function() {
           resolve({ done: true });
         }, 2000);
      })
   }
  ```

  Notice that the `main` function returns a Promise, which indicates that the activation hasn't completed yet, but is expected to in the future.

  The `setTimeout()` JavaScript function in this case waits for two seconds before calling the callback function.  This represents the asynchronous code and goes inside the Promise's callback function.

  The Promise's callback takes two arguments, resolve and reject, which are both functions.  The call to `resolve()` fulfills the Promise and indicates that the activation has completed normally.

  A call to `reject()` can be used to reject the Promise and signal that the activation has completed abnormally.

2. Run the following commands to create the action and invoke it:

  ```
  ops ide deploy
  ```
  ```
  ops action invoke nodejs/asyncAction --result
  ```
  ```json
  {
      "done": true
  }
  ```

  Notice that you performed a blocking invocation of an asynchronous action.

3. Fetch the activation log to see how long the activation took to complete:

  ```
  ops activation list --limit 1 nodejs/asyncAction
  ```
<pre>
Datetime            Activation ID                    Kind      Start Duration   Status  Entity
2024-03-27 19:46:43 64581426b44e4b3d981426b44e3b3d19 nodejs:21  cold  2.033s     success openserverless/asyncAction:0.0.1
</pre>
  ```
  ops activation get 64581426b44e4b3d981426b44e3b3d19
  ```
 ```json
  {
      ...
      "start": 1743101268649,
      "end":   1743101270964,
      ...
  }
 ```

  Comparing the `start` and `end` time stamps in the activation record, you can see that this activation took slightly over two seconds to complete.

## Using actions to call an external API

The examples so far have been self-contained JavaScript functions. You can also create an action that calls an external API.

This example invokes a Yahoo Weather service to get the current conditions at a specific location.

1. Save the following content in a file called `weather.js`.

  ```javascript
  const fetch = require('node-fetch')

  const getWeatherForecast = async (latitude, longitude) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Error during the request')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error:', error)
      return JSON.Stringify(error)
    }
  };

  function main(args) {
    const {latitude, longitude} = args

    return await getWeatherForecast(latitude, longitude)
  }
  ```

  Note that the action in the example uses a Node.js library to fetch forecast data. However, you can use a library available in runtime dependencies or you can add a package.json file and specify the action's dependencies.

  Check a specific version of the Node.js runtime for packages available in the runtime environment.

  This example also shows the need for asynchronous actions. The action returns uses 'async/await' to fetch the data from another system. When the action is completed, the action will return the values from the other sistem.

2. Create an action from the `weather.js` file:

  ```
  ops ide deploy
  ```

3. Use the following command to run the action, and observe the output:
  ```
  ops action invoke nodejs/weather --param latitude "51.509865" --param longitude "-0.118092" --result
  ```

  Using the `--result` flag means that the value returned from the action is shown as output on the command-line:

  ```json
{
    "elevation": 21,
    "generationtime_ms": 0.03039836883544922,
    "hourly": {
        "temperature_2m": [
            12.8,
            12.9,
            ...
        ],
        "time": [
            "2025-03-27T00:00",
            "2025-03-27T01:00",
            ...
        ]
    },
    "hourly_units": {
        "temperature_2m": "°C",
        "time": "iso8601"
    },
    "latitude": 51.5,
    "longitude": -0.120000124,
    "timezone": "GMT",
    "timezone_abbreviation": "GMT",
    "utc_offset_seconds": 0
}
  ```

This example also passed a parameter to the action by using the `--param` flag and a value that can be changed each time the action is invoked. 

## Packaging actions as Node.js modules with NPM libraries

Instead of writing all your action code in a single JavaScript source file, actions can be deployed from a zip file containing a [Node.js module](https://nodejs.org/docs/latest-v10.x/api/modules.html#modules_modules).

Archive zip files are extracted into the runtime environment and dynamically imported using `require()` during initialisation. **Actions packaged as a zip file MUST contain a valid `package.json` with a `main` field used to denote the [module index file](https://nodejs.org/docs/latest-v10.x/api/modules.html#modules_folders_as_modules) to return.**

`ops ide deploy` will include automatically `node_modules` folder in a zip file means external NPM libraries can be used on the platform.

Note: remember that each runtime has a set of dependecies already installed. if it's possible use this set of libraries. It's better to don't load too much external libraries because it will deteriorate the action's performance

### Simple Example

- Create a folder called `packageAction` inside packages/nodejs folder

- Create the following `package.json` file:

```json
{
  "name": "my-action",
  "main": "index.js",
  "dependencies" : {
    "left-pad" : "1.1.3"
  }
}
```

- Create the following `index.js` file:

```javascript
//--web true
//--kind nodejs:default
const leftPad = require("left-pad")
function main (args) {
  const lines = args.lines || [];
  return { padded: lines.map(l => leftPad(l, 30, ".")) }
}
```

- Now you should have this folder structure:

  ```shell
  nodejs_app
  └── packages
      └── nodejs
          └── packageAction
             ├── hello.js
             └── package.json
  ```

- Create the action 

```
ops ide deploy
```

When creating an action from a folder, `ops ide deploy` will create automatically the following artifacts: 
- node_modules
- package-lock.json
- \<foldername\>.zip

the zip fill is used by `ops` to create/update the function in your ops environment

- Invoke the action as normal.

```
ops action invoke nodejs/packageAction --param lines "[\"and now\", \"for something completely\", \"different\" ]" --result 
```
```json
{
    "padded": [
        ".......................and now",
        "......for something completely",
        ".....................different"
    ]
}
```

## Using JavaScript Bundlers to package action source files

Using a JavaScript module bundler can transform application source files (with external dependencies) into a single compressed JavaScript file. This can lead to faster deployments, lower cold-starts and allow you to deploy large applications where individual sources files in a zip archive are larger than the action size limit.

Here are the instructions for how to use three popular module bundlers with the Node.js runtime. The "left pad" action example will be used as the source file for bundling along with the external library.

### Using rollup.js 

In this example we will use [rollupjs](https://rollupjs.org) to deliver the action

- Create rollupAction folder inside packages/nodejs. Then re-write the `index.js` to use ES6 Modules, rather than CommonJS module format.
Create the `package.json` and copy the content from the previous example 


```javascript
import leftPad from 'left-pad';

function myAction(args) {
  const lines = args.lines || [];
  return { padded: lines.map(l => leftPad(l, 30, ".")) }
}

export const main = myAction
```

*Make sure you export the function using the `const main = ...` pattern. Using `export {myAction as main}` does not work due to tree-shaking. See this [blog post](https://boneskull.com/rollup-for-javascript-actions-on-openwhisk/) for full details on why this is necessary.*

- Create the Rollup.js configuration file in `rollup.config.js` with the following contents.

```javascript
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
```

Note: run the following command inside the rollupAction folder

- Install the Rollup.js library and plugins using NPM.

```
npm install rollup rollup-plugin-commonjs rollup-plugin-node-resolve --save-dev 
```

- Run the Rollup.js tool using the configuration file.

```
npx rollup --config 
```

- Create an action using the bundle source file.

```
ops action create nodejs/rollupAction bundle.js --kind nodejs:20
```

- Invoke the action as normal. Results should be the same as the example above.

```
ops action invoke nodejs/rollupAction --result --param lines "[\"and now\", \"for something completely\", \"different\" ]"
```

### Using webpack 

In this example we will use [webpack](https://webpack.js.org/) to deliver the action

- Create webpackAction folder inside packages/nodejs. Then re-write the `index.js` to export the `main` function using as a global reference.
 Then, create the `package.json` and copy the content from the previous example 


```javascript
const leftPad = require('left-pad');

function myAction(args) {
  const lines = args.lines || [];
  return { padded: lines.map(l => leftPad(l, 30, ".")) }
}

global.main = myAction
```

This allows the bundle source to "break out" of the closures Webpack uses when defining the modules.

- Create the Webpack configuration file in `webpack.config.js` with the following contents.

```javascript
module.exports = {
  entry: './index.js',
  target: 'node',
  output: {
    filename: 'bundle.js'
  }
};
```

- Install the Webpack library and CLI using NPM.

```
npm install webpack-cli --save-dev
```

- Run the Webpack tool using the configuration file.

```
npx webpack --config webpack.config.js
```

- Create an action using the bundle source file.

```
ops action create nodejs/webpackAction dist/bundle.js --kind nodejs:21
```

- Invoke the action as normal. Results should be the same as the example above.

```
ops action invoke nodejs/webpackAction --result --param lines "[\"and now\", \"for something completely\", \"different\" ]"
```

<!-- ### Using parcel ([https://parceljs.org/](https://parceljs.org/))

In this example we will use [parceljs](https://parceljs.org) to deliver the action

- Create parcelAction folder inside packages/nodejs. Create the `package.json` and copy the content from the previous example 
 Then, create the `index.js` and export the `main` function using as a global reference.

```javascript
const leftPad = require('left-pad');

function myAction(args) {
  const lines = args.lines || [];
  return { padded: lines.map(l => leftPad(l, 30, ".")) }
}

global.main = myAction
```

This allows the bundle source to "break out" of the closures Parcel uses when defining the modules.

- Install the Parcel library using NPM.

```
npm install parcel-bundler --save-dev
```

- Run the Parcel tool using the configuration file.

```
 npx parcel index.js
```

- Create an action using the bundle source file.

```
ops action create nodejs/parcelAction dist/index.js --kind nodejs:21
```

- Invoke the action as normal. Results should be the same as the example above.

```
ops action invoke nodejs/parcelAction --result --param lines "[\"and now\", \"for something completely\", \"different\" ]"
``` -->

