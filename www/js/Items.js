// angular.module('starter.services')

// .factory('Items', function($q, $http, API_ENDPOINT) {
// 	var items = [];

// 	return {
// 		featured: function(restaurantId){
// 			 return $q(function(resolve, reject){
//                 $http.post(API_ENDPOINT.url + "Items", { Restaurant_id: restaurantId}).then(function(response){
//                     items = response.data;
//                     resolve(items);
//                 },function(err){
//                         reject();
//                 });
//             });
// 		}
// 	}
// })