//
// test/e2e/requestsSpec.js
//
describe("E2E: Testing Requests", function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });

  it('should have a working /login page', function() {
    browser().navigateTo('#/login');
    expect(browser().location().path()).toBe("/login");
    expect(element('#ng-view').html()).toContain('LoginCtrl');
  });

  it('should have a working /signup', function() {
    browser().navigateTo('#/signup');
    expect(browser().location().path()).toBe("/signup");
    expect(element('#ng-view').html()).toContain('RegistrationCtrl');
  });

});