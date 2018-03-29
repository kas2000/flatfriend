angular
	.module('flat_find')
    .controller('SendEmailCtrl', SendEmailCtrl);

    SendEmailCtrl.$inject = ['$http', '$state', '$rootScope', '$modal', '$scope', 'owner_email', 'Notification'];

   	function SendEmailCtrl($http, $state, $rootScope, $modal, $scope, owner_email, Notification) {
    	
    	var vm = this;
   		console.log('SendEmailCtrl');
   		
   		vm.user = $rootScope.currentUser;

      if(vm.user){
        vm.reply_email = vm.user.email;
      }

      vm.sendEmail = function(){
        if(!vm.user){
          vm.sender_email = vm.email
        }else{
          vm.sender_email = vm.reply_email
        }
        console.log(vm.text);
        if(vm.text==''){
           Notification.error({message: "Вы ничего не написали!", title: 'FlatFriend', positionY: 'top', positionX: 'right'});
        }else{
           $http.post('/api/email', {
          reciever_email: owner_email,
          sender_email: vm.sender_email,
          text: vm.text
          }).success(function(email){
             Notification.success({message: "Письмо было успешно отправлено" , title: 'FlatFriend', positionY: 'top', positionX: 'right'});
          }).error(function(){
             Notification.error({message: "Что-то пошло не так", title: 'FlatFriend', positionY: 'top', positionX: 'right'});
          })
          
        }

        
      }

   		

     


    };

