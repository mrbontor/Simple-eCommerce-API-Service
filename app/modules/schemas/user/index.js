const fs = require('fs');

module.exports = {
    POST: JSON.parse(fs.readFileSync(__dirname + '/post.json')),
    PUT: JSON.parse(fs.readFileSync(__dirname + '/put.json')),
    PATCH_PASSWORD: JSON.parse(fs.readFileSync(__dirname + '/patchPassword.json')),
    PATCH_ROLE: JSON.parse(fs.readFileSync(__dirname + '/patchRole.json')),
    PATCH_STATUS: JSON.parse(fs.readFileSync(__dirname + '/patchStatus.json'))
};
