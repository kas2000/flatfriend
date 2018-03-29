angular
	.module('flat_find')
    .controller('StudentsFullPhotoCtrl', StudentsFullPhotoCtrl);

    StudentsFullPhotoCtrl.$inject = ['$http', '$state', '$rootScope', '$modal', 'photo'];

   	function StudentsFullPhotoCtrl($http, $state, $rootScope, $modal, photo) {
    	
   		console.log('StudentsFullPhotoCtrl');
   		var vm = this;


       vm.photo = photo;
      

    };

