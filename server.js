var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const mongo = require('mongodb').MongoClient;
var path = process.cwd();
var cts = require('check-ticker-symbol');

//an environment variable that I can determine I'm in dev mode or production mode
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./server/config/config')[env]

require('./server/config/express')(app,config);

mongo.connect(config.db, function(err, db){
    if(err){
        console.log(err);
    }

    console.log('MongoDB connected...');
 // Connect to Socket.io
    io.on('connection', function(socket){
    let stock = db.collection('stocks');
    function findAndReturnAll(){
        stock.find().toArray(function(err, res){
            if(err){
                throw err;
            }
            console.log("stoc find    "+ res);
            // Emit the messages
            io.emit('output', res);
        });
    };

    // Get chats from mongo collection
    findAndReturnAll();
    

    // Handle input events
    socket.on('input', function(data){
        let subject = data.content;
        if((subject == '')||(! cts.valid(subject))){
            // Send error status
            sendStatus('Please enter a name and message');
        } else {
            // Insert message
            stock.insert({subject:subject}, function(){
                findAndReturnAll();
                
            });
        }
    });

    // Handle clear
    socket.on('clear', function(subject){
        stock.remove({"subject": subject},function(err, doc){           
            if (err) { return sendError(res,err) }
            else{ findAndReturnAll();}
        });
    });
});    
});

app.get('/', function(req, res){
    console.log(' list 应用首页的位置');
    res.sendFile(path + '/public/views/index.html');
});



server.listen(config.port);
console.log('Listen on port    ' + config.port +'.....');