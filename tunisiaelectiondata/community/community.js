'use strict';

angular.module('ted.community', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/community', {
            templateUrl: 'community/community.html',
            controller: 'communityCtrl'
        });
    }])

.controller('communityCtrl', ['Gallery', '$scope', '$routeParams', function(Gallery, $scope, $routeParams) {

  $scope.gitems={};
  var promise = Gallery.listAll();
  promise.then(function(response) {

       $scope.gitems = response.data;
       console.log($scope.gitems)
       });


    }]);
