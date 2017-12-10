var path = process.cwd();
var express = require('express');
var Stock = require('../models/stock');
module.exports=function(app){

    app.get('/', function(req, res){
        console.log(' list 应用首页的位置');
        res.sendFile(path + '/public/views/index.html');
    });
    
    /* restful api */
    app.get('/api/stocks', function (req, res, next) {
    console.log('in routes get api/stocks');
    Stock.find({})
        .exec(function(err, stocks){
            if(err){
                res.send(err);
            }          
            return res.send({success:true, stocks: stocks});
            });  
        });
    
    
    //删除后返回所有
    app.delete('/api/todo/:id', function (req, res, next) {
        Stock.findById(req.params.id, function (err, stock) {
            stock.remove(function (err, stock) {
                if (err) {
                    res.send(err);
                }
                Stock
                    .find({})
                    .exec(function (err, stocks) {
                        if (err) {
                            return res.send({success:false, reason: err});
                        }
                        return res.send({success:true, stocks: stocks});
                    });
            })
        })
    });
      
    //POST that create todo and return all todos
    app.post('/api/todo', function(req, res, next){
        console.log('IN API TODO');
        console.log(req.body.content);

        new Stock({
            subject : req.body.content,
           
        }).save(function(err){
            if(err){
                res.send(err);
            }
            Stock
                .find({})
                .exec(function(err, todos){
                    if(err){
                        return res.send({success:false, reason: err});
                    }
                    return res.send({success:true, stocks: todos});
                });
        })
    });


  

}