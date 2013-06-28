'use strict';

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('LoginCtrl', ['$scope', '$http', 'API_URL', function($scope, $http, API_URL) {
  	$scope.user = {};
  	$scope.user.email = "";
  	$scope.user.password = "";
  	$scope.login = function() {
  	  console.log($scope.email);
  	  var request = $http.post(API_URL + 'users/sign_in.json', {user: {email: $scope.user.email, password: $scope.user.password }}).
  	  success(function(data, status, headers, config) {
  	     // this callback will be called asynchronously
  	     // when the response is available
  	       console.log(data);
  	     }).
  	     error(function(data, status, headers, config) {
  	     // called asynchronously if an error occurs
  	     // or server returns response with an error status.
  	     console.log(data,status, headers, config);
  	  });
  	}
  }]);