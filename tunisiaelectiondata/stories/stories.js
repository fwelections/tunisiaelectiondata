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
  var theater = new TheaterJS();
  theater.describe("rad", {
    speed: .8,
    accuracy: .6,
    invincibility: 4
  }, "#rad");

  theater.write("rad:Loading  data")
    .write("rad:Please wait ")
    .write(400)
    .write("rad: Location plotting on the map ")
    .write(-100);

  if ($routeParams.election == undefined)
  // default stories are  presidential elections ones ;
  $routeParams.election = 'pre';
   //  var mapOptions= {scrollWheelZoom: false,shareControl:true}
  L.mapbox.accessToken = 'pk.eyJ1IjoidHVuaXNpYSIsImEiOiJwelVyLW1JIn0.mBhvyh8Ui8NzOq8Bpzl83g';
  var map = L.mapbox.map('map', 'tunisia.lo15g9pe');

  var fileToRead = 'stories/resources/en/' + $routeParams.election + '.csv';

  var geojsonLayer = omnivore.csv(fileToRead)
    .on('ready', function() {

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
      var feature = layer.feature;
      if (feature) {
        var popupContent = '<div class="title">' + feature.properties.center_name + ' ' + feature.properties.deleg_name + ' ' + feature.properties.circ_name + '</div>' +
          '<div class="row"><div class="col-md-6"><div id="candidate"></div></div><div class="col-md-6"><div id="turnout"></div></div></div>';



        layer.bindPopup(popupContent, {
          closeButton: true,
          minWidth: 720

        });
      }


      });
    })
    .addTo(map);

    map.on('popupopen', function(e) {
     var px = map.project(e.popup._latlng); // find the pixel location on the map where the popup anchor is

     px.y = px.y - e.popup._container.clientHeight/2  // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
     px.y = px.y -100;
      map.panTo(map.unproject(px),{animate: true}); // pan to new center
 });

  geojsonLayer.on('click', function(e) {
    //
    if ($routeParams.election == 'pre') {
      $('#candidate').highcharts({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        title: {
          text: 'Candidates vote share'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y} votes {point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: [{
          type: 'pie',
          name: 'vote share',
          data: [
            ['Beji C E', parseFloat(e.layer.feature.properties.sebsi)],
            ['Mohamed M M', parseFloat(e.layer.feature.properties.marzouki)]
          ]
        }]
      });
    } else {
      $('#candidate').highcharts({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        title: {
          text: 'Candidates vote share'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y} votes {point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: [{
          type: 'pie',
          name: 'vote share',
          data: [
            ['Nida Tounes', parseFloat(e.layer.feature.properties.NidaTounes)],
            ['Ennahdha', parseFloat(e.layer.feature.properties.Ennahdha)],
            ['UPL', parseFloat(e.layer.feature.properties.UPL)],
            ['Popular Front', parseFloat(e.layer.feature.properties.PopularFront)],
            ['Afek', parseFloat(e.layer.feature.properties.AfekTounes)]

          ]
        }]
      });


    }
    $('#turnout').highcharts({
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Registered voters and ballots cast'
      },

      xAxis: {
        categories: [
          'Registered', 'Cancelled', 'Blank'

        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'votes'
        }
      },

      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: '',
        data: [parseFloat(e.layer.feature.properties.registeredVoters), parseFloat(e.layer.feature.properties.kCancelledVotes), parseFloat(e.layer.feature.properties.lBlankVotes)]

      }]
    });

    //
  });

  }])
  .controller('storyCtrl', ['Stories', '$scope', '$routeParams', function(Stories, $scope, $routeParams) {
    $scope.elec = $routeParams.election;

  if ($routeParams.election == undefined)
  // default stories are  presidential elections ones ;
  $routeParams.election = 'pre';
  var promise = Stories.getStory($routeParams.election, $routeParams.map, 'en');
  promise.then(function(response) {
    if (response.data.story == "{}") console.log('story not available ')

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
