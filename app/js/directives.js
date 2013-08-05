'use strict';

angular.module('myApp.directives', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('alertBar', ['$parse', function($parse) {
    return {
      restrict: 'A',
      template: '<div class="alert alert-error alert-bar"' +
        'ng-show="errorMessage">' +
        '<button type="button" class="close" ng-click="hideAlert()">' +
        'x</button>' +
        '{{errorMessage}}</div>',
      link: function(scope, elem, attrs) {
        var alertMessageAttr = attrs.alertmessage;
        scope.errorMessage = null;
        scope.$watch(alertMessageAttr, function(newVal) {
          scope.errorMessage = newVal;
         });
        scope.hideAlert = function() {
          scope.errorMessage = null;
          // Also clear the error message on the bound variable.
          // Do this so that if the same error happens again
          // the alert bar will be shown again next time.
          $parse(alertMessageAttr).assign(scope, null);
        };
      }
    };
  }])
  .directive('notificationBar', ['$parse', function($parse) {
    return {
      restrict: 'A',
      template: '<div class="alert alert-success alert-bar"' +
        'ng-show="notificationMessage">' +
        '<button type="button" class="close" ng-click="hideNotification()">' +
        'x</button>' +
        '{{notificationMessage}}</div>',
      link: function(scope, elem, attrs) {
        var notificationMessageAttr = attrs.alertmessage;
        scope.notificationMessage = null;
        scope.$watch(notificationMessageAttr, function(newVal) {
          scope.notificationMessage = newVal;
         });
        scope.hideNotification = function() {
          scope.notificationMessage = null;
          // Also clear the error message on the bound variable.
          // Do this so that if the same error happens again
          // the alert bar will be shown again next time.
          $parse(notificationMessageAttr).assign(scope, null);
        };
      }
    };
  }])
  .directive('ngUserlookup', function() {
    return {
      link: function(scope, elem, attrs, ctrl) {
        elem.bind('blur', function() {
          if (elem.context.validity.valid === true) {// scope.$apply(attrs.ngBlur);
            scope.$apply(scope.userLookUp(elem.context.value));
          }
        });
      }
    };
  })
  .directive('validPasswordC', function () {
      return {
          require: 'ngModel',
          link: function (scope, elm, attrs, ctrl) {
              ctrl.$parsers.unshift(function (viewValue, $scope) {
                  var noMatch = viewValue !== scope.form.password.$viewValue;
                  console.log(noMatch);
                  ctrl.$setValidity('noMatch', !noMatch);
              });
          }
      };
  })
  // http://chuvash.eu/2013/01/04/angular-jquery-ui-autocomplete/
  // https://gist.github.com/mirontoli/5021701
  .directive('uiAutocomplete', function () {
    return {
      require: '?ngModel',
      link: function(scope, element, attrs, controller) {
        var getOptions = function() {
          return angular.extend({}, scope.$eval(attrs.uiAutocomplete));
        };
        var initAutocompleteWidget = function () {
          var opts = getOptions();
          element.autocomplete(opts);
          if (opts._renderItem) {
           element.data("ui-autocomplete")._renderItem = opts._renderItem;
          }
        };
        // Watch for changes to the directives options
        scope.$watch(getOptions, initAutocompleteWidget, true);
      }
    };
  })
  .directive('currentTime', ['$timeout', function($timeout) {
    return {
      link: function(scope, element, attrs, controller) {
        scope.onTimeout = function() {
          scope.currentTime =  new Date().toUTCString();
          $timeout(scope.onTimeout,1000);
        }
        var mytimeout = $timeout(scope.onTimeout , 1000);
      }
    }
  }])
  .directive('countDown', ['$timeout', function($timeout) {
    return {
      link: function(scope, element, attrs, controller) {
        scope.onTimeout = function() {
          // scope.currentTime =  new Date().toUTCString();
          console.log(scope);
          var now = new Date();

          console.log(scope.bettle.expiration_datetime);
          console.log( new Date().toUTCString());
          if (scope.bettle.expiration_datetime >= new Date().toUTCString()) {
            console.log('true');
            scope.$parent.bettles.splice(scope.$index, 1);
          }
          $timeout(scope.onTimeout,1000);
        }
        var mytimeout = $timeout(scope.onTimeout , 1000);
      }
    }
  }]);



  // .directive('navibar', ['security', function(security) {
    // var directive = {
      // templateUrl: '../tpls/nav.tpl.html',
      // restrict: 'E',
      // replace: true,
      // scope: true,
      // link: function($scope, $element, $attrs, $controller) {
        // $scope.isAuthenticated = security.isAuthenticated;
        // //$scope.login = security.showLogin;
        // //$scope.logout = security.logout;
        // $scope.$watch(function() {
          // return security.currentUser;
        // }, function(currentUser) {
          // $scope.currentUser = currentUser;
        // });
      // }
    // };
    // return directive;
// }]);
