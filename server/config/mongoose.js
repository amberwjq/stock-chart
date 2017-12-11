var mongoose =require('mongoose');
var Stock = require('../models/stock');


module.exports=function(config){

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
        // we're connected!
        console.log("Connected correctly to server "+config.db);
      });
 
       


}