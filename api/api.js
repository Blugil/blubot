const axios = require('axios');
const config = require('../config.json');

let client_id = config.project_keys.client_id;
let client_secret = config.project_keys.client_secret;
let user_id = config.project_keys.user_id;
let callback = config.development.callback;

// grabs the list of all open subscriptions of a given user, needs auth token from above function
function getSubscriptionsList() {

    //sends twitch a post request containing clidnt id and client secret, expecting an access token in response
    axios.post(`https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`).then(function(response) {

        // then uses that response to make a get request for the subscriptions list with that access token in the headers
        axios.get('https://api.twitch.tv/helix/webhooks/subscriptions', {
            headers: {
                'Authorization': `Bearer ${response.data.access_token}`
            }
        }).then(function(response) {
            //l ogs that response which is the subscriptions list
            console.log(response.data);
        // catches any errors and logs them from the GET request
        }).catch(function(error) {
            console.error(error);
            
        })
    // catches any errors and logs them from the POST request
    }).catch(function(error) {
        console.error(error);
    })

}



/* 
    generic function for making any subscription request
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


getSubscriptionsList();

// subscription quest to new followers
//subscriptionRequest(callback + "followers", 'subscribe', `https://api.twitch.tv/helix/users/follows?first=1&to_id=${user_id}`, 100000);

// subscription request to change in stream state
//subscriptionRequest(callback + "stream", 'subscribe', `https://api.twitch.tv/helix/streams?user_id=${user_id}`, 100000);
