const fs = require('fs');

module.exports = {
    POST: JSON.parse(fs.readFileSync(__dirname + '/post.json'))
};
