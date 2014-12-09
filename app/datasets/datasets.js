'use strict';

angular.module('ted.datasets', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/datasets', {
    templateUrl: '/datasets/datasets.html',
    controller: 'datasetsCtrl'
  })
    .when('/datasets/:name', {
    templateUrl: '/datasets/dataset.html',
    controller: 'datasetCtrl'
  });
}])

.controller('datasetsCtrl', ['$scope','registry','Datasets','$rootScope',function($scope,registry,Datasets,$rootScope){
$scope.datasets = [];
var promise = Datasets.list();
 promise.then(function(response){
     var lines = response.data.split(/\n/);
     var dataJson=[];
     for(var repo in lines){
         var rawArray = lines[repo].split('/');
        // var rawUrl = 'https://raw.githubusercontent.com/'+ rawArray[3] + '/' + rawArray[4] +'/master/datapackage.json';
         //change this for the live version
         var rawUrl  = lines[repo] + '/datapackage.json';
         var promise1=  Datasets.readPackage(rawUrl);
             promise1.then(function(response1){
                 var dataset = response1.data;
                 dataset.git = lines[repo];
                 //change this for the live version 
                 dataset.readme=  lines[repo] + '/README.md';
                 $scope.datasets.push(response1.data);
                  $rootScope.datasets = $scope.datasets;
             });
         }
     
    });
    
//
}])

.controller('datasetCtrl', ['$scope','registry','Datasets','$rootScope','$routeParams',function($scope,registry,Datasets,$rootScope,$routeParams){
    
    $scope.dataset = null ; 
    for (var d in $rootScope.datasets){
    
        if ($rootScope.datasets[d].name==$routeParams.name)
             $scope.dataset = $rootScope.datasets[d];
     }
   if ( $scope.dataset != null ){
       console.log ('found');
       
   
   }
    
    
    
}]);
