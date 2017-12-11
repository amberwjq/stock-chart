<<<<<<< HEAD
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const mongo = require('mongodb').MongoClient;
=======
var express = require('express'),

    mongoose =require('mongoose')
>>>>>>> cb9575eedb47c390c2f85882f6deb97a884bffdc



//an environment variable that I can determine I'm in dev mode or production mode
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
<<<<<<< HEAD
=======
var app = express();
>>>>>>> cb9575eedb47c390c2f85882f6deb97a884bffdc
var config = require('./server/config/config')[env]

require('./server/config/express')(app,config);

<<<<<<< HEAD
mongo.connect(config.db, function(err, db){
    if(err){
        throw err;
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

    // Create function to send status


    // Get chats from mongo collection
    findAndReturnAll();
    

    // Handle input events
    socket.on('input', function(data){
        let subject = data.content;
        if(subject == ''){
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
        console.log(subject);
        stock.remove({"subject": subject},function(err, doc){
            console.log(err);
            
            if (err) { return sendError(res,err) }
            else{ findAndReturnAll();}
        });
        // Remove all chats from collection
        // stock.find({_id:id}, function (err, stock) {
        //     stock.remove(function (err, stock) {
        //     if(err) console.log(err);
        //     });
        //     findAndReturnAll();

        // });

    });
});    
});


 
=======
require('./server/config/mongoose')(config);
>>>>>>> cb9575eedb47c390c2f85882f6deb97a884bffdc

require('./server/config/route')(app);


<<<<<<< HEAD

server.listen(config.port);
=======
var port=
app.listen(config.port);
>>>>>>> cb9575eedb47c390c2f85882f6deb97a884bffdc
console.log('Listen on port    ' + config.port +'.....');