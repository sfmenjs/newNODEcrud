(function() {
  "use strict";
  angular.module('app').controller('HomeController', HomeController);
  //.controller('HomeController', function(HomeFactory) { ... })
  function HomeController(HomeFactory) {
    var vm = this;

    vm.deletePen = function(pen) {
      HomeFactory.deletePen(pen).then(function() {
        vm.pens.splice(vm.pens.indexOf(pen), 1);
      });
    };

    HomeFactory.getPens().then(function(res) {
      vm.pens = res;
    });
  }
})();
