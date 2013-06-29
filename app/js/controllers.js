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
  	  $scope.$emit('event:authenticate', $scope.user.email, $scope.user.password);
  	}
  }])
  .controller('RegistrationCtrl', ['$scope', 'UserRegistration', function($scope, UserRegistration) {
     $scope.user = new UserRegistration;
     $scope.signup = function() {
       $scope.user.$save();
     };
  }])
  .controller('myAccountCtrl', ['$scope', '$http', 'API_URL', 'User', function($scope, $http, API_URL, User) {
  	$scope.users = User.get({id: 2});
  }]);



// old request for my account
// var request = $http({
  		// url: API_URL + 'users/edit',
  		// method: "GET",
  		// params: {auth_token: "qNAqRRdhnJEu7dzVZj4w", id: 1 }
    // }).
  	// success(function(data, status, headers, config) {
  	   // // this callback will be called asynchronously
  	   // // when the response is available
  	     // console.log(data);
  	   // }).
  	   // error(function(data, status, headers, config) {
  	   // // called asynchronously if an error occurs
  	   // // or server returns response with an error status.
  	   // console.log(data,status, headers, config);
  	// });




  // old request for login
  // var request = $http.post(API_URL + 'users/sign_in', {user: {email: $scope.user.email, password: $scope.user.password }}).
  	  // success(function(data, status, headers, config) {
  	     // // this callback will be called asynchronously
  	     // // when the response is available
  	       // console.log(data);
  	     // }).
  	     // error(function(data, status, headers, config) {
  	     // // called asynchronously if an error occurs
  	     // // or server returns response with an error status.
  	     // console.log(data,status, headers, config);
  	  // });
  	// }