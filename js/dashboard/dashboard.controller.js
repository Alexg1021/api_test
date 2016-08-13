(function(){
    'use strict';
    
    angular.module('telecare').controller('DashboardController', DashboardController);
        
        DashboardController.$inject = ['Users', '$http'];
    
        function DashboardController(Users, $http){
            var vm = this;
        };
})();