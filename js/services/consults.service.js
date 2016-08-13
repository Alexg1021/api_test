(function(){
    'use strict';
    angular.module('telecare')
        .service('Consults', ConsultsService);
        ConsultsService.$inject = ['$http', '$localStorage'];
        
       function ConsultsService($http, $localStorage){
            var vm = this;
            vm.consults = [];
            vm.consult = {};
            vm.getConsults = getConsults;
            vm.getSingleConsult = getSingleConsult;
            vm.postConsult = postConsult;
            vm.checkDB = checkDB;
            
            function checkDB(){
                 return $http.get('http://dev-telecarelive.pantheonsite.io/api/v1/consult/'+ vm.consult.eid + '/messages')
                    .then(function(res){
                        if(vm.consult.messages.length !== res.data.data.messages.length){
                            vm.consult.messages = [];
                            return vm.consult.messages = res.data.data.messages;
                        }
                        return;
                    }, function(err){
                        console.error(err);
                    });
            }

            function getConsults(userId){
                return $http.get('http://dev-telecarelive.pantheonsite.io/api/v1/consults/' + userId)
                    .then(function(res){
                        return vm.consults = res.data.data;
                    }, function(err){
                        console.error(err);
                    });
            }
            
            function getSingleConsult(consultEid){
                vm.consult = {};
                return $http.get('http://dev-telecarelive.pantheonsite.io/api/v1/consult/'+ consultEid + '/messages')
                    .then(function(res){
                        return vm.consult = res.data.data;
                    }, function(err){
                        console.error(err);
                    });
            }
            
            // consults/user_id
            
            function postConsult(message){
                var msg = {
                    consult_id: vm.consult.eid,
                    status: 1,
                    message_text: message.message
                }
                return $http({
                    url: 'http://dev-telecarelive.pantheonsite.io/api/v1/consult/'+ vm.consult.eid + '/messages',
                    method: 'POST',
                    data: $.param(msg),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function(res){
                    msg.created = new Date();
                    msg.name = $localStorage.currentUser.name;
                        // return vm.consult.messages.push(msg);
                    });
            }
            
        };
})();