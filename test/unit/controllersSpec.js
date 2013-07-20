'use strict';

describe('Controllers', function(){
  var $scope, ctrl;
  beforeEach(module('myApp'));
  //beforeEach(angular.module('myApp.constant("API_URL")'));

  describe('Login Controller', function() {
  	var mockBackend, location;
  	beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $location) {
  	  mockBackend = _$httpBackend_;
  	  location = $location;
  	  $scope = $rootScope.$new();
  	  // API_URL = 'http://localhost:3000/api/v1/'
  	  ctrl = $controller('LoginCtrl', {
  	  	$scope: $scope,
  	  	$location: $location
  	  });
  	}));

  	it('should authenticate user with correct credentials', inject(function() {
  	  mockBackend.expectGET('i18n/resourceBundle.json').respond();
  	  mockBackend.expectPOST('http://localhost:3000/api/v1/users/sign_in').respond({authentication_token: 'ulrich_soeffing@gmx.de'}, {user_id: 1});

  	  // Set it to something else to ensure it is changed during the test
      location.path('test');

      // $scope.user.email = 'ulrich_soeffing@gmx.de';
      // $scope.user.password = 'mysecret';
      $scope.login();

      expect(location.path()).toEqual('/test');

      mockBackend.flush();

      expect(location.path()).toEqual('/myaccount');

  	}));
  	it('should NOT authenticate user with invalid credentials', inject(function() {
  	  mockBackend.expectGET('i18n/resourceBundle.json').respond();
  	  mockBackend.expectPOST('http://localhost:3000/api/v1/users/sign_in').respond({authentication_token: 'ulrich_soeffing@gmx.de'}, {user_id: 1});

  	  // Set it to something else to ensure it is changed during the test
      location.path('test');

      //$scope.user.email = '';
      //$scope.user.password = 'wrongpassw';
      $scope.login();

      expect(location.path()).toEqual('/test');

      mockBackend.flush();

      expect(location.path()).toEqual('/login');

  	}));
  });
});