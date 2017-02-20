angular.module('starter.services')

.factory('Orders', function($q, $http, API_ENDPOINT) {
    var orders = [];
    return {
        // get all orders of user
        all: function(userID)
        {
            console.log(userID);
            return $q(function(resolve, reject){

                $http.post(API_ENDPOINT.url + "orders", { id: userID}).then(function(response){
                    orders = response.data;
                    resolve(orders);
                },function(err){
                        reject();
                });
            });
        },
        new: function( User_id, Order_id, Menus, Prices, Status )
        {
            return $q(function(resolve, reject) {
              var newOrder = {
                    order_id: "order-1",
                    user_id: 5 ,
                    restaurant_id: 5,
                    order_price: 20,
                    status: "Processing"
                  };
              $http.post(API_ENDPOINT.url + "orders/new", newOrder).then(function(response){

                if(response.status == 200)
                {
                  resolve();
                }
                else
                {
                  reject();
                }
              }).catch(function(){
                reject();
              });

                resolve();
            });
        },
        toggleLike: function(post)
        {

            if(post.userLike)
            {
                $http.post(API_ENDPOINT.url + "postdislike",{id: post.id, userLike: false}).then(function(response){
                });
            }
            else
            {
                $http.post(API_ENDPOINT.url + "postlike",{id: post.id, userLike: true}).then(function(response){
                });
            }
            post.userLike = !post.userLike;


        },
        getCommentsForPost: function(postId)
        {
            return $q(function(resolve, reject){
                var post = posts.find(function(element){
                    return element.id == postId
                });

                if(post !== undefined)
                {
                    resolve(post.comments);
                }
                else
                {
                    reject();
                }
            });
        },
        addCommentToPost: function(loguserid, logusername, postid, comment)
        {
          return $q(function(resolve, reject){
            var newcomment = {
                id: 0,
                user: {
                    id: loguserid,
                    username: logusername,
                    profileImageSmall: "https://pbs.twimg.com/profile_images/750300510264107008/G8-PA5KA.jpg"
                },
                text: comment,
                userRefs: [],
                tags: []
            }
              console.log(postid , newcomment);
            $http.post(API_ENDPOINT.url + "addcomments", {id: postid , comments: newcomment}).then(function(result){

              if(response.status == 200)
              {
                resolve();
              }
              else
              {
                reject();
              }
            }).catch(function(){
              reject();
            });

              resolve();
          });
        }

  };
});
