(function(){
    'use strict';
    
    angular.module('telecare').controller('DashboardController', DashboardController);
        
        DashboardController.$inject = ['Users', '$http'];
    
        function DashboardController(Users, $http){
            var vm = this;
            vm.clickMe = clickMe;
            vm.userToken = Users.currentUserToken;
            
            function clickMe(){
                $http.defaults.headers.common['Tk'] = vm.userToken;
                $http.get('http://dev-telecarelive.pantheonsite.io/api/v1/user')
                .then(function(res){
                    console.log(res);
                })
            }
            
            
        };
})();