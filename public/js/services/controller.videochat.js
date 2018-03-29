(function() {
	'use strict';

	angular
		.module('flat_find')
		.factory('VideoService', Service);

	function Service($http, $q) {
		var service = {};

		service.GetCurrent = GetCurrent;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
		service.Streaming = Streaming;
		service.Disconnect = Disconnect;
 
        return service;

        function Streaming(user,streamId) {
            return $http.put('/api/users/' + user._id+'/'+streamId, user).then(handleSuccess, handleError);
        }


	}
})