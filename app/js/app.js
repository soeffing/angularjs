'use strict';

angular.module('myApp', [
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers',
	'myApp.resources']);





angular.module('myApp').constant('API_URL', 'http://localhost:3000/api/v1/');
angular.module('myApp').constant('API_URL_RESOURCE', 'http://localhost\\:3000/api/v1/');

angular.module('myApp')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/myaccount', {templateUrl: 'partials/myaccount.html', controller: 'MyCtrl1'})
      .when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'})
      .otherwise({redirectTo: '/view1'});
  }])
  .run(['$rootScope', '$http', 'TokenHandler', 'API_URL',
  function( scope, $http, tokenHandler, API_URL ) {
    scope.$on( 'event:authenticate',
      function( event, email, password ) {
        var payload = {
          user: {
            email: email,
            password: password
          }
        };

        var request = $http.post(API_URL + 'users/sign_in', payload).
          success(function(data, status, headers, config) {
        	 // this callback will be called asynchronously
        	 // when the response is available
        	 tokenHandler.set( data.authentication_token );
        	 console.log(data);
           }).
        	 error(function(data, status, headers, config) {
        	 // called asynchronously if an error occurs
        	 // or server returns response with an error status.
        	 console.log(data,status, headers, config);
          });
      }
    );
  }]);




