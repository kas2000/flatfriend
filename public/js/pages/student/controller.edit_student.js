angular
	.module('flat_find')
    .controller('EditStudentCtrl', EditStudentCtrl);

    EditStudentCtrl.$inject = ['$http', '$state', '$rootScope', '$scope', '$cookies', 'DataService'];

   	function EditStudentCtrl($http, $state, $rootScope, $scope, $cookies, DataService) {


        
        console.log('EditStudentCtrl');


        var vm = this;

        
        // console.log(editAd.getStudentData());


       vm.data = JSON.parse(localStorage.studentData);

       console.log(vm.data);

      vm.grade = parseInt(vm.data.grade);


     vm.languages = vm.data.languages.split(",");
 	   console.log(vm.languages[0]);

 	   vm.deleteLanguage = function(data){
 	   	var index = vm.languages.indexOf(data);
 	   	vm.languages.splice(index, 1);
 	   	vm.languages_extra.push(data);
 	   	console.log(vm.languages);
 	   	console.log(vm.languages_extra);
      if($scope.showLanguages == true){
        $scope.showLanguages = true;
      }else{
        $scope.showLanguages = true;
      }
 	   }

 	   vm.languages_extra = [];

 	   vm.addLanguage = function(data){
 	   	var index = vm.languages_extra.indexOf(data);
 	   	vm.languages_extra.splice(index, 1);
 	   	vm.languages.push(data);
 	   }



 	   $scope.$watch('showLanguages', function(){
 	   	console.log($scope.showLanguages);
 	   })

 	   vm.closeLanguages = function(){
      $scope.showLanguages = false;
 	   }


     vm.cities = [vm.data.born_city];

     vm.deleteCity = function(data){
      var index = vm.languages.indexOf(data);
      vm.cities.splice(index, 1);
      vm.cities_extra.push(data);
      $scope.showCities = true;
        console.log(vm.cities);
      console.log(vm.cities_extra);
      // if($scope.showLanguages == true){
      //   $scope.showLanguages = true;
      // }else{
      //   $scope.showLanguages = true;
      // }
     }

     vm.cities_extra = ["Астана", "Атырау"];

     vm.addCities = function(data){
      if(vm.cities==0){
        var index = vm.cities_extra.indexOf(data);
        vm.cities_extra.splice(index, 1);
        vm.cities.push(data);
      }
     }

     vm.closeCities = function(){
      $scope.showCities = false;
     }

     vm.university = [{uni_name: vm.data.university, uni_lat: vm.data.uni_lat, uni_long: vm.data.uni_long}];

     console.log(vm.university);

     vm.deleteUniversity = function(data){
      var index = vm.university.indexOf(data);
      vm.university.splice(index, 1);
      vm.university_extra.push(data);
      $scope.showUniversity = true;
      console.log(vm.university);
      console.log(vm.university_extra);
     }

     vm.university_extra = DataService.universities();

     vm.addUniversity = function(data){
      if(vm.university==0){
        var index = vm.university_extra.indexOf(data);
        vm.university_extra.splice(index, 1);
        vm.university.push(data);
        console.log(vm.university);
      }
     }

     vm.closeUniversity = function(){
      $scope.showUniversity = false;
     }

     

    };


   	


