angular
	.module('flat_find')
    .controller('StudentsAdCtrl', StudentsAdCtrl);

    StudentsAdCtrl.$inject = ['$http', '$state', '$rootScope', '$modal', 'Notification'];

   	function StudentsAdCtrl($http, $state, $rootScope, $modal, Notification) {
    	
   		console.log('StudentsAdCtrl');
   		var vm = this;
      var birthdate;

   		// console.log($state.params.id);

     		$http.get('/api/student/' + $state.params.id)
     			.success(function(data){
     				vm.student = data; 
     				console.log(vm.student);
            if(vm.student.student_comment == "undefined"){
              vm.comment = false;
            }else{
              vm.comment = true;
            }
            // console.log(vm.student._id);
     			})



          // birthdate = new Date(vm.student.student_birth, )




         $http.get('/api/fav_student/' + $state.params.id)
          .success(function(data){
            vm.likes = data.amount;
            console.log(data);
          })


        vm.favoriteStudent = function(){
          $http.post('/api/fav_student',{
            student: vm.student._id
          }).success(function(data){
            console.log(data);
            if(data.dislike == true){
              vm.likes--;
              Notification.success({message: 'Вы успешно убрали студента из избранных!', title: 'FlatFriend', positionY: 'top', positionX: 'right'});
            }
            else{
              vm.likes++;
              Notification.success({message: 'Вы успешно добавили студента в избранные!', title: 'FlatFriend', positionY: 'top', positionX: 'right'});
            }
          });
        }

        vm.showPhoto = function(){

           var fullPhotoModal = $modal({
            show: false,
            container: 'body',
            templateUrl: 'views/modals/modal-full-photo.html',
            controller: 'StudentsFullPhotoCtrl',
            controllerAs: 'vm',
            resolve: {
                photo: function() {
                    return vm.student.image;
                }
            }
          });
        
          fullPhotoModal.$promise.then(function() {
              fullPhotoModal.show();
          });
        }
      

    };

