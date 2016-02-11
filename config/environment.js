/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ermes-smart-app',
    environment: environment,
    baseURL: '/',
    defaultLocationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      apiServer: "http://ermes.dlsi.uji.es:6686",
      layerProxy: "http://ermes.dlsi.uji.es:6686/proxy",

      //resourcesServer: "http://altairi.lan:4200/",
      resourcesServer: "",
      assetDescriptor: "assets/offline/assetdescriptor.json",

      /* sample descriptor file entry
      regionsBaseMaps: {
        spain: {
          //address of the asset descriptor json file
          tpkUrl: "<set the uri here in the descriptor file>",
          version: "1.0.0"
        },
        italy: {
         tpkUrl: "<set the uri here in the descriptor file>",
         version: "1.0.0"

       },
        greece: {
         tpkUrl: "<set the uri here in the descriptor file>",
         version: "1.0.0"
        }
      }
     */
      /*todo: cleanup this zooms, etc can disappear*/
      regionLayers: {
        spain: {
          baseMap: "http://ermes.dlsi.uji.es:6080/arcgis/rest/services/2015-ES/landsat_spain_scene_mercator/MapServer",
          mapName: "spainBasemap",
          parcelsLayer: "http://ermes.dlsi.uji.es:6080/ArcGIS/rest/services/2015-ES/landsat_spain_scene/MapServer/3",
          maxZoom: 18,
          minZoom: 14
        },
        italy: {
          baseMap: "http://ermes.dlsi.uji.es:6080/arcgis/rest/services/2015-IT/IT_basemap/MapServer",
          mapName: "italyBasemap",
          parcelsLayer: "http://ermes.dlsi.uji.es:6080/arcgis/rest/services/2015-IT/IT_parcels/MapServer/0",
          maxZoom: 17,
          minZoom: 13
        },
        greece: {
          baseMap: "http://ermes.dlsi.uji.es:6080/arcgis/rest/services/2015-GR/GR_basemap/MapServer",
          mapName: "greeceBasemap",
          parcelsLayer: "http://ermes.dlsi.uji.es:6080/arcgis/rest/services/2015-GR/GR_parcels/MapServer/0",
          maxZoom: 6,
          minZoom: 3
        }
      },
      defaultDateFormat: 'DD/MM/YYYY'
    },

    cordova: {
      rebuildOnChange: false,
      emulate: false
    }
  };

  // Internationalization settings
  ENV.i18n = { defaultLocale: 'en' };

  // Moment (Dates) settings
  ENV.moment = { includeLocales: ['en', 'el', 'es', 'it']};


  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-eval' 'unsafe-inline' :49152 http://ermes.dlsi.uji.es:6080/arcgis/rest/services/ http://js.arcgis.com/ https://js.arcgis.com/",
    'font-src': "'self'",
    'connect-src': "'self' http://ermes.dlsi.uji.es:6080/arcgis/rest/ http://ermes.dlsi.uji.es:6686 http://ermes.dlsi.uji.es:6585/ http://server.arcgisonline.com/arcgis/rest/services/ http://services.arcgisonline.com/ http://www.arcgis.com/ http://static.arcgis.com/",
    'img-src': "'self' http://ermes.dlsi.uji.es http://ermes.dlsi.uji.es:6080/arcgis/rest/services/ void: data: http://js.arcgis.com/ http://services.arcgisonline.com/ http://server.arcgisonline.com/",
    'style-src': "'self' 'unsafe-inline'",
    'media-src': "'self'"
  };

  return ENV;
};
