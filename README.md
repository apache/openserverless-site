<!--
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
-->

# Apache OpenServerless documentation

The Apache OpenServerless website uses [Hugo](https://gohugo.io) and [Docsy](https://www.docsy.dev/) to build static 
HTML and related resources.


## Prerequisites
- Ensure to have a recent nodejs and npm version or use [Nix](https://nix.dev/) to get dependencies (we provide a
  shell.nix)
- Install [Taskfile](https://taskfile.dev/installation/)
- Clone repository
    - `git clone https://github.com/apache/openserverless-site.git`
    - `npm install`

## Preview

- Start Hugo Server
    - `task preview`
- Open Browser Preview
    - http://localhost:1313/

## Task and Tools updates

The documentation for [OpenServerless Tasks](https://github.com/apache/openserverless-task/) and 
[OpenServerless Tools](https://github.com/apache/openserverless-cli/) is automatically extracted from the
respective repositories.

Is possible to align task and tools using these commands:

- Tasks 
  - `task import-task`

- Tools
  - `task import-tools`

### Web site build

- Run Hugo Build
    - `task build`

### Publish

The Apache OpenServerless website uses [GitHub Actions](https://docs.github.com/en/actions) and
[Apache Software Foundation Infrastructure](https://infra.apache.org/project-site.html) configuration for automated
publishing. 