'use strict';

// Declare app level module which depends on views, and components
var ted= angular.module('ted', [
  'ngRoute',
  'jm.i18next',
  'ted.par14',
  'ted.datasets',
  'ted.dataService'
]).
config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix = '!';
  $routeProvider.otherwise({redirectTo: '/par14'});
}]);

ted.value('registry', 'https://raw.githubusercontent.com/radproject/datasets-registry/master/list.txt');