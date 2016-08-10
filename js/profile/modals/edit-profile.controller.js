(function(){
    'use strict';
    
    angular.module('telecare').controller('editProfileModal', editProfileModal);
        
        editProfileModal.$inject = ['$uibModalInstance', '$scope'];
        
        function editProfileModal($uibModalInstance, $scope){
            var vm = this;
            vm.user = angular.copy($scope.user);
            
          /**
           * Saving the user.
           */
          vm.ok = function ok() {
            $uibModalInstance.close(vm.user);
          };
    
          /**
           * Dismissing the modal, do not save task.
           */
          vm.cancel = function cancel() {
            $uibModalInstance.dismiss();
          };
            
            
        };
})();