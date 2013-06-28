'use strict';

angular.module('myApp', [
	'myApp.filters',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers']);





angular.module('myApp').constant('API_URL', 'http://localhost:3000/api/v1/');

angular.module('myApp')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'})
      .when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'})
      .otherwise({redirectTo: '/view1'});
  }]);
