(function(){
  'use strict';
  
  angular.module('telecare', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'ngStorage'])
    .config(function($stateProvider, $urlRouterProvider){
      
      /**
       * Default route
       */
      $urlRouterProvider.otherwise('/login');
      
      /**
       * Define our states
       */
      $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'js/login/login.html',
            controller: 'LoginController',
            controllerAs: 'Login'
          })
          .state('body', {
            templateUrl: 'js/body/body.html',
            controller: 'BodyController',
            controllerAs: 'Body'
          })
          .state('body.dashboard', {
            url: '/dashboard',
            templateUrl: 'js/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'Dashboard'
          })
          .state('body.profile', {
            url: '/user-profile',
            templateUrl: 'js/profile/profile.html',
            controller: 'ProfileController',
            controllerAs: 'Profile',
            resolve: {
              user: function user(Users){
                return Users.getUserById();
              }
            }
          })
          .state('body.conversations',{
            url: '/conversations',
            templateUrl: 'conversations/conversations.html',
            controller: 'ConvoController',
            controllerAs: 'Convos',
            resolve: {
              conversations: function conversations(Conversations){
                return Conversations.getConvos();
              }
            }
          });
      
    })
      .run(function($rootScope, $http, $location, $localStorage){
        if($localStorage.currentUser){
          $http.defaults.headers.common['NYTECHSID'] = $localStorage.currentUser.token;
        }
        
        $rootScope.$on('$locationChangeStart', function(event, next, current){
          var publicPages = ['/login'];
          var restrictedPage = publicPages.indexOf($location.path()) === -1;
          if(restrictedPage && !$localStorage.currentUser){
            $location.path('/login');
          }
        })
      });
 
})();

//add module allow cors to receive