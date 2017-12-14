var stockChart = angular.module('stockChart', ['ngRoute']);


stockChart.controller('stockChartController',function($scope,$http,$route,mvStock)
{  
    $scope.errorMessage='';
    formdata={
                content: ''
            };
    var options={

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
               series: [{},{},{},{},{},{},{},{},{},{}],
            };
     var tempSeries = [];       
     var chart =new Highcharts.stockChart(options);  
        var localSite =  "http://localhost:3030";        
        var herokuSite = "https://immense-island-14732.herokuapp.com/"
        var socket = io.connect(herokuSite);       
        // Check for connection
        if(socket !== undefined){
            console.log('Connected to socket...');            
            // Handle Output
            socket.on('output', function(data){
                tempSeries = [];              
                $scope.stocks=data;
                $scope.stocks.forEach(function(element){
                    console.log(element);
                    getStock(element.subject);
                    
                     
                })
            });
        };

       

  function getStock(subject) {
    console.log("subject____"+subject);
    var serie = {
      name: subject,
      data: []
    };
    //从 quandl API获取一年内的股票data，如果有的话push到chart options series 里
    mvStock.get(subject)
      .then(function(response) {
        if(response.data.success){
            console.log(subject +"  get API data success");
            serie.data = response.data.data;
            console.log(tempSeries);
            tempSeries.push(serie);
            // if(tempSeries.length == $scope.stocks.length)
            {
                chart.update({
                    series:tempSeries
                },true);   
            }
        }

      })
  };
// when submitting the add form, send the text to the node API
$scope.createTodo = function() {
    console.log("create todo");
    $scope.errorMessage='';
    var newSubject = $scope.formdata.content;
    if(newSubject)
    {
        var serie = {
            name: newSubject,
            data: []
          };
        mvStock.get(newSubject)
        .then(function(response) {
          if(response.data.success){
              socket.emit('input', $scope.formdata);
              serie.data = response.data.data;
              console.log(tempSeries);
              tempSeries.push(serie);
              chart.update({
                series:tempSeries
            },true); 
              $scope.formdata.content='';
              
          }
          else
          {
              console.log(response.data.reason);
              $scope.errorMessage  = response.data.reason;
              $scope.formdata.content='';
          }
        })
       
    }   
};
// delete a todo after checking it
$scope.deleteTodo = function(subject) {
    console.log(subject);
    
    socket.emit('clear',subject);
    var result = tempSeries.filter(function (chain) {
        return chain.name === subject;
    });
    tempSeries.splice(tempSeries.indexOf(result), 1);
    console.log(tempSeries);
    chart.update({
        series:tempSeries
    },true);  
    
    $route.reload();
};


})