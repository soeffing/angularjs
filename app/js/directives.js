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
        var alertMessageAttr = attrs['alertmessage'];
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
