angular
	.module('flat_find')
    .controller('UserAdsCtrl', UserAdsCtrl);

    UserAdsCtrl.$inject = ['$http', '$state', '$rootScope', '$scope', '$cookies', 'editAd'];

   	function UserAdsCtrl($http, $state, $rootScope, $scope, $cookies, editAd) {


        
        console.log('UserAdsCtrl');


        var vm = this;

        vm.user = $rootScope.currentUser;

        vm.noAds = false;



        if(vm.user.role == 'student'){
        	$http.get('/api/student/user_ad/'+vm.user._id).success(function(student){
        		vm.student = student;
        		console.log(vm.student.length);
        		if(vm.student.length <= 0){
        			console.log("no ads");
        			vm.noAds = true;
        		}
        	});
        }else if(vm.user.role == 'landlord'){
        	$http.get('/api/flat/user_ad/'+vm.user.email).success(function(flat){
        		vm.flat = flat;
        		console.log(flat);
        		if(vm.flat.length <= 0){
        			console.log("no ads");
        			vm.noAds = true;
        		}
        	})
        }else{
        	console.log("ERROR");
        }


        vm.deleteFlatAd = function(ad){
        	$http.delete('/api/flat/'+ad._id)
        		.success(function(data){
        			var index = vm.flat.indexOf(ad);
        			vm.flat.splice(index, 1);
        			console.log("Successfully deleted");
        		}).error(function(err){
        			console.log(err);
        		});
        }

        vm.deleteStudentAd = function(ad){
        	$http.delete('/api/student/'+ad._id)
        		.success(function(data){
        			var index = vm.student.indexOf(ad);
        			vm.student.splice(index, 1);
        			console.log("Successfully deleted");
        		}).error(function(err){
        			console.log(err);
        		});
        }


        vm.editStudentAd = function(ad){
        	localStorage.studentData = JSON.stringify(ad);
        	// editAd.addStudentData(ad);
        	$state.go('edit_student');
        }
        
    
    };


   	


