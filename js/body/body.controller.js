(function(){
    'use strict';
    
    angular.module('telecare')
        .controller('BodyController', BodyController);
        BodyController.$inject = ['Users'];
        
        function BodyController(Users){
           var vm = this;
           vm.logout = Users.logout;
        
        };
})();