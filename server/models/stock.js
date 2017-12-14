var mongoose =require('mongoose');
var Schema = mongoose.Schema;

var  stockSchema = new Schema(
{
  subject:String,
  detail:String

});
var Stock = mongoose.model('Stock', stockSchema);


Stock.find({}).exec(function(err, collection) {
if(collection.length === 0) {

  Stock.create({
    subject:"AAPL",
    },{
      subject:"FB", 
    });

 }
})

module.exports=Stock