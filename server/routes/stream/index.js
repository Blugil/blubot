const stream = require('express').Router();
const axios = require('axios');
const config = require('../../../config.json');
const client = require('../../../bot/client');
const bot = require('../../../bot/bot');

let user_id = config.project_keys.user_id
let previousNotification = '';

//processes Twitch's GET request to activate the subscription and ensure my service is operational
stream.get('/', function(request, response) {
    let url = request.query;
    if (url['hub.topic'] == `https://api.twitch.tv/helix/streams?user_id=${user_id}`) {
        //need to send back the hub.challenge key in order to confirm backend service is operational
        response.send(url['hub.challenge']);
        //implement a callback feature
    }
    else {
        response.sendStatus(404);
    }
})

//processes when an update happens on the subscription and processes it
stream.post('/', function(request, response) {
    console.log('there was a POST request')
    if (request.headers['twitch-notification-id'] == " ") {
        //TODO: ACTUALLY SET UP DUPLICATE SYSTEM
        reseponse.sendStatus(409);
    }
    else {
        previousNotification = request.headers['twitch-notification-id']
        data = request.body.data;
        console.log(data.length);
        
        //tells the twitch bot to disconnect from the chat when the streamstate changes to null (stream offline)
        if (data.length == 0) {
            //checks if bot is connected before disconnecting
            console.log("Stream turned off, you don\'t have to go home but you cant stay here")
            if (client.readyState() == "OPEN") {
                //tries to disconnect the bot
                try {
                    //bot.disconnect(client); 
                } catch (error) {
                    console.error(error)
                }
            }    
        }
        //if the streamstate is anything other than null attempts to connect the bot
        else {
            //if bot not connected, connect
            console.log("Stream on!" + data)
            if (client.readyState() != "OPEN") {
                try {
                    //bot.connect(client);
                    //bot.clientConnected(client, axios);
                } catch (error) {
                    console.log(error)
                }   
            }
        }
        response.sendStatus(200);
    } 
})

module.exports = stream;
