angular
	.module('flat_find')
    .controller('SignUpCtrl', SignUpCtrl);

    SignUpCtrl.$inject = ['$http', '$state', '$rootScope', '$scope', 'Auth', 'DataService', 'Notification'];

   	function SignUpCtrl($http, $state, $rootScope, $scope, Auth, DataService, Notification) {
    	
   	var vm = this;

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


		console.log('SignUpCtrl');

		vm.gender = false;
        vm.showUniversity = false;

    vm.universities = DataService.universities();
    vm.universities_extra = new Array(1);
    var uni_lat;
    var uni_long;
    var uni_name;
    vm.uniIndex = -1;
    vm.add_university = function(university){
        console.log(university);
        uni_lat = university.uni_lat;
        uni_long = university.uni_long;
        uni_name = university.uni_name;
      if(vm.universities_extra[0] == undefined) {
        vm.universities_extra[0] = university;
        var index = vm.universities.indexOf(university);
        vm.uniIndex = index;
        vm.universities.splice(index, 1);  
      } else {
        console.log("you have already stored in that array")
      }
      
    }
    vm.remove_university = function(university){
      // console.log(university)
      // vm.universities.push(university);
      vm.universities.splice(vm.uniIndex, 0, university);
      // console.log(vm.universities)
      // var index = vm.universities_extra.indexOf(university);
      vm.universities_extra.splice(0, 1);
    }

    $scope.$watch('vm.avatar', function(){
        console.log(vm.avatar);
    });

    
    $scope.interface = {};
    $scope.$on('$dropletReady', function whenDropletReady() {
      $scope.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif']);
      // $scope.interface.useArray();
    });

    var avatar = [];
    var avatar_final = {};
    $scope.$on('$dropletFileAdded', function() {
        avatar = $scope.interface.getFiles();
        avatar_final = avatar[0];
        console.log(avatar_final.file);
    });

  

		vm.signUp = function(){
			if(!vm.gender){
                vm.gender = !vm.gender; 
            }else if(vm.email&&vm.email!=''&&vm.password&&vm.password!=''&&vm.password==vm.password_confirm&&vm.firstname&&vm.firstname!=''&&vm.lastname&&vm.lastname!=''&&vm.day&&vm.month&&vm.year&&vm.gender&&vm.role){
                    if(vm.role == 'student'){
                        vm.showUniversity = !vm.showUniversity;
                        if(vm.universities_extra[0] != null){
                            var data = new FormData();
                            data.append("email", vm.email);
                            data.append("password", vm.password);
                            data.append("firstname", vm.firstname);
                            data.append("lastname", vm.lastname);
                            data.append("day", vm.day);
                            data.append("month", vm.month);
                            data.append("year", vm.year);
                            data.append("gender", vm.gender);
                            data.append("role", vm.role);
                            data.append("university", uni_name);
                            data.append("uni_lat", uni_lat);
                            data.append("uni_long", uni_long);
                            data.append("quick", false);
                            data.append("avatar", avatar_final.file);
                            const option = {
                                transformRequest: angular.identity,
                                headers:{"Content-Type":undefined} 
                            };

                            $http.post('/api/signup', data, option)
                                .success(function(data){
                                    Notification.info({message: 'Добро пожаловать, '+data.firstname, title: 'FlatFriend', positionY: 'top', positionX: 'right'});
                                     $rootScope.currentUser = data;
                                     $state.go('appartments');
                                     console.log(data);
                                }).error(function(data){
                                    Notification.error({message: data.msg, title: 'FlatFriend', positionY: 'top', positionX: 'right'});
                                })
                        }
                    }else{
                        var data = new FormData();
                            data.append("email", vm.email);
                            data.append("password", vm.password);
                            data.append("firstname", vm.firstname);
                            data.append("lastname", vm.lastname);
                            data.append("day", vm.day);
                            data.append("month", vm.month);
                            data.append("year", vm.year);
                            data.append("gender", vm.gender);
                            data.append("role", vm.role);
                            data.append("quick", false);
                            data.append("avatar", avatar_final.file);
                            const option = {
                                transformRequest: angular.identity,
                                headers:{"Content-Type":undefined} 
                            };
                        $http.post('/api/signup', data, option)
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
		}

    vm.closeUni = function() {
        $scope.show_universities = !$scope.show_universities;
    }
    console.log(vm.universities_extra[0]);

    };

