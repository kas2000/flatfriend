angular
	.module('flat_find')
    .controller('SignInCtrl', SignInCtrl);

    SignInCtrl.$inject = ['$http', '$state', '$rootScope', '$modal', 'Auth'];

   	function SignInCtrl($http, $state, $rootScope, $modal, Auth) {
    	
   		console.log('SignInCtrl');
   		var vm = this;

   		vm.signIn = function(){
   			if(vm.email&&vm.email!=''&&vm.password&&vm.password!=''){
                Auth.login({
                    email: vm.email,
                    password: vm.password
                });
            }
   		}

    };

