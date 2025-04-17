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

import type { kind } from "./types"
import { 
    getKindHeaderMD, handlePHPExtension,
    getDependecyRowMD, getTableHeader, getDependecyFile,
    } from './utils'
import { join } from 'path'
import { writeFile } from 'fs/promises'

const getNodeJSDependecies = async (runtime: string, kind: string) => {
    let mdFile = getTableHeader()
    
    //TODO define type for package.JSON
    const {dependencies} = JSON.parse(await getDependecyFile(runtime, kind, 'package.json'))
    for(const dependecy in dependencies) {
        mdFile += getDependecyRowMD({
            name: dependecy,
            version: dependencies[dependecy],
            docName: 'npm',
            docUrl: `https://npmjs.com/package/v/${dependencies[dependecy].replace('^','')}`
        })
    }
    return mdFile
}

const getPHPDependecies = async (runtime: string, kind: string) => {
    let mdFile = getTableHeader()
    const {require: dependencies} = JSON.parse(await getDependecyFile(runtime, kind, 'composer.json'))

    for(const dependecy in dependencies) {
        const version:string = dependencies[dependecy]
        mdFile += getDependecyRowMD({
            name: dependecy,
            version: version.replaceAll(/\|/g, '\\|'),
            docName: 'packagist',
            docUrl: `https://packagist.org/packages/${dependecy}#${version.split('|')[0]}`
        })
    }
    
    const dockerDependencies = await getDependecyFile(runtime, kind, 'Dockerfile') 
    const match = dockerDependencies.match(/install-php-extensions\s+\\\n((?:\s+\w+\s+\\\n)+)/)

    if (match) {
        match[1]!
            .split('\\\n')
            .filter((extension:string) => extension.length > 0)
            .forEach((extension:string) => {
                const trimExt = extension.trim()
                mdFile += getDependecyRowMD({
                    name: trimExt,
                    version: 'Latest*',
                    docName: 'PHP.net',
                    docUrl: handlePHPExtension(trimExt)
                })
            })
    }
    mdFile += '\n\n *Latest version available for current runtime version'
    return mdFile
}

const getPythonDependecies = async(runtime: string, kind: string) => {
    let mdFile = getTableHeader()
    
    const dependencies = (await getDependecyFile(runtime, kind, 'requirements.txt')).split('\n')
    for(const dependecy of dependencies) {
        const dependecyParts = dependecy.split('==')
        if(dependecyParts.length === 2) {
            const [name, version] = dependecyParts 
            mdFile += getDependecyRowMD({
                name: name || '',
                version: version || '',
                docName: 'PyPI',
                docUrl: `https://pypi.org/project/${name}/${version}`
            })
        }
    }
    return mdFile
}

export const getRuntimeDependecies = async (runtime: string, kind: string) => {
    let result
    switch(runtime) {
        case 'nodejs':
            result = await getNodeJSDependecies(runtime, kind)
            break
        case 'python':
            result = await getPythonDependecies(runtime, kind)
            break
        case 'php':
            result = await getPHPDependecies(runtime, kind)
            break
        default:
            console.log(`invalid runtime ${runtime}`)
            result = ''
    }
    return result
}

export const handleRuntimeKind = async (kind: kind, kindName: string, runtimeName: string, kindPath: string) => {
    const { image, default: kindDefault } = kind;
    const kindIndexPath = join(kindPath, '_index.md')
    const dependecies = await getRuntimeDependecies(runtimeName, image.tag.split('-')[0]!)
    let kindMD = getKindHeaderMD(kindName, kindDefault)
    kindMD += `\n\n${dependecies}`
    await writeFile(kindIndexPath, kindMD)
}