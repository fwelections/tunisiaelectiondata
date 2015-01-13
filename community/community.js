'use strict';

angular.module('ted.community', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/community', {
            templateUrl: 'community/community.html',
            controller: 'communityCtrl'
        });
    }])

.controller('communityCtrl', ['Stories', '$scope', '$routeParams', function(Stories, $scope, $routeParams) {

       console.log('community')
    }]);
