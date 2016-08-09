(function(){
    'use strict';
    
    angular.module('telecare').controller('LoginController', LoginController); 
    
        LoginController.$inject = ['$http', '$state', 'Users'];
        
        function LoginController ($http, $state, Users){
            var vm = this;
            vm.login = login;
            vm.errorLogin = false;

              function login(creds){
                  Users.login(creds, function(res){
                      debugger;
                      if(res !== true){
                          vm.errorLogin = true;
                          return $state.go('login');
                      }
                     return $state.go('body.dashboard');
                  })
              }
        
    
        };
})();