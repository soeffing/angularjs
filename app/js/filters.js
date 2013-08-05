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
      var expires_at = new Date(input.expiration_datetime);
      var now = new Date();
      return secondsToString((expires_at - now) / 1000);
    }
  });
  // .filter('expiration_time_attr', function () {
    // var expires_at;
    // return function(input) {
      // expires_at = new Date(input);
    // }
  // });
  // trigger function to update countdown every second or scope