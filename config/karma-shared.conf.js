var shared = {};
shared.plugins = [
  'karma-mocha',
  'karma-ng-scenario',
  'karma-chrome-launcher',
  'karma-firefox-launcher',
  'karma-safari-launcher',
  'karma-ng-scenario'
];

shared.frameworks = ['mocha'];
shared.basePath  = '../';
shared.singleRun = false
shared.autoWatch = true
shared.colors    = true

shared.reporters = ['progress'];
shared.browsers = ['Chrome'];
shared.proxies = {
  '/': 'http://localhost:8000/'
};

shared.files = [
  //JASMINE,
  // JASMINE_ADAPTER,
  'app/js/vendor/angular/angular.js',
  'app/js/vendor/angular/angular-*.js',
  'test/lib/angular/angular-mocks.js',
  'app/js/**/*.js',
  'test/midway/**/*.js',

  //Test-Specific Code
  'node_modules/chai/chai.js',
  'test/lib/chai-should.js',
  'test/lib/chai-expect.js'
];

exports.shared = shared;
