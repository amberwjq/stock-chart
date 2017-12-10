var express = require('express');
var path = require('path');
var stylus =require('stylus');
var logger=require('morgan');
var bodyParser = require('body-parser');
var cookieParse = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function(app,config){
    function compile(str,path){
        return stylus(str).set('filename',path);
       }
       
       
app.use(express.static(path.join(config.rootPath, '/public')))
app.set('views', path.join(config.rootPath, '/public/views'));

app.use(stylus.middleware(
    {
        src: path.join(config.rootPath, '/public'),
        compile:compile
    }
));

app.use(logger('dev'));
app.use(cookieParse());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ cookie: { maxAge: 3600000 }, //60000 is 1 min
    secret: 'multivision',
    resave: false, 
    saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
}

