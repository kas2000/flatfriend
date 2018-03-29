angular
	.module('flat_find')
    .controller('StudentsCtrl', StudentsCtrl);

    StudentsCtrl.$inject = ['$http', '$state', '$rootScope', 'DataService', '$scope'];

   	function StudentsCtrl($http, $state, $rootScope, DataService, $scope) {
    	
   		console.log('StudentsCtrl');
   		var vm = this;

   		vm.user = $rootScope.currentUser;

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
    	

      	$http.get('/api/student')
      		.success(function(data){
      			vm.allStudents = data;
            vm.students_amount = data.length;
            console.log(vm.students_amount);
      			console.log(data);
      		}).error(function(err){
      			console.log(err);
      		})


      vm.universities = DataService.universities();

      vm.remove_university = function(university){
        vm.universities.push(university);
        delete vm.universities_extra;
        console.log(vm.universities_extra);
        // var index = vm.universities_extra.indexOf(university);
        // vm.universities_extra.splice(index, 1);
      }

      vm.add_university = function(university){
            vm.universities_extra = university;
            var index = vm.universities.indexOf(university);
            // vm.universities.splice(index,1);
        
      }

      vm.languages = DataService.languages();
      vm.skills = [];
      
      vm.add = function(language){
        vm.skills.push(language);
        var index = vm.languages.indexOf(language);
        vm.languages.splice(index,1);
      }

      vm.delete = function(language){
        vm.languages.push(language);
        var index = vm.skills.indexOf(language);
        vm.skills.splice(index,1);
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
      $scope.show_universities = ! $scope.show_universities;
    }

    vm.closeLanguages = function(){
      $scope.show = ! $scope.show;
    }

    vm.closeCities = function(){
      $scope.show_cities = !$scope.show_cities;
    }

    // if(vm.extra_city<0){
    //   vm.extra_city = [''];
    // }
    vm.filterStudents = function(){
      var uni;
      if(vm.universities_extra == undefined){
        uni = "";
        console.log(uni);
      }else{
        uni = vm.universities_extra.uni_name;
        console.log(uni);
      }
      if(vm.smoking_att == "Не указано"){
        vm.smoking_att = '';
      }
      if(vm.alcohol_att == "Не указано"){
        vm.alcohol_att = '';
      }
      if(vm.behaviour_att == "Не указано"){
        vm.behaviour_att = '';
      }
      if(vm.cooking_skills == "Не указано"){
        vm.cooking_skills = '';
      }
      $http.get('/api/student/filter/all?university='+uni+'&city='+vm.extra_city+'&smoking='+vm.smoking_att+'&alcohol='+vm.alcohol_att+'&behaviour='+vm.behaviour_att+'&cooking='+vm.cooking_skills)
        .success(function(students){
          vm.filtered_students = students;
        }).error(function(err){
            console.log(err);
          });
    }


    };

