angular.module('starter.controllers', [])

.controller("LoginCtrl", function($scope, $state){
  $scope.GoToSignup = function(){
    $state.go('signup');
  }
  $scope.Recoverpw = function(){
    $state.go('recoverpw');
  }
})

.controller("SignupCtrl", function($scope, $state, $ionicHistory){
  $scope.GoBack = function(){
   $ionicHistory.nextViewOptions({
          disableBack: true
      });
      $state.go('login');
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
.controller("selectmenuCtrl", function($scope, $ionicHistory, $state){
  $scope.GoBack = function(){
   $ionicHistory.nextViewOptions({
          disableBack: true
      });
      $state.go('login');
  }
})

.controller("HomeCtrl", function($scope){

})

.controller("DiscoverCtrl", function($scope){

})

.controller("BookingCtrl", function($scope, $ionicHistory, $state){
  $scope.GoBack = function(){
   $ionicHistory.nextViewOptions({
          disableBack: true
      });
      $state.go('home');
  }
})

.controller("PurchaseCtrl", function($scope){

})

.controller("AccountCtrl", function($scope){

});
