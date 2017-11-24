let express = require('express');
let router = express.Router();
var request = require('request');

const SEARCH_TYPE = 'artist';

let spotify = {
    client_id: '8d7962d9b8794506a9dc3323835add34',
    client_secret : '4c06625c1b2445c29dc8869f05805507',
    access_token: null
}

router.get('/',function (req, res) {
    res.json({"message": "Hello World"});
});


router.get('/newrelease', function (req, res) {
    res.json(
        JSON.stringify([
            { name: "Bob Marley", id: "1", albums: [{name: "Exodus", year: 1977}] },
            { name: "Queen", id: "2"},
            { name: "Matchbox 20", id: "3"},
            { name: "Foo Fighters", id: "4"},
            { name: "Blink 182", id: "5"},
            { name: "The Head and the Heart", id: "6"},
            { name: "Keane", id: "7"},
            { name: "Arctic Monkeys", id: "8"},
            { name: "3 Doors Down", id: "9"},
        ])
    );
});


// create Promise for getting token
let getTokenPromise = new Promise(function (resolve, reject) {
    // auth parameters
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(spotify.client_id + ':' + spotify.client_secret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("inside promise: ", body.access_token);
            resolve(body.access_token);
        }
        else {
            console.log("inside promise: ", error);
            reject(error);
        }
    });
});



function search(query, res) {
    // use the token to access the Spotify Web API
    var options = {
        url: `https://api.spotify.com/v1/search?query=${query}&type=${SEARCH_TYPE}`,
        headers: {
            'Authorization': 'Bearer ' + spotify.access_token
        },
        json: true
    };

    request.get(options, function(error, response, body) {
        // console.log(response.body.artists.items);
        res.json(JSON.stringify(response.body.artists.items));
    });
}


router.post('/search', function (req, res) {

    const query = req.body.query;

    if (!spotify.access_token) {
        console.log("GET TOKEN");

        getTokenPromise
            .then( function(token) {
                spotify.access_token = token;           // consume promise
                console.log("token: ", spotify.access_token);
                search(query, res);
            })
            .catch(function(err) {
                console.log("consume:", err);
                res.json({"error": err});
                // spotify.access_token = null;
            });
    } else {
        search(query, res);          // if token still good, search directly
    }
});



module.exports = router;