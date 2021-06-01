// Required modules
const express = require('express');
var fs = require('fs');
var path = require('path');
const bodyParser = require('body-parser');
const config = require('./config');
var authentication = require('./authenticate-controller');
var file = require('./fileupload-controller');
var register = require('./register-controller');

var app = express();

var port = process.env.PORT || 8012;

// Middleware functions
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, x-access-token, Content-Length, X-Requested-With,Content-Type,Accept");
    next();
});

//app.use(express.static(path.join(`${config.PTW_UPLOAD_EXTERNAL}`)));

app.use(bodyParser.urlencoded({
    extended: true
}));

// Routes
app.get('/index.html', function(req, res){
    res.sendfile(__dirname + '/' + 'index.html');
});
app.get('/api/register', register.register);
app.post('/api/upload', file.fileupload);
app.get('/api/readfile', file.fileupload);

app.listen(port, (req, res)=> {
    console.log("Server is listening on port ", port);
})