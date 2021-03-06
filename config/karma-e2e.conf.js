basePath = '../';

files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'test/e2e/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

singleRun = false;

// web server port
port = 9000;

proxies = {
  '/': 'http://localhost:8080/'
};

urlRoot = '/_karma_/';

junitReporter = {
  outputFile: 'test_out/e2e.xml',
  suite: 'e2e'
};
