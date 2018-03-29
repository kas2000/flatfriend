angular
	.module('flat_find')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$http', '$state', '$rootScope', '$modal', '$cookies', "Auth"];

   	function MainCtrl($http, $state, $rootScope, $modal, $cookies, Auth) {
    	
   		console.log('ads');
   		var vm = this;


      $rootScope.$watch('currentUser', function(){
            vm.user = $rootScope.currentUser;
            console.log(vm.user);
      })



   		$rootScope.showAside = false;

   		vm.changeWidth = function(){
   			$rootScope.showAside = !$rootScope.showAside;
   		}

      vm.logout = function(){
        Auth.logout();
      }

    };

