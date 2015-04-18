'use strict';

angular.module('ted.datasets', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/datasets', {
            templateUrl: 'datasets/datasets.html',
            controller: 'datasetsCtrl'
        })
        .when('/datasets/:name', {
            templateUrl: 'datasets/dataset.html',
            controller: 'datasetCtrl'
        });
}])

.controller('datasetsCtrl', ['$scope', 'Datasets', function($scope, Datasets) {
    $scope.datasets = [];
    var promise = Datasets.list();
    promise.then(function(response) {
        var rlines = response.data.split(/\n/);
        for (var i = 0; i < rlines.length; i++) {

            var rawArray = rlines[i].split('/');
            var rawUrl = 'https://cdn.rawgit.com/'+ rawArray[3] + '/' + rawArray[4] +'/master/datapackage.json';
            //change this for the live version
          //  var rawUrl = rlines[i] + '/datapackage.json';
            if(rawArray[3] != undefined){
            var promise1 = Datasets.readPackage(rawUrl, rlines[i]);
            promise1.then(function(response1) {
                var dataset = response1.data;
                $scope.datasets.push(response1.data);

            });
        }
        }


    });

    //
}])

.controller('datasetCtrl', ['$scope', 'Datasets', '$routeParams','$sce', function($scope, Datasets, $routeParams,$sce) {

    var createMultiView = function(name, views, dataset, state, index) {
        // remove existing multiview if present
        var reload = false;
        if (window.multiView) {
            window.multiView.remove();
            window.multiView = null;
            reload = true;
        }
        window.explorerDiv = $('.viewer');
        window.explorerDiv.append('<hr/><h2>' + name + '</h2>');
        var $el = $('<div id="ds' + index + '" />');
        $el.appendTo(window.explorerDiv);
        // customize the subviews for the MultiView
        var views = [{
            id: 'grid',
            label: 'Grid',
            view: new recline.View.SlickGrid({
                model: dataset,
                state: {
                    fitColumns: true

                }
            })
        }, {
            id: 'graph',
            label: 'Graph',
            view: new recline.View.Graph({
                model: dataset

            })
        }, {
            id: 'map',
            label: 'Map',
            view: new recline.View.Map({
                model: dataset
            })
        }];


        //TODO  : add views in package definition

        var multiView = new recline.View.MultiView({
            model: dataset,
            el: $el,
            state: state,
            views: views
        });
        return multiView;
    }


    function createDatasetView(resource, index, array) {

        var rawArray = $scope.dataset.git.split('/');
         var rawUrl = 'https://cdn.rawgit.com/'+ rawArray[3] + '/' + rawArray[4] +'/master/' + resource.path;
        //change this for the live version
       // var rawUrl = $scope.dataset.git + '/' + resource.path;

        var dataset = new recline.Model.Dataset({
            url: rawUrl,
            backend: 'csv',
        });
        dataset.fetch().done(function() {

            createMultiView(resource.name, resource.views, dataset, null, index);
            dataset.query({
                size: dataset.recordCount
            });
        });



    }


    $scope.datasets = [];
    $scope.dataset = null;
    var promise = Datasets.list();
    promise.then(function(response) {
        var rlines = response.data.split(/\n/);

        for (var i = 0; i < rlines.length && ($scope.dataset == null); i++) {
            var rawArray = rlines[i].split('/');
             var rawUrl = 'https://cdn.rawgit.com/'+ rawArray[3] + '/' + rawArray[4] +'/master/datapackage.json';
            //change this for the live version
          //  var rawUrl = rlines[i] + '/datapackage.json';
             if(rawArray[3] != undefined){
            var promise1 = Datasets.readPackage(rawUrl, rlines[i]);
            promise1.then(function(response1) {
                var dataset = response1.data;

                var n = dataset.name.localeCompare($routeParams.name);
                 if (dataset.name.trim() == $routeParams.name.trim())
                {   $scope.dataset  = dataset;

                    $scope.readme=  $sce.trustAsResourceUrl($scope.dataset.readme);}

                  });
        }}
        setTimeout(function() {
          if ($scope.dataset != null) {

              $scope.dataset.resources.forEach(createDatasetView);
              console.log(  $scope.dataset.resources);


          }
  }, 2000);
          })
          ;










}]);
