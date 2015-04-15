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
        .when('/stories/:election/full', {
            templateUrl: 'stories/full.html',
            controller: 'fullCtrl'
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
    .controller('fullCtrl', ['Stories', '$scope', '$routeParams', function(Stories, $scope, $routeParams) {
  
        if ($routeParams.election == undefined)
        // default stories are  presidential elections ones ;
            $routeParams.election = 'pre';
        console.log('full' + $routeParams.election);
        //  var mapOptions= {scrollWheelZoom: false,shareControl:true}
        L.mapbox.accessToken = 'pk.eyJ1IjoidHVuaXNpYSIsImEiOiJwelVyLW1JIn0.mBhvyh8Ui8NzOq8Bpzl83g';
        var map = L.mapbox.map('map', 'tunisia.lo15g9pe');

        var fileToRead = 'stories/resources/en/' + $routeParams.election + '.csv';

        setTimeout(function() {
            var geojsonLayer = omnivore.csv(fileToRead)
                .on('ready', function() {
                    map.fitBounds(geojsonLayer.getBounds());
                    console.log('ready');
                    setTimeout(function() {
                        map.panTo(new L.LatLng(35.1019, 9.6021));
                    }, 3000);
                    var searchControl = new L.Control.Search({
                        wrapper: 'findbox',
                        initial: false,
                        collapsed: false,
                        layer: geojsonLayer,
                        propertyName: 'center_name',
                        circleLocation: true
                    });

                    searchControl.on('search_locationfound', function(e) {

                        map.setView([e.layer._latlng.lat, e.layer._latlng.lng], 14, {
                            pan: {
                                animate: true
                            },
                            zoom: {
                                animate: true
                            }
                        });

                    });

                    map.addControl(searchControl);
                    // After the 'ready' event fires, the GeoJSON contents are accessible
                    // and you can iterate through layers to bind custom popups.
                    geojsonLayer.eachLayer(function(layer) {
                        // See the `.bindPopup` documentation for full details. This
                        // dataset has a property called `name`: your dataset might not,
                        // so inspect it and customize to taste.
                        //layer.bindPopup(layer.feature.properties.center_name);
                        console.log('hello');
                    });
                })
                .addTo(map);

        }, 3000);


    }])
    .controller('storyCtrl', ['Stories', '$scope', '$routeParams', function(Stories, $scope, $routeParams) {

        if ($routeParams.election == undefined)
        // default stories are  presidential elections ones ;
            $routeParams.election = 'pre';
        var promise = Stories.getStory($routeParams.election, $routeParams.map, 'en');
        promise.then(function(response) {
            if (response.data.story == "{}")
                console.log('story not available ')

            else {

                $scope.story = response.data.story;
                var mapOptions = {
                    scrollWheelZoom: false,
                    shareControl: true
                }

                L.mapbox.accessToken = 'pk.eyJ1IjoidHVuaXNpYSIsImEiOiJwelVyLW1JIn0.mBhvyh8Ui8NzOq8Bpzl83g';
                L.mapbox.map('map', $scope.story.mapid, mapOptions);

            }



        });

    }]);
