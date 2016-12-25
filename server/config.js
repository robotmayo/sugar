const nconf = require('nconf');
nconf.file(require('path').resolve(__dirname, 'config.json'));
module.exports = nconf;
