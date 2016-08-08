(function(){
    'use strict';
    angular.module('telecare').service('Users', UsersService);
        
        UsersService.$inject = ['$http', '$state', 'storage', '$rootScope', '$localStorage'];
        
        function UsersService ($http, $state, storage, $rootScope, $localStorage){
            var vm = this; 
            vm.currentUser = null;
            vm.currentUserToken = null;
            vm.getUserById = getUserById;
            vm.login = login;
            vm.logout = logout;
            vm.base64 = base64;
           
           /*
            * get user function 
            * returns {*}
            */
           function getUserById(userId){
               return $http.get('path'+ userId)
                    .then(function(res){
                        if(res.err)return res.err;
                        res.data = vm.currentUser;
                    });
           }
           
          function login(creds){
            var auth = vm.base64(creds.username + ':' + creds.password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + auth;
            $http.post('http://dev-telecarelive.pantheonsite.io/api/v1/auth')
                .then(function(res){
                    
                    vm.currentUser = res.data.data;
                    vm.currentUserToken = res.data.sid;
                    // $rootScope.currentUser = vm.currentUser;
                    $localStorage.currentUser = {name: res.data.data.name, token: res.data.sid};
                    $http.defaults.headers.common['NYTECHSID'] = res.data.sid;
                    $state.go('body.dashboard');

                });
          }
          
          function logout(){
              // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common['NYTECHSID'] = '';
            $state.go('login');
          }
          
           function base64(input){
                var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;
      
                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
      
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
      
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
      
                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);
      
                return output;
          }
           
           
        }
})();