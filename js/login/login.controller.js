(function(){
    'use strict';
    
    angular.module('telecare')
        .controller('LoginController', function($http){
            var vm = this;
          vm.login = login;

          function login(creds){
            $http.post('http://' + creds.username + ':' + creds.password + '@dev-telecarelive.pantheonsite.io/')
            .then(function(res){
              console.log(res);
            });
          }


          //   $http.defaults.headers.common['Authorization'] = 'Basic Z3V0aWVycmV6Lmx4QGdtYWlsLmNvbTp1bmljb3Ju';

          // function fetch(){
          //   $http.get('http://dev-telecarelive.pantheonsite.io/api/v1/user')
          //       .then(function(res){
          //         console.log(res);
          //         vm.person = res.data.data;
          //       });
          //     }

        });
})();