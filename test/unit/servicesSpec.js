'use strict';

describe('Unit Testing: Services', function() {
  beforeEach(module('myApp'));
  beforeEach(module('myApp.services'));

  it('should contain an security service', inject(function(security) {
    expect(security).not.to.equal(null);
  }));

  // describe('version', function() {
//     it('should return current version', inject(function(version) {
//       expect(version).toEqual('0.0.1');
//     }));
//   });
});
