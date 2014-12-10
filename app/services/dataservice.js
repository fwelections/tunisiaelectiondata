'use strict';

angular.module('ted.dataService', [])
.factory('Datasets', function ($q, $http) {
    var that = this ;
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
            },
            readPackage :function(pack,repo){
                var deferred = $q.defer(),
                         //var packageUrl= package + 
                httpPromise = $http.get(pack);

                httpPromise.then(function (response) {      
                var newo= response.data.git=repo;
                 deferred.resolve(response);  
                 return response.data;
                   
                }, function (error) {
                    console.error(error);
                });

                return deferred.promise; 

            } 
        };
    });
