'use strict';

angular.module('myApp.directives', [])
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
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
