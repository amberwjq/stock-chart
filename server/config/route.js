var path = process.cwd();
var express = require('express');
var Stock = require('../models/stock');
var app = express();
var server = require('http').Server(app);
var request = require("request-promise");


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
    app.get('/api/stock/:id', function (req, res, next) {
        var stockName =req.params.id;
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        endDate=year+"-"+month+"-"+date;
        lastyear= year -1;
        startDate=lastyear+"-"+month+"-"+date;
        var url="https://www.quandl.com/api/v3/datasets/WIKI/"+stockName+".json?start_date="+startDate+"&end_date="+endDate+"&order=asc";
        console.log(url);
        var options = { method: 'GET',
        json: true,
        url: url,
        qs: { api_key: '6DrHStsg9J3zox3gtZTb' },
        headers: 
         { 'postman-token': 'ce1eedeb-402f-47c5-e805-47624d82777e',
           'cache-control': 'no-cache' } };
      
           request(options)
           .then(function (response) {
              
             // Request was successful, use the response object at will
             if(response.StatusCodeError == 404){
                
            }
            var data=[];
                var dailyData =response.dataset.data;
                for (var i in dailyData){
                    var tempArray=[];
                    
                    var myDate = new Date(dailyData[i][0]);
                    var result = myDate.getTime();
                
                    tempArray[0]=result;
                    tempArray[1]=dailyData[i][1];
                    data[i]=tempArray
            
                };
                return res.send({success:true,data:data});
          
           })
           .catch(function (err) {
            return res.send({success:false,reason:"invalid stock code"});
           })

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