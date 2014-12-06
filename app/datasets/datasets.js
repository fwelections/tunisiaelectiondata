'use strict';

angular.module('ted.datasets', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/datasets', {
    templateUrl: 'datasets/datasets.html',
    controller: 'datasetsCtrl'
  });
}])

.controller('datasetsCtrl', ['registry','Datasets',function(registry,Datasets){
    
 var promise = Datasets.list();
 promise.then(function(response){
     var lines = response.data.split(/\n/);
     console.log(lines);
     var dataJson=[];
     for(var repo in lines){
         var rawArray = lines[repo].split('/');
         var rawUrl = 'https://raw.githubusercontent.com/'+ rawArray[3] + '/' + rawArray[4] +'/master/datapackage.json'
         dataJson.push(rawUrl);    
           
         }
        
    
    });
 
}]);
