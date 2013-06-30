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
  .run(['$rootScope', '$http', 'TokenHandler', 'security',
  function( scope, $http, tokenHandler, security ) {
    scope.$on( 'event:authenticate',  function(event, user) {
      security.login(event, user.email, user.password);
    });
    scope.$on( 'event:logout', function(event, user) {
      var token = tokenHandler.get().token;
      security.logout(event, token);
    });
     scope.isAuthenticated = security.isAuthenticated;
     scope.$watch(function() {
       return security.currentUser;
     }, function(currentUser) {
       scope.currentUser = currentUser;
     });
}]);




