(function(){
    'use strict';
    
    angular.module('telecare')
        .controller('BodyController', BodyController);
        BodyController.$inject = ['Users', '$localStorage'];
        
        function BodyController(Users, $localStorage){
           var vm = this;
           vm.logout = Users.logout;
           vm.dateChange = dateChange;
           vm.userId = $localStorage.currentUser.uid;
           vm.isDoctor = $localStorage.currentUser.doctor;
           
          function dateChange(date){
              return new Date(date * 1000);
          }
          
        
        };
})();