// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('config', []).constant('API_ENDPOINT', {
  url: 'http://localhost:5000/'
});

angular.module('starter.services', ['config']);

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.tabs.style('standard');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    // resolve: { islogged: function(User){
    //     return User.isLogged();
    //   }
    // }
  })

  // Each tab has its own nav history stack:
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignupCtrl'
  })
  .state('recoverpw', {
    url: '/recoverpw',
    templateUrl: 'templates/recoverpw.html',
    controller: 'RecoverpwCtrl'
  })

  // States for booking an ORDER in a SPECIFIC RESTAURANT
  .state('restaurant', {
      url: '/restaurant',
      templateUrl: 'templates/Booking_steps/restaurant.html',
      controller: 'RestaurantCtrl'
  })
  .state('restaurant_menu', {
      url: '/restaurant/menu',
      templateUrl: 'templates/Booking_steps/restaurant_menu.html',
      controller: 'RestaurantMenuCtrl'
  })
  .state('booking_confirm', {
      url: '/restaurant/menu/confirm',
      templateUrl: 'templates/Booking_steps/confirm_booking.html',
      controller: 'BookingCtrl'
  })

  .state('booking', {
      url: '/booking',
      templateUrl: 'templates/booking.html',
      controller: 'BookingTestCtrl'
  })
  .state('selectmenu', {
    url: '/selectmenu',
    templateUrl: 'templates/menu-selection.html',
    controller: 'selectmenuCtrl'
  })

  // States for tab
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('tab.finder', {
      url: '/finder',
      views: {
        'tab-finder': {
          templateUrl: 'templates/tab-finder.html',
          controller: 'FinderCtrl'
        }
      }
    })
  .state('location', {
    url: '/location',
    templateUrl: 'templates/location.html',
    controller: 'LocationCtrl'
  })

  .state('tab.orders', {
      url: '/orders',
      views: {
        'tab-orders': {
          templateUrl: 'templates/tab-orders.html',
          controller: 'OrdersCtrl'
        }
      }
    })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/restaurant');

});
