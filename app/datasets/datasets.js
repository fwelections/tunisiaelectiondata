'use strict';

angular.module('ted.datasets', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/datasets', {
            templateUrl: '/datasets/datasets.html',
            controller: 'datasetsCtrl'
        })
        .when('/datasets/:name', {
            templateUrl: '/datasets/dataset.html',
            controller: 'datasetCtrl'
        });
}])

.controller('datasetsCtrl', ['$scope', 'registry', 'Datasets', '$rootScope', function($scope, registry, Datasets, $rootScope) {
    $scope.datasets = [];
    var promise = Datasets.list();
    promise.then(function(response) {
        var rlines = response.data.split(/\n/);

        for (var i = 0; i < rlines.length; i++) {
            var rawArray = rlines[i].split('/');
            // var rawUrl = 'https://raw.githubusercontent.com/'+ rawArray[3] + '/' + rawArray[4] +'/master/datapackage.json';
            //change this for the live version
            var rawUrl = rlines[i] + '/datapackage.json';
            var promise1 = Datasets.readPackage(rawUrl, rlines[i]);
            promise1.then(function(response1) {
                var dataset = response1.data;
                $scope.datasets.push(response1.data);
                $rootScope.datasets = $scope.datasets;
            });
        }


    });

    //
}])

.controller('datasetCtrl', ['$scope', 'registry', 'Datasets', '$rootScope', '$routeParams', function($scope, registry, Datasets, $rootScope, $routeParams) {

    var createMultiView = function(name,views, dataset, state, index) {
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
        // var rawUrl = 'https://raw.githubusercontent.com/'+ rawArray[3] + '/' + rawArray[4] +'/master/' + resource.path;
        //change this for the live version
        var rawUrl = '../' + $scope.dataset.git + '/' + resource.path;
        console.log(rawUrl);
        resource.fields = _.map(resource.schema.fields, function(field) {
            if (field.name && !field.id) {
                field.id = field.name;
            }
            return field;
        });
        var dataset = new recline.Model.Dataset({
            url: rawUrl,
            backend: 'csv',
        });
        dataset.fetch().done(function() {
            
            createMultiView(resource.name,resource.views, dataset, null, index);
             dataset.query({size: dataset.recordCount});
        });
        
        

    }

    $scope.dataset = null;
    for (var d in $rootScope.datasets) {

        if ($rootScope.datasets[d].name == $routeParams.name)
            $scope.dataset = $rootScope.datasets[d];
    }
    if ($scope.dataset != null) {
        console.log('found');

        console.log($scope.dataset);
        $scope.dataset.resources.forEach(createDatasetView);
        $scope.readmeLink ='../testpackages/bond-yields-uk-10y/README.md'; 
         
        //         for (var i=0; i<$scope.dataset.resources.length ; i++){
        //        
        //       var resource = $scope.dataset.resources[i];
        //            var rawArray = $scope.dataset.git.split('/');
        //        // var rawUrl = 'https://raw.githubusercontent.com/'+ rawArray[3] + '/' + rawArray[4] +'/master/' + resource.path;
        //         //change this for the live version
        //         var rawUrl  =  '../' + $scope.dataset.git + '/' + resource.path;
        //             console.log(rawUrl);
        //             resource.fields = _.map(resource.schema.fields, function(field) {
        //                if (field.name && !field.id) {
        //                field.id = field.name;
        //                }
        //                return field;
        //                });
        //             var dataset = new recline.Model.Dataset({
        //                 url:rawUrl,
        //                 backend: 'csv',        
        //             });
        //             
        //             dataset.fetch().done(function() {
        //                createMultiView(dataset,null,i);
        //                // multiViewGridView.visible=true;
        //                  //         multiViewGridView.render(); 
        //            
        //       
        //
        //        });
        //            
        // 
        //}


    }



}]);