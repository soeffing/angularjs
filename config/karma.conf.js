basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'app/js/vendor/angular/angular.js',
  'app/js/vendor/angular/angular-*.js',
  'test/lib/angular/angular-mocks.js',
  'app/js/**/*.js',
  'test/unit/**/*.js',

  //Test-Specific Code
 // 'node_modules/chai/chai.js',
 // 'test/lib/chai-should.js',
 // 'test/lib/chai-expect.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
