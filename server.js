let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');

let port = 3001;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/spotify', require('./app/routes/spotify'));

app.listen(port, function () {
   console.log("Hello");
});