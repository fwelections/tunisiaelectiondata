'use strict';

angular.module('ted.par14', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/par14', {
    templateUrl: 'par14/par14.html',
    controller: 'par14Ctrl'
  });
}])

.controller('par14Ctrl', ['Maps','$scope', function(Maps,$scope) {
	
    var promise = Maps.listAll('par14','en');
    promise.then(function(response) {
      
         console.log(response.data);
        $scope.maps = response.data;
    });

}]);
