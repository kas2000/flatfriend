angular
	.module('flat_find')
    .controller('IndexCtrl', IndexCtrl);

    IndexCtrl.$inject = ['$http', '$state', '$rootScope', '$modal'];

   	function IndexCtrl($http, $state, $rootScope, $modal) {
    	
   		console.log('index');
   		var vm = this;

   		$rootScope.state = $state;


    };

