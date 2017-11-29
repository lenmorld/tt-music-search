let express = require('express');
let path = require("path");
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');
let DIST_DIR = path.join(__dirname, "dist");

let port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get("/", function (req, res) {
    res.sendFile(path.join(DIST_DIR, "index.html"));
});


app.use('/spotify', require('./app/api/spotify'));

app.listen(port, function () {
   console.log("Node-express server is running at ", port);
});