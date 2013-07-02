'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
// http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-karma.html#testing-controllers
describe('Bettle.me', function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });

  it('should not show navbar when user enters site', function(){
   // console.log(element('.nav').css('display'));
    expect(element('.nav').css('display')).toBe('none');
  });

  it('should show error if user provides invalid login data', function(){
    element('a[href=#loginModal]').click();
    input('user.email').enter('ulrich_soeffing@gmx.de');
    input('user.password').enter('mysecre');
    element('.btn-primary:contains("Login")').click();
    expect(element('.alert').text()).toMatch(/Invalid email/);
  });
  // Invalid email or password. Please try again.

  it('should show navbar and logout button after user logged in', function() {
    //expect(element.('.nav').attr('display').toBe('none');
    element('a[href=#loginModal]').click();
    input('user.email').enter('ulrich_soeffing@gmx.de');
    input('user.password').enter('mysecret');
    element('.btn-primary:contains("Login")').click();
    // console.log(element('.btn-primary:contains("Login")')[0]);
    expect(element('.nav').css('display')).toBe('block');
  });


  // describe('view1', function() {
//
    // beforeEach(function() {
      // browser().navigateTo('#/view1');
    // });
//
//
    // it('should render view1 when user navigates to /view1', function() {
      // expect(element('[ng-view] p:first').text()).
        // toMatch(/partial for view 1/);
    // });
//
  // });
//
//
  // describe('view2', function() {
//
    // beforeEach(function() {
      // browser().navigateTo('#/view2');
    // });
//
//
    // it('should render view2 when user navigates to /view2', function() {
      // expect(element('[ng-view] p:first').text()).
        // toMatch(/partial for view 2/);
    // });
//
  // });
});
