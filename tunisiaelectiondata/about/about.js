'use strict';

angular.module('ted.about', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/about', {
            templateUrl: 'about/about.html',
            controller: 'aboutCtrl'
        });
    }])

.controller('aboutCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {



    }]);
