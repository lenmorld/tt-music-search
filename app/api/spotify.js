let express = require('express');
let router = express.Router();
var request = require('request');

const SEARCH_TYPE = 'artist';
const NEW_RELEASES_LIMIT = 3;

let spotify = {
    client_id: '8d7962d9b8794506a9dc3323835add34',
    client_secret: '4c06625c1b2445c29dc8869f05805507',
    access_token: null
}


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

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            resolve(body.access_token);
        }
        else {
            reject(error);
        }
    });
});


function executeRequest(url, callback) {
    // use the token to access the Spotify Web API
    var options = {
        url: url,
        headers: {
            'Authorization': 'Bearer ' + spotify.access_token
        },
        json: true
    };

    request.get(options, function (error, response) {
        callback(response.body);
    });
}


function getNewReleases(res) {
    let url = `https://api.spotify.com/v1/browse/new-releases?country=CA&limit=${NEW_RELEASES_LIMIT}`;
    const returnAlbums = (body) => {
        res.json(JSON.stringify(body.albums.items));
    };
    executeRequest(url, returnAlbums);
}


function getArtist(artistId, res) {
    let url = `https://api.spotify.com/v1/artists/${artistId}`;
    const returnArtist = (artist) => {
        res.json(JSON.stringify(artist));
    };
    executeRequest(url, returnArtist);
}


function searchArtists(query, res) {
    let url = `https://api.spotify.com/v1/search?query=${query}&type=${SEARCH_TYPE}`;
    const returnArtists = (body) => {
        res.json(JSON.stringify(body.artists.items));
    };
    executeRequest(url, returnArtists);
}

function searchAlbums(artistId, res) {
    let url = `https://api.spotify.com/v1/artists/${artistId}/albums?market=CA`;
    const returnAlbums = (body) => {
        res.json(JSON.stringify(body.items));
    };
    executeRequest(url, returnAlbums);
}


function getAlbumDetails(albumId, res) {
    let url = `https://api.spotify.com/v1/albums/${albumId}?market=CA`;
    const returnAlbums = (album) => {
        res.json(JSON.stringify(album));
    };
    executeRequest(url, returnAlbums);
}


function getAuthTokenOrExecute(callback, requestParam, res) {

    if (!spotify.access_token) {
        console.log("GET TOKEN");

        getTokenPromise
            .then(function (token) {
                spotify.access_token = token;           // consume promise
                console.log("token: ", spotify.access_token);
                if (requestParam) {
                    callback(requestParam, res);
                } else {
                    callback(res);
                }
            })
            .catch(function (err) {
                console.log("auth error:", err);
                res.json({"error": err});
            });
    } else {
        if (requestParam) {                 // if token still good, execute request directly
            callback(requestParam, res);
        } else {
            callback(res);
        }
    }
}


router.post('/search', function (req, res) {
    const query = req.body.query;
    getAuthTokenOrExecute(searchArtists, query, res);
});


router.get('/artists/:id', function (req, res) {
    const artistId = req.params.id;
    getAuthTokenOrExecute(getArtist, artistId, res);

});

router.get('/albums/:id', function (req, res) {
    const artistId = req.params.id;
    getAuthTokenOrExecute(searchAlbums, artistId, res);

});


router.get('/details/:id', function (req, res) {
    const albumId = req.params.id;
    getAuthTokenOrExecute(getAlbumDetails, albumId, res);

});


router.get('/newrelease', function (req, res) {
    getAuthTokenOrExecute(getNewReleases, null, res);
});


module.exports = router;