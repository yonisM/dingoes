// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
	
      .state('mock', {
        url: '/mock',
        templateUrl: 'views/mock.html',
        controller: 'examCtrl',
        authenticate: true
      })
      .state('/', {
        url: '/',
        templateUrl: 'views/homepage.html',
        controller: 'MainCtrl'
      })
	   .state('contact', {
        url: '/contactus',
        templateUrl: 'views/contact.html',
        controller: 'ContactusCtrl'
      })
     
      .state('delete-review', {
        url: '/delete-review/:id',
        controller: 'DeleteReviewController',
        authenticate: true
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
      })
      .state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      })
      .state('my-results', {
        url: '/my-results',
        templateUrl: 'views/my-results.html',
        controller: 'ExamResultsCtrl',
        authenticate: true
      })
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up-form.html',
        controller: 'SignUpController',
      })
	  .state('info-exam', {
        url: '/info-exam',
        templateUrl: 'views/info-exam.html',
		controller: 'examCtrl',
      })
      .state('sign-up-success', {
        url: '/sign-up/success',
        templateUrl: 'views/sign-up-success.html'
      });
    $urlRouterProvider.otherwise('/');
  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('forbidden');
      }
    });
  }]);
