angular
	.module('flat_find')
    .controller('AppartmentsAdCtrl', AppartmentsAdCtrl);

    AppartmentsAdCtrl.$inject = ['$http', '$state', '$rootScope', '$modal', '$scope', 'Notification'];

   	function AppartmentsAdCtrl($http, $state, $rootScope, $modal, $scope, Notification) {
    	
    	var vm = this;
   		console.log('AppartmentsAdCtrl');
   		
   		vm.user = $rootScope.currentUser;

   		// console.log($state.params.id);

      var flat_coords = [];

      $http.get('/api/comment/' + $state.params.id)
        .success(function(comments){
          vm.comments = comments;
          console.log(vm.comments);
        }).error(function(err){
          console.log(err);
        })


      $http.get('/api/flat/' + $state.params.id)
      	.success(function(data){
          vm.flat = data;
          vm.main_photo = data.main_image;
          vm.photos = data.images.split(",");
      		console.log(data);
          flat_coords = [data.longitude, data.latitude];
          console.log(flat_coords);
          if(data.house_complex == "undefined"){
            vm.flat.house_complex = "не указано";
          }
          if(data.all_floors == "undefined"){
            vm.flat.all_floors = "не указано";
          }
          if(data.flat_state == ""){
            vm.flat.flat_state = "не указано";
          }
          if(data.wc_state == ""){
            vm.flat.wc_state = "не указано";
          }
          if(data.balcony_state == ""){
            vm.flat.balcony_state = "не указано";
          }
          if(data.door_state == ""){
            vm.flat.door_state = "не указано";
          }
          if(data.phone_state == ""){
            vm.flat.phone_state = "не указано";
          }
          if(data.internet_state == ""){
            vm.flat.internet_state = "не указано";
          }
          if(data.furniture_state == ""){
            vm.flat.furniture_state = "не указано"; 
          }
          if(data.floor_state == ""){
            vm.flat.floor_state = "не указано";
          }
          if(data.flat_comment == "undefined"){
            vm.flat.flat_comment = "Владелец не указал комментарий";
          }
      	})



        var house;
        $scope.afterInit = function($map){
          map = $map;
          house = new ymaps.GeoObject({
            geometry: {
              type: "Point",
              coordinates: flat_coords
            }
          }, {
            preset: "islands#violetDotIconWithCaption"
          });

          map.geoObjects.add(house);

          map.setCenter(flat_coords);
          map.setZoom(17);

          // house.events.add('click', function(){
            
          // });

      };

      vm.showPhoto = function(photo){
        vm.main_photo = photo;
      }

      vm.emailModal = function(){

           var emailModal = $modal({
            show: false,
            container: 'body',
            templateUrl: 'views/modals/modal-email.html',
            controller: 'SendEmailCtrl',
            controllerAs: 'vm',
            resolve: {
                owner_email: function() {
                    return vm.flat.email;
                }
            }
          });
        
          emailModal.$promise.then(function() {
              emailModal.show();
          });
        };

        vm.comment = function(){
          if(!vm.user){
            $http.post('/api/comment', {
              text: vm.text,
              firstname: vm.name,
              email: vm.email,
              flat: $state.params.id
            }).success(function(comment){
              console.log(comment);
              Notification.success({message: "Ваш комментарий был успешно добавлен!", title: 'FlatFriend', positionY: 'top', positionX: 'right'});
              vm.comments.push(comment);
              vm.text = '';
              vm.name = '';
              vm.email = '';
            }).error(function(err){
              Notification.error({message: "Что-то пошло не так!", title: 'FlatFriend', positionY: 'top', positionX: 'right'});
              console.log(err);
            });
          }else{
            $http.post('/api/comment', {
              firstname: vm.user.firstname,
              text: vm.text,
              email: vm.user.email,
              user: vm.user._id,
              flat: $state.params.id
            }).success(function(comment){
              console.log(comment);
              Notification.success({message: "Ваш комментарий был успешно добавлен!", title: 'FlatFriend', positionY: 'top', positionX: 'right'});
              vm.comments.push(comment);
              vm.text = '';
            }).error(function(err){
              Notification.error({message: "Что-то пошло не так!", title: 'FlatFriend', positionY: 'top', positionX: 'right'});
              console.log(err);
            });
          }
          
        };

    };

