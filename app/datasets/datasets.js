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
    promise.then(function(data){
        console.log(data);
    
    
    });
 
}]);
