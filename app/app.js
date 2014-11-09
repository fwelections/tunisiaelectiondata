'use strict';

// Declare app level module which depends on views, and components
angular.module('ted', [
  'ngRoute',
  'ted.view1',
  'ted.view2'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
