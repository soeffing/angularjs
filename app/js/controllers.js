'use strict';

angular.module('myApp.controllers', [])
  .controller('MyCtrl1', [function() {

  }])
  .controller('RootCtrl', ['$scope', 'errorService', 'notificationService', function($scope, errorService, notificationService) {
    // reference to errorService & notification service
    $scope.errorService = errorService;
    $scope.notificationService = notificationService;
  }])
  .controller('NavCtrl', ['$scope', 'security', '$rootScope', 'ngI18nResourceBundle', function($scope, security, $rootScope, ngI18nResourceBundle) {
    $scope.logout = function() {
      $scope.$emit('event:logout', $scope.user);
    };

    $scope.setLocale = function(locale){
      ngI18nResourceBundle.get({locale: locale}).success(function (resourceBundle) {
            $rootScope.lang = resourceBundle;
        });
    };
  }])
  .controller('LoginCtrl', ['$scope', '$http', 'API_URL', function($scope, $http, API_URL) {
    $scope.user = {};
    $scope.user.email = 'ulrich_soeffing@gmx.de';
    $scope.user.password = 'mysecret';
    $scope.login = function() {
      $scope.$emit('event:authenticate', $scope.user);
    };
  }])
  .controller('RegistrationCtrl', ['$scope', '$http', 'UserRegistration', 'API_URL', function($scope, $http, UserRegistration, API_URL) {
     //$scope.userExists = null;
     $scope.user = new UserRegistration();
     $scope.signup = function() {
       $scope.user.$save();
     };
     $scope.userLookUp = function(email) {
       $http.get(API_URL + 'userslookup?email=' + email).
         success(function(data, status, headers, config) {
           // console.log($scope.user.email.$setValidity('emailExists', false));
           if (data.message === 'true') {
             console.log($scope);
             $scope.userExists = true;
             $scope.$$childTail.form.email.$setValidity('userExists', false);
            } else {
             $scope.userExists = null;
             $scope.$$childTail.form.email.$setValidity('userExists', true);
            }
         }).
         error(function(data, status, headers, config) {
         // called asynchronously if an error occurs
         // or server returns response with an error status.
         console.log(data, status, headers, config);
         });
    };
  }])
  .controller('AccountCtrl', ['$scope', '$http', 'API_URL', 'User', function($scope, $http, API_URL, User) {
    if ($scope.isAuthenticated()) {
      $scope.user = User.get({id: $scope.currentUser.user_id || null});
    }
    else {
      $scope.$emit('event:loginRequired', 'loginPlease');
    }
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