/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    //useDojo: true,
    //amdBase: 'vendor/arcgis',
    amdPackages: [
      'esri', 'dojo', 'dijit', 'dojox', 'dgrid', 'put-selector', 'xstyle'
    ],
    srcTag: 'https://js.arcgis.com/3.14'
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

  // Required for jQuery Mobile to work properly
  app.import('bower_components/jquery/dist/jquery.min.js');
  app.import('bower_components/jquery-mobile-bower/js/jquery.mobile-1.4.5.min.js');
  app.import('bower_components/jquery-mobile-bower/css/jquery.mobile-1.4.5.min.css');

  // ArcGIS API for JavaScript
  app.import('vendor/arcgis/esri/css/esri.css');

  // IndexedDBShim
  app.import('bower_components/IndexedDBShim/dist/indexeddbshim.js');

  // OfflineJS
  app.import('bower_components/offline/offline.min.js');

  // ArcGIS Offline library
  app.import('bower_components/offline-editor-js/dist/offline-edit-min.js');
  app.import('bower_components/offline-editor-js/dist/offline-tiles-advanced-min.js');

  return app.toTree();
};
