angular
	.module('flat_find')
    .controller('UnknownCtrl', UnknownCtrl);

    UnknownCtrl.$inject = ['$http', '$state', '$rootScope', '$modal', '$cookies'];

   	function UnknownCtrl($http, $state, $rootScope, $modal, $cookies) {
    	
   		console.log('UnknownCtrl');
   		var vm = this;

      

    };

