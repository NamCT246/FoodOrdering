angular.module('starter.controllers', [])

.controller("LoginCtrl", function($scope, $state, $http, $ionicPopup, $ionicHistory, User){
  $scope.GoToSignup = function(){
    $state.go('signup');
  }
  $scope.Recoverpw = function(){
    $state.go('recoverpw');
  }
  $scope.user = {
    username: "",
    password: ""
  };
  $scope.login = function () {
    User.login($scope.user.username, $scope.user.password).then(function(){
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('tab.home');
    }).catch(function(){
      var alertPopup = $ionicPopup.alert({
        title: 'Login fail',
        template: 'Incorrect username or password'
      });
    });
  };
})

.controller("SignupCtrl", function($scope, $state, $ionicHistory,$ionicPopup, User){
  $scope.GoBack = function(){
   $ionicHistory.nextViewOptions({
          disableBack: true
      });
      $state.go('login');
  }

  $scope.newuser = {
   username: "",
   password: ""
  };

  $scope.signup = function()
  {
   User.signup($scope.newuser.username, $scope.newuser.password).then(function(){
     var alertPopup = $ionicPopup.alert({
       title: 'Signup successful',
       template: 'Great success!'
     });
     $state.go('login');
   }).catch(function(){
     var alertPopup = $ionicPopup.alert({
       title: 'Signup fail',
       template: 'Missing somethings'
     });
   });
  }

})

.controller("RecoverpwCtrl", function($scope, $ionicHistory, $state){
  $scope.GoBack = function(){
   $ionicHistory.nextViewOptions({
          disableBack: true
      });
      $state.go('login');
  }
})
.controller("selectmenuCtrl", function($scope, $ionicHistory, $state, $http){
  $scope.GoBack = function(){
   $ionicHistory.nextViewOptions({
          disableBack: true
      });
      $state.go('login');
  }
})

.controller("HomeCtrl", function($scope,$state, Restaurants){
    $scope.$on('$ionicView.enter', function(){

      Restaurants.list().then(function(data){
        $scope.restaurants = data;
      });

    });
})

.controller("AccountCtrl", function($scope, User){
   $scope.$on('$ionicView.enter', function(){
    User.getLoggedUser().then(function(userdata){
       $scope.user =  userdata;
       User.getUserInfo($scope.user.id).then(function(data){
          $scope.curr_user = data[0];
          console.log(data[0]);
       });
    });
  });
})

.controller("FinderCtrl", function($scope, $state){
  $scope.MapView = function(){
    $state.go('location');
  }
})

.controller("LocationCtrl", function($scope , $state, $cordovaGeolocation, $ionicLoading, $ionicPlatform, $ionicHistory) {

  var center_pos, new_center_pos, markers;
  var client_width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  $ionicPlatform.ready(function() {
    $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
    });

    var posOptions = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
    };
    $cordovaGeolocation.getCurrentPosition(posOptions)
      .then(function (position) {
          var lat  = position.coords.latitude;
          var long = position.coords.longitude;
          var myLatLng = new google.maps.LatLng(lat, long);
          var mapOptions = {
              center: myLatLng,
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          var map = new google.maps.Map(document.getElementById("map"), mapOptions);

          $scope.map = map;
          $ionicLoading.hide();

          //wait the map initialize first
          google.maps.event.addListenerOnce($scope.map, 'idle', function(){
          var marker = new google.maps.Marker({
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              position: myLatLng
          });
          var infoWindow = new google.maps.InfoWindow({
              content: "You are here!"
          });
          infoWindow.open($scope.map, marker);
          google.maps.event.addListener(marker, 'click', function () {
              infoWindow.open($scope.map, marker);
          });
        });
          getMoveData();
          google.maps.event.addListener(map,'dragend',getMoveData)
      }, function(err) {
          $ionicLoading.hide();
          console.log(err);
      });

        // this function will find the new lat, lng, and set as the new center
    function getMoveData(){
        center_pos = $scope.map.getCenter();
        new_center_pos = center_pos.toString();
        new_center_pos = new_center_pos.replace('(', '');
        new_center_pos = new_center_pos.replace(')', '');

        latlngArray = new Array();
        latlngArray = new_center_pos.split(",")

         for (a in latlngArray) {
          latlngArray[a] = parseFloat(latlngArray[a]);
        }
        newLat = latlngArray[0];
        newLng = latlngArray[1];

        $scope.map.setCenter({lat: newLat, lng: newLng});
        showMap();
    }
    //after getting new center, show the data
    function showMap(){
      var radius_to_find = client_width - 50;
      // remember clear the previous markers first be4 request new center
      clearMarkers();
      var request = {
          location: center_pos,
          radius: client_width,
          types: ['restaurant']
        };
      var service = new google.maps.places.PlacesService($scope.map);
          service.nearbySearch(request, callback);
    }
    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          createMarker(results[i]);
        }
      }
    }
    markers = [];

    function createMarker(place){
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      var marker = new google.maps.Marker({
        map: $scope.map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });
      markers.push(marker);

      infowindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }

    function clearMarkers() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }
  });
  $scope.GoBack = function(){
   $ionicHistory.nextViewOptions({
          disableBack: true
      });
      $state.go('tab.finder');
  }
})

.controller("BookingCtrl", function($scope, $ionicHistory, $state){
  $scope.GoBack = function(){
   $ionicHistory.nextViewOptions({
          disableBack: true
      });
      $state.go('tab.orders');
  }
})

.controller("OrdersCtrl", function($scope, User, Orders){

  $scope.$on('$ionicView.enter', function(){
    User.getLoggedUser().then(function(userdata){
       $scope.user =  userdata;
       console.log($scope.user.id);
       Orders.all($scope.user.id).then(function(orderdata){
          $scope.orders = orderdata;
          console.log($scope.orders);
       });
    });
  });
});


