'use strict';

// Declare app level module which depends on views, and components
var ted= angular.module('ted', [
  'ngRoute',
  'jm.i18next',
  'hc.marked',
  'ted.stories',
  'ted.datasets',
  'ted.dataService',
    'ted.community'
]).
config(['$routeProvider','$locationProvider','markedProvider',function($routeProvider, $locationProvider,markedProvider) {

 // $locationProvider.html5Mode(true);
 // $locationProvider.hashPrefix = '!';
  $routeProvider.otherwise({redirectTo: '/par14'});
   markedProvider.setOptions({gfm: true});

}]);

ted.value('registry', 'https://cdn.rawgit.com/radproject/datasets-registry/master/catalog.txt');