// Testing of appropriate modules are loaded
// test/midway/appSpec.js
//
describe("Midway: Testing Modules", function() {
  describe("myApp Module:", function() {

    var module;
    before(function() {
      module = angular.module("myApp");
    });

    it("should be registered", function() {
      expect(module).not.to.equal(null);
    });

    describe("Dependencies:", function() {

      var deps;
      var hasModule = function(m) {
        return deps.indexOf(m) >= 0;
      };
      before(function() {
        deps = module.value('appName').requires;
      });

      //you can also test the module's dependencies
      it("should have myApp.controllers as a dependency", function() {
        expect(hasModule('myApp.controllers')).to.equal(true);
      });

      it("should have myApp.directives as a dependency", function() {
        expect(hasModule('myApp.directives')).to.equal(true);
      });

      it("should have myApp.filters as a dependency", function() {
        expect(hasModule('myApp.filters')).to.equal(true);
      });

      it("should have myApp.services as a dependency", function() {
        expect(hasModule('myApp.services')).to.equal(true);
      });
      it("should have myApp.resources as a dependency", function() {
        expect(hasModule('myApp.resources')).to.equal(true);
      });
    });
  });
});