angular.module('stockChart').factory('mvStock', function($http) {
    return {
        get: function(name) {
            return $http.get("/api/stock/"+name);
          },
        create: function name() {
            return $http.post("/api/stocks", { name: name });                 
        }
    }
    
});
