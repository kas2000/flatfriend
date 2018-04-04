angular
	.module('flat_find')
    .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$http', '$state', '$rootScope', '$scope'];

   	function MapCtrl($http, $state, $rootScope, $scope) {
    	
   		var vm = this;

      console.log("MapCtrl");

     
      var appartments_coords = [];


      $http.get('/api/flat')
      	.success(function(flats) {
      		vm.flats = flats;
      		// Вытаскиваю координаты каждой квартиры чтобы потом добавить на карту
      		for(var i=0;i<vm.flats.length;i++){
      			var coords = [];
      			coords.push(vm.flats[i].longitude, vm.flats[i].latitude);
      			appartments_coords.push(coords);
      		}
      	}).error(function(err) {
      		console.log(err);
      	})

      // Инициализация карты
       $scope.afterInit = function($map){
          map = $map;
          var appGeoObjects=[];
          var appartments=[];
          // Добавляю метки квартир на карту
          for(var i=0;i<appartments_coords.length;i++){
          	appGeoObjects = new ymaps.GeoObject({
            	geometry: {
              		type: "Point",
              		coordinates: appartments_coords[i]
            	}
          	}, {
            	preset: "islands#violetDotIconWithCaption"
          	});
          	appartments.push(appGeoObjects);
          }
        // Помещаю все в кластер и кластеризирую метки
        clusterer = new ymaps.Clusterer({preset: 'islands#invertedVioletClusterIcons'});
    	clusterer.add(appartments);
        map.geoObjects.add(clusterer);


        var balloons = [];
        var all_placemarks = clusterer.getGeoObjects();
        // Чекаю на нажатие определенной метки, если была нажата, то вытаскиваю инфу getFlatInfo()
        for(var i=0;i<appartments.length;i++){
	        appartments[i].events.add('click', function (e) {
	        	var current_placemark = e.get('target');
	        	current_placemark.balloon.open();
				var coords = e.get('target').geometry.getCoordinates();
		        var info = getFlatInfo(coords);
		        map.balloon.open(coords, flat_data_map.street + ' ' + flat_data_map.cross_street + ' ' + flat_data_map.pay_frequency + ' ' + flat_data_map.price + 'тг');

		    });
        }

      };

      var flat_data_map;
      function getFlatInfo(placemark_coords){
      	for(var i=0;i<vm.flats.length;i++){
      		if(vm.flats[i].longitude == placemark_coords[0] && vm.flats[i].latitude == placemark_coords[1]){
      			flat_data_map = vm.flats[i];
      			console.log(flat_data_map);
      			$scope.$apply(function(){
      				$scope.data = flat_data_map;
      			})
      		}
      	}
      }



      
    };

