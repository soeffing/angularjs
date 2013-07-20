'use strict';

angular.module('myApp.services', [])
  .config(function ($httpProvider) {
     $httpProvider.responseInterceptors.push('errorHttpInterceptor');
  })
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
  .factory('security', ['$http', '$q', '$location', 'TokenHandler', 'API_URL', '$rootScope', function($http, $q, $location, tokenHandler, API_URL, $rootScope) {
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

        	  $rootScope.invalidEmailPassword = null;
        	  tokenHandler.set( data );
        	  service.currentUser = data;
              if ( service.isAuthenticated() ) {
                $('#loginModal').modal('hide');
              }
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
        return !!service.currentUser;
      },

      // Is the current user an adminstrator?
      isAdmin: function() {
        return !!(service.currentUser && service.currentUser.admin);
      }
    };

    return service;
  }])
  .factory('errorHttpInterceptor', function ($q, $location, $rootScope, errorService, notificationService) {
    return function (promise) {
      return promise.then(function (response) {
        errorService.clear();
        notificationService.clear();
        //console.log(response.status);
        if (response.status === 201) {
          notificationService.setNotification($rootScope.lang.notification_loggedIn);
        }
        return response;
       }, function (response) {

         if (response.status === 401) {
           console.log('401 status');
           errorService.setError($rootScope.lang.errors_login);
           $rootScope.$broadcast('event:loginRequired', response.data);
         } else if (response.status >= 400 && response.status < 500) {
           errorService.setError('Server was unable to find what you were looking for... Sorry!!');
         } else if (response.status === 0) {
           errorService.setError('You have to be logged in to see this page.');
         }
         return $q.reject(response);
       });
     };
   })
  .factory('errorService', function() {
    return {
      errorMessage: null,
      setError: function(msg) {
         this.errorMessage = msg;
      },
      clear: function() {
        this.errorMessage = null;
      }
    };
   })
  .factory('notificationService', function() {
    return {
      notificationMessage: null,
      setNotification: function(msg) {
         this.notificationMessage = msg;
      },
      clear: function() {
        this.notificationMessage = null;
      }
    };
   });

