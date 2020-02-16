const followers = require('express').Router()
const client = require('../../../bot/client')
const bot = require('../../../bot/bot')

//processes Twitch's GET request to activate the subscription and ensure my service is operational
followers.get('/', function(request, response) {
    let url = request.query;
    if (url['hub.topic'] == 'https://api.twitch.tv/helix/users/follows?first=1&to_id=92988247') {
        //need to send back the hub.challenge key in order to confirm backend service is operational
        response.send(url['hub.challenge']);
    }
    else {
        response.sendStatus(404);
    }
})

followers.post('/', function(request, response) {
    //TODO: ACTUALLY SET UP DUPLICATE SYSTEM
    if (request.headers['twitch-notification-id'] == " ") {
        response.sendStatus(409)
    }
    //triggers if message is not a duplicate, tells bot to send message in the channel thanking them for following and includes their username so they see the message
    else {
        previousNotification = request.headers['twitch-notification-id'];
        bot.newFollower(client, request.body.data[0].from_name);
        console.log(`${request.body.data[0].from_name} just started following the stream, thank you! :)`);
        response.sendStatus(200);
    }
    
})

module.exports = followers;