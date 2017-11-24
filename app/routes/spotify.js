let express = require('express');
let router = express.Router();
var request = require('request');

router.get('/',function (req, res) {
    res.json({"message": "Hello World"});
});


// Spotify credentials
const client_id = '8d7962d9b8794506a9dc3323835add34';
const client_secret = '4c06625c1b2445c29dc8869f05805507';

// auth parameters
const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};


router.get('/search', function (req, res) {
    const SEARCH_TYPE = 'artist';
    const SEARCH_QUERY = 'The Head and the Heart';

    // sample post using token
    request.post(authOptions, function(error, response, body) {
        console.log("body", body);
        if (!error && response.statusCode === 200) {

            console.log(body.access_token);

            // use the access token to access the Spotify Web API
            var token = body.access_token;
            var options = {
                url: `https://api.spotify.com/v1/search?query=${SEARCH_QUERY}&type=${SEARCH_TYPE}`,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
            request.get(options, function(error, response, body) {
                console.log(response.body.artists.items);
                res.json(JSON.stringify(response.body.artists.items));
            });
        }
        else {
            console.log(error);
        }
    });

});



module.exports = router;