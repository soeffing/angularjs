'use strict';

angular.module('myApp', [
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'myApp.resources',
  'ngI18n']);





angular.module('myApp').constant('API_URL', 'http://localhost:3000/api/v1/');
angular.module('myApp').constant('API_URL_RESOURCE', 'http://localhost\\:3000/api/v1/');

angular.module('myApp').value('ngI18nConfig', {
  defaultLocale: 'en',
  supportedLocales: ['en', 'es']
});

angular.module('myApp')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'})
      .when('/signup', {templateUrl: 'partials/signup.html', controller: 'RegistrationCtrl'})
      .when('/myaccount', {templateUrl: 'partials/myaccount.html', controller: 'AccountCtrl'})
      .otherwise({redirectTo: '/view1'});
  }])
  .run(['$rootScope', '$http', 'TokenHandler', 'security', 'ngI18nResourceBundle', 'changeLocationSafely', 'errorService',
    function( scope, $http, tokenHandler, security, ngI18nResourceBundle, changeLocationSafely, errorService ) {
    scope.$on( 'event:loginRequired',  function(event, data) {
      changeLocationSafely.newLocation('/login');
      if (data === 'loginPlease') {
        errorService.setError(scope.lang.notification_needToLogin);
      }
    });
    scope.$on( 'event:authenticate',  function(event, user) {
      security.login(event, user.email, user.password);
    });
    scope.$on( 'event:logout', function(event, user) {
      var token = tokenHandler.get().token;
      security.logout(event, token);
    });
    scope.isAuthenticated = security.isAuthenticated;
    scope.$watch(function() {
      return security.currentUser;
    }, function(currentUser) {
      scope.currentUser = currentUser;
    });

    // init locale service
    // https://github.com/gertn/ng-i18n
    scope.languages = [
        {locale:'en'},
        {locale:'es'}
    ];

    scope.i18n = {language: scope.languages[0]};

    ngI18nResourceBundle.get({locale: scope.i18n.language.locale}).success(function (resourceBundle) {
      scope.lang = resourceBundle;
    });

}]);




