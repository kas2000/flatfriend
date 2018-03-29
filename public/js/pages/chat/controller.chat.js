angular
	.module('flat_find')
    .controller('ChatCtrl', ChatCtrl);

    ChatCtrl.$inject = ['$http', '$state', '$rootScope', 'mySocket' ,'$scope', '$cookies', 'Notification', '$window', '$modal'];

   	function ChatCtrl($http, $state, $rootScope, mySocket, $scope, $cookies, Notification, $window, $modal) {


        
        console.log('ChatCtrl');

        var vm = this;
        var reciever;
        var recievers = [];
        vm.users = [];
        $scope.rooms = new Array();
        $scope.archive_messages = [];
        $scope.invite_data;
        vm.user_id = $rootScope.currentUser._id;
        $scope.chosen = false;
        vm.new_messages = [];
        vm.flats = [];

// Compatibility shim
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

//VideoChat Initialization===============================
        var peer = null;
        vm.streamers = [];
        var peerApiKey = 'w35b9kn366y4aemi';
        $scope.stremId = null;
        $scope.isDisabled = true;
        $scope.connect = 0;
        setUpPeer();
        var videoStream = document.getElementById('videoStream');
        var room_id;

//Вытаскиваем избранных студентов ===========================================================
        // $http.get('/api/fav_student/')
        //     .success(function(data){
        //         vm.friends = data;
        //         console.log(vm.friends);
        //     });

//Вытаскиваем комнаты юзера ===========================================================
        $http.get('/api/rooms/'+$cookies.getObject('user')._id)
            .success(function(response){
                $scope.rooms = response;
                if($scope.rooms.length > 0) {
                    mySocket.emit('connect_rooms', {rooms: $scope.rooms});
                    vm.chooseRoom($scope.rooms[0], 0);
                }
            })
            .error(function(err){
                console.log(err);
            });

//Слушаем обновления чата ===========================================================
        mySocket.forward('updatechat', $scope);
        $scope.$on('socket:updatechat', function(ev, author_name, author_id, message){
            console.log(message);
            vm.author_name = author_name;
            vm.author_id = author_id;
            vm.new_messages.push(message);
            var chat = document.getElementById("content-inner");
            setTimeout(function(){
            chat.scrollTop = chat.scrollHeight;

            }, 100)
        });

//Создаем чат ===========================================================

        vm.groupChatModal = function(){
            var groupChatModal = $modal({
                    show: false, //ne pokazyvaet poka ne progruzitsa data
                    container: 'body',
                    templateUrl: 'views/modals/modal-new-chat.html',
                    controller: 'NewChatModalCtrl',
                    controllerAs: 'vm'
                });
            
            groupChatModal.$promise.then(function() {
                groupChatModal.show();
            });
        }

        
//Умный чат вкл/откл ===========================================================

        // vm.smartChat = function(validation){
        //     console.log(validation);
        //     $http.post('/api/smartchat', {
        //         validation : validation
        //     }, {
        //         headers: {'Content-Type': undefined} 
        //     }).success(function(flat){
        //         vm.flats.push(flat);
        //     });
        //     // if(validation = true){
        //     // }else{
        //     //     console.log("stop");
        //     // }
        // };

//Выбираем чат ===========================================================
        vm.chooseRoom = function(room, index) {
            room_id = room._id;
            $http.get('/api/messages/'+room._id)
                .success(function(response){

                    $scope.archive_messages = response;
                    console.log(response);
                    // for(var a=0; a<response.length; a++){
                    //     vm.messages.push(response.text);
                    // }
                   // console.log(vm.messages);
                    $scope.current_room_index = index;
                    $scope.rooms[index].count = undefined;
                })
                .error(function(err){
                    console.log(err);
                });
        };

//Принять запрос на чат ===========================================================
        vm.acceptRoom = function() {
            $http.put('/api/rooms/'+$scope.invite_data.room._id, {
                user_id: $scope.invite_data.user_id,
                user: $rootScope.currentUser._id
            })
            .success(function(response){
                console.log(response);
                $scope.isAcceptModal = false;
            })
            .error(function(err){
                console.log(err);
            })
        };


//Отклонить запрос на чат ===========================================================
        vm.declineRoom = function() {
            $scope.isAcceptModal = false;
        };

//Отправка сообщения ===========================================================
        vm.sendMessage = function(){
            mySocket.emit('newmessage', {
                username: $rootScope.currentUser.firstname,
                user: $rootScope.currentUser,
                text: vm.text,
                room: $scope.rooms[$scope.current_room_index]._id
            });
            vm.text = '';
        };

//Селф подключение к сокету ===========================================================
       mySocket.emit('self_connect', {user_id: $cookies.getObject('user')._id});

//Открытие принятия запроса юзеру на чат ===========================================================
        mySocket.on($cookies.getObject('user')._id, function(data){

            if(data.type == 0){
                console.log(data);
                $scope.$apply(function(){
                    $scope.isAcceptModal = true;
                    $scope.invite_data = data;
                    vm.sender_name = data.sender_name;
                }); 
            } else {
                console.log(data);
                $scope.$apply(function(){
                    $scope.rooms.push(data.room);
                });

                mySocket.emit('connect_room', {id: data.room._id});   
            }
            
            console.log(data);
        }); 

//VideoChat ============================================================================================================================

    vm.user = $rootScope.currentUser;

    function setUpPeer() {
        peer = new Peer({
            key: peerApiKey,
            debug: 3
        });

        peer.on('open', function() {
            // console.log(peer.id);
            UpdateStreamId(peer.id);
            // getStreaming();
        });

        peer.on('call', function(call) {
            // Answer the call automatically (instead of prompting user) for demo purposes
            call.answer(window.localStream);
            answer(call);
        });

    }

    function UpdateStreamId(id) {
        $scope.streamId = id;
        $scope.isDisabled = false;
        $scope.$apply();
    }

    vm.videoChat = function(){
        if($scope.connect == 0) {
            var my_video = angular.element(document.getElementById('my-video'));
            console.log(my_video);
            navigator.getUserMedia({
                audio: true,
                video: true
            }, function(stream) {
                my_video.prop('src', URL.createObjectURL(stream));
                window.localStream = stream;
                streamUser();
                // step2();
                // videoStream.show();
                $scope.connect = 1;
            }, function() {
                console.log("Streaming error!");
            });

        } else {
            peer.disconnect();
            DisconnectUser();
            window.localStream.getVideoTracks()[0].stop();
            $scope.connect = 0;
        }
    }


    function streamUser() {
        $http.put('/api/user/'+vm.user._id+'/'+$scope.streamId, {user:vm.user})
            .success(function(data) {
                getStreaming();
            }).error(function(err) {
                console.log(err);
            })
    }

    
    function getStreaming() {
        $http.get('/api/user/streaming/'+room_id+'/'+vm.user)
            .success(function(data) {
                // console.log(data);
                for(var i=0; i<data.length; i++){
                    if(data[i]._id == vm.user._id){
                        console.log("Can't check myself");
                    }else{
                        if(data[i].isStreaming == true){
                            vm.streamers.push(data[i]);
                        }
                    }
                }
            }).error(function(err) {
                console.log(err);
            })
    }

    vm.callUser = function(id) {
        var call = id;
        step3(call);
    }

    var their_video = angular.element(document.getElementById('their-video'));

    function step3(id) {
            // Hang up on an existing call if present
            var outgoingCall = peer.call(id, window.localStream);
            if (window.existingCall) {
                window.existingCall.close();
            }
            // Wait for stream on the call, then set peer video display
            outgoingCall.on('stream', function(stream) {
                their_video.prop('src', URL.createObjectURL(stream));
            });

            // UI stuff
            window.existingCall = outgoingCall;
    }

    function answer(id) {
            // Hang up on an existing call if present
            var outgoingCall = id;
            if (window.existingCall) {
                window.existingCall.close();
            }
            // Wait for stream on the call, then set peer video display
            outgoingCall.on('stream', function(stream) {
                their_video.prop('src', URL.createObjectURL(stream));
            });

            // UI stuff
            window.existingCall = outgoingCall;
    }

    vm.end = function() {
        window.existingCall.close();
        // getStreaming();
        DisconnectUser();
    }

    $scope.DisconnectUser = function() {
        $http.put('/api/user/disconnect/'+vm.user._id)
            .success(function(data){
                console.log(data);
            }).error(function(err){
                console.log(err);
            })
    }



    // vm.getStreaming = function(){
    //      $http.get('/api/user/streaming/'+room_id+vm.user)
    //         .success(function(data) {
    //             console.log(data);
    //         }).error(function(err) {
    //             console.log(err);
    //         })
    // }


    };


   	


