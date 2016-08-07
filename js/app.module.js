(function(){
  'use strict';
  
  angular.module('telecare', ['ui.router', 'ui.bootstrap', 'ngSanitize'])
    .config(function($stateProvider, $urlRouterProvider){
      
      /**
       * Default route
       */
      $urlRouterProvider.otherwise('/login');
      
      /**
       * Define our states
       */
      $stateProvider
        .state('body', {
          templateUrl: 'js/body/body.html',
          controller: 'BodyController',
          controllerAs: 'Body'
        })
        .state('body.login', {
          url: '/login',
          templateUrl: 'js/login/login.html',
          controller: 'LoginController',
          controllerAs: 'Login'
        })
        .state('body.dashboard', {
          url: '/dashboard',
          templateUrl: 'js/dashboard/dashboard.html',
          controller: 'DashboardController',
          controllerAs: 'Dashboard'
        });
      
    });

 
})();

//add module allow cors to receive