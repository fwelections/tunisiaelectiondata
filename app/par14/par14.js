'use strict';

angular.module('ted.par14', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/par14', {
    templateUrl: 'par14/par14.html',
    controller: 'par14Ctrl'
  });
}])

.controller('par14Ctrl', [function() {
	console.log("hello parlialent");

}]);
