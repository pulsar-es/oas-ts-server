/**
 * @author Jonas Tomanga <celleb@mrcelleb.com>
 * @copyright (c) 2020 Jonas Tomanga
 * All rights reserved
 */

'use strict';

const fs = require('fs');

console.log('copy spec to public folder');

fs.copyFileSync(
    __dirname + '/../openapi-nodegen-api-file.yml',
    __dirname + '/../public/latest.json'
);
