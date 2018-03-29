angular
    .module('flat_find')
    .factory('Auth', Auth);

    Auth.$inject = ['$http', '$location', '$rootScope', '$cookies', '$state', 'Notification'];
        
    function Auth($http, $location, $rootScope, $cookies, $state, Notification) {

        var auth = {};

        
        
        $rootScope.currentUser = $cookies.getObject('user');
        
    
        
        return {
            
            signup: function(user){
                $http.post('/api/signup', user)
                    .success(function(data){
                        Notification.info({message: 'Добро пожаловать, '+data.firstname, title: 'FlatFriend', positionY: 'top', positionX: 'right'});
                         $rootScope.currentUser = data;
                         $state.go('appartments');
                         console.log(data);
                    }).error(function(data){
                        Notification.error({message: data.msg, title: 'FlatFriend', positionY: 'top', positionX: 'right'});
                    })
            },
            login: function(user){
                $http.post('/api/login', user)
                    .success(function(data){
                        if(data.role == "student"&&data.notifications == true&&data.student_has_ad == true){
                            if(data.day == undefined){
                                setInterval(function(){ 
                                    Notification.info({message: 'Просим вас заполнить дату рождения!', title: 'FlatFriend', positionY: 'top', positionX: 'right'}); 
                                }, 600000);
                            }
                            if(data.instagram == undefined){
                                setInterval(function(){ 
                                    Notification.info({message: 'Просим вас заполнить ваш инстаграм аккаунт!', title: 'FlatFriend', positionY: 'top', positionX: 'right'}); 
                                }, 600000);
                            }
                            if(data.telegram == undefined){
                                setInterval(function(){ 
                                    Notification.info({message: 'Просим вас заполнить ваш телеграмм аккаунт!', title: 'FlatFriend', positionY: 'top', positionX: 'right'}); 
                                }, 600000);
                            }
                         }
                         $rootScope.currentUser = data;
                          Notification.info({message: 'Добро пожаловать, '+data.firstname, title: 'FlatFriend', positionY: 'top', positionX: 'right'});
                         if($rootScope.currentUser){
                            if($rootScope.currentUser.role == 'student'){
                                $state.go('student_dashboard');
                            }else{
                                $state.go('landlord_dashboard');
                            }
                         }else{
                            $state.go('signin');
                         }
                    }).error(function(err){
                        Notification.error({message: "Логин или пароль неправильны!", title: 'FlatFriend', positionY: 'top', positionX: 'right'});
                    })
            },
            logout: function(){
                $http.get('/api/logout')
                    .success(function() {
                        $cookies.remove('user');
                        Notification.info({message: 'До скорых встреч!', title: 'FlatFriend', positionY: 'top', positionX: 'right'});
                        $rootScope.currentUser = undefined;
                        $state.go('appartments');
                    })
            }
            
        }
}