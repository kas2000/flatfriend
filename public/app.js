angular.module('flat_find', [
    'ui.router',
    'ngCookies',
    'ngResource',
    'mgcrea.ngStrap',
    'naif.base64',
    'ngSidebarJS',
    'ui.bootstrap',
    'yaMap',
    'phonenumberModule',
    'ui-notification',
    'btford.socket-io',
    'angular-click-outside',
    'ngDroplet'
    ]).factory('mySocket', function (socketFactory) {
        return socketFactory();
      }).config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'left',
            positionY: 'bottom'
        });
    })
    .config(routeConfig);
    routeConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $locationProvider, $urlRouterProvider) {



    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider


    .state('home', {
      url: '/',
      templateUrl: 'views/pages/home.html',
        controller: 'HomeCtrl',
      controllerAs: 'vm'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'views/pages/signup.html',
        controller: 'SignUpCtrl',
      controllerAs: 'vm'
    })

    .state('student_dashboard', {
      url: '/student_dashboard',
      templateUrl: 'views/pages/student_dashboard.html',
        controller: 'StudentDashCtrl',
      controllerAs: 'vm'
    })

    .state('landlord_dashboard', {
      url: '/landlord_dashboard',
      templateUrl: 'views/pages/landlord_dashboard.html',
        controller: 'LandlordDashCtrl',
      controllerAs: 'vm'
    })

    .state('404', {
      url: '/404',
      templateUrl: 'views/pages/404.html',
        controller: 'UnknownCtrl',
      controllerAs: 'vm'
    })

    .state('appartments', {
      url: '/appartments',
      templateUrl: 'views/pages/appartments.html',
        controller: 'AppartmentsCtrl',
      controllerAs: 'vm'
    })

    .state('signin', {
      url: '/signin',
      templateUrl: 'views/pages/signin.html',
        controller: 'SignInCtrl',
      controllerAs: 'vm'
    })

    .state('add_appartment', {
      url: '/add_appartment',
      templateUrl: 'views/pages/add_appartment.html',
        controller: 'AddAppartmentCtrl',
      controllerAs: 'vm'
    })

    .state('profile_edit', {
      url: '/profile_edit',
      templateUrl: 'views/pages/profile-edit.html',
        controller: 'ProfileEditCtrl',
      controllerAs: 'vm'
    })

    .state('students', {
      url: '/students',
      templateUrl: 'views/pages/students.html',
        controller: 'StudentsCtrl',
      controllerAs: 'vm'
    })

    .state('students_ad', {
      url: '/students/:id',
      templateUrl: 'views/pages/students_ad.html',
        controller: 'StudentsAdCtrl',
      controllerAs: 'vm'
    })

    .state('add_students', {
      url: '/add_students',
      templateUrl: 'views/pages/add_students.html',
        controller: 'AddStudentsCtrl',
      controllerAs: 'vm'
    })

    .state('chats', {
      url: '/chat',
      templateUrl: 'views/pages/chat.html',
        controller: 'ChatCtrl',
      controllerAs: 'vm'
    })

    .state('appartments_ad', {
      url: '/appartments/:id',
      templateUrl: 'views/pages/appartments_ad.html',
        controller: 'AppartmentsAdCtrl',
      controllerAs: 'vm'
    })

    .state('user_ads', {
      url: '/user_ads',
      templateUrl: 'views/pages/user_ads.html',
        controller: 'UserAdsCtrl',
      controllerAs: 'vm'
    })

    .state('edit_student', {
      url: '/edit_student/:id',
      templateUrl: 'views/pages/edit_student.html',
        controller: 'EditStudentCtrl',
      controllerAs: 'vm'
    })


    .state('map', {
      url: '/map',
      templateUrl: 'views/pages/map.html',
        controller: 'MapCtrl',
      controllerAs: 'vm'
    })


    

    };