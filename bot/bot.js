const client = require('../bot/client');
const axios = require('axios')
const config = require('../config.json');

class Bot {
    //add reminder toggle so the reminder toggle is instantiated when the class is
    constructor(self, client, axios, clientID) {
        this.self = self;
        this.client = client;
        this.axios = axios;
        this.streamData = "";
        this.client_id = clientID;
    }

    clientConnected(client, axios, address, port) {
        client.action('blugil', 'BlugilBot is now on, beep boop');
    
        axios.get('https://api.twitch.tv/kraken/streams/92988247', {headers: {
            'CLIENT-ID': this.client_id,
            'Accept': 'application/vnd.twitchtv.v5+json'},
        }).then(response => {
            this.streamData = response.data;
        }).catch(error => {
            console.log(error);
        })
    }

    //designed to send a message every x amount of seconds in the chat alternating between the two messages
    //@params reminder - a toggle between true and false to switch bewteen two messages
    reminderFunction(reminder) {
        if (this.client.readyState() == 'OPEN') {
    
            if (reminder) {
                this.client.action('blugil', 'Attention all gamers in chat this is a reminder to fix your posture, you look like a gremlin bent at 90º')
                reminder = !reminder
                return;
            }
            else {
                this.client.action('blugil', 'This is a broadcast to all hardcore gamers in chat, drink some water you fuckin raisin. When was the last time you got up to get some water, huh? Yeah that\'s what I thought.')
            }
        }
        //add function that cancels the timer
    }

    //sends a message in the chat when the subscribed stream gets a new follower
    newFollower(client, follower) {        
        if (client.readyState() == 'OPEN') {
            client.action('blugil', `Thank you for following the stream ${follower}! :)`);
        }
        else {
            console.log(`The stream was offline when ${follower} followed.`);
        }
    }

    //connects the client to the chat
    connect(client) {
        client.connect()
    }

    //disconnects the client from the chat
    disconnect(client) {
        client.disconnect()
    }

    uptime(client) {
        client.action('Blugil hasn\'t programmed me to do this yet, but I know he will soon!')
    }

    help(client) {
        client.action('blugil', 'Hi! The current working commands are: ...there are none it would seem')
    }

    get test() {
        return("bot instanced successfully")
    }
    
    //does not work, error: functions not defined within the scope
    messageHandler(target, context, msg, self) {
        if (self) {
            return
        }
    
        const command = msg.trim();
        //BUG: cannot call this.help and this.uptime, this is undefined and will need to be bound
        if (command === '!uptime') {
            //gets the time the stream was created
            try {
                this.uptime(client)
            } catch (error) {
                console.error(error)
            }
            
        }
        if (command === '!help') {
            try {
                this.help(client)
            } catch (error) {
                console.error(error)
            }
        }
    }
}

let bot = new Bot(client, axios, config.project_keys.client_id);

module.exports = bot;



/*

    let streamData = {};
    let reminder = true;

    //checks if the stream is online using the twitch streams api and then automatically connects the bot if it is and disconnected the bot if it isn't
    function botActive() {
        axios.get('https://api.twitch.tv/kraken/streams/92988247', {
            headers: {
                'CLIENT-ID': 'dxi0vha4sxoch7gd531gqcmtusgbe7',
                'Accept': 'application/vnd.twitchtv.v5+json'},
        }).then(response => {
            streamData = response.data;        
        }).catch(error => {
            console.log(error);
        })
        if (streamData.stream != null) {
            console.log('stream is live');

            //checks if bot is not connected to stream
            if(client.readyState() != 'OPEN') {
                try {
                    //connects the bot to chat
                    client.connect();
                    //starts the reminder function interval (!!!I think!!!)
                    reminderFunctionInterval;
                } catch(err) {
                    console.error(err);  
                }
            }
            else {
                console.log('bot is conected, stream is live');
            }
        }
        else if (streamData.stream == null) {
            console.log('stream is offline');

            //checks if the bot is currently connected to the stream
            if (client.readyState() == 'OPEN') {
                //disconnects the bot from chat
                client.disconnect();
                //stops the reminder function interval
                stopIntervalReminder();
            }
        }
    }

    if (command === '!uptime') {
        //gets the time the stream was created
        if (streamData.stream != null) {
            let streamStarted = new Date(streamData.stream.created_at)
            //gets the current time
            let currentTime = new Date()
            //compares the dates
            let uptime = (currentTime.getTime() - streamStarted.getTime());
            //turns seconds into comprehensive uptime
            let hours = uptime / 3600000
            let minutes = (uptime % 3600000) / 60000
            let seconds = ((uptime % 3600000) % 60000) / 1000
            //concatenates the time to something
            let total = hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds'
    
            //client.action('blugil', '@Blugil has been live for ' + total);
            console.log(total)
        }
        
    }
*/