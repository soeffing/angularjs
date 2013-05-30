# myApp

An angular application designed to...well, that part is up to you.

## Usage

FIXME

### Running the app during development

Getting dependencies:

* install node.js
* run `npm install`

To see the app running in a Chrome Browser, run `grunt server`. A browser window should open and navigate to `http://localhost:8080/`.

### Running the app in production

To build a distribution package, run `grunt build`. The `dist` folder should now contained all the assets needed for deployment.


### Running unit tests

To execute unit tests, run `grunt test`. A connected browser window will open and run all unit tests. The connected browser will remain open and re-run all units tests if the test files are modified.


### End to end testing

To execute end to end (e2e) tests, run `grunt e2e`. A connected browser window will open, run all e2e tests and close.

## Directory Layout

    app/                --> all of the files to be used in production
      css/              --> css files
        app.css         --> default stylesheet
        fonts/          --> fonts
      img/              --> image files
      index.html        --> app layout file (the main html template file of the app)
      js/               --> javascript files
        app.js          --> application
        controllers.js  --> application controllers
        directives.js   --> application directives
        filters.js      --> custom angular filters
        services.js     --> custom angular services
        vendor/               --> angular and 3rd party javascript libraries
          angular/
            angular.js        --> the latest angular js
            angular.min.js    --> the latest minified angular js
            angular-*.js      --> angular add-on modules
            version.json      --> version number
      partials/             --> angular view partials (partial html templates)
        partial1.html
        partial2.html

    config/karma.conf.js        --> config file for running unit tests with Karma
    config/karma-e2e.conf.js    --> config file for running e2e tests with Karma

    test/               --> test source files and libraries
      e2e/              
        runner.html     --> end-to-end test runner (open in your browser to run)
        scenarios.js    --> end-to-end specs
      lib/
        angular/                --> angular testing libraries
          angular-mocks.js      --> mocks that replace certain angular services in tests
          angular-scenario.js   --> angular's scenario (end-to-end) test runner library
          version.txt           --> version file
      unit/                     --> unit level specs/tests
        controllersSpec.js      --> specs for controllers
        directivessSpec.js      --> specs for directives
        filtersSpec.js          --> specs for filters
        servicesSpec.js         --> specs for services

      .gitignore    --> intentionally untracked files to ignore
      .jshintrc     --> project-level static code analysis
      Gruntfile.js  --> tast-runner settings
      package.json  --> npm dependencies

## Misc

TODO: Add misc. info.

## License

Copyright © 2013 FIXME