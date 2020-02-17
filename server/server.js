const express = require('express')
const routes = require('./routes')
const client = require('../bot/client')
const bot = require('../bot/bot')
const app = express()

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

app.use('/', routes);

//starts up the server
app.listen(8080, function() {
    console.log('server started up');
})
//console.log('server is running');

//all the bot stuff
client.on('message', bot.messageHandler);
bot.connect(client);