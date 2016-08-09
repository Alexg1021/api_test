(function(){
    'use strict';
    angular.module('telecare').controller('ProfileController', ProfileController);
    
    ProfileController.$inject = ['Users'];
        
        function ProfileController(Users){
            var vm = this;
            vm.user = Users.user;
            vm.dateFormat = dateFormat;
            
            function dateFormat(date){
                return moment(date).format('M-DD-YYYY');
            }
            
            
        };
})();