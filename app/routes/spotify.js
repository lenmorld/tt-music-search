let express = require('express');
let router = express.Router();
var request = require('request');

const SEARCH_TYPE = 'artist';
const NEW_RELEASES_LIMIT = 3;

let spotify = {
    client_id: '8d7962d9b8794506a9dc3323835add34',
    client_secret : '4c06625c1b2445c29dc8869f05805507',
    access_token: null
}

router.get('*',function (req, res) {
    res.json({"message": "Hello World"});
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



function getNewReleases(res) {
    // use the token to access the Spotify Web API
    var options = {
        url: `https://api.spotify.com/v1/browse/new-releases?country=CA&limit=${NEW_RELEASES_LIMIT}`,
        headers: {
            'Authorization': 'Bearer ' + spotify.access_token
        },
        json: true
    };

    request.get(options, function(error, response, body) {
        console.log(response.body.albums.items);
        res.json(JSON.stringify(response.body.albums.items));
    });
}


function getArtist(artistId, res) {
    // use the token to access the Spotify Web API

    var options = {
        url: `https://api.spotify.com/v1/artists/${artistId}`,
        headers: {
            'Authorization': 'Bearer ' + spotify.access_token
        },
        json: true
    };

    request.get(options, function(error, response, body) {
        // console.log(response.body);
        res.json(JSON.stringify(response.body));
    });
}


function searchArtists(query, res) {
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

function searchAlbums(artistId, res) {
    // use the token to access the Spotify Web API
    var options = {
        url: `https://api.spotify.com/v1/artists/${artistId}/albums?market=CA`,
        headers: {
            'Authorization': 'Bearer ' + spotify.access_token
        },
        json: true
    };

    request.get(options, function(error, response, body) {
        // console.log(response.body.items);
        res.json(JSON.stringify(response.body.items));
    });
}


function getAlbumDetails(albumId, res) {
    // use the token to access the Spotify Web API

    var options = {
        url: `https://api.spotify.com/v1/albums/${albumId}?market=CA`,
        headers: {
            'Authorization': 'Bearer ' + spotify.access_token
        },
        json: true
    };

    request.get(options, function(error, response, body) {
        // console.log(response.body);
        res.json(JSON.stringify(response.body));
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
                searchArtists(query, res);
            })
            .catch(function(err) {
                console.log("consume:", err);
                res.json({"error": err});
                // spotify.access_token = null;
            });
    } else {
        searchArtists(query, res);          // if token still good, search directly
    }
});


router.get('/artists/:id', function (req, res) {

    // const query = req.body.query;

    const artistId = req.params.id;

    if (!spotify.access_token) {
        console.log("GET TOKEN");

        getTokenPromise
            .then( function(token) {
                spotify.access_token = token;           // consume promise
                console.log("token: ", spotify.access_token);
                getArtist(artistId, res);
            })
            .catch(function(err) {
                console.log("consume:", err);
                res.json({"error": err});
                // spotify.access_token = null;
            });
    } else {
        getArtist(artistId, res);          // if token still good, search directly
    }
});

router.get('/albums/:id', function (req, res) {

    // const query = req.body.query;

    const artistId = req.params.id;

    if (!spotify.access_token) {
        console.log("GET TOKEN");

        getTokenPromise
            .then( function(token) {
                spotify.access_token = token;           // consume promise
                console.log("token: ", spotify.access_token);
                searchAlbums(artistId, res);
            })
            .catch(function(err) {
                console.log("consume:", err);
                res.json({"error": err});
                // spotify.access_token = null;
            });
    } else {
        searchAlbums(artistId, res);          // if token still good, search directly
    }
});


router.get('/details/:id', function (req, res) {

    // const query = req.body.query;
    const albumId = req.params.id;

    if (!spotify.access_token) {
        console.log("GET TOKEN");

        getTokenPromise
            .then( function(token) {
                spotify.access_token = token;           // consume promise
                console.log("token: ", spotify.access_token);
                getAlbumDetails(albumId, res);
            })
            .catch(function(err) {
                console.log("consume:", err);
                res.json({"error": err});
                // spotify.access_token = null;
            });
    } else {
        getAlbumDetails(albumId, res);          // if token still good, search directly
    }
});


router.get('/newrelease', function (req, res) {
    if (!spotify.access_token) {
        console.log("GET TOKEN");

        getTokenPromise
            .then( function(token) {
                spotify.access_token = token;           // consume promise
                console.log("token: ", spotify.access_token);
                getNewReleases(res);
            })
            .catch(function(err) {
                console.log("consume:", err);
                res.json({"error": err});
                // spotify.access_token = null;
            });
    } else {
        getNewReleases(res);          // if token still good, search directly
    }
});


module.exports = router;