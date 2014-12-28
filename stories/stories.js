'use strict';

angular.module('ted.stories', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/stories', {
    templateUrl: 'stories/stories.html',
    controller: 'storiesCtrl'
  })
    .when('/stories/:election', {
    templateUrl: 'stories/stories.html',
    controller: 'storiesCtrl'
  })
  .when('/stories/:election/:map', {
    templateUrl: 'stories/story.html',
    controller: 'storyCtrl'
  });
}])

.controller('storiesCtrl', ['Stories','$scope','$routeParams', function(Stories,$scope,$routeParams) {
    if($routeParams.election == undefined)
        // default stories are  presidential elections ones ; 
      $routeParams.election= 'pre';
    var promise = Stories.listAll($routeParams.election,'en');
    promise.then(function(response) {  
        $scope.elec =  $routeParams.election;
        $scope.election = response.data;
    });

}])
.controller('storyCtrl', ['Stories','$scope','$routeParams', function(Stories,$scope,$routeParams) {
     if($routeParams.election == undefined)
        // default stories are  presidential elections ones ; 
      $routeParams.election= 'pre';
    var promise = Stories.getStory($routeParams.election,$routeParams.map,'en');
    promise.then(function(response) {        
        if(response.data.story == "{}")
            console.log('story not available ')
            else
                console.log(response.data.story);
    });

}]);
