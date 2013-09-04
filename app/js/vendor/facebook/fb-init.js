$(document).ready(function() {

 $('body').prepend('<div id="fb-root"></div>');


// https://developers.facebook.com/docs/howtos/login/getting-started/

window.fbAsyncInit = function() {

 FB.init({
      appId      : '110228175726004', // App ID from the App Dashboard
      channelUrl : '#{window.location.protocol}//connect.facebook.net/en_US/all.js', // Channel File for x-domain communication
      status     : true, // check the login status upon init?
      cookie     : true, // set sessions cookies to allow your server to access the session?
      xfbml      : true  // parse XFBML tags on this page?
    });


    // check if user is logged in and authenticated app

    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        // connected
      } else if (response.status === 'not_authorized') {
       // login();
      } else {
       // login();
      }
    });

};

// Load the SDK Asynchronously
(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
 }(document));


});  // end of document ready


function login() {
    FB.login(function(response) {
        if (response.authResponse) {
          //  alert('sksks');
        } else {
          //  alert('cancelled');
        }
    });
}