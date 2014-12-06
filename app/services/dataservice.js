'use strict';

angular.module('ted.dataService', [])
.factory('Datasets', function ($q, $http) {
        return {
                list: function () {
                var deferred = $q.defer(),
                    httpPromise = $http.get('list.txt');

                httpPromise.then(function (response) {
                    deferred.resolve(response);
                 }, function (error) {
                    console.error(error);
                });

                return deferred.promise;
            }
        };
    });
