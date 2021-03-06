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
      };
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
      }
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
  .factory('security', ['$http', '$q', '$location', 'TokenHandler', 'API_URL', '$rootScope', 'changeLocationSafely',
    function($http, $q, $location, tokenHandler, API_URL, $rootScope, changeLocationSafely) {
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
            tokenHandler.set(data);
            service.currentUser = data;
              if ( service.isAuthenticated() ) {
                changeLocationSafely.newLocation('/myaccount');
              }
           }).
           error(function(data, status, headers, config) {
           });
      },

      // Give up trying to login and clear the retry queue
      cancelLogin: function() {
        //closeLoginDialog(false);
        //redirect();
      },

      // Logout the current user and redirect
      logout: function(event, token) {
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
        //errorService.clear();
        // notificationService.clear();
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
           $rootScope.$broadcast('event:loginRequired', response.data);
         }
         return $q.reject(response);
       });
     };
   })
  .factory('errorService', ['$timeout', function($timeout) {
    return {
      errorMessage: null,
      setError: function(msg) {
         this.errorMessage = msg;
         var that = this;
         $timeout(function() {  that.clear(); } , 2500);
      },
      clear: function() {
        this.errorMessage = null;
      }
    };
   }])
  .factory('notificationService', ['$timeout', function($timeout) {
    return {
      notificationMessage: null,
      setNotification: function(msg) {
         this.notificationMessage = msg;
         var that = this;
         $timeout(function() {  that.clear(); } , 2500);
      },
      clear: function() {
        this.notificationMessage = null;
      }
    };
   }])
  .factory('changeLocationSafely', ['$rootScope', '$location', function($scope, $location) {
    return {
      newLocation: function(url, force) {
        //this will mark the URL change
        $location.path(url); //use $location.path(url).replace() if you want to replace the location instead

        $scope = $scope || angular.element(document).scope();
        if(force || !$scope.$$phase) {
          //this will kickstart angular if to notice the change
          $scope.$apply();
        }
      }
    };
  }]);