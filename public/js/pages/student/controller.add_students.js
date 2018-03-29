angular.module('flat_find')
    .controller('AddStudentsCtrl', AddStudentsCtrl);

    AddStudentsCtrl.$inject = ['$http', '$state', '$rootScope', '$scope', 'DataService', 'Notification'];

   	function AddStudentsCtrl($http, $state, $rootScope, $scope, DataService, Notification) {
    	
   		console.log('AddStudentsCtrl');
   		var vm = this;

      $scope.smokingAttitude = [
    { value: 'Не указано', attitude: 'Не указано' }, 
    { value: 'Резко негативное', attitude: 'Резко негативное' }, 
    { value: 'Негативное', attitude: 'Негативное' },
    { value: 'Компромиссное', attitude: 'Компромиссное' },
    { value: 'Нейтральное', attitude: 'Нейтральное' },
    { value: 'Положительное', attitude: 'Положительное' }
    ];
    
    $scope.smoking = {type : $scope.smokingAttitude[0].value};

    $scope.alcoholAttitude = [
    { value: 'Не указано', attitude: 'Не указано' }, 
    { value: 'Резко негативное', attitude: 'Резко негативное' }, 
    { value: 'Негативное', attitude: 'Негативное' },
    { value: 'Компромиссное', attitude: 'Компромиссное' },
    { value: 'Нейтральное', attitude: 'Нейтральное' },
    { value: 'Положительное', attitude: 'Положительное' }
    ];
    
    $scope.alcohol = {type : $scope.alcoholAttitude[0].value};

    $scope.behaviourAttitude = [
    { value: 'Не указано', behaviour: 'Не указано' }, 
    { value: 'Ум и креативность', behaviour: 'Ум и креативность' }, 
    { value: 'Доброта и честность', behaviour: 'Доброта и честность' },
    { value: 'Красота и здоровье', behaviour: 'Красота и здоровье' },
    { value: 'Власть и богатство', behaviour: 'Власть и богатство' },
    { value: 'Смелость и упорство', behaviour: 'Смелость и упорство' },
    { value: 'Юмор и жизнелюбие', behaviour: 'Юмор и жизнелюбие' }
    ];
    
    $scope.behaviour = {type : $scope.behaviourAttitude[0].value};


    $scope.cookingSkills = [
    { value: 'Не указано', skill: 'Не указано' },
    { value: 'Не имеются', skill: 'Не имеются' },
    { value: 'Имеются', skill: 'Имеются' }
    ];

    $scope.cooking = {type : $scope.cookingSkills[0].value};


    $scope.$watch('smoking.type', function(){
        vm.smoking_att = $scope.smoking.type;
        console.log(vm.smoking_att);
    });

    $scope.$watch('alcohol.type', function(){
        vm.alcohol_att = $scope.alcohol.type;
        console.log(vm.alcohol_att);
    });

    $scope.$watch('behaviour.type', function(){
        vm.behaviour_att = $scope.behaviour.type;
        console.log(vm.behaviour_att);
    });

    $scope.$watch('cooking.type', function(){
        vm.cooking_skills = $scope.cooking.type;
        console.log(vm.cooking_skills);
    });

     // vm.universities = DataService.universities();

     //  vm.remove_university = function(university){
     //    vm.universities.push(university);
     //    delete vm.universities_extra;
     //    console.log(vm.universities_extra);
     //    // var index = vm.universities_extra.indexOf(university);
     //    // vm.universities_extra.splice(index, 1);
     //  }

     //  vm.add_university = function(university){
     //    vm.universities_extra = university;
     //    var index = vm.universities.indexOf(university);
     //    // vm.universities.splice(index,1);
        
     //  }


    vm.languages = DataService.languages();
    vm.skills = [];

    vm.add = function(item){
      vm.skills.push(item);
      var index = vm.languages.indexOf(item);
      vm.languages.splice(index, 1);
    }

    vm.delete = function(item){
      vm.languages.push(item);
      var index = vm.skills.indexOf(item);
      vm.skills.splice(index, 1);
    }


    vm.cities = DataService.cities();
    vm.extra_city = new Array(1);

    vm.add_city = function(city){
        if(vm.extra_city[0] == undefined){
            vm.extra_city[0] = city;
            var index = vm.cities.indexOf(city);
            vm.cities.splice(index,1);
        }
    }

    vm.remove_city = function(city){
        vm.cities.push(city);
        var index = vm.extra_city.indexOf(city);
        vm.extra_city.splice(index,1);
    }

    vm.closeUniversities = function(){
        $scope.show_universities = !$scope.show_universities; 
    }

    vm.closeLanguages = function(){
        $scope.show = !$scope.show; 
        console.log( $scope.show);
    }

    vm.closeCities = function(){
        $scope.show_cities = !$scope.show_cities; 
    }

    vm.user = $rootScope.currentUser;

    vm.uni = $rootScope.currentUser.university;

    vm.addStudent = function(){
        console.log(vm.file);
            var data = new FormData();
            data.append("student_firstname", vm.user.firstname);
            data.append("student_birth", vm.user.year);
            data.append("student_email", vm.user.email);
            data.append("smoking_attitude",vm.smoking_att);
            data.append("alcohol_attitude",vm.alcohol_att);
            data.append("behaviour_attitude",vm.behaviour_att);
            data.append("cooking_skills",vm.cooking_skills);
            data.append("university",vm.uni);
            data.append("born_city",vm.extra_city);
            data.append("grade",vm.grade);
            data.append("languages", vm.skills);
            data.append("student_comment",vm.student_comment);
            data.append("image",vm.file);
            data.append("user_id",vm.user._id);
            const option = {
                transformRequest: angular.identity,
                headers:{"Content-Type":undefined} 
            };
            
            $http.post('/api/student', data, option)
                .success(function(students){
                    Notification.success({message: 'Вы успешно добавили объявление!', title: 'FlatFind', positionY: 'top', positionX: 'right'});
                    console.log(data);
                    $state.go('students_ad', { "id": students._id});  
                })
                .error(function(err){
                    console.log(err);
                });
    }




};

   