// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

export type OpsRuntimes = {
    description: string[];
    runtimes: Runtimes;
    blackboxes: Blackbox[];
}

export type Blackbox = {
    prefix: Prefix;
    name: string;
    tag: string;
}

export enum Prefix {
    Apache = "apache",
    GhcrIoNuvolaris = "ghcr.io/nuvolaris",
    Openwhisk = "openwhisk",
}

export type Runtimes = {
    [key: string]: kind[];
}

export type kind = {
    kind: string;
    default: boolean;
    deprecated: boolean;
    requireMain?: boolean;
    image: Blackbox;
    attached?: Attached;
    stemCells?: StemCell[];
}

export type Attached = {
    attachmentName: AttachmentName;
    attachmentType: AttachmentType;
}

export enum AttachmentName {
    Codefile = "codefile",
}

export enum AttachmentType {
    TextPlain = "text/plain",
}

export type StemCell = {
    initialCount: number;
    memory: string;
    reactive: Reactive;
}

export type Reactive = {
    minCount: number;
    maxCount: number;
    ttl: string;
    threshold: number;
    increment: number;
}

export type Dependecy = {
    name: string;
    version: string;
    docName: string;
    docUrl: string;
}
