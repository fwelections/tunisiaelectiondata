'use strict';

angular.module('ted.community', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/community', {
            templateUrl: 'community/community.html',
            controller: 'communityCtrl'
        });
    }])

.controller('communityCtrl', ['Gallery', '$scope', '$routeParams','Lightbox', function(Gallery, $scope, $routeParams,Lightbox) {

  $scope.gitems={};
  var promise = Gallery.listAll();
  promise.then(function(response) {

       $scope.gitems = response.data;

       });

    $scope.openLightboxModal = function (index) {
    Lightbox.openModal($scope.gitems, index);
  };
    }]);
