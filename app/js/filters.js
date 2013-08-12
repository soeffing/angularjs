'use strict';

angular.module('myApp.filters', [])
  .filter('countdown_init', function () {
  	function secondsToString(seconds) {
  		var numdays = Math.floor(seconds / 86400);
  		var numhours = Math.floor((seconds % 86400) / 3600);
  		var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
  		var numseconds = Math.floor((seconds % 86400) % 3600) % 60;
  		return numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
  	}
    return function(input) {
     // var expires_at = new Date(input.expiration_datetime);
     // var now = new Date();
      return secondsToString(input.seconds_to_expiration);
    }
  })
  .filter('outcome_opponent_sentence', function () {
    return function(bettle) {
     // var expires_at = new Date(input.expiration_datetime);
     // var now = new Date();
     if (bettle.opponent_outcome_id == 1) {
      return bettle.team_one + " wins.";
     }
     else if (bettle.opponent_outcome_id == 2) {
      return bettle.team_one + " draws " + bettle.team_two;
     }

     else if (bettle.opponent_outcome_id == 3) {
      return bettle.team_two + " wins.";
     }
    }
  })
  .filter('outcome_maker_sentence', function () {
    return function(bettle) {
     // var expires_at = new Date(input.expiration_datetime);
     // var now = new Date();
     if (bettle.maker_outcome_id == 1) {
      return bettle.team_one + " wins.";
     }
     else if (bettle.maker_outcome_id == 2) {
      return bettle.team_one + " draws " + bettle.team_two;
     }

     else if (bettle.maker_outcome_id == 3) {
      return bettle.team_two + " wins.";
     }
    }
  });
  // .filter('expiration_time_attr', function () {
    // var expires_at;
    // return function(input) {
      // expires_at = new Date(input);
    // }
  // });
  // trigger function to update countdown every second or scope