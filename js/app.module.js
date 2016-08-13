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
            templateUrl: 'js/conversations/conversations.html',
            controller: 'ConversationsController',
            controllerAs: 'Convos',
            resolve: {
              conversations: function conversations(Conversations){
                return Conversations.getConversations();
              }
            }
          })
          .state('body.conversations.conversation', {
            url: '/:conversationId',
            templateUrl: 'js/conversations/single-conversation.html',
            controller: 'ConversationsController',
            controllerAs: 'Convos',
            resolve: {
              conversation: function conversation(Conversations, $stateParams){
                return Conversations.getSingleConvo($stateParams.conversationId);
              }
            }
          })
          .state('body.consults',{
            url: '/consults/:consultId/consult',
            templateUrl: 'js/consults/consults.html',
            controller: 'ConsultsController',
            controllerAs: 'consultsCtrl',
            resolve: {
              consults: function consults(Consults, $stateParams){
                return Consults.getConsults($stateParams.consultId);
              }
            }
          })
          .state('body.consults.consult', {
            url: '/:consultEid',
            templateUrl: 'js/consults/single-consult.html',
            controller: 'ConsultsController',
            controllerAs: 'consultsCtrl',
            resolve: {
              consult: function consult(Consults, $stateParams){
                return Consults.getSingleConsult($stateParams.consultEid);
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