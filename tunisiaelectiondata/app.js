'use strict';

// Declare app level module which depends on views, and components
var ted= angular.module('ted', [
  'ngRoute',
  'jm.i18next',
  'hc.marked',
  'bootstrapLightbox',
  'ted.stories',
  'ted.datasets',
  'ted.dataService',
  'ted.community',
  'ted.about'
]).
config(['$routeProvider','$locationProvider','markedProvider',function($routeProvider, $locationProvider,markedProvider) {

 // $locationProvider.html5Mode(true);
 // $locationProvider.hashPrefix = '!';
    $routeProvider.otherwise({redirectTo: '/stories/par'});
    markedProvider.setOptions({gfm: true});

}]);

ted.value('registry', 'catalog.txt');
 
