angular.module('starter.services')

.factory('Restaurants', function($q, $http, API_ENDPOINT) {
	var restaurants = [];

	return {
		list: function(){
			 return $q(function(resolve, reject){
                $http.get(API_ENDPOINT.url + "restaurants").then(function(response){
                    restaurants = response.data;
                    resolve(restaurants);
                },function(err){
                        reject();
                });
            });
		}
	}
})