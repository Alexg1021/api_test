(function(){
    'use strict';
    angular.module('telecare').controller('ProfileController', ProfileController);
    
    ProfileController.$inject = ['Users'];
        
        function ProfileController(Users){
            var vm = this;
            vm.user = Users.user;
            
            
        };
})();