'use strict';

angular.module('myApp.services', [])
  .factory('TokenHandler', function() {
    var tokenHandler = {};
    var authData = {};

    tokenHandler.set = function( data ) {

      authData = {
        token: data.authentication_token,
        user_id: data.user_id
      }
    };

    tokenHandler.get = function() {
      return authData;
    };

    // wrap given actions of a resource to send auth token with every
    // request
    tokenHandler.wrapActions = function( resource, actions ) {
      // copy original resource
      var wrappedResource = resource;
      for (var i=0; i < actions.length; i++) {
        tokenWrapper( wrappedResource, actions[i] );
      };
      // return modified copy of resource
      return wrappedResource;
    };

    // wraps resource action to send request with auth token
    var tokenWrapper = function( resource, action ) {
      // copy original action
      resource['_' + action]  = resource[action];
      // create new action wrapping the original and sending token
      resource[action] = function( data, success, error){
        return resource['_' + action](
          angular.extend({}, data || {}, {auth_token: tokenHandler.get().token, user_id: tokenHandler.get().user_id}),
          success,
          error
        );
      };
    };

    return tokenHandler;
  })
  .factory('security', ['$http', '$q', '$location', 'TokenHandler', 'API_URL', function($http, $q, $location, tokenHandler, API_URL) {
    // The public API of the service
    var service = {

      login: function( event, email, password ) {
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
        	 tokenHandler.set( data );
        	 service.currentUser = data;
             if ( service.isAuthenticated() ) {
               $('#loginModal').modal('hide');             }

        	 console.log(data);
          }).
          error(function(data, status, headers, config) {
        	 // called asynchronously if an error occurs
        	 // or server returns response with an error status.
        	 console.log(data,status, headers, config);
          });
      },

      // Give up trying to login and clear the retry queue
      cancelLogin: function() {
        closeLoginDialog(false);
        redirect();
      },

      // Logout the current user and redirect
      logout: function(event, token) {
      	console.log(tokenHandler.get().token);
      	console.log(token);
        $http.delete(API_URL + 'users/sign_out?auth_token=' + token).then(function() {
          service.currentUser = null;
          $location.path('/');
        });
      },

      // Ask the backend to see if a user is already authenticated - this may be from a previous session.
      requestCurrentUser: function() {
        if ( service.isAuthenticated() ) {
          return $q.when(service.currentUser);
        } else {
          return $http.get('/current-user').then(function(response) {
            service.currentUser = response.data.user;
            return service.currentUser;
          });
        }
      },

      // Information about the current user
      currentUser: null,

      // Is the current user authenticated?
      isAuthenticated: function(){
      	console.log(!!service.currentUser);
        return !!service.currentUser;
      },

      // Is the current user an adminstrator?
      isAdmin: function() {
        return !!(service.currentUser && service.currentUser.admin);
      }
    };

    return service;
}]);