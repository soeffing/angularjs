'use strict';

var resources = angular.module('myApp.resources', ['ngResource']);

resources.factory('UserRegistration', ['$http', 'API_URL', function($http, API_URL) {
  // not so sure what this does -> experiment
  var UserRegistration = function(options) {
    angular.extend(this, options);
  };
  UserRegistration.prototype.$save = function() {
    return $http.post(API_URL + 'users', {
      'user' : {
        'email' : this.email,
        'password' : this.password,
        'password_confirmation' : this.password_confirmation
      }
    });
  };
  return UserRegistration;
  }]);


resources.factory('User', ['$resource', 'TokenHandler', 'API_URL_RESOURCE', function($resource, tokenHandler, API_URL_RESOURCE) {
  var resource = $resource(API_URL_RESOURCE + 'users/:id', {
    id:'@id'
  }, {
    update: {method: 'PUT'}
  });
  resource = tokenHandler.wrapActions( resource, ['get', 'query'] );
  return resource;
}]);