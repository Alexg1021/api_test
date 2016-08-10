(function(){
    'use strict';
    angular.module('telecare').controller('ProfileController', ProfileController);
    
    ProfileController.$inject = ['Users', '$uibModal', '$rootScope'];
        
        function ProfileController(Users, $uibModal, $rootScope){
            var vm = this;
            vm.user = Users.user;
            vm.dateFormat = dateFormat;
            vm.editModal = editModal;
            vm.editProfile = editProfile;
            
            function editModal(){
                var scope = $rootScope.$new();
                
                scope.user = vm.user;
                
                return $uibModal.open({
                    controller: 'editProfileModal',
                    controllerAs: 'editProfile',
                    templateUrl:'js/profile/modals/edit-profile.tmpl.html',
                    scope: scope
                }).result.then(vm.editProfile)
            }
            
            function editProfile(user){
                return Users.editProfile(user);
            }
            
            
            function dateFormat(date){
                return moment(date).format('M-DD-YYYY');
            }
            
            
        };
})();