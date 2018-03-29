angular
	.module('flat_find')
    .controller('NewChatModalCtrl', NewChatModalCtrl);

    NewChatModalCtrl.$inject = ['$http', '$state', '$rootScope', '$modal', 'Auth', '$scope', '$cookies'];

   	function NewChatModalCtrl($http, $state, $rootScope, $modal, Auth, $scope, $cookies) {
    	
   		console.log('NewChatModalCtrl');
   		var vm = this;

   		$http.get('/api/fav_student/')
            .success(function(data){
                vm.friends = data;
                console.log(vm.friends);
            });

   		vm.room_participants = [];

   		// console.log(qwe);

        vm.AddRoomParticipants = function(participant){

            $scope.chosen = !$scope.chosen;
            if(vm.room_participants.includes(participant.student.user)){
                var index = vm.room_participants.indexOf(participant.student.user);
                vm.room_participants.splice(index, 1);
                console.log(vm.room_participants);
            }else{
                vm.room_participants.push(participant.student.user);
                console.log(vm.room_participants);
            }
        };


        vm.groupChat = function(){
            var data = {
                title: vm.title,
                user: vm.room_participants,
                group_room: true,
                sender_name: $rootScope.currentUser.firstname
            }
            $http.post('/api/rooms/'+$cookies.getObject('user')._id, data)
                .success(function(response){
                        console.log(response);
                        // vm.rooms.push(response)
                })
                .error(function(err){
                    console.log(err);
                });
        };

    };

