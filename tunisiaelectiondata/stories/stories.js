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

.controller('storiesCtrl', ['Stories', '$scope', '$routeParams', function(Stories, $scope, $routeParams) {
        if ($routeParams.election == undefined)
        // default stories are  presidential elections ones ; 
            $routeParams.election = 'pre';
        var promise = Stories.listAll($routeParams.election, 'en');
        promise.then(function(response) {
            $scope.elec = $routeParams.election;
            $scope.election = response.data;
        });

    }])
    .controller('storyCtrl', ['Stories', '$scope', '$routeParams', function(Stories, $scope, $routeParams) {
        $scope.blayer = {
            name: 'mapbox',
            type: 'xyz',
            url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
            layerOptions: {
                apikey: 'pk.eyJ1IjoidHVuaXNpYSIsImEiOiJwelVyLW1JIn0.mBhvyh8Ui8NzOq8Bpzl83g',
                mapid: 'tunisia.52cc564a'
            }
        };

        angular.extend($scope, {
             tunis: {
                lat: 35.4920,
                lng: 11.6592,
                zoom: 8
            },
            layers: {
                baselayers: {
                    mbase: $scope.blayer
                }
            },
            defaults: {
                scrollWheelZoom: false
            }
        });
        if ($routeParams.election == undefined)
        // default stories are  presidential elections ones ; 
            $routeParams.election = 'pre';
        var promise = Stories.getStory($routeParams.election, $routeParams.map, 'en');
        promise.then(function(response) {
            if (response.data.story == "{}")
                console.log('story not available ')

            else {
                $scope.nlayer = {
                    name: 'mapbox',
                    type: 'xyz',
                    url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                    layerOptions: { 
                        apikey: 'pk.eyJ1IjoidHVuaXNpYSIsImEiOiJwelVyLW1JIn0.mBhvyh8Ui8NzOq8Bpzl83g',
                        mapid: response.data.story.mapid
                    }
                };
                var baselayers = $scope.layers.baselayers;
                delete baselayers['mbase'];
                baselayers['another'] = $scope.nlayer;




            }



        });

    }]);