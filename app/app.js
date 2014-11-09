'use strict';

// Declare app level module which depends on views, and components
angular.module('ted', [
  'ngRoute',
  'jm.i18next',
  'ted.view1'
]).
config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix = '!';
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
