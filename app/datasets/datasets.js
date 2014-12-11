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
     var rlines = response.data.split(/\n/);
    
     for(var i=0; i< rlines.length ;i++ ){
          var rawArray = rlines[i].split('/');
        // var rawUrl = 'https://raw.githubusercontent.com/'+ rawArray[3] + '/' + rawArray[4] +'/master/datapackage.json';
         //change this for the live version
         var rawUrl  = rlines[i] + '/datapackage.json';
         var promise1=  Datasets.readPackage(rawUrl,rlines[i]);
             promise1.then(function(response1){
                 var dataset = response1.data;
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
    
       console.log ($scope.dataset);
         for (var i=0; i<$scope.dataset.resources.length ; i++){
             var resource = $scope.dataset.resources[i];
            var rawArray = $scope.dataset.git.split('/');
        // var rawUrl = 'https://raw.githubusercontent.com/'+ rawArray[3] + '/' + rawArray[4] +'/master/' + resource.path;
         //change this for the live version
         var rawUrl  =  $scope.dataset.git + '/' + resource.path;
             console.log(rawUrl);
             
             var dataset = new recline.Model.Dataset({
                 
              
             });
         
         }
       
   
   }
    
    
    
}]);
