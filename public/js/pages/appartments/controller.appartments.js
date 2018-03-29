angular
	.module('flat_find')
    .controller('AppartmentsCtrl', AppartmentsCtrl);

    AppartmentsCtrl.$inject = ['$http', '$state', '$rootScope', '$modal', '$scope'];

   	function AppartmentsCtrl($http, $state, $rootScope, $modal, $scope) {
    	
    	var vm = this;

      $scope.filtration_status = false;

      vm.fullFiltration = function(){
        $scope.filtration_status = !$scope.filtration_status;
      }
   		
   		

      $rootScope.$watch('currentUser', function(){
        vm.user = $rootScope.currentUser;
      })

      $http.get('/api/flat')
            .success(function(data){
                vm.flats = data;
                // vm.image = vm.flats[0].images.split(',');
                // console.log(vm.image);
      }).error(function(err){
                console.log(err);
            });

      $scope.rooms = [
     { value: 'любой комнатности', rooms: 'любой комнатности' }, 
     { value: '1 комн.', rooms: '1' }, 
     { value: '2 комн.', rooms: '2' },  
     { value: '3 комн.', rooms: '3' }, 
     { value: '4 комн.', rooms: '4' }, 
     { value: '5 комн.', rooms: '5' }, 
    ];
    
    $scope.rooms_final = {type : $scope.rooms[0].value};

    $scope.$watch('rooms_final.type', function(){
      vm.rooms = $scope.rooms_final.type;
    });

    $scope.home_types = [
        { home_type: "Не важно", name: "Не важно" },
        { home_type: "Кирпичный", name: "Кирпичный" },
        { home_type: "Панельный", name: "Панельный" },
        { home_type: "Монолитный", name: "Монолитный" },
        { home_type: "Каркасно-камышитовый", name: "Каркасно-камышитовый" }
    ];
    
    $scope.home_type_final = {type : $scope.home_types[0].home_type};

    $scope.$watch('home_type_final.type', function(){
      vm.home_type = $scope.home_type_final.type;
    });



    $scope.internet_types = [
        { internet_type: "Не важно", name: "Не важно" },
        { internet_type: "ADSL", name: "ADSL" },
        { internet_type: "через TV кабель", name: "через TV кабель" },
        { internet_type: "проводной", name: "проводной" },
        { internet_type: "оптика", name: "оптика" }
    ];
    
    $scope.internet_type_final = {type : $scope.internet_types[0].internet_type};

    $scope.$watch('internet_type_final.type', function(){
      vm.internet_state = $scope.internet_type_final.type;
    });



    $scope.phone_types = [
        { phone_type: "Не важно", name: "Не важно" },
        { phone_type: "отдельный", name: "отдельный" },
        { phone_type: "блокиратор", name: "блокиратор" },
        { phone_type: "есть возможность подключения", name: "есть возм. подкл." },
        { phone_type: "нет", name: "нет" }
    ];
    
    $scope.phone_type_final = {type : $scope.phone_types[0].phone_type};

    $scope.$watch('phone_type_final.type', function(){
      vm.phone_state = $scope.phone_type_final.type;
      console.log(vm.phone_state);
    });


    $scope.furniture_types = [
        { furniture_type: "Не важно", name: "Не важно" },
        { furniture_type: "полностью мебелирована", name: "полностью мебелирована" },
        { furniture_type: "частично мебелирована", name: "частично мебелирована" },
        { furniture_type: "пустая", name: "пустая" }
    ];
    
    $scope.furniture_type_final = {type : $scope.furniture_types[0].furniture_type};

    $scope.$watch('furniture_type_final.type', function(){
      vm.furniture_state = $scope.furniture_type_final.type;
    });

    $scope.state_types = [
        { state_type: "Не важно", name: "Не важно" },
        { state_type: "хорошее", name: "хорошее" },
        { state_type: "среднее", name: "среднее" },
        { state_type: "евроремонт", name: "евроремонт" },
        { state_type: "требует ремонта", name: "требует ремонта" },
        { state_type: "свободная планировка", name: "свободная планировка" },
        { state_type: "черновая отделка", name: "черновая отделка" }
    ];
    
    $scope.state_type_final = {type : $scope.state_types[0].state_type};

    $scope.$watch('state_type_final.type', function(){
      vm.flat_state = $scope.state_type_final.type;
    });


    $scope.wc_types = [
        { wc_type: "Не важно", name: "Не важно" },
        { wc_type: "раздельный", name: "раздельный" },
        { wc_type: "совмещенный", name: "совмещенный" },
        { wc_type: "2 с/у и более", name: "2 с/у и более" },
        { wc_type: "нет", name: "нет" }
    ];
    
    $scope.wc_type_final = {type : $scope.wc_types[0].wc_type};

    $scope.$watch('wc_type_final.type', function(){
      vm.wc_state = $scope.wc_type_final.type;
    });


    $scope.balcony_types = [
        { balcony_type: "Не важно", name: "Не важно" },
        { balcony_type: "балкон", name: "балкон" },
        { balcony_type: "лоджия", name: "лоджия" },
        { balcony_type: "балкон и лоджия", name: "балкон и лоджия" },
        { balcony_type: "несколько балконов или лоджий", name: "неск. балк. или лоджий" }
    ];
    
    $scope.balcony_type_final = {type : $scope.balcony_types[0].balcony_type};

    $scope.$watch('balcony_type_final.type', function(){
      vm.balcony_state = $scope.balcony_type_final.type;
      console.log(vm.balcony_state);
    });

    $scope.door_types = [
        { door_type: "Не важно", name: "Не важно" },
        { door_type: "деревянная", name: "деревянная" },
        { door_type: "металлическая", name: "металлическая" },
        { door_type: "бронированная", name: "бронированная" },
    ];
    
    $scope.door_type_final = {type : $scope.door_types[0].door_type};

    $scope.$watch('door_type_final.type', function(){
      vm.door_state = $scope.door_type_final.type;
      console.log(vm.door_state);
    });

    $scope.floor_types = [
        { floor_type: "Не важно", name: "Не важно" },
        { floor_type: "линолеум", name: "линолеум" },
        { floor_type: "паркет", name: "паркет" },
        { floor_type: "ламинат", name: "ламинат" },
        { floor_type: "дерево", name: "дерево" },
        { floor_type: "ковролан", name: "ковролан" },
        { floor_type: "плитка", name: "плитка" },
        { floor_type: "пробковое", name: "пробковое" }
    ];
    
    $scope.floor_type_final = {type : $scope.floor_types[0].floor_type};

    $scope.$watch('floor_type_final.type', function(){
      vm.floor_state = $scope.floor_type_final.type;
      console.log(vm.floor_state);
    });



    // var price=[];

    vm.filterFlat = function(){
      // console.log(vm.overall_area_from);
      // console.log(vm.overall_area_to);
      // console.log(vm.living_area_from);
      // console.log(vm.living_area_to);
      // console.log(vm.kitchen_area_from);
      // console.log(vm.kitchen_area_to);
      console.log(vm.price_from);
      console.log(vm.price_to);




        if(vm.rooms == 'любой комнатности'){
          vm.rooms='';
         
        }

        if(vm.wc_state == 'Не важно'){
          vm.wc_state='';

        }

        if(vm.flat_state == 'Не важно'){
          vm.flat_state = '';
          
        }

        if(vm.furniture_state == 'Не важно'){
          vm.furniture_state = '';
          
        }

        if(vm.phone_state == 'Не важно'){
          vm.phone_state = '';
          
        }

        if(vm.internet_state == 'Не важно'){
          vm.internet_state = '';
         
        }

        if(vm.home_type == 'Не важно'){
          vm.home_type = '';
      
        }

        if(vm.balcony_state == 'Не важно'){
          vm.balcony_state = '';
        }

        if(vm.door_state == 'Не важно'){
          vm.door_state = '';
        }

        if(vm.floor_state == 'Не важно'){
          vm.floor_state = '';
        }


        if(vm.overall_area_from == undefined){
          vm.overall_area_from_extra = 0;
        }else{
          vm.overall_area_from_extra = vm.overall_area_from;
        }

        if(vm.price_from == undefined){
          vm.price_from_extra = 0;
        }else{
          vm.price_from_extra = vm.price_from;
        }

        if(vm.price_to == undefined){
          vm.price_to_extra = 9999999999;
        }else{
          vm.price_to_extra = vm.price_to;
        }

        if(vm.overall_area_to == undefined){
          vm.overall_area_to_extra = 9999999999;
        }else{
          vm.overall_area_to_extra = vm.overall_area_to;
        }

        if(vm.living_area_from == undefined){
          vm.living_area_from_extra = 0;
        }else{
          vm.living_area_from_extra = vm.living_area_from;
        }

        if(vm.living_area_to == undefined){
          vm.living_area_to_extra = 9999999999;
        }else{
          vm.living_area_to_extra = vm.living_area_to;
        }

        if(vm.kitchen_area_from == undefined){
          vm.kitchen_area_from_extra = 0;
        }else{
          vm.kitchen_area_from_extra = vm.kitchen_area_from;
        }

        if(vm.kitchen_area_to == undefined){
          vm.kitchen_area_to_extra = 9999999999;
        }else{
          vm.kitchen_area_to_extra = vm.kitchen_area_to;
        }


        


        $http.get('/api/flat/filter/all?rooms='+vm.rooms+'&price_from='+vm.price_from_extra+'&price_to='+vm.price_to_extra+'&wc_state='+vm.wc_state+'&flat_state='+vm.flat_state+'&furniture_state='+vm.furniture_state+'&phone_state='+vm.phone_state+'&internet_state='+vm.internet_state+'&home_type='+vm.home_type+'&overall_area_from='+vm.overall_area_from_extra+'&overall_area_to='+vm.overall_area_to_extra+'&kitchen_area_to='+vm.kitchen_area_to_extra+'&kitchen_area_from='+vm.kitchen_area_from_extra+'&living_area_to='+vm.living_area_to_extra+'&living_area_from='+vm.living_area_from_extra)
          .success(function(data){
            vm.filtered_flats = data;
            console.log(data);
          })
          .error(function(err){
            console.log(err);
          })


    }

};

