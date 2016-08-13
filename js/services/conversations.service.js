(function(){
    'use strict';
    angular.module('telecare')
        .service('Conversations', ConversationsService);
        ConversationsService.$inject = ['$http', '$localStorage'];
        
       function ConversationsService($http, $localStorage){
            var vm = this;
            vm.conversations = [];
            vm.singleConvo = {};
            vm.getConversations = getConversations;
            vm.getSingleConvo = getSingleConvo;
            vm.postMessage = postMessage;
            vm.checkDB = checkDB;
            
            function checkDB(){
                 return $http.get('http://dev-telecarelive.pantheonsite.io/api/v1/conversation/'+ vm.singleConvo.eid + '/messages')
                    .then(function(res){
                        if(vm.singleConvo.messages.length !== res.data.data.messages.length){
                            vm.singleConvo.messages = [];
                            return vm.singleConvo.messages = res.data.data.messages;
                        }
                        return;
                    }, function(err){
                        console.error(err);
                    });
            }

            function getConversations(){
                return $http.get('http://dev-telecarelive.pantheonsite.io/api/v1/conversations')
                    .then(function(res){
                        return vm.conversations = res.data.data;
                    }, function(err){
                        console.error(err);
                    });
            }
            
            function getSingleConvo(convoEid){
                debugger;
                return $http.get('http://dev-telecarelive.pantheonsite.io/api/v1/conversation/'+ convoEid + '/messages')
                    .then(function(res){
                        debugger;
                        return vm.singleConvo = res.data.data;
                    }, function(err){
                        console.error(err);
                    });
            }
            
            function postMessage(message){
                var msg = {
                    conversation_id: vm.singleConvo.eid,
                    status: 1,
                    message_text: message.message
                }
                return $http({
                    url: 'http://dev-telecarelive.pantheonsite.io/api/v1/conversation/'+ vm.singleConvo.eid + '/messages',
                    method: 'POST',
                    data: $.param(msg),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function(res){
                    msg.created = new Date();
                    msg.name = $localStorage.currentUser.name;
                        // return vm.singleConvo.messages.push(msg);
                    });
            }
            
            function editProfile(user){
                var postData = 'myData='+JSON.stringify(user);
                        
                return $http({
                    url: 'http://dev-telecarelive.pantheonsite.io/api/v1/user',
                    method: 'POST',
                    data: $.param(user),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(function(res){
                    return _.merge(vm.user, user);
                }, function(err){
                    console.error(err);
                })
           }
            
        };
})();