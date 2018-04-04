angular
	.module('flat_find')
    .controller('AddAppartmentCtrl', AddAppartmentCtrl);

    AddAppartmentCtrl.$inject = ['$http', '$state', '$rootScope', '$modal', '$scope', 'Notification'];

   	function AddAppartmentCtrl($http, $state, $rootScope, $modal, $scope, Notification) {
    	
    	var vm = this;
   		console.log('AddApartmentCtrl');

      var user;
      $rootScope.$watch('currentUser', function(){
            vm.user = $rootScope.currentUser;
            user = $rootScope.currentUser;
      });

      $scope.home_types = [
        { home_type: "Кирпичный", name: "Кирпичный" },
        { home_type: "Панельный", name: "Панельный" },
        { home_type: "Монолитный", name: "Монолитный" },
        { home_type: "Каркасно-камышитовый", name: "Каркасно-камышитовый" }
    ];
    
     $scope.home_type_final = {type : $scope.home_types[0].home_type};
   		

      $scope.city = [
        { city: "Almaty", name: "Алматы" },
        { city: "Astana", name: "Астана" }
      ];

      $scope.house_complex = [
        { house_complex: "Abay Residence", name: "Abay Residence" },
        { house_complex: "Abay 130", name: "Abay 130" },
        { house_complex: "Abay Residence", name: "Abay Residence" },
        { house_complex: "Abay Residence", name: "Abay Residence" },
        { house_complex: "Abay Residence", name: "Abay Residence" }
      ];

      $scope.$watch('home_type_final.type', function(){
        vm.house_type = $scope.home_type_final.type;
        console.log(vm.house_type);
      })



      

      var map, myPlacemark, final_coords, circle, objects, mainCircle, checkInsideCircle = true;
      
      $scope.afterInit = function($map){
          map = $map;
          mainCircle = createCircle();
          mainCircle.events.add('click', function (e) {
            var coords = e.get('coords');
             if (myPlacemark) {
              myPlacemark.geometry.setCoordinates(coords);
             }else{
                myPlacemark = createPlacemark(coords);
                storage = ymaps.geoQuery(myPlacemark);
                console.log(myPlacemark);
                map.geoObjects.add(myPlacemark);
                circleValidate(storage);
                myPlacemark.events.add('drag', function(){
                  circleValidate(storage);
                })

                myPlacemark.events.add('dragend', function () {
                  if(checkInsideCircle) {
                    getAddress(myPlacemark.geometry.getCoordinates());
                    getFinalCoords(myPlacemark.geometry.getCoordinates());
                  }
                });
              }
              if(checkInsideCircle){
                getAddress(coords);
                getFinalCoords(coords);
              }
            
          });   
      }

      function circleValidate(objects){
        var objectsInsideCircle = objects.searchInside(mainCircle);
        objectsInsideCircle.setOptions('preset', 'islands#violetDotIconWithCaption');
        // objects.remove(objectsInsideCircle).setOptions('preset', 'islands#violetDotIconWithCaption');
        if(objectsInsideCircle._objects.length == 0) {
          console.log(objects._objects);
          objects._objects[0].properties._data.iconCaption = 'Вы за пределами Алматы!';
           objects._objects[0].options._options.preset = 'islands#violetDotIconWithCaption';
          checkInsideCircle = false;
        } else {
          checkInsideCircle = true
        }
      }

      function createCircle(){
        circle = new ymaps.Circle([[76.91428875742189, 43.246332475924206], 10000]);
        map.geoObjects.add(circle);
        return circle;
      }


      function getFinalCoords(coords){
        if(checkInsideCircle = true){
          vm.final_coords = coords;
        }else{
          console.log("Cant find coordinates");
        }
       
      }

    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });

    }


        // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);

            myPlacemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonContent: firstGeoObject.getAddressLine()
                });
        });
    }


    var files_pre = [];
    var files_final=[];
    
    $scope.interface = {};
    $scope.$on('$dropletReady', function whenDropletReady() {
      $scope.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif']);
      $scope.interface.useArray();
    });

    $scope.$on('$dropletFileAdded', function() {
      files_pre = $scope.interface.getFiles();
    });

  
 

    // $scope.$watch('files', function() {
    //     console.log(files);
    // });




    $scope.$watch('myModel.phonenumber', function() {
        vm.phone_number = $scope.myModel;
    });

    $scope.$watch('vm.pay_frequency', function() {
       console.log(vm.pay_frequency);
    });

    vm.addFlat = function(){



       for(var a=0;a<files_pre.length;a++){
        files_final.push(files_pre[a].file);
       }

       console.log(files_final);

        if(vm.wc_state == undefined){
          vm.wc_state = '';

        }

        if(vm.flat_state == undefined){
          vm.flat_state = '';
          
        }

        if(vm.furniture_state == undefined){
          vm.furniture_state = '';
          
        }

        if(vm.phone_state == undefined){
          vm.phone_state = '';
          
        }

        if(vm.internet_state == undefined){
          vm.internet_state = '';
         
        }

        if(vm.balcony_state == undefined){
          vm.balcony_state = '';
        }

        if(vm.door_state == undefined){
          vm.door_state = '';
        }

        if(vm.floor_state == undefined){
          vm.floor_state = '';
        }


      $rootScope.$watch('currentUser', function(){
            vm.user = $rootScope.currentUser;
            if(vm.user){
              vm.firstname = vm.user.firstname;
              vm.email = vm.user.email;
            }else if(!vm.user){
              vm.firstname = vm.owner_firstname;
              vm.email = vm.owner_email;
            }
      });

    if(vm.final_coords){
     vm.longitude = vm.final_coords[0];
     vm.latitude = vm.final_coords[1];

            var data = new FormData();
            data.append("rooms", vm.rooms);
            data.append("price", vm.price);
            data.append("home_type", vm.house_type);
            data.append("year",vm.year);
            data.append("floor",vm.floor);
            data.append("all_floors",vm.all_floors);
            data.append("all_area",vm.all_area);
            data.append("living_area",vm.living_area);
            data.append("kitchen_area",vm.kitchen_area);
            data.append("city",vm.city);
            data.append("district", vm.district);
            data.append("rajon",vm.rajon);
            data.append("house_complex",vm.house_complex);
            data.append("street",vm.street);
            data.append("house_number",vm.house_number);
            data.append("cross_street",vm.cross_street);
            data.append("longitude",vm.longitude);
            data.append("latitude",vm.latitude);
            data.append("flat_state",vm.flat_state);
            data.append("phone_state",vm.phone_state);
            data.append("internet_state",vm.internet_state);
            data.append("wc_state",vm.wc_state);
            data.append("balcony_state",vm.balcony_state);
            data.append("door_state",vm.door_state);
            data.append("furniture_state",vm.furniture_state);
            data.append("floor_state",vm.floor_state);
            data.append("flat_comment",vm.flat_comment);
            data.append("email",vm.email);
            data.append("phone_number",vm.phone_number.phonenumber);
            data.append("name",vm.firstname);
            data.append("pay_frequency", vm.pay_frequency);
            for(var a=0;a<files_final.length;a++){
              data.append("images", files_final[a]);
            }
            
            const option = {
                transformRequest: angular.identity,
                headers:{"Content-Type":undefined} 
            };

            console.log(data);

            $http.post('/api/flat', data , option)
              .success(function(data){
                console.log(data);
                Notification.success({message: 'Вы успешно добавили объявление о квартире!', title: 'FlatFind', positionY: 'top', positionX: 'right'});
                $state.go('appartments');
              }).error(function(err){
                  console.log(err);
                });
      }else{
         Notification.error({message: 'Вы не добавили квартиру на карте!', title: 'FlatFind', positionY: 'top', positionX: 'right'});
      }
      


    }



      
 };


    



