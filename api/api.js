const axios = require('axios');
const config = require('../config.json');

let client_id = config.project_keys.client_id;
let client_secret = config.project_keys.client_secret;
let user_id = config.project_keys.user_id;
let callback = config.development.callback;

//grabs user auth token when in need of more secure data from twitch
function authToken() {
    axios.post(`https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`).then(function(response) {

        console.log(response.data);
        
    }).catch(function(error) {
        console.error(error);
        
    })
}

//grabs the list of all open subscriptions of a given user, needs auth token from above function
//@params authtoken - the bearer auth token for grabbing more personal information
function getSubscriptionsList(authToken) {
    axios.get('https://api.twitch.tv/helix/webhooks/subscriptions', {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    }).then(function(response) {
        console.log(response.data);
        
    }).catch(function(error) {
        console.error(error);
        
    })
}

/*  generic function for making any subscription request
    @param callback - the api which twitch will be making a GET request to to ensure the service works
    @param mode - subscribe/unsubscribe to the subscription
    @param topic - the information (link) being subscribed to
    @param lease_seconds - how long the subscription will last in miliseconds, up to 864,000,000ms
*/
function subscriptionRequest(callback, mode, topic, lease_seconds) {

    axios.post('https://api.twitch.tv/helix/webhooks/hub', { 
        'hub.callback': callback,
        'hub.mode': mode,
        'hub.topic': topic,
        'hub.lease_seconds': lease_seconds,
        },
        {
        headers: {
            'CLIENT-ID': client_id,
        }
    }).then(function(response) {
        let code = response.status
        console.log(code);
    }).catch(function(error) {
        console.error(error);
    })
}

//subscription quest to new followers
subscriptionRequest(callback, 'subscribe', `https://api.twitch.tv/helix/users/follows?first=1&to_id=${user_id}`, 100000);

//subscription request to change in stream state
subscriptionRequest(callback, 'subscribe', `https://api.twitch.tv/helix/streams?user_id=${user_id}`, 100000);
