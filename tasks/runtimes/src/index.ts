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

import { getKindName, getRuntimes, getRuntimeHeaderMD } from './lib/utils'
import { handleRuntimeKind } from './lib/runtimes'
import { normalize, join} from 'path'
import { mkdir, writeFile,  } from 'fs/promises'

const validRuntimes = ['nodejs', 'php', 'python']


const main = async () => {
    try {        
        const runtimes = await getRuntimes()
        if(!runtimes) {
            console.error('No runtimes found')
            return
        }
        const promises: any[] = []
        for(const runtimeName in runtimes?.runtimes) {
            if(validRuntimes.includes(runtimeName)) {
                const kinds = runtimes?.runtimes[runtimeName]
                const docRuntimesPath = normalize('content/en/docs/reference/runtimes')
                const runtimePath = join(docRuntimesPath,runtimeName)
                //remove invalid kinds
                const validKinds = kinds!.filter((kind) => {
                    const {image} = kind
                    return image.prefix === "apache" && image.tag?.trim() !== ''
                })
                if(validKinds.length > 0 ) {
                    for(const validKind of validKinds) {
                        const kindName = getKindName(runtimeName, validKind.image.tag)
                        const kindPath = join(runtimePath, kindName)
                        await mkdir(kindPath, {recursive: true})
                        promises.push(handleRuntimeKind(validKind,kindName,runtimeName,kindPath))
                    }
                    validKinds.forEach(async (kind) => {
                    })
                    // Removed. It's override language guides
                    // promises.push(
                    //     writeFile(
                    //         join(runtimePath, '_index.md'),
                    //         getRuntimeHeaderMD(runtimeName)
                    //     )
                    // )
                }
            } else {
                console.log(`Skip ${runtimeName}`)
            }
        }
        await Promise.all(promises)
    } catch (error) {
        console.error(error)
        return 1
    }
    return 0
}


// *** Main ***
main().then((res) => {
    process.exit(res);
});