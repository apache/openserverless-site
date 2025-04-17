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

import { describe, expect, it, jest, mock} from "bun:test";
import { 
    getRuntimes, getKindHeaderMD, getRuntimeHeaderMD, 
    getTableHeader, getDependecyRowMD, getKindName, 
    getDependecyFile, handlePHPExtension, 
} from '../lib/utils';
import type {OpsRuntimes, Dependecy } from '../lib/types'
import { readFile } from 'fs/promises';
import { join } from 'path';
import { Prefix, AttachmentName, AttachmentType } from "../lib/types";


describe('Utils', () => {
    const mockRuntimes: OpsRuntimes = {
        description: ["Test runtimes"],
        runtimes: {
            nodejs: [{
                kind: "nodejs:18",
                default: true,
                deprecated: false,
                image: { prefix: Prefix.Apache, name: "nodejs", tag: "18" },
                attached: { attachmentName: AttachmentName.Codefile, attachmentType: AttachmentType.TextPlain }
            }]
        },
        blackboxes: []
    };

    describe('getRuntimes', () => {
        it('should return parsed runtimes data', async () => {
            const mockJson = JSON.stringify(mockRuntimes);
            mock.module('fs/promises', () => ({
                readFile: () => Promise.resolve(mockJson)
              }));
            const result = await getRuntimes();
            expect(result).toEqual(mockRuntimes);
        });
    });

    describe('getKindHeaderMD', () => {
        it('should generate correct markdown header with default', () => {
            const result = getKindHeaderMD('NodeJS', true);
            expect(result).toContain('## NodeJS (default: true)');
        });

        it('should generate header without default', () => {
            const result = getKindHeaderMD('Python', false);
            expect(result).toContain('## Python (default: false)');
        });
    });

    describe('getRuntimeHeaderMD', () => {
        it('should format runtime name correctly', () => {
            const result = getRuntimeHeaderMD('phjs');
            expect(result).toContain('title: Phjs');
        });

        it('should handle uppercase conversion', () => {
            const result = getRuntimeHeaderMD('python3');
            expect(result).toContain('title: Python3');
        });
    });

    describe('getTableHeader', () => {
        it('should return correct markdown table headers', () => {
            const result = getTableHeader();
            expect(result).toBe('| Library | Version | Link |\n|------------|---------|------|\n');
        });
    });

    describe('getDependecyRowMD', () => {
        const mockDependency: Dependecy = {
            name: 'express',
            version: '4.18.2',
            docName: 'Express Docs',
            docUrl: 'https://expressjs.com/'
        };

        it('should generate correct markdown row', () => {
            const result = getDependecyRowMD(mockDependency);
            expect(result).toBe('| express | 4.18.2 | [Express Docs](https://expressjs.com/)  |\n');
        });
    });

    describe('getKindName', () => {
        it('should extract version from tag', () => {
            const result = getKindName('nodejs', '18-alpine');
            expect(result).toBe('nodejs:18');
        });

        it('should handle tags without hyphen', () => {
            const result = getKindName('python', '3.11');
            expect(result).toBe('python:3.11');
        });
    });

    describe('getDependecyFile', () => {
        it('should read correct dependency file', async () => {
            (join as jest.Mock).mockReturnValue('mocked/path');
            (readFile as jest.Mock).mockResolvedValue('{}');
            
            await getDependecyFile('nodejs', '18', 'dependencies.json');
            expect(join).toHaveBeenCalledWith('openserverless-runtimes', 'runtime', 'nodejs', '18', 'dependencies.json');
        });
    });

    describe('handlePHPExtension', () => {
        it('should return image URL for gd', () => {
            expect(handlePHPExtension('gd')).toBe('https://www.php.net/manual/en/book.image.php');
        });

        it('should handle PDO extensions', () => {
            expect(handlePHPExtension('pdo_mysql')).toBe('https://www.php.net/manual/en/ref.pdo-mysql.php');
        });

        it('should handle pecl extensions', () => {
            expect(handlePHPExtension('mongodb')).toBe('https://pecl.php.net/package/mongodb');
        });

        it('should return default documentation URL', () => {
            expect(handlePHPExtension('curl')).toBe('https://www.php.net/manual/en/book.curl.php');
        });
    });
});