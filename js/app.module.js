(function(){
  'use strict';

  angular.module('myApp', [])
      .controller('BodyController', function($http){
        var vm = this;
        vm.page = 'Cusp of Glory';
        vm.fetch = fetch;
        $http.defaults.headers.Authorization = 'Basic Z3V0aWVycmV6Lmx4QGdtYWlsLmNvbTp1bmljb3Ju';

        function fetch(){
          $http.get('http://dev-telecarelive.pantheonsite.io/api/v1/user')
              .then(function(res){
                console.log(res);
              });
        }

      });
})();

//add module allow cors to receive