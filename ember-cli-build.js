/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // Jquery JS
  app.import("bower_components/jquery/dist/jquery.min.js");
  app.import("bower_components/jquery-mobile-datepicker-wrapper/external/jquery-ui/datepicker.js");
  app.import("bower_components/jquery-mobile-bower/js/jquery.mobile-1.4.5.min.js");
  app.import("bower_components/jquery-mobile-datepicker-wrapper/external/jquery-ui/datepicker.js");

  // Jquery CSS
  app.import("bower_components/jquery-mobile-bower/css/jquery.mobile-1.4.5.min.css");
  app.import("bower_components/jquery-mobile-datepicker-wrapper/jquery.mobile.datepicker.css");
  app.import("bower_components/jquery-mobile-datepicker-wrapper/jquery.mobile.datepicker.theme.css");


  return app.toTree();
};
