const fs = require('fs');

module.exports = {
    POST: JSON.parse(fs.readFileSync(__dirname + '/post.json')),
    PUT: JSON.parse(fs.readFileSync(__dirname + '/put.json')),
    GET: JSON.parse(fs.readFileSync(__dirname + '/get.json'))
};
