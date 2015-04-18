'use strict';

angular.module('ted.about', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/about', {
            templateUrl: 'about/about.html'
        });
    }])

.controller('navCtrl', ['$scope', '$routeParams','$location', function($scope, $routeParams,$location) {

  $scope.isActive = function (viewLocation) {
     var active = (viewLocation === $location.path());
     return active;
};

    }]);
