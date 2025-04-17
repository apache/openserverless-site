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

import { readFile } from 'fs/promises'
import type { OpsRuntimes, Dependecy } from './types'
import { join } from 'path'

export const getRuntimes = async () => {
    const filePath = 'openserverless-task/runtimes.json'
    try {
        const data = await readFile(filePath, 'utf-8')
        const result:OpsRuntimes = JSON.parse(data)
        return result
    } catch (error) {
        console.error('Error reading runtimes.json:', error)
    }
}

export const getKindHeaderMD = (name: string, isDefault: Boolean) => {
    return `---\ntitle: ${name}\ndescription: \nweight: 50\n---\n## ${name} (default: ${isDefault})`
}

export const getRuntimeHeaderMD = (name: string) => {
    //expand phjs regex to include more runtimes
    const formattedName = name.replace(/\b\w{1}|[phjs]{2,}/gi, match => match.toUpperCase())
    return `---\ntitle: ${formattedName}\ndescription: \nweight: 50\n---\n`
}

export const getTableHeader = () => {
    let header = '| Library | Version | Link |\n'
    header += '|------------|---------|------|\n'
    return header
}

export const getDependecyRowMD = (dependecy: Dependecy) => {
    const {name, version, docName, docUrl} = dependecy
    return `| ${name} | ${version} | [${docName}](${docUrl})  |\n`
}

export const getKindName = (runtime: string, tag: string) => {
    return `${runtime}:${tag.split('-')[0]}`
}


export const getDependecyFile = async (runtime: string, kind: string, dependecyFileName: string) => {
    const dependecyPath = join('openserverless-runtimes','runtime', runtime, kind, dependecyFileName)
    return await readFile(dependecyPath, 'utf-8')
}

export const handlePHPExtension = (extension: string) => {
    let url = '';
    if (extension === "gd") {
        url = "https://www.php.net/manual/en/book.image.php";
    } else if (/^pdo_/.test(extension)) {
        url = `https://www.php.net/manual/en/ref.pdo-${extension.slice(4).toLowerCase()}.php`;
    } else if (/^(mongodb|redis)$/.test(extension)) {
        url = `https://pecl.php.net/package/${extension}`;
    } else {
        url = `https://www.php.net/manual/en/book.${extension.toLowerCase()}.php`;
    }
    return url;
}
