var express = require('express'),

    mongoose =require('mongoose')



//an environment variable that I can determine I'm in dev mode or production mode
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var config = require('./server/config/config')[env]

require('./server/config/express')(app,config);

require('./server/config/mongoose')(config);

require('./server/config/route')(app);


var port=
app.listen(config.port);
console.log('Listen on port    ' + config.port +'.....');