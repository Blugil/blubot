const routes = require('express').Router();
const stream = require('./stream');
const followers = require('./followers');

//routes links to followers and stream
routes.use('/followers', followers)
routes.use('/stream', stream)       // to support JSON-encoded bodies

//confirms subscription with no specific route
routes.get('/', function(request, response) {
    let url = request.query;
    response.send(url['hub.challenge']);
})

module.exports = routes;