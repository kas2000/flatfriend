angular
	.module('flat_find')
    .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$http', '$state', '$rootScope', 'Auth', 'Notification'];

   	function HomeCtrl($http, $state, $rootScope, Auth, Notification) {
    	
   		var vm = this;

      console.log("Home");

      vm.start = function(){
      	$state.go('appartments');
        if(!$rootScope.currentUser){
           Notification.warning({message: 'Настоятельно просим вас пройти регистрацию!', title: 'FlatFind', positionY: 'top', positionX: 'right'});
        }
      }

      vm.register = function(){
        console.log(vm.firstname);
        console.log(vm.secondname);
      }

      vm.signUp = function(){
        console.log('qwe');
        if(vm.email&&vm.email!=''&&vm.password&&vm.password!=''&&vm.password==vm.password_confirm&&vm.firstname&&vm.firstname!=''&&vm.lastname&&vm.lastname!=''&&vm.role){
          console.log('qwe');
          var data = {
              email: vm.email,
              password: vm.password,
              firstname: vm.firstname,
              lastname: vm.lastname,
              role: vm.role,
              quick: true
          }
          $http.post('/api/signup', data)
            .success(function(data){
                Notification.info({message: 'Добро пожаловать, '+data.firstname, title: 'FlatFriend', positionY: 'top', positionX: 'right'});
                  $rootScope.currentUser = data;
                  $state.go('appartments');
                  console.log(data);
            }).error(function(data){
                 Notification.error({message: data.msg, title: 'FlatFriend', positionY: 'top', positionX: 'right'});
            })
        }
                
      }




      

      
    };

