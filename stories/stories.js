'use strict';

angular.module('ted.stories', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/stories', {
    templateUrl: 'stories/stories.html',
    controller: 'storiesCtrl'
  })
    .when('/stories/:election', {
    templateUrl: 'stories/stories.html',
    controller: 'storiesCtrl'
  });
}])

.controller('storiesCtrl', ['Maps','$scope','$routeParams', function(Maps,$scope,$routeParams) {
    console.log($routeParams);
    if($routeParams.election == undefined)
        // default stories are  presidential elections ones ; 
      $routeParams.election= 'pre';
    var promise = Maps.listAll($routeParams.election,'en');
    promise.then(function(response) {        
        $scope.election = response.data;
    });

}]);
