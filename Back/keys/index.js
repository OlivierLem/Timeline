const fs = require('node:fs');

module.export = {
    key: fs.readFileSync(`${__dirname}/jwtRS256.key`),
    keyPub: fs.readFileSync(`${__dirname}/jwtRS256.key.pub`)
}