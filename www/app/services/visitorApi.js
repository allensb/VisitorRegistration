(function() {
    'use strict';

    angular.module('visitorApp').factory('visitorApi', ['$http', visitorApi]);

    function visitorApi($http) {
        function getVisitors(callback) {
            $http.get('https://registrationapi.herokuapp.com/api/visitor')
                .success(function(data) {
                    callback(data);
                });
        }

        return {
            getVisitors: getVisitors
        };
    }
})();