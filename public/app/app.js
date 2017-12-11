var stockChart = angular.module('stockChart', ['ngRoute']);


stockChart.controller('stockChartController',function($scope,$http,$route)
{  
    formdata={
                content: ''
            };
    var options = {
        chart: {
            renderTo: 'container',
            type: 'line'
        },
        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'STOCK PRICE'
        },

        yAxis: {
            title: {
                text: 'price'
            }
        },
        xAxis: {
            title: {
                text: 'date'
            },
            step :5,
            type: 'datetime'
        },
        series: [],
    };
            // Connect to socket.io
            var socket = io.connect('http://localhost:3030');
            
                        // Check for connection
                        if(socket !== undefined){
                            console.log('Connected to socket...');            
                            // Handle Output
                            socket.on('output', function(data){
                                
                                $scope.stocks=data;
                                console.log($scope.stocks);
                                $route.reload();
                                for(key in $scope.stocks)
                                {
                                        console.log($scope.stocks[key]);
                                        createChart(key,$scope.stocks[key].subject); 
                                }
                            });
                        }               
  function createChart(key,subject){
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        endDate=year+"-"+month+"-"+date;
        lastyear= year -1;
        startDate=lastyear+"-"+month+"-"+date;
        var url="https://www.quandl.com/api/v3/datasets/WIKI/"+subject+".json?api_key=6DrHStsg9J3zox3gtZTb&start_date="+startDate+"&end_date="+endDate+"&order=asc";
        console.log(url);
        var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
        "cache-control": "no-cache",
        "postman-token": "9b28fdc0-699f-4d7e-ff9e-5ef682f722f2"
        }
        };

        $.ajax(settings).done(function (response) {
        var data=[];
        var dailyData =response["dataset"]["data"];
        
        for (var i in dailyData){
            var tempArray=[];
            
            var myDate = new Date(dailyData[i][0]);
            var result = myDate.getTime();
        
            tempArray[0]=result;
            tempArray[1]=dailyData[i][1];
            data[i]=tempArray

        };
        
        options.series.push({ 
            "name" : subject,
            "data"  : data
            
        });
        if(options.series.length == $scope.stocks.length)  {
            var chart = new Highcharts.stockChart(options);  
        }
       
       
        });
        

        
    } 
          
  
// when submitting the add form, send the text to the node API
$scope.createTodo = function() {
    socket.emit('input', $scope.formdata);
};
// delete a todo after checking it
$scope.deleteTodo = function(subject) {
    console.log(subject);
    socket.emit('clear',subject);
};


})