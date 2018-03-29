angular
	.module('flat_find')
    .controller('StudentDashCtrl', StudentDashCtrl);

    StudentDashCtrl.$inject = ['$http', '$state', '$rootScope', '$modal', '$cookies', '$scope', 'Notification'];

   	function StudentDashCtrl($http, $state, $rootScope, $modal, $cookies, $scope, Notification) {
    	
   		console.log('StudentDashCtrl');
   		var vm = this;

   		$scope.showEdit = false;
   		$scope.hideData = false;
   		// console.log($rootScope.currentUser._id);

   		$http.get('/api/user/edit/'+$rootScope.currentUser._id)
   			.success(function(student){
   				vm.student = student;
   				console.log(vm.student.gender);

   				if(vm.student.instagram == undefined){
   					vm.student.instagram = 'Информация не заполнена';
   				}

   				if(vm.student.facebook == undefined){
   					vm.student.facebook = 'Информация не заполнена';
   				}

   				if(vm.student.vk == undefined){
   					vm.student.vk = 'Информация не заполнена';
   				}

   				if(vm.student.telegram == undefined){
   					vm.student.telegram = 'Информация не заполнена';
   				}
   			})
   			.error(function(error){
   				console.log(error);
   			});


   			vm.editProfile = function(){
   				$scope.showEdit = !$scope.showEdit;
   				$scope.hideData = !$scope.hideData;
   			}

        var gender;

        $scope.$watch('showEdit', function(){
          if($scope.showEdit == true){
            $scope.$watch('vm.student.gender', function(){
              gender = vm.student.gender;
              console.log(gender);
            });
          }
        });
        


   			$scope.days = [
    		{ day: "01", name: "01" },
    		{ day: "02", name: "02" },
    		{ day: "03", name: "03" },
    		{ day: "04", name: "04" },
    		{ day: "05", name: "05" },
    		{ day: "06", name: "06" },
    		{ day: "07", name: "07" },
    		{ day: "08", name: "08" },
    		{ day: "09", name: "09" },
    		{ day: "10", name: "10" },
    		{ day: "11", name: "11" },
    		{ day: "12", name: "12" },
    		{ day: "13", name: "13" },
    		{ day: "14", name: "14" },
    		{ day: "15", name: "15" },
    		{ day: "16", name: "16" },
    		{ day: "17", name: "17" },
    		{ day: "18", name: "18" },
    		{ day: "19", name: "19" },
    		{ day: "20", name: "20" },
    		{ day: "21", name: "21" },
    		{ day: "22", name: "22" },
    		{ day: "23", name: "23" },
    		{ day: "24", name: "24" },
    		{ day: "25", name: "25" },
    		{ day: "26", name: "26" },
    		{ day: "27", name: "27" },
    		{ day: "28", name: "28" },
    		{ day: "29", name: "29" },
    		{ day: "30", name: "30" },
    		{ day: "31", name: "31" }
		];

		$scope.months = [
    		{ month: "01", name: "Январь" },
    		{ month: "02", name: "Февраль" },
    		{ month: "03", name: "Март" },
    		{ month: "04", name: "Апрель" },
    		{ month: "05", name: "Май" },
    		{ month: "06", name: "Июнь" },
    		{ month: "07", name: "Июль" },
    		{ month: "08", name: "Август" },
    		{ month: "09", name: "Сентябрь" },
    		{ month: "10", name: "Октябрь" },
    		{ month: "11", name: "Ноябрь" },
    		{ month: "12", name: "Декабрь" }
		];

		$scope.years = [
    		{ year: "2010", name: "2010" },
    		{ year: "2009", name: "2009" },
    		{ year: "2008", name: "2008" },
    		{ year: "2007", name: "2007" },
    		{ year: "2006", name: "2006" },
    		{ year: "2005", name: "2005" },
    		{ year: "2004", name: "2004" },
    		{ year: "2003", name: "2003" },
    		{ year: "2002", name: "2002" },
    		{ year: "2001", name: "2001" },
    		{ year: "2000", name: "2000" },
    		{ year: "1999", name: "1999" },
    		{ year: "1998", name: "1998" },
    		{ year: "1997", name: "1997" },
    		{ year: "1996", name: "1996" },
    		{ year: "1995", name: "1995" },
    		{ year: "1994", name: "1994" },
    		{ year: "1993", name: "1993" },
    		{ year: "1992", name: "1992" },
    		{ year: "1991", name: "1991" },
    		{ year: "1990", name: "1990" },
    		{ year: "1989", name: "1989" },
    		{ year: "1988", name: "1988" },
    		{ year: "1987", name: "1987" }
		];

     // console.log(vm.confirm_new_password);
      // console.log(vm.new_password);
      // console.log(vm.old_password);
      // console.log(vm.student.instagram);
      // console.log(vm.student.vk);
      // console.log(vm.student.facebook);
      // console.log(vm.student.telegram);
      // console.log(vm.student.firstname);
      // console.log(vm.student.lastname);
      // console.log(vm.student.day);
      // console.log(vm.student.month);
      // console.log(vm.student.year);
      // console.log(vm.student.gender);

		vm.editProfileGo = function(){
        if(vm.new_password == vm.confirm_new_password){
         var data = {
              email: vm.student.email,
              firstname: vm.student.firstname,
              lastname: vm.student.lastname,
              day: vm.student.day,
              month: vm.student.month,
              year: vm.student.year,
              vk: vm.student.vk,
              facebook: vm.student.facebook,
              telegram: vm.student.telegram,
              instagram: vm.student.instagram,
              new_password: vm.new_password,
              gender: gender
            }
            $http.put('/api/user/'+$rootScope.currentUser._id, data).success(function(data){
              $scope.hideData = !$scope.hideData;
              $scope.showEdit = !$scope.showEdit;
              Notification.success({message: 'Данные успешно обновлены!', title: 'FlatFriend', positionY: 'top', positionX: 'right'});
            }).error(function(err){
              Notification.error({message: 'Ошибка)', title: 'FlatFriend', positionY: 'top', positionX: 'right'});
            });
        }
      
		}




    };

