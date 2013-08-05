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
.controller('NewBettleCtrl', ['$scope', 'security', '$http', 'API_URL', 'Bettle', '$location', function($scope, security, $http, API_URL, Bettle, $location) {
    //  seetng default values for debugging
    $scope.newBettle = new Bettle();
     $scope.newBettle.fixture_id = 15;
    $scope.newBettle.max_opponents = 5;
    $scope.newBettle.for_cash = 'true';
    $scope.newBettle.maker_stake = 50;
    $scope.newBettle.opponent_stake = 100;
    $scope.newBettle.maker_outcome_id = 1;
    $scope.newBettle.opponent_outcome_id = 3;
    $scope.newBettle.expiration_datetime = new Date();

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
    // $scope.disabled = function(date, mode) {
      // return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    // };

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

    // $scope.ismeridian = true;
    // $scope.toggleMode = function() {
    //   $scope.ismeridian = ! $scope.ismeridian;
    // };

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
        // set the fixtur id in order to save the bettle
        $scope.newBettle.fixture_id = ui.item.fixture_id;
        fillOutFixtureDetails(ui.item);
      }
    };

    $scope.autocompleteOptions = {
      minLength: 1,
      source: search,
      select: select,
      delay: 100,
      _renderItem: _renderItem
    };

    // dropdown options for outcoe
    $scope.select2Options = {
      minimumResultsForSearch: -10
    };

    // set inital state to cash
    $scope.for_cash = 'true';

    // does he play for cash or honour
    $scope.forCash = function(value) {
     return !!(value == 'true');
   };

    // time selection modus
    // set inital state to cash
    $scope.newBettle.timeSelection = 'specific';


    // does he play for cash or honour
    $scope.timeSelect = function(value) {
     return !!(value == 'specific');
   };

    //  #attr_accessible :maker_id, :taker_id, :fixture_id, :free_bet, :win_maker, :win_taker, :accepted, :expiration_time, :bettle_status_id, :taker_outcome_id, :maker_outcome_id

    $scope.createBettle = function() {
      console.log($scope.newBettle.fixture_id);
      console.log($scope.newBettle.max_opponents);
      console.log($scope.newBettle.for_cash);
      console.log($scope.newBettle.maker_stake);
      console.log($scope.newBettle.opponent_stake);
      console.log($scope.newBettle.maker_outcome_id);
      console.log($scope.newBettle.opponent_outcome_id);
      if ($scope.newBettle.timeSelection == 'specific') {
        console.log($scope.newBettle.expiration_datetime);
      } else {
        console.log($scope.newBettle.expiration_days);
        console.log($scope.newBettle.expiration_hours);
        console.log($scope.newBettle.expiration_minutes);

      }
      var bettle = Bettle.save($scope.newBettle);
      $location.path('/my_bettles');
    };
  }])
  .controller('MyBettlesCtrl', ['$scope', '$http', 'API_URL', 'User', function($scope, $http, API_URL, User) {
    // if ($scope.isAuthenticated()) {
      // $scope.user = User.get({id: $scope.currentUser.user_id || null});
    // }
    // else {
      // $scope.$emit('event:loginRequired', 'loginPlease');
    // }
  }])
  .controller('IndexCtrl', ['$scope', 'Bettle', function($scope, Bettle) {
    // if ($scope.isAuthenticated()) {
      // $scope.user = User.get({id: $scope.currentUser.user_id || null});
    // }
    // else {
      // $scope.$emit('event:loginRequired', 'loginPlease');
    // }
    $scope.bettles = Bettle.query();
    console.log($scope.bettles);

    $scope.setOrder = function (order) {
        $scope.order = order;
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