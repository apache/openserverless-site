---
title: Python
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

## Creating and invoking Python actions

The process of creating Python actions is similar to that of other actions.
The following sections guide you through creating and invoking a single Python action,
and demonstrate how to bundle multiple Python files and third party dependencies.

1.Create a Python_app folder and then create a `package` directory.Now create a Python file with the following content inside our `packages/python`. For this example, the file name is `hello.py`.

  ```Python
#--web true
#--kind python:default

def main(args):
    name = args.get("name", "stranger")
    result = f"Hello {name}!"
    print(result)
    return {"greeting": result}

  ```

  The Python file might contain additional functions.
  However, by convention, a function called `main` must exist to provide the entry point for the action.

  Your directory structure should looks like this:

  ```shell
  Python_app
  └── packages
      └── Python
          └── hello.js

  ```
2. Run the following command to deploy the action
```bash
ops ide deploy
```

3. Ops will create the action automatically. For this example, the action is called `python/hello`.

  ```
  /home/openserverless/.ops/tmp/deploy.pid
  PID 278075
  > Scan:
  >> Action: packages/python/hello.js
  > Deploying:
  >> Package: python
  $ $OPS package update python 
  ok: updated package python
  >>> Action: packages/python/hello.js
  $ $OPS action update python/hello packages/python/hello.js --web true --kind python:default
  ok: updated action python/hello
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

  Note: To use a specific version of Python runtime, change the kind property `--kind python:3.11`, or `--kind python:3.12` in the `hello.py` file.

4. To invoke the action run the following command:

```bash
ops action invoke python/hello --param name Marina --result
```

## Packaging Python actions in zip files

Sometimes you action would be more complex and probably you prefer to create multiple file in order to organize better your code.

In this example we're creating a more complex python action.

1. Create a folder `complex_action` inside `packages/python` folder. Then create two python files

__main__.py
  ```Python
#--web true
#--kind python:default
import utils

def main(args):
    name = args.get("name", "stranger")
    result = utils.concat_string("Nice to meet you,",name)
    return {"greeting": result}

  ```

utils.py
  ```Python
def concat_string(first_string: str, second_string: str):
    return f"{first_string} {second_string}"
  ```

Note: The filename of the source file containing the entry point (e.g., `main`) must be `__main__.py`.

2. Deploy the action using `ide deploy`

```bash
ops ide deploy
```

3. Now you can invoke your action. In this case the action name is `python/complex_action`

```bash
ops action invoke python/complex_action --param name Marina --result
```

