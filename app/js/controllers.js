'use strict';

angular.module('myApp.controllers', [])
.controller('RootCtrl', ['$scope', 'errorService', 'notificationService', function($scope, errorService, notificationService) {
    // reference to errorService & notification service
    $scope.errorService = errorService;
    $scope.notificationService = notificationService;
  }])
.controller('NavCtrl', ['$scope', 'security', '$rootScope', 'ngI18nResourceBundle', function($scope, security, $rootScope, ngI18nResourceBundle) {
  $scope.logout = function() {
    $scope.$emit('event:logout', $scope.user);
  };

  $scope.setLocale = function(locale){
    ngI18nResourceBundle.get({locale: locale}).success(function (resourceBundle) {
      $rootScope.lang = resourceBundle;
    });
  };
}])
.controller('LoginCtrl', ['$scope', '$http', 'API_URL', function($scope, $http, API_URL) {
  $scope.user = {};
  $scope.user.email = 'ulrich_soeffing@gmx.de';
  $scope.user.password = 'mysecret';
  $scope.login = function() {
    $scope.$emit('event:authenticate', $scope.user);
  };
}])
.controller('RegistrationCtrl', ['$scope', '$http', 'UserRegistration', 'API_URL', function($scope, $http, UserRegistration, API_URL) {
 $scope.userExists = null;
 console.log($scope);
 $scope.user = new UserRegistration();
 $scope.signup = function() {
   $scope.user.$save();
 };
 $scope.userLookUp = function(email) {
   $http.get(API_URL + 'userslookup?email=' + email).
   success(function(data, status, headers, config) {
           // console.log($scope.user.email.$setValidity('emailExists', false));
           if (data.message === 'true') {
             $scope.userExists = true;
             $scope.form.email.$setValidity('userExists', false);
           } else {
             $scope.userExists = null;
             $scope.form.email.$setValidity('userExists', true);
           }
           console.log($scope);
         }).
   error(function(data, status, headers, config) {
         // called asynchronously if an error occurs
         // or server returns response with an error status.
         console.log(data, status, headers, config);
       });
 };
}])
.controller('AccountCtrl', ['$scope', '$http', 'API_URL', 'User', function($scope, $http, API_URL, User) {
  if ($scope.isAuthenticated()) {
    $scope.user = User.get({id: $scope.currentUser.user_id || null});
  }
  else {
    $scope.$emit('event:loginRequired', 'loginPlease');
  }
}])
.controller('NewBettleCtrl', ['$scope', 'security', '$http', 'API_URL', function($scope, security, $http, API_URL) {
    //if ($scope.isAuthenticated()) {
      //$scope.user = User.get({id: $scope.currentUser.user_id || null});
    //}
    //else {
      //$scope.$emit('event:loginRequired', 'loginPlease');
    //}
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.showWeeks = true;
    $scope.toggleWeeks = function () {
      $scope.showWeeks = ! $scope.showWeeks;
    };

    $scope.clear = function () {
      $scope.dt = null;
    };

      // Disable weekend selection
      $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
      };

      $scope.toggleMin = function() {
        $scope.minDate = ( $scope.minDate ) ? null : new Date();
      };

    $scope.toggleMin();


    // time picker
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
       hstep: [1, 2, 3],
       mstep: [1, 5, 10, 15, 25, 30]
    };

     $scope.ismeridian = true;
     $scope.toggleMode = function() {
       $scope.ismeridian = ! $scope.ismeridian;
     };

     $scope.update = function() {
       var d = new Date();
       d.setHours( 14 );
       d.setMinutes( 0 );
       $scope.mytime = d;
     };

     $scope.clear = function() {
       $scope.mytime = null;
     };

     // autocomplete section
     // http://chuvash.eu/2013/01/04/angular-jquery-ui-autocomplete/

     // initialize scopes

     $scope.team_one = "";

     var search = function(request, response) {
      var callback = function(data) {
        response(data);
      };
      $http.get( API_URL + 'fixtures/search?term=' + $scope.term)
      .success(callback);
    },

    fillOutFixtureDetails = function (data) {
      console.log(data.team_one);
      $scope.$apply(function() {
        $scope.team_one = data.team_one;
        $scope.team_two = data.team_two;
        $scope.fixture_league = data.league;
        $scope.fixture_date = data.date;
      });
    },

    _renderItem = function (ul, item) {
      return $("<li>")
      .data("item.autocomplete", item)
      .append("<a>" + item.team_one + " vs. " + item.team_two + "  " + item.league + "  " + item.date + "</a>")
      .appendTo(ul);
    },

    select = function (event, ui) {
      if (ui.item) {
        console.log(ui.item);
        fillOutFixtureDetails(ui.item);
      }
    };

    $scope.autocompleteOptions = {
      minLength: 1,
      source: search,
      select: select,
      delay: 500,
      _renderItem: _renderItem
    };

   }]);



// old request for my account
// var request = $http({
    // url: API_URL + 'users/edit',
    // method: "GET",
    // params: {auth_token: "qNAqRRdhnJEu7dzVZj4w", id: 1 }
    // }).
    // success(function(data, status, headers, config) {
       // // this callback will be called asynchronously
       // // when the response is available
         // console.log(data);
       // }).
       // error(function(data, status, headers, config) {
       // // called asynchronously if an error occurs
       // // or server returns response with an error status.
       // console.log(data,status, headers, config);
    // });




  // old request for login
  // var request = $http.post(API_URL + 'users/sign_in', {user: {email: $scope.user.email, password: $scope.user.password }}).
      // success(function(data, status, headers, config) {
         // // this callback will be called asynchronously
         // // when the response is available
           // console.log(data);
         // }).
         // error(function(data, status, headers, config) {
         // // called asynchronously if an error occurs
         // // or server returns response with an error status.
         // console.log(data,status, headers, config);
      // });
    // }