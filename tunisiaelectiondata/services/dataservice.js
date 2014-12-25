'use strict';

angular.module('ted.dataService', [])
    .factory('Datasets', function($q, $http, registry) {
        var that = this;
        return {
            list: function() {
                    delete $http.defaults.headers.common['X-Requested-With'];

                var deferred = $q.defer(),
                    
                    httpPromise = $http.get(registry);
                    
                httpPromise.then(function(response) {

                    deferred.resolve(response);


                }, function(error) {
                    console.error(error);
                });

                return deferred.promise;
            },
            readPackage: function(pack, repo) {
                    var deferred = $q.defer(),
                        httpPromise = $http.get(pack);

                    httpPromise.then(function(response) {
            var rawArray = repo.split('/');

                        response.data.git = repo;
                        response.data.readme= 'https://cdn.rawgit.com/'+ rawArray[3] + '/' + rawArray[4] +'/master/README.md';
                        for (var i = 0; i<response.data.resources.length;i++)
                        {
                            response.data.resources[i].download = 'https://cdn.rawgit.com/'+ rawArray[3] + '/' + rawArray[4] +'/master/' + response.data.resources[i].path;
                        
                        
                        }
                        deferred.resolve(response);
                        return response.data;

                    }, function(error) {
                        console.error(error);
                    });

                    return deferred.promise;

                }
                //


        };
    });