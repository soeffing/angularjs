'use strict';

angular.module('myApp.resources', [])
   .factory('UserRegistration', ['$http', 'API_URL', function($http, API_URL) {

    // not so sure what this does -> experiment
    var UserRegistration = function(options) {
      angular.extend(this, options);
    };

    UserRegistration.prototype.$save = function() {
      return $http.post(API_URL + '/users', {
        "user" : {
          "email" : this.email,
          "password" : this.password,
          "password_confirmation" : this.password_confirmation
        }
      });
    };

    return UserRegistration;
  }]);