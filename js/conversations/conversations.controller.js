(function(){
    'use strict';
    angular.module('telecare')
        .controller('ConversationsController', ConversationsController);
        
        ConversationsController.$inject = ['Conversations', '$localStorage', '$interval'];
        
        function ConversationsController(Conversations, $localStorage, $interval){
          var vm = this;  
          vm.conversations = Conversations.conversations;
          vm.singleConvo = Conversations.singleConvo;
          vm.userName = $localStorage.currentUser.name;
          vm.postMessage = postMessage;
          vm.sendForm = {};
          vm.intervalCheck = intervalCheck;
          
          function postMessage(){
              Conversations.postMessage(vm.sendForm)
                .then(function(){
                vm.sendForm = {};
              })
          }
          
          $interval(intervalCheck, 4000);
          
          function intervalCheck(){
            Conversations.checkDB();
          }
          
          
          
        };
})();