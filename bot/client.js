const tmi = require('tmi.js');
const config = require('../config.json');

//sets up a new tmi client
let client = new tmi.client(config.bot);
module.exports = client;