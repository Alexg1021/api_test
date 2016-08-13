(function(){
    'use strict';
    
    angular.module('telecare')
        .controller('ConsultsController', ConsultsController);
         ConsultsController.$inject = ['Consults', '$localStorage', '$interval'];
         
        function ConsultsController (Consults, $localStorage, $interval){
            var vm = this;
            vm.consults = Consults.consults;
            vm.consult = Consults.consult;
            vm.postConsultMessage = postConsultMessage;
            vm.sendForm = {};
            vm.intervalCall = intervalCall;
            
            function postConsultMessage(){
                Consults.postConsult(vm.sendForm)
                    .then(function(){
                        vm.sendForm = {};
                    });
            }
            
            $interval(intervalCall, 5000);

            function intervalCall(){
               Consults.checkDB();
            }
            
        }
})();