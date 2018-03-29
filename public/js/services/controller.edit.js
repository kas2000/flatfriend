angular.module('flat_find').service('editAd', function(){
	var studentData = {};

	var addStudentData = function(data){
		studentData = data;
	};

	var getStudentData = function(){
      return studentData;
  	};

  	return {
    	addStudentData: addStudentData,
    	getStudentData: getStudentData
  	};
})