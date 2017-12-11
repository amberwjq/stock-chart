angular.module('stockChart').factory('mvChart', function(key,subject) {
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
        series: [{
        tooltip: {
            valueDecimals: 2
        }
        }]
    };

    
    this.createChart=function(key,subject){

    }
    console.log("subject "+ subject);
    console.log("key"+ key);
     //set chart options

var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var date = now.getDate();
endDate=year+"-"+month+"-"+date;
lastyear= year -1;
startDate=lastyear+"-"+month+"-"+date;
var url="https://www.quandl.com/api/v3/datasets/WIKI/"+subject+".json?api_key=6DrHStsg9J3zox3gtZTb&start_date="+startDate+"&end_date="+endDate+"&order=asc";
var settings = {
"async": true,
"crossDomain": true,
"url": url,
"method": "GET",
"headers": {
"cache-control": "no-cache",
"postman-token": "9b28fdc0-699f-4d7e-ff9e-5ef682f722f2"
}
}

$.ajax(settings).done(function (response) {
var data=[];


var dailyData =response["dataset"]["data"];

for (var key in dailyData){
    var tempArray=[];
    
    var myDate = new Date(dailyData[key][0]);
    var result = myDate.getTime();
  
    tempArray[0]=result;
    tempArray[1]=dailyData[key][1];
    data[key]=tempArray
    
  
    


};
options.series[key].data = data;
options.series[key].name=response["dataset"]["dataset_code"];

});
var chart = new Highcharts.stockChart(options);


   
   
   

});


