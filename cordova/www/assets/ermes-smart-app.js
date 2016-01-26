"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

efineday('ermes-smart-app/adapters/application', ['exports', 'ember', 'ember-data', 'ermes-smart-app/config/environment'], function (exports, Ember, DS, config) {

  'use strict';

  exports['default'] = DS['default'].RESTAdapter.extend({
    namespace: 'api/products',
    host: config['default'].APP.apiServer,
    auth: Ember['default'].inject.service(),
    headers: Ember['default'].computed('auth.token', function () {
      return {
        "X-Auth-Key": this.get("auth.token")
      };
    }),
    offlineStorage: Ember['default'].inject.service(),
    findRecord: function findRecord(store, type, id, snapshot) {
      var _this = this;

      return this._super(store, type, id, snapshot).then(function (res) {
        // Record found online
        _this.get('offlineStorage').get('storage').setItem(type + id, res);
        return res;
      }, function (err) {
        // Record not found, connection lost
        // Recovering record from the local database
        return _this.get('offlineStorage').get('storage').getItem(type + id).then(function (obj) {
          // Masquerade for not breaking the Application.RESTAdapter object
          return new Ember['default'].RSVP.Promise(function (resolve, reject) {
            if (obj !== null) {
              resolve(obj); // User profile successfully recovered
            } else {
                reject(err); // There is no user data on the local database
              }
          });
        });
      });
    }
  });

});
efineday('ermes-smart-app/adapters/parcel', ['exports', 'ermes-smart-app/adapters/application'], function (exports, ApplicationAdapter) {

  'use strict';

  exports['default'] = ApplicationAdapter['default'].extend({
    namespace: 'api'
  });

});
efineday('ermes-smart-app/adapters/user', ['exports', 'ermes-smart-app/adapters/application'], function (exports, ApplicationAdapter) {

  'use strict';

  exports['default'] = ApplicationAdapter['default'].extend({
    namespace: 'api'
  });

});
efineday('ermes-smart-app/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'ermes-smart-app/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  if (document.URL.match(/^https?:\/\//)) {
    //alert("Browser!!");
    loadInitializers['default'](App, config['default'].modulePrefix);
  } else {
    document.addEventListener('deviceready', function () {
      //alert("Hybrid!!");
      loadInitializers['default'](App, config['default'].modulePrefix);
    }, false);
  }

  //loadInitializers(App, config.modulePrefix);

  exports['default'] = App;

});
efineday('ermes-smart-app/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'ermes-smart-app/config/environment'], function (exports, AppVersionComponent, config) {

  'use strict';

  var name = config['default'].APP.name;
  var version = config['default'].APP.version;

  exports['default'] = AppVersionComponent['default'].extend({
    version: version,
    name: name
  });

});
efineday('ermes-smart-app/components/cdv-nav-bar', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    tagName: 'header'
  });

});
efineday('ermes-smart-app/components/ermes-datepicker', ['exports', 'ember-jquery-mobile/components/jqm-datepicker', 'moment'], function (exports, JqmDatepicker, Moment) {

  'use strict';

  exports['default'] = JqmDatepicker['default'].extend({
    months: Moment['default'].months(),
    days: Moment['default'].weekdaysMin()
  });

});
efineday('ermes-smart-app/components/ermes-login-buttons', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ['ermes-login-buttons', 'animated', 'bounceInLeft'],
    actions: {
      openPopup: function openPopup(param) {
        this.sendAction('action', param);
      }
    }
  });

});
efineday('ermes-smart-app/components/ermes-login-language', ['exports', 'ember', 'ermes-smart-app/models/static/regions'], function (exports, Ember, dd) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ['ermes-login-language', 'animated', 'fadeIn'],
    i18n: Ember['default'].inject.service(),
    languages: dd.getLanguajes()
  });

});
efineday('ermes-smart-app/components/ermes-login-popup', ['exports', 'ember', 'ermes-smart-app/utils/ajax'], function (exports, Ember, ajax) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    auth: Ember['default'].inject.service(),
    i18n: Ember['default'].inject.service(),
    model: Ember['default'].RSVP.hash({
      username: "",
      password: ""
    }),
    username: Ember['default'].computed.alias('model.username'),
    actions: {
      submit: function submit() {
        var _this = this;

        var model = this.get('model');
        var auth = this.get('auth');

        this.set('error', '');

        this.set('info', this.get('i18n').t('panel.notification.processing'));
        ajax.post('/login', { username: model.username, password: model.password }).done(function (data) {
          _this.set('info', '');
          if (!data) {
            _this.set('error', _this.get('i18n').t('panel.notification.login-error'));
          } else if (data.profile !== 'local') {
            _this.set('error', _this.get('i18n').t('panel.notification.regional-error'));
          } else {

            auth.logIn(data.user, data.user + ";" + model.password, data.lang);

            // Reset form
            _this.set('model.username', '');
            _this.set('model.password', '');
            _this.sendAction('logIn');
          }
        }).fail(function () {
          _this.set('info', '');
          _this.set('error', _this.get('i18n').t('panel.notification.offline'));
        });
      }
    }
  });

});
efineday('ermes-smart-app/components/ermes-main-logo', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ['ermes-main-logo', 'animated', 'bounceInRight']
  });

});
efineday('ermes-smart-app/components/ermes-menu-fields', ['exports', 'jquery', 'ember', 'ember-jquery-mobile/components/jqm-popup', 'ermes-smart-app/models/static/products'], function (exports, $, Ember, JqmPopup, dd) {

  'use strict';

  exports['default'] = JqmPopup['default'].extend({
    id: 'ermes-menu-fields',
    theme: 'c',
    transition: 'slidedown',
    i18n: Ember['default'].inject.service(),
    products: Ember['default'].computed('i18n.locale', function () {
      return dd.getProducts(this);
    }),
    actions: {
      showPanel: function showPanel(name) {
        $['default']('#' + this.get('id')).popup('close');
        this.sendAction('showPanel', name);
      }
    }
  });

});
efineday('ermes-smart-app/components/ermes-menu-options', ['exports', 'jquery', 'ember', 'ember-jquery-mobile/components/jqm-popup'], function (exports, $, Ember, JqmPopup) {

  'use strict';

  exports['default'] = JqmPopup['default'].extend({
    id: 'ermes-menu-fields',
    theme: 'c',
    transition: 'slidedown',
    i18n: Ember['default'].inject.service(),
    options: Ember['default'].computed('i18n.locale', 'editMode', function () {
      return [{ text: this.get('i18n').t('fields.options-m.profile'), icon: "user", action: "showPanel", actionParam: "index.profile", isShown: true }, { text: this.get('i18n').t('fields.options-m.fields'), icon: "bullets", action: "enterEditMode", actionParam: null, isShown: !this.get('editMode') }, { text: this.get('i18n').t('fields.options-m.about'), icon: "info", action: "showPanel", actionParam: "index.about", isShown: true }];
    }),
    actions: {
      showPanel: function showPanel(name) {
        $['default']('#' + this.get('id')).popup('close');
        this.sendAction('showPanel', name);
      },
      enterEditMode: function enterEditMode() {
        $['default']('#' + this.get('id')).popup('close');
        if (navigator.onLine) {
          this.set('editMode', true);
        } else {
          this.sendAction('cannotEdit');
        }
      }
    }

  });

});
efineday('ermes-smart-app/components/ermes-message', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Component.extend({});

});
efineday('ermes-smart-app/components/ermes-panel', ['exports', 'ember-jquery-mobile/components/jqm-panel'], function (exports, JqmPanel) {

  'use strict';

  exports['default'] = JqmPanel['default'].extend({
    layout: JqmPanel.layout,
    theme: 'a',
    position: 'right',
    display: 'overlay',
    dismissible: 'false',
    closeButton: 'true',
    title: 'Ermes Panel',
    routeOnClose: 'index'
  });

});
efineday('ermes-smart-app/components/ermes-side-buttons', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    classNames: ['ermes-side-buttons'],
    tagName: 'table',
    parcels: Ember['default'].inject.service(),
    i18n: Ember['default'].inject.service(),
    buttons: Ember['default'].computed('editMode', 'i18n.locale', function () {
      if (this.get('editMode')) {
        return this.get('editButtons');
      } else {
        return this.get('selectButtons');
      }
    }),
    selectButtons: Ember['default'].computed('i18n.locale', function () {
      return [{ title: this.get('i18n').t('fields.map-tools.parcel-info'), icon: 'info', 'class': 'ermes-btn-med', action: 'openInfoPanel' }, { title: this.get('i18n').t('fields.map-tools.invert-selection'), icon: 'action', 'class': 'ermes-btn-med', action: 'invertSelection' }, { title: this.get('i18n').t('fields.map-tools.select-all'), icon: 'grid', 'class': 'ermes-btn-big', action: 'selectAll' }];
    }),
    editButtons: Ember['default'].computed('i18n.locale', function () {
      return [{ title: this.get('i18n').t('fields.map-tools.confirm-selection'), icon: 'check', 'class': 'ermes-btn-big', action: 'commitChanges' }];
    }),
    actions: {
      openInfoPanel: function openInfoPanel() {
        this.sendAction('openPanel', 'index.parcel-info');
      },
      commitChanges: function commitChanges() {
        var _this = this;

        if (navigator.onLine) {
          this.get('parcels.user').save().then(function () {
            _this.set('editMode', false);
          }, function (err) {
            console.debug('No se ha podido guardar el usuario');
            _this.set('editMode', false);
            console.debug(err);
          });
        } else {
          this.get('parcels.user').rollbackAttributes();
          this.set('editMode', false);
          this.sendAction('cannotEdit');
        }
      },
      selectAll: function selectAll() {
        var userParcels = this.get('parcels.user.parcels');
        var selectedParcels = this.get('parcels.selectedParcels');
        userParcels.forEach(function (parcel) {
          if (!selectedParcels.contains(parcel)) {
            selectedParcels.pushObject(parcel);
          }
        });
      },
      invertSelection: function invertSelection() {
        var userParcels = this.get('parcels.user.parcels');
        var selectedParcels = this.get('parcels.selectedParcels');
        var previouslySelected = [];
        previouslySelected.pushObjects(selectedParcels);
        selectedParcels.clear();
        userParcels.forEach(function (parcel) {
          if (!previouslySelected.contains(parcel)) {
            selectedParcels.pushObject(parcel);
          }
        });
      }
    }
  });

});
efineday('ermes-smart-app/components/ermes-signup-popup', ['exports', 'ember', 'jquery', 'ermes-smart-app/models/static/regions', 'ermes-smart-app/utils/ajax'], function (exports, Ember, $, dd, ajax) {

  'use strict';

  exports['default'] = Ember['default'].Component.extend({
    i18n: Ember['default'].inject.service(),
    regions: Ember['default'].computed('i18n.locale', function () {
      return dd.getRegions(this);
    }),
    success: false,
    model: Ember['default'].RSVP.hash({
      username: "",
      password: "",
      rPassword: "",
      email: "",
      rEmail: "",
      region: ""
    }),
    actions: {
      submit: function submit() {
        var _this = this;

        var model = this.get('model');
        this.set('error', '');

        if (model.password !== model.rPassword) {
          this.set('error', this.get('i18n').t('panel.notification.password-mismatch'));
        } else if (model.email !== model.rEmail) {
          this.set('error', this.get('i18n').t('panel.notification.email-mismatch'));
        } else {
          this.set('info', this.get('i18n').t('panel.notification.processing'));

          ajax.post('/signup', { username: model.username,
            password: model.password, email: model.email, region: model.region }).done(function (data) {
            _this.set('info', '');
            if (data) {
              _this.set('success', true);
            } else {
              _this.set('error', _this.get('i18n').t('panel.notification.user-exits'));
            }
          }).fail(function () {
            _this.set('info', '');
            _this.set('error', _this.get('i18n').t('panel.notification.offline'));
          });
        }
      },
      showLoginPopup: function showLoginPopup() {
        var loginPopup = $['default']('#ermes-login-popup');
        var signupPopup = $['default']('#ermes-signup-popup');
        loginPopup.find('form').trigger('reset'); // Clear login
        //$(loginPopup.find('form').find('input')[0]).val(this.get('model.username')); // Set login username
        this.set('username', this.get('model.username'));
        signupPopup.one('popupafterclose', function () {
          loginPopup.popup('open');
        }); // Prevent animation error
        signupPopup.popup('close'); // Close actual popup
        this.set('success', false);
      }
    }
  });

});
efineday('ermes-smart-app/components/esri-map', ['exports', 'ember', 'jquery', 'ermes-smart-app/config/environment', 'ermes-smart-app/mixins/offline-map', 'ermes-smart-app/mixins/map-events', 'esri/map', 'oesri/offline-edit-store-src', 'esri/symbols/SimpleFillSymbol', 'esri/symbols/SimpleLineSymbol', 'esri/Color', 'esri/graphic', 'esri/symbols/PictureMarkerSymbol', 'esri/geometry/Point'], function (exports, Ember, $, config, OfflineMap, MapEvents, Map, EditStore, SimpleFillSymbol, SimpleLineSymbol, Color, Graphic, PictureMarkerSymbol, Point) {

  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports['default'] = Ember['default'].Component.extend(OfflineMap['default'], MapEvents['default'], {
    elementId: 'mapDiv',
    map: null,
    editStore: null,
    parcels: Ember['default'].inject.service(),

    /**
     * Persistent symbol
     */
    userParcelSymbol: new SimpleFillSymbol['default'](SimpleFillSymbol['default'].STYLE_SOLID, new SimpleLineSymbol['default'](SimpleLineSymbol['default'].STYLE_SOLID, new Color['default']([135, 238, 124]), 2), new Color['default']([255, 213, 87, 1])),

    /**
     * Volatile symbol
     */
    selectSymbol: new SimpleFillSymbol['default'](SimpleFillSymbol['default'].STYLE_SOLID, new SimpleLineSymbol['default'](SimpleLineSymbol['default'].STYLE_SOLID, new Color['default']([242, 38, 19]), 2), new Color['default']([211, 84, 0, 1])),

    /**
     * Esri map component inserted to the DOM
     */
    didInsertElement: function didInsertElement() {
      var _this = this;
      $['default'](document).ready(function () {
        // Wait until DOM is ready to prevent map fixed size
        var editStore = new EditStore['default']();
        editStore.dbName = "fieldsStore";
        editStore.objectStoreName = "fields";
        editStore.init(function (success) {
          if (success) {
            _this.createMap();
            _this.loadBasemap();
            _this.loadUserParcelsLayer();
            _this.mapLoaded();
          }
          // else: load online basemap
        });
        _this.set('editStore', editStore);
      });
    },

    /**
     * Map layers fully initialized
     */
    createMap: function createMap() {
      var pos = this.get('parcels.user.lastPosition');
      var mapInfo = this.get('parcels').getUserMapInfo();

      var map = new Map['default'](this.elementId, {
        "center": [pos.get('lastX'), pos.get('lastY')],
        "zoom": pos.get('zoom'),
        "maxZoom": mapInfo.maxZoom,
        "minZoom": mapInfo.minZoom,
        "logo": false
      });
      this.set('map', map);
    },

    /**
     * Load default basemap for the actual user region
     */
    loadBasemap: function loadBasemap() {
      var mapInfo = this.get('parcels').getUserMapInfo();

      this.addOfflineTileLayer(mapInfo.baseMap, mapInfo.mapName, config['default'].APP.layerProxy);
    },

    /**
     * Special feature layer, contains only actual user fields
     */
    loadUserParcelsLayer: function loadUserParcelsLayer() {
      var mapInfo = this.get('parcels').getUserMapInfo();

      this.addUserParcelsLayer(mapInfo.parcelsLayer);
    },

    /**
     * Full parcels layer for the actual user region
     */
    loadFullParcelsLayer: function loadFullParcelsLayer() {
      var mapInfo = this.get('parcels').getUserMapInfo();

      this.addParcelsLayer(mapInfo.parcelsLayer);
    },

    /**
     * Reload all layer for the current esri map configuration
     */
    liveReload: function liveReload() {
      // Clear parcel selection
      this.get('parcels.selectedParcels').clear();

      // Remove all layers
      var layersMap = this.get('layersMap');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = layersMap.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var layerObject = _step.value;

          this.get('map').removeLayer(layerObject);
        }

        // Add layers
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.get('layersMap').clear();
      this.loadBasemap();
      this.loadUserParcelsLayer();
    },

    /**
     * Once the map has been fully configured,
     * trigger Edit Mode decision event
     */
    mapLoaded: function mapLoaded() {
      var _this2 = this;

      Ember['default'].debug('Map was successfully loaded');
      this.notifyPropertyChange('editMode');
      this.get('map').on('update-end', function () {
        return _this2.setPositionMarker();
      });
    },

    /**
     * Sets a marker for the actual user position
     */
    setPositionMarker: function setPositionMarker() {
      var _this3 = this;

      if (navigator.geolocation) {
        var map = this.get('map');
        var myPositionGraphic = this.get('myPositionGraphic');
        navigator.geolocation.getCurrentPosition(function (location) {
          var myPos = new Point['default'](location.coords.longitude, location.coords.latitude);
          if (!myPositionGraphic) {
            var myPositionSymbol = new PictureMarkerSymbol['default']({
              "angle": 0,
              "xoffset": 2,
              "yoffset": 8,
              "type": "esriPMS",
              "url": "assets/ermes-images/BlueCircleLargeB.png",
              "contentType": "image/png",
              "width": 24,
              "height": 24
            });
            myPositionGraphic = new Graphic['default'](myPos, myPositionSymbol);
            map.graphics.add(myPositionGraphic);
            _this3.set('myPositionGraphic', myPositionGraphic);
          } else {
            //move the graphic if it already exists
            myPositionGraphic.setGeometry(myPos);
            map.graphics.add(myPositionGraphic);
          }
        });
      }
    },

    /**
     * Decides if it is needed to switch to the editMode or not
     * on map load and when editMode variable changes
     */
    onMapLoad: Ember['default'].on('mapLoaded', Ember['default'].observer('editMode', function () {
      var _this4 = this;

      var clickEvent = this.get('clickEvent');
      // If an event already exists, remove it
      if (clickEvent) {
        clickEvent.remove();
      }

      // Enter edit mode
      if (this.get('editMode')) {
        this.get('parcels.selectedParcels').clear();
        this.loadFullParcelsLayer();
        this.set('clickEvent', this.get('map').on('click', function (evt) {
          return _this4.editParcelEvent(evt);
        }));
        return;
        // Exit edit mode, remove full layer
      } else if (this.get('layersMap').get('parcelsLayer')) {
          this.get('map').removeLayer(this.get('layersMap').get('parcelsLayer'));
          this.get('layersMap')['delete']('parcelsLayer');
          this.liveReload();
        }
      // Default behavior while not editing
      this.set('clickEvent', this.get('map').on('click', function (evt) {
        return _this4.selectParcelEvent(evt);
      }));
    })),

    /**
     * When a parcel is selected / deselected, update map graphics
     */
    onParcelSelectionChange: Ember['default'].on('mapLoaded', Ember['default'].observer('parcels.selectedParcels.[]', function () {
      var parcelsCount = this.get('parcels.selectedParcels').length;
      var graphicsCount = this.get('selectedParcelsGraphics').size;

      if (graphicsCount < parcelsCount) {
        Ember['default'].run.once(this, 'addSelectedGraphics'); // Reduces cost from exponential to linear on multiple update
      } else if (graphicsCount > parcelsCount) {
          var userParcelsLayer = this.get('layersMap').get('userParcelsLayer');
          var selectedParcels = this.get('parcels.selectedParcels');
          var selectedParcelsGraphics = this.get('selectedParcelsGraphics');

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = selectedParcelsGraphics.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _step2$value = _slicedToArray(_step2.value, 2);

              var parcelId = _step2$value[0];
              var graphic = _step2$value[1];

              if (!selectedParcels.contains(parcelId)) {
                userParcelsLayer.remove(graphic);
                selectedParcelsGraphics['delete'](parcelId);
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                _iterator2['return']();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
    })),

    /**
     * Adds missing parcel graphics
     */
    addSelectedGraphics: function addSelectedGraphics() {
      var userParcelsLayer = this.get('layersMap').get('userParcelsLayer');
      var selectedParcels = this.get('parcels.selectedParcels');
      var selectedParcelsGraphics = this.get('selectedParcelsGraphics');

      var symbol = this.get('selectSymbol');
      userParcelsLayer.graphics.forEach(function (element) {
        var parcelId = element.attributes.PARCEL_ID;
        if (selectedParcels.contains(parcelId) && !selectedParcelsGraphics.has(parcelId)) {
          var selectedAttr = { 'PARCEL_ID': parcelId };
          selectedParcelsGraphics.set(parcelId, new Graphic['default'](element.geometry, symbol, selectedAttr));
          userParcelsLayer.add(selectedParcelsGraphics.get(parcelId));
        }
      });
      userParcelsLayer.refresh();
    }
  });

});
efineday('ermes-smart-app/components/jqm-anchor', ['exports', 'ember-jquery-mobile/components/jqm-anchor'], function (exports, jqm_anchor) {

	'use strict';



	exports['default'] = jqm_anchor['default'];

});
efineday('ermes-smart-app/components/jqm-btn-type', ['exports', 'ember-jquery-mobile/components/jqm-btn-type'], function (exports, jqm_btn_type) {

	'use strict';



	exports['default'] = jqm_btn_type['default'];

});
efineday('ermes-smart-app/components/jqm-button', ['exports', 'ember-jquery-mobile/components/jqm-button'], function (exports, jqm_button) {

	'use strict';



	exports['default'] = jqm_button['default'];

});
efineday('ermes-smart-app/components/jqm-collapsible', ['exports', 'ember-jquery-mobile/components/jqm-collapsible'], function (exports, jqm_collapsible) {

	'use strict';



	exports['default'] = jqm_collapsible['default'];

});
efineday('ermes-smart-app/components/jqm-collapsibleset', ['exports', 'ember-jquery-mobile/components/jqm-collapsibleset'], function (exports, jqm_collapsibleset) {

	'use strict';



	exports['default'] = jqm_collapsibleset['default'];

});
efineday('ermes-smart-app/components/jqm-component', ['exports', 'ember-jquery-mobile/components/jqm-component'], function (exports, jqm_component) {

	'use strict';



	exports['default'] = jqm_component['default'];

});
efineday('ermes-smart-app/components/jqm-content', ['exports', 'ember-jquery-mobile/components/jqm-content'], function (exports, jqm_content) {

	'use strict';



	exports['default'] = jqm_content['default'];

});
efineday('ermes-smart-app/components/jqm-datepicker', ['exports', 'ember-jquery-mobile/components/jqm-datepicker'], function (exports, jqm_datepicker) {

	'use strict';



	exports['default'] = jqm_datepicker['default'];

});
efineday('ermes-smart-app/components/jqm-fileinput', ['exports', 'ember-jquery-mobile/components/jqm-fileinput'], function (exports, jqm_fileinput) {

	'use strict';



	exports['default'] = jqm_fileinput['default'];

});
efineday('ermes-smart-app/components/jqm-footer', ['exports', 'ember-jquery-mobile/components/jqm-footer'], function (exports, jqm_footer) {

	'use strict';



	exports['default'] = jqm_footer['default'];

});
efineday('ermes-smart-app/components/jqm-header', ['exports', 'ember-jquery-mobile/components/jqm-header'], function (exports, jqm_header) {

	'use strict';



	exports['default'] = jqm_header['default'];

});
efineday('ermes-smart-app/components/jqm-listdivider', ['exports', 'ember-jquery-mobile/components/jqm-listdivider'], function (exports, jqm_listdivider) {

	'use strict';



	exports['default'] = jqm_listdivider['default'];

});
efineday('ermes-smart-app/components/jqm-listitem', ['exports', 'ember-jquery-mobile/components/jqm-listitem'], function (exports, jqm_listitem) {

	'use strict';



	exports['default'] = jqm_listitem['default'];

});
efineday('ermes-smart-app/components/jqm-listview', ['exports', 'ember-jquery-mobile/components/jqm-listview'], function (exports, jqm_listview) {

	'use strict';



	exports['default'] = jqm_listview['default'];

});
efineday('ermes-smart-app/components/jqm-olistview', ['exports', 'ember-jquery-mobile/components/jqm-olistview'], function (exports, jqm_olistview) {

	'use strict';



	exports['default'] = jqm_olistview['default'];

});
efineday('ermes-smart-app/components/jqm-page', ['exports', 'ember-jquery-mobile/components/jqm-page'], function (exports, jqm_page) {

	'use strict';



	exports['default'] = jqm_page['default'];

});
efineday('ermes-smart-app/components/jqm-panel', ['exports', 'ember-jquery-mobile/components/jqm-panel'], function (exports, jqm_panel) {

	'use strict';



	exports['default'] = jqm_panel['default'];

});
efineday('ermes-smart-app/components/jqm-popup', ['exports', 'ember-jquery-mobile/components/jqm-popup'], function (exports, jqm_popup) {

	'use strict';



	exports['default'] = jqm_popup['default'];

});
efineday('ermes-smart-app/components/jqm-select', ['exports', 'ember-jquery-mobile/components/jqm-select'], function (exports, jqm_select) {

	'use strict';



	exports['default'] = jqm_select['default'];

});
efineday('ermes-smart-app/components/jqm-slider', ['exports', 'ember-jquery-mobile/components/jqm-slider'], function (exports, jqm_slider) {

	'use strict';



	exports['default'] = jqm_slider['default'];

});
efineday('ermes-smart-app/components/jqm-textarea', ['exports', 'ember-jquery-mobile/components/jqm-textarea'], function (exports, jqm_textarea) {

	'use strict';



	exports['default'] = jqm_textarea['default'];

});
efineday('ermes-smart-app/components/jqm-textinput', ['exports', 'ember-jquery-mobile/components/jqm-textinput'], function (exports, jqm_textinput) {

	'use strict';



	exports['default'] = jqm_textinput['default'];

});
efineday('ermes-smart-app/components/jqm-toolbar', ['exports', 'ember-jquery-mobile/components/jqm-toolbar'], function (exports, jqm_toolbar) {

	'use strict';



	exports['default'] = jqm_toolbar['default'];

});
efineday('ermes-smart-app/components/jqm-ulistview', ['exports', 'ember-jquery-mobile/components/jqm-ulistview'], function (exports, jqm_ulistview) {

	'use strict';



	exports['default'] = jqm_ulistview['default'];

});
efineday('ermes-smart-app/controllers/application', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({});

});
efineday('ermes-smart-app/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
efineday('ermes-smart-app/controllers/index/about', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    panelId: 'about'
  });

});
efineday('ermes-smart-app/controllers/index/agrochemicals', ['exports', 'ember', 'ermes-smart-app/models/static/agrochemicals', 'ermes-smart-app/mixins/product-upload-rdate'], function (exports, Ember, dd, ProductUploadRDate) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend(ProductUploadRDate['default'], {
    panelId: 'agrochemicals',
    i18n: Ember['default'].inject.service(),
    products: Ember['default'].computed('i18n.locale', function () {
      return dd.getProducts(this);
    })
  });

});
efineday('ermes-smart-app/controllers/index/cannot-edit', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    actions: {
      dismiss: function dismiss() {
        this.transitionToRoute('index');
      }
    }
  });

});
efineday('ermes-smart-app/controllers/index/crop-info', ['exports', 'ember', 'ermes-smart-app/models/static/crop-info', 'ermes-smart-app/mixins/product-upload'], function (exports, Ember, dd, ProductUpload) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend(ProductUpload['default'], {
    panelId: 'crop-info',
    i18n: Ember['default'].inject.service(),
    cropTypes: Ember['default'].computed('i18n.locale', function () {
      return dd.getCropTypes(this);
    }),
    riceVarieties: Ember['default'].computed('i18n.locale', function () {
      return dd.getRiceVarieties(this);
    }),
    puddings: Ember['default'].computed('i18n.locale', function () {
      return dd.getPuddings(this);
    }),
    sowingPractices: Ember['default'].computed('i18n.locale', function () {
      return dd.getSowingPractices(this);
    }),

    notIsRice: Ember['default'].computed('model.cropType', function () {
      if (this.get('model.cropType') === 'rice') {
        return false;
      } else {
        this.get('model').setProperties({
          riceVariety: 'null',
          pudding: 'null',
          sowingPractice: 'null'
        });
        return true;
      }
    })
  });

});
efineday('ermes-smart-app/controllers/index/crop-phenology', ['exports', 'ember', 'ermes-smart-app/models/static/crop-phenology', 'ermes-smart-app/mixins/product-upload-rdate'], function (exports, Ember, dd, ProductUploadRDate) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend(ProductUploadRDate['default'], {
    panelId: 'crop-phenology',
    i18n: Ember['default'].inject.service(),
    developmentStages: Ember['default'].computed('i18n.locale', function () {
      return dd.getDevelopmentStages(this);
    }),
    phenologyGrowth: Ember['default'].computed('i18n.locale', function () {
      return dd.getPhenologyGrowth(this);
    }),
    phenologyCodes: Ember['default'].computed('i18n.locale', function () {
      return dd.getPhenologyCodes(this);
    }),
    actualPhenologyCodes: Ember['default'].computed('i18n.locale', 'model.growthStage', function () {
      var growth = this.get('model.growthStage');
      return this.get('phenologyCodes')['cod_' + growth];
    }),
    hasNoStage: Ember['default'].computed('model.growthStage', function () {
      return this.get('model.growthStage') === 'null';
    })
  });

});
efineday('ermes-smart-app/controllers/index/diseases', ['exports', 'ember', 'ermes-smart-app/models/static/diseases', 'ermes-smart-app/mixins/product-upload-rdate'], function (exports, Ember, dd, ProductUploadRDate) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend(ProductUploadRDate['default'], {
    panelId: 'diseases',
    i18n: Ember['default'].inject.service(),
    names: Ember['default'].computed('i18n.locale', function () {
      return dd.getNames(this);
    })
  });

});
efineday('ermes-smart-app/controllers/index/fertilizers', ['exports', 'ember', 'ermes-smart-app/models/static/fertilizers', 'ermes-smart-app/mixins/product-upload-rdate'], function (exports, Ember, dd, ProductUploadRDate) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend(ProductUploadRDate['default'], {
    panelId: 'fertilizers',
    i18n: Ember['default'].inject.service(),
    products: Ember['default'].computed('i18n.locale', function () {
      return dd.getProducts(this);
    })
  });

});
efineday('ermes-smart-app/controllers/index/irrigation', ['exports', 'ember', 'moment', 'ermes-smart-app/models/static/irrigation', 'ermes-smart-app/mixins/product-upload', 'ermes-smart-app/config/environment'], function (exports, Ember, Moment, dd, ProductUpload, config) {

  'use strict';

  var dFormat = config['default'].APP.defaultDateFormat;

  exports['default'] = Ember['default'].Controller.extend(ProductUpload['default'], {
    panelId: 'irrigation',
    i18n: Ember['default'].inject.service(),
    measures: Ember['default'].computed('i18n.locale', function () {
      return dd.getMeasures(this);
    }),
    hasMM: Ember['default'].computed('model.quantityOfWaterMeasure', function () {
      return this.get('model.quantityOfWaterMeasure') === 'mm';
    }),
    actions: {
      submit: function submit() {
        if (!this.get('model.startDate')) {
          this.set('startDateError', this.get('i18n').t('panel.notification.missing-start-date'));
        } else if (this.get('model.endDate') && new Moment['default'](this.get('model.endDate'), dFormat) < new Moment['default'](this.get('model.startDate'), dFormat)) {
          this.set('startDateError', '');
          this.set('endDateError', this.get('i18n').t('panel.notification.dates-inconsistency'));
        } else {
          this.set('startDateError', '');
          this.set('endDateError', '');
          this._super(this);
        }
      }
    }
  });

});
efineday('ermes-smart-app/controllers/index/observation', ['exports', 'ember', 'ermes-smart-app/mixins/product-upload'], function (exports, Ember, ProductUpload) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend(ProductUpload['default'], {
    panelId: 'observation',
    i18n: Ember['default'].inject.service(),
    actions: {
      submit: function submit() {
        if (!this.get('files')) {
          this.set('fileError', this.get('i18n').t('panel.notification.file-missing'));
        } else {
          this.set('fileError', '');
          // Manage file upload
          this._super(this);
        }
      }
    }
  });

});
efineday('ermes-smart-app/controllers/index/parcel-info', ['exports', 'ember', 'ermes-smart-app/models/static/products', 'ermes-smart-app/models/static/crop-info'], function (exports, Ember, dd, cInfo) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    panelId: 'parcel-info',
    i18n: Ember['default'].inject.service(),
    parcels: Ember['default'].inject.service(),
    productsNames: Ember['default'].computed('i18n.locale', function () {
      return dd.getProductsNames(this);
    }),
    cropTypes: Ember['default'].computed('i18n.locale', function () {
      return cInfo.getCropTypes(this);
    }),
    riceVarieties: Ember['default'].computed('i18n.locale', function () {
      return cInfo.getRiceVarieties(this);
    }),
    modelChange: Ember['default'].on('init', Ember['default'].observer('parcels.selectedParcels.[]', function () {
      var _this = this;

      this.set('loading', true);

      var selectedParcels = this.get('parcels.selectedParcels');
      if (selectedParcels.length === 1) {
        var parcel = selectedParcels.get('lastObject');
        this.store.findRecord('parcel', parcel).then(function (parcel) {
          _this.set('model', parcel);
          _this.set('loading', false);
        });
      } else {
        this.set('model', null); // Nº of parcels != 1, then decouple model
        this.set('loading', false);
      }
    })),
    cropInfo: Ember['default'].computed('model', 'i18n.locale', function () {
      if (this.get('model') && this.get('model.cropInfos').get('firstObject')) {
        var cropInfo = this.get('model.cropInfos').get('firstObject');
        var cropTypes = this.get('cropTypes');
        var riceVarieties = this.get('riceVarieties');
        return {
          cropType: cropInfo.get('cropType') ? cropTypes.findBy('value', cropInfo.get('cropType')).text : '----',
          riceVariety: cropInfo.get('riceVariety') ? riceVarieties.findBy('value', cropInfo.get('riceVariety')).text : '----'
        };
      } else {
        return {
          cropType: '----',
          riceVariety: '----'
        };
      }
    }),
    parcel: Ember['default'].computed('model', 'i18n.locale', function () {
      var model = this.get('model');
      var productsNames = this.get('productsNames');

      var parcel = [];
      model.eachRelationship(function (name, descriptor) {
        var product = model.get(name).get('firstObject');
        parcel.push({ name: productsNames.findBy('name', descriptor.type).text, lastDate: product ? product.get('uploadingDate') : '' });
      });
      return parcel;
    })
  });

});
efineday('ermes-smart-app/controllers/index/pathogens', ['exports', 'ember', 'ermes-smart-app/models/static/pathogens', 'ermes-smart-app/mixins/product-upload-rdate'], function (exports, Ember, dd, ProductUploadRDate) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend(ProductUploadRDate['default'], {
    panelId: 'pathogens',
    i18n: Ember['default'].inject.service(),
    names: Ember['default'].computed('i18n.locale', function () {
      return dd.getNames(this);
    })
  });

});
efineday('ermes-smart-app/controllers/index/profile', ['exports', 'ember', 'ermes-smart-app/models/static/regions'], function (exports, Ember, dd) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    panelId: 'profile',
    auth: Ember['default'].inject.service(),
    i18n: Ember['default'].inject.service(),
    languages: dd.getLanguajes(),
    newModel: Ember['default'].RSVP.hash({
      email: "",
      oldPass: "",
      newPass: "",
      rNewPass: ""
    }),
    actions: {
      submit: function submit() {
        var _this = this;

        var model = this.get('model');
        if (this.get('newModel.email')) {
          model.set('email', this.get('newModel.email'));
        }
        model.set('language', this.get('i18n.locale'));
        localStorage.lang = this.get('i18n.locale');
        this.set('info', this.get('i18n').t('panel.notification.processing'));
        model.save().then(function () {
          _this.set('info', _this.get('i18n').t('panel.notification.saved'));
          setTimeout(function () {
            return _this.set('info', '');
          }, 2000);
        }, function () {
          _this.set('info', '');
          _this.set('info', _this.get('i18n').t('panel.notification.offline-profile-update'));
          setTimeout(function () {
            return _this.set('info', '');
          }, 2000);
        });
      },
      logOut: function logOut() {
        this.get('auth').logOut();
        this.transitionToRoute('login');
      }
    }
  });

});
efineday('ermes-smart-app/controllers/index/soil-condition', ['exports', 'ember', 'ermes-smart-app/models/static/soil-condition', 'ermes-smart-app/mixins/product-upload'], function (exports, Ember, dd, ProductUpload) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend(ProductUpload['default'], {
    panelId: 'soil-condition',
    i18n: Ember['default'].inject.service(),
    parcelStatus: Ember['default'].computed('i18n.locale', function () {
      return dd.getParcelStatus(this);
    })
  });

});
efineday('ermes-smart-app/controllers/index/soil-type', ['exports', 'ember', 'ermes-smart-app/models/static/soil-type', 'ermes-smart-app/mixins/product-upload'], function (exports, Ember, dd, ProductUpload) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend(ProductUpload['default'], {
    panelId: 'soil-type',
    i18n: Ember['default'].inject.service(),
    soilTextures: Ember['default'].computed('i18n.locale', function () {
      return dd.getSoilTextures(this);
    })
  });

});
efineday('ermes-smart-app/controllers/index/weeds', ['exports', 'ember', 'ermes-smart-app/models/static/weeds', 'ermes-smart-app/mixins/product-upload-rdate'], function (exports, Ember, dd, ProductUploadRDate) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend(ProductUploadRDate['default'], {
    panelId: 'weeds',
    i18n: Ember['default'].inject.service(),
    names: Ember['default'].computed('i18n.locale', function () {
      return dd.getNames(this);
    })
  });

});
efineday('ermes-smart-app/controllers/index/welcome', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    actions: {
      dismiss: function dismiss() {
        this.transitionToRoute('index');
      }
    }
  });

});
efineday('ermes-smart-app/controllers/index/yield', ['exports', 'ember', 'ermes-smart-app/mixins/product-upload-rdate'], function (exports, Ember, ProductUploadRDate) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend(ProductUploadRDate['default'], {
    panelId: 'yield',
    i18n: Ember['default'].inject.service()
  });

});
efineday('ermes-smart-app/controllers/index-error', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    actions: {
      reconnect: function reconnect() {
        this.transitionToRoute('index');
      }
    }
  });

});
efineday('ermes-smart-app/controllers/index-loading', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({});

});
efineday('ermes-smart-app/controllers/index', ['exports', 'jquery', 'ember'], function (exports, $, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    i18n: Ember['default'].inject.service(),
    pageTitle: Ember['default'].computed('i18n.locale', function () {
      return this.get('i18n').t('fields.header.title');
    }),
    actions: {
      showPanel: function showPanel(name) {

        // If the action points to the same panel in which actually I am route to index instead
        var actionData = name.split('.');
        if (actionData[1] === this.get('openedPanel')) {
          this.set('openedPanel', 'none');
          this.transitionToRoute('index');
        } else {
          this.transitionToRoute(name);
        }
      },
      openPopup: function openPopup(popup) {
        $['default']('#' + popup).popup('open');
      },
      cannotEdit: function cannotEdit() {
        this.transitionToRoute('index.cannot-edit');
      }
    },
    init: function init() {
      this._super();
      document.title = this.get('pageTitle');
    }
  });

});
efineday('ermes-smart-app/controllers/login', ['exports', 'jquery', 'ember'], function (exports, $, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    auth: Ember['default'].inject.service(),
    actions: {
      openPopup: function openPopup(popup) {
        $['default']('#' + popup).popup('open');
      },
      logIn: function logIn() {
        // Check if another page was requested before this one
        var previous = this.get('previousTransition');
        if (previous) {
          this.set('previousTransition', null);
          previous.retry();
        } else {
          this.transitionToRoute('index');
        }
      },
      signUp: function signUp() {}
    }
  });

});
efineday('ermes-smart-app/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
efineday('ermes-smart-app/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, pluralize) {

	'use strict';

	exports['default'] = pluralize['default'];

});
efineday('ermes-smart-app/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, singularize) {

	'use strict';

	exports['default'] = singularize['default'];

});
efineday('ermes-smart-app/helpers/t', ['exports', 'ember-i18n/helper'], function (exports, helper) {

	'use strict';



	exports['default'] = helper['default'];

});
efineday('ermes-smart-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ermes-smart-app/config/environment'], function (exports, initializerFactory, config) {

  'use strict';

  exports['default'] = {
    name: 'App Version',
    initialize: initializerFactory['default'](config['default'].APP.name, config['default'].APP.version)
  };

});
efineday('ermes-smart-app/initializers/auth-init', ['exports'], function (exports) {

  'use strict';

  exports.initialize = initialize;

  function initialize(application) {
    application.inject('route', 'auth', 'service:auth');
  }

  exports['default'] = {
    name: 'auth-init',
    initialize: initialize
  };

});
efineday('ermes-smart-app/initializers/ember-i18n', ['exports', 'ermes-smart-app/instance-initializers/ember-i18n'], function (exports, instanceInitializer) {

  'use strict';

  exports['default'] = {
    name: instanceInitializer['default'].name,

    initialize: function initialize() {
      var application = arguments[1] || arguments[0]; // depending on Ember version
      if (application.instanceInitializer) {
        return;
      }

      instanceInitializer['default'].initialize(application);
    }
  };

});
efineday('ermes-smart-app/initializers/export-application-global', ['exports', 'ember', 'ermes-smart-app/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
efineday('ermes-smart-app/initializers/first', ['exports', 'jquery'], function (exports, $) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    $['default']("#loading-splash").remove();
  }

  exports['default'] = {
    name: 'first',
    initialize: initialize
  };

});
efineday('ermes-smart-app/initializers/in-app-livereload', ['exports', 'ermes-smart-app/config/environment', 'ember-cli-cordova/initializers/in-app-livereload'], function (exports, config, reloadInitializer) {

  'use strict';

  /* globals cordova */

  var inAppReload = reloadInitializer['default'].initialize;

  var initialize = function initialize(container, app) {
    if (typeof cordova === 'undefined' || config['default'].environment !== 'development' || config['default'].cordova && (!config['default'].cordova.liveReload || !config['default'].cordova.liveReload.enabled)) {
      return;
    }

    return inAppReload(container, app, config['default']);
  };

  exports['default'] = {
    name: 'cordova:in-app-livereload',
    initialize: initialize
  };

  exports.initialize = initialize;

});
efineday('ermes-smart-app/initializers/jqm-init', ['exports', 'ember-jquery-mobile/initializers/jqm-init'], function (exports, jqm_init) {

	'use strict';



	exports['default'] = jqm_init['default'];
	exports.initialize = jqm_init.initialize;

});
efineday('ermes-smart-app/initializers/parcels', ['exports'], function (exports) {

  'use strict';

  exports.initialize = initialize;

  function initialize(application) {
    application.inject('controller', 'parcels', 'service:parcels');
  }

  exports['default'] = {
    name: 'parcels',
    initialize: initialize
  };

});
efineday('ermes-smart-app/initializers/products-init', ['exports'], function (exports) {

  'use strict';

  exports.initialize = initialize;

  function initialize(application) {
    application.inject('route', 'products', 'service:products');
  }

  exports['default'] = {
    name: 'porducts-init',
    initialize: initialize
  };

});
efineday('ermes-smart-app/instance-initializers/ember-i18n', ['exports', 'ember', 'ember-i18n/legacy-helper', 'ermes-smart-app/config/environment'], function (exports, Ember, legacyHelper, ENV) {

  'use strict';

  exports['default'] = {
    name: 'ember-i18n',

    initialize: function initialize(instance) {
      if (legacyHelper['default'] != null) {
        Ember['default'].HTMLBars._registerHelper('t', legacyHelper['default']);
      }
    }
  };

});
efineday('ermes-smart-app/locales/en/config', ['exports'], function (exports) {

  'use strict';

  // Ember-I18n includes configuration for common locales. Most users
  // can safely delete this file. Use it if you need to override behavior
  // for a locale or efineday behavior for a locale that Ember-I18n
  // doesn't know about.
  exports['default'] = {
    // rtl: [true|FALSE],
    //
    // pluralForm: function(count) {
    //   if (count === 0) { return 'zero'; }
    //   if (count === 1) { return 'one'; }
    //   if (count === 2) { return 'two'; }
    //   if (count < 5) { return 'few'; }
    //   if (count >= 5) { return 'many'; }
    //   return 'other';
    // }
  };

});
efineday('ermes-smart-app/locales/en/translations', ['exports'], function (exports) {

  'use strict';

  exports['default'] = {
    //
    // WARNING! Translate only text between " " characters
    // It is important to avoid translating text between ' ' and {{ }}
    //
    // Please, try to use strings with a similar length to the original.
    // Use short synonyms as possible, always keeping the same meaning.
    // This is primordial to keep UI homogeneity.
    //
    // Thanks for your collaboration
    //

    'login': {
      'text': {
        'login': "Log in",
        'signup': "Sign up"
      },
      'login-p': {
        'username-f': "Enter username",
        'password-f': "Enter password",
        'login-btn': "Log in"
      },
      'signup-p': {
        'username-f': "Enter desired username",
        'password-f': "Your password",
        'repeat-password-f': "Repeat your password",
        'email-f': "Your email",
        'repeat-email-f': "Repeat your email",
        'signup-btn': "Sign up"
      }
    },
    'fields': {
      'text': {
        'my-fields': "My fields",
        'crop-info': "Crop Info",
        'soil-type': "Soil Type",
        'soil-condition': "Soil Condition",
        'crop-phenology': "Crop Phenology",
        'pathogens': "Pathogens",
        'diseases': "Diseases",
        'weeds': "Weeds",
        'fertilizers': "Fertilizers",
        'agrochemicals': "Agrochemicals",
        'irrigation': "Irrigation",
        'yield': "Yield",
        'observation': "Observation",
        'parcel-info': "Parcel Info",
        'add-new': "Add info"
      },
      'ui-special': {
        'agrochemicals': "Agro chemicals"
      },
      'header': {
        'title': "General View",
        'add-info-tooltip': "Add field(s) info",
        'observation-tooltip': "Add new observation",
        'options-tooltip': "User menu"
      },
      'map-tools': {
        'confirm-selection': "Add fields",
        'select-all': "Select all fields",
        'invert-selection': "Invert selected fields",
        'parcel-info': "Selected parcel info"
      },
      'options-m': {
        'title': "Hello, {{username}}",
        'profile': "My profile",
        'fields': "My fields",
        'about': "About"
      }
    },
    'panel': {
      'about': {
        'content': "Developed by GEOTEC group"
      },
      'agrochemicals': {
        'date': "Date of usage",
        'product': "Product",
        'quantity': "Quantity",
        'quantity-unit': "Kg/hectare"
      },
      'crop-info': {
        'crop-type': "Crop type",
        'rice-variety': "Rice variety",
        'pudding': 'Pudding',
        'sowing-practice': "Sowing practice",
        'date': 'Sowing date'
      },
      'crop-phenology': {
        'date': "Date of observation",
        'development-stage': "Development stage",
        'bbch': "BBCH"
      },
      'diseases': {
        'date': "Date of observation",
        'name': "Name",
        'comment': "Add a comment",
        'picture': "Add a picture",
        'damage': "Damage (1 min - 10 max)"
      },
      'fertilizers': {
        'date': "Date of usage",
        'product': "Product",
        'quantity': "Quantity",
        'quantity-unit': "Kg/hectare",
        'nitrogen': "Nitrogen content",
        'nitrogen-unit': "Kg/hectare",
        'phosphorus': "Phosphorus content",
        'phosphorus-unit': "Kg/hectare",
        'potassium': "Potassium content",
        'potassium-unit': "Kg/hectare"
      },
      'irrigation': {
        'start-date': "Start date",
        'end-date': "End date",
        'measure': "Measure",
        'quantity': "Quantity",
        'quantity-unit-mm': "Millimeters",
        'quantity-unit-m3': "Cubic meters",
        'hours': "Hours",
        'hours-unit': "Hours",
        'depth': "Water depth"
      },
      'observation': {
        'comment': "Add a comment",
        'picture': "Add a picture",
        'send-btn': "Send observation"
      },
      'pathogens': {
        'date': "Date of observation",
        'name': "Name",
        'comment': "Add a comment",
        'picture': "Add a picture",
        'damage': "Damage (1 min - 10 max)"
      },
      'soil-condition': {
        'status': "Parcel status",
        'date': "Date of observation"
      },
      'soil-type': {
        'texture': "Select the soil texture",
        'organic-matter': "Organic matter",
        'organic-matter-unit': "Percent organic matter",
        'ph': "Ph (min 0 - max 14)",
        'date': "Date"
      },
      'weeds': {
        'date': "Date of observation",
        'name': "Name",
        'comment': "Add a comment",
        'picture': "Add a picture",
        'damage': "Percent covered (1 min - 100 max)"
      },
      'yield': {
        'date': "Harvest date",
        'yield': "Yield (dry weight)",
        'yield-unit': "Ton/ha",
        'comments': "Comments"
      },
      'parcel-info': {
        'none-selected': "Please select one parcel",
        'crop-info-text': "Parcel crop information",
        'info-table-content': "Content",
        'product-text': "Last product upload dates",
        'product-table-product': "Product",
        'product-table-date': "Date"
      },
      'profile': {
        'picture-section': "Profile picture",
        'username-section': "Username",
        'email-section': "Email",
        'language-section': "Language",
        'email-tooltip': "Change email",
        'password-section': "Password",
        'old-password-tooltip': "Old password",
        'new-password-tooltip': "New password",
        'repeat-new-password-tooltip': "Repeat new password",
        'update': "Update profile",
        'logout': "Logout"
      },
      'notification': {
        'downloading-data': "Downloading data... {{count}} / {{total}}",
        'offline': "Connection lost",
        'online': "Connection established",
        'product-upload': "Uploading parcel info",
        'product-upload-later': "Offline. Product will be uploaded later",
        'login-error': "Wrong user or password",
        'password-mismatch': "Passwords don't match",
        'email-mismatch': "Emails don't match",
        'regional-error': "This is a regional account",
        'user-exits': "Sorry, that user already exists",
        'processing': "Processing...",
        'welcome': "Welcome, {{username}}",
        'login-allowed': "Now you can,",
        'missing-date': "Please fill date",
        'missing-parcel': "Please select at least one parcel",
        'missing-start-date': "Please fill start date",
        'dates-inconsistency': "End date must be greater than start date",
        'file-missing': "Please upload an image",
        'offline-parcels': "Sorry, you need to go online to add or delete parcels",
        'offline-profile-update': "Sorry, you cannot update your profile while offline",
        'no-data-offline': "Seems that you have lost your connection and we do not have any info stored about you on this device",
        'try-again': "You can try to",
        'reconnect': "Reconnect",
        'retrieving-info': "We are recovering your profile from our servers. Please wait...",
        'first-login': "Please select your parcels by clicking on them, and hit the check button in the right bottom corner when finished",
        'got-it': "Got it",
        'saved': "Saved"
      }
    },
    'region': {
      'greece': "Greece",
      'italy': "Italy",
      'spain': "Spain"
    },
    'data': {
      'crop-info': {
        'crop-types': {
          'alpha_alpha': "Alpha_alpha",
          'clover': "Clover",
          'corn': "Corn",
          'meadow': "Meadow",
          'poplar': "Poplar",
          'rice': "Rice",
          'set-aside': "Set-aside",
          'soybean': "Soybean"
        },
        'puddings': {
          'null': "----",
          'yes': "Yes",
          'no': "No"
        },
        'rice-varieties': {
          'null': "----",
          'alexandros': "Alexandros",
          'augusto': "Augusto",
          'axios': "Axios",
          'bomba': "Bomba",
          'carnaroli': "Carnaroli",
          'cl-12': "Cl 12",
          'cl-26': "Cl 26",
          'cl-46': "Cl 46",
          'cl-80': "Cl 80",
          'clxl745': "Clxl745",
          'dimitra': "Dimitra",
          'dion': "Dion",
          'ecco-61': "Ecco 61",
          'gladio': "Gladio",
          'gleva': "Gleva",
          'luna': "Luna",
          'mare-cl': "Mare cl",
          'olympiada': "Olympiada",
          'opale': "Opale",
          'ronaldo': "Ronaldo",
          'roxani': "Roxani",
          'selenio': "Selenio",
          'sirio-cl': "Sirio cl",
          'sole-cl': "Sole cl",
          'terra-cl': "Terra cl"
        },
        'sowing-practices': {
          'null': "----",
          'direct-seeding': "Direct seeding",
          'scattered-seeding': "Scattered seeding"
        }
      },
      'soil-type': {
        'soil-textures': {
          'clay': "Clay",
          'silt-clay': "Silt clay",
          'silt-clay-loam': "Silt clay loam",
          'medium-textured': "Medium textured"
        }
      },
      'soil-condition': {
        'parcel-status': {
          'bare-soil': "Bare soil",
          'plowed': "Plowed",
          'sowed': "Sowed",
          'flooded': "Flooded"
        }
      },
      'crop-phenology': {
        'development-stages': {
          'emergence': "Emergence",
          '2nd-leaf': "2nd leaf",
          '3rd-leaf': "3rd leaf",
          '4th-leaf': "4th leaf",
          'beginning-of-tillering': "Beginning of tillering",
          'panicle-initiation': "Panicle initiation",
          'heading': "Heading",
          'flowering': "Flowering",
          'maturity': "Maturity"
        },
        'phenology-growth': {
          'null': "Growth stage",
          '0': "0: germination",
          '1': "1: leaf development",
          '2': "2: tillering",
          '3': "3: stem elongation",
          '4': "4: booting",
          '5': "5: inflorescence emergence, heading",
          '6': "6: flowering, anthesis",
          '7': "7: development of fruit",
          '8': "8: ripening",
          '9': "9: senescence"
        },
        'phenology-codes': {
          'null': "Code",
          '0': "0: dry seed (caryopsis)",
          '1': "1: beginning of seed imbibition",
          '3': "3: seed imbibition complete (pigeon breast)",
          '5': "5: radicle emerged from caryopsis",
          '6': "6: radicle elongated, root hairs and/or side roots visible",
          '7': "7: coleoptile emerged from caryopsis (in water-rice this stage occurs before stage 05)",
          '9': "9: imperfect leaf emerges (still rolled) at the tip of the coleoptile",
          '10': "10: imperfect leaf unrolled, tip of first true leaf visible",
          '11': "11: first leaf unfolded",
          '12': "12: 2 leaves unfolded",
          '13': "13: 3 leaves unfolded",
          '14': "14: 4 leaves unfolded",
          '15': "15: 5 leaves unfolded",
          '16': "16: 6 leaves unfolded",
          '17': "17: 7 leaves unfolded",
          '18': "18: 8 leaves unfolded ",
          '19': "19: 9 or more leaves unfolded",
          '21': "21: beginning of tillering: first tiller detectable",
          '22': "22: 2 tillers detectable",
          '23': "23: 3 tillers detectable",
          '24': "24: 4 tillers detectable",
          '25': "25: 5 tillers detectable",
          '26': "26: 6 tillers detectable",
          '27': "27: 7 tillers detectable",
          '28': "28: 8 tillers detectable",
          '29': "29: maximum number of tillers detectable",
          '30': "30: panicle initiation or green ring stage: chlorophyll accumulates in the stem tissue, forming a green ring",
          '32': "32: panicle formation: panicle 1–2 mm in length (variety-dependent)",
          '34': "34: internode elongation or jointing stage: internodes begin to elongate, panicle more than 2 mm long",
          '37': "37: flag leaf just visible, still rolled, panicle moving upwards",
          '39': "39: flag leaf stage: flag leaf unfolded, collar regions (auricle and ligule) of flag leaf and penultimate leaf aligned (pre-boot stage)",
          '41': "41: early boot stage: upper part of stem slightly thickened, sheath of flag leaf about 5 cm out of penultimate",
          '43': "43: mid boot stage: sheath of flag leaf 5–10 cm out of the penultimate leaf sheath",
          '45': "45: late boot stage: flag leaf sheath swollen, sheath of flag leaf more than 10 cm out of penultimate leaf sheath",
          '47': "47: flag leaf sheath opening",
          '49': "49: flag leaf sheath open",
          '51': "51: beginning of panicle emergence: tip of inflorescence emerged from sheath",
          '52': "52: 20% of panicle emerged",
          '53': "53: 30% of panicle emerged",
          '54': "54: 40% of panicle emerged",
          '55': "55: middle of panicle emergence: neck node still in sheath",
          '56': "56: 60% of panicle emerged",
          '57': "57: 70% of panicle emerged",
          '58': "58: 80% of panicle emerged",
          '59': "59: end of panicle emergence: neck node level with the flag leaf auricle, anthers not yet visible",
          '61': "61: beginning of flowering: anthers visible at top of panicle",
          '65': "65: full flowering: anthers visible on most spikelets",
          '69': "69: end of flowering: all spikelets have completed flowering but some dehydrated anthers may remain",
          '71': "71: watery ripe: first grains have reached half their final size",
          '73': "73: early milk",
          '75': "75: medium milk: grain content milky",
          '77': "77: late milk",
          '83': "83: early dough",
          '85': "85: soft dough: grain content soft but dry, fingernail impression not held, grains and glumes still green",
          '87': "87: hard dough: grain content solid, fingernail impression held",
          '89': "89: fully ripe: grain hard, difficult to divide with thumbnail",
          '92': "92: over-ripe: grain very hard, cannot be dented by thumbnail",
          '97': "97: plant dead and collapsing ",
          '99': "99: harvested product"
        }
      },
      'pathogens': {
        'names': {
          'aphids': "Aphids",
          'lissorhoptrus-oryzophilus': "Lissorhoptrus oryzophilus",
          'nematods': "Nematods",
          'pomacea': "Pomacea"
        }
      },
      'diseases': {
        'names': {
          'bipolaris': "Bipolaris",
          'cercospora': "Cercospora",
          'fusarium': "Fusarium",
          'pyricularia-(blast)': "Pyricularia (blast)"
        }
      },
      'weeds': {
        'names': {
          'bidens': "Bidens",
          'ciperus-difformis': "Ciperus difformis",
          'echinochloa-crus-galli': "Echinochloa crus-galli",
          'heteranthera': "Heteranthera",
          'leersia-oryzoides': "Leersia oryzoides",
          'oryza-sativa': "Oryza sativa",
          'scirpus-maritimus': "Scirpus maritimus"
        }
      },
      'fertilizers': {
        'products': {
          'calcium-cyanamide': "Calcium cyanamide",
          'entec-26-(n+-k)': "Entec 26 (n+k)",
          'entec-46-(n+k)': "Entec 46 (n+k)",
          'flexammon': "Flexammon",
          'nitrophoska': "Nitrophoska",
          'novammon-(n+k)': "Novammon (n+k)",
          'organic': "Organic",
          'urea': "Urea",
          'utec-46-': "Utec 46 "
        }
      },
      'agrochemicals': {
        'products': {
          'bentazon': "Bentazon",
          'celest-syngenta-(fludioxonil)': "Celest syngenta (fludioxonil)",
          'mixed-product': "Mixed product",
          'oxodiazon': "Oxodiazon",
          'propanil': "Propanil",
          'pyretroids': "Pyretroids",
          'touchdown-syngenta-(glyphosate)': "Touchdown syngenta (glyphosate)"
        }
      },
      'irrigation': {
        'measures': {
          'mm': "mm/day",
          'm3': "m3/h"
        }
      }
    }
  };

});
efineday('ermes-smart-app/locales/es/config', ['exports'], function (exports) {

  'use strict';

  // Ember-I18n includes configuration for common locales. Most users
  // can safely delete this file. Use it if you need to override behavior
  // for a locale or efineday behavior for a locale that Ember-I18n
  // doesn't know about.
  exports['default'] = {
    // rtl: [true|FALSE],
    //
    // pluralForm: function(count) {
    //   if (count === 0) { return 'zero'; }
    //   if (count === 1) { return 'one'; }
    //   if (count === 2) { return 'two'; }
    //   if (count < 5) { return 'few'; }
    //   if (count >= 5) { return 'many'; }
    //   return 'other';
    // }
  };

});
efineday('ermes-smart-app/locales/es/translations', ['exports'], function (exports) {

  'use strict';

  exports['default'] = {
    //
    // WARNING! Translate only text between " " characters
    // It is important to avoid translating text between ' ' and {{ }}
    //
    // Please, try to use strings with a similar length to the original.
    // Use short synonyms as possible, always keeping the same meaning.
    // This is primordial to keep UI homogeneity.
    //
    // Thanks for your collaboration
    //

    'login': {
      'text': {
        'login': "Iniciar sesión",
        'signup': "Registrarse"
      },
      'login-p': {
        'username-f': "Usuario",
        'password-f': "Contraseña",
        'login-btn': "Entrar"
      },
      'signup-p': {
        'username-f': "Nombre de usuario",
        'password-f': "Tu contraseña",
        'repeat-password-f': "Repite tu contraseña",
        'email-f': "Tu email",
        'repeat-email-f': "Repite tu email",
        'signup-btn': "Registrarse"
      }
    },
    'fields': {
      'text': {
        'my-fields': "Mis parcelas",
        'crop-info': "Información de la cosecha",
        'soil-type': "Tipo de suelo",
        'soil-condition': "Estado del suelo",
        'crop-phenology': "Fenología del cultivo",
        'pathogens': "Patógenos",
        'diseases': "Enfermedades",
        'weeds': "Malas hierbas",
        'fertilizers': "Fertilizantes",
        'agrochemicals': "Pesticidas",
        'irrigation': "Riego",
        'yield': "Producción",
        'observation': "Observación",
        'parcel-info': "Parcela",
        'add-new': "Añadir información"
      },
      'ui-special': {
        'agrochemicals': "Pesticidas"
      },
      'header': {
        'title': "Visión General",
        'add-info-tooltip': "Añadir nueva información a el/los campo/s",
        'observation-tooltip': "Añadir una nueva observación",
        'options-tooltip': "Menú de usuario"
      },
      'map-tools': {
        'confirm-selection': "Añadir campos",
        'select-all': "Seleccionar todos los campos",
        'invert-selection': "Invertir la selección de campos",
        'parcel-info': "Información de la parcela seleccionada"
      },
      'options-m': {
        'title': "Hola, {{username}}",
        'profile': "Mi perfil",
        'fields': "Mis parcelas",
        'about': "Acerca de"
      }
    },
    'panel': {
      'about': {
        'content': "Desarrollado por GEOTEC"
      },
      'agrochemicals': {
        'date': "Fecha de uso",
        'product': "Producto",
        'quantity': "Cantidad",
        'quantity-unit': "Kg/hectárea"
      },
      'crop-info': {
        'crop-type': "Tipo de cultivo",
        'rice-variety': "Variedad de arroz",
        'pudding': "Mezcla",
        'sowing-practice': "Método de siembra",
        'date': "Fecha de siembra"
      },
      'crop-phenology': {
        'date': "Fecha de observación",
        'development-stage': "Etapa de desarrollo",
        'bbch': "BBCH"
      },
      'diseases': {
        'date': "Fecha de observación",
        'name': "Nombre",
        'comment': "Añadir un comentario",
        'picture': "Añadir una foto",
        'damage': "Daño (1 min - 10 max)"
      },
      'fertilizers': {
        'date': "Fecha de uso",
        'product': "Producto",
        'quantity': "Cantidad",
        'quantity-unit': "Kg/hectárea",
        'nitrogen': "Contenido en nitrógeno",
        'nitrogen-unit': "Kg/hectárea",
        'phosphorus': "Contenido en fósforo",
        'phosphorus-unit': "Kg/hectárea",
        'potassium': "Contenido en potasio",
        'potassium-unit': "Kg/hectárea"
      },
      'irrigation': {
        'start-date': "Fecha de inicio",
        'end-date': "Fecha de fin",
        'measure': "Medida",
        'quantity': "Cantidad",
        'quantity-unit-mm': "Milímetros",
        'quantity-unit-m3': "Metros cúbicos",
        'hours': "Horas",
        'hours-unit': "Horas",
        'depth': "Profundidad del agua"
      },
      'observation': {
        'comment': "Añadir un comentario",
        'picture': "Añadir una foto",
        'send-btn': "Enviar observación"
      },
      'pathogens': {
        'date': "Fecha de observación",
        'name': "Nombre",
        'comment': "Añadir un comentario",
        'picture': "Añadir una foto",
        'damage': "Daño (1 min - 10 max)"
      },
      'soil-condition': {
        'status': "Estado de la parcela",
        'date': "Fecha de observación"
      },
      'soil-type': {
        'texture': "Textura del suelo",
        'organic-matter': "Materia orgánica",
        'organic-matter-unit': "% de materia orgánica",
        'ph': "Ph (min 0 - max 14)",
        'date': "Fecha"
      },
      'weeds': {
        'date': "Fecha de observación",
        'name': "Nombre",
        'comment': "Añadir comentario",
        'picture': "Añadir foto",
        'damage': "% cubierto (1 min - 100 max)"
      },
      'yield': {
        'date': "Fecha de cosecha",
        'yield': "Cosecha (peso en seco)",
        'yield-unit': "Ton/ha",
        'comments': "Comentarios"
      },
      'parcel-info': {
        'none-selected': "Por favor selecciona una parcela",
        'crop-info-text': "Información de cultivo",
        'info-table-content': "Contenido",
        'product-text': "Última actualización de info.",
        'product-table-product': "Producto",
        'product-table-date': "Fecha"
      },
      'profile': {
        'picture-section': "Imagen de perfil",
        'username-section': "Usuario",
        'email-section': "Email",
        'language-section': "Idioma",
        'email-tooltip': "Cambiar email",
        'password-section': "Contraseña",
        'old-password-tooltip': "Contraseña antigua",
        'new-password-tooltip': "Contraseña nueva",
        'repeat-new-password-tooltip': "Repite la contraseña",
        'update': "Actualizar perfil",
        'logout': "Desconectar"
      },
      'notification': {
        'downloading-data': "Descargando datos...",
        'offline': "Conexión perdida",
        'online': "Conexión establecida",
        'product-upload': "Subiendo info. de parcela",
        'product-upload-later': "Sin conexión. El producto se subirá más tarde",
        'login-error': "Usuario o contraseña incorrectos",
        'password-mismatch': "Las contraseñas no coinciden",
        'email-mismatch': "Los emails no coinciden",
        'regional-error': "Esta es una cuenta regional",
        'user-exits': "Lo sentimos, ese usuario ya existe",
        'processing': "Procesando...",
        'welcome': "Bienvenido, {{username}}",
        'login-allowed': "Ahora puedes,",
        'missing-date': "Por favor, introduce una fecha",
        'missing-parcel': "Por favor, selecciona al menos una parcela",
        'missing-start-date': "Por favor, introduce la fecha inicial",
        'dates-inconsistency': "La fecha de fin debe ser mayor que la fecha de inicio",
        'file-missing': "Por favor, selecciona una imagen",
        'offline-parcels': "Lo sentimos, tienes que estar conectado para añadir o eliminar parcelas",
        'offline-profile-update': "Sorry, you cannot update your profile while offline",
        'no-data-offline': "Parece que has perdido tu conexión y nosotros no tenemos ninguna información tuya en este dispositivo",
        'try-again': "Puedes intentar",
        'reconnect': "Reconectar",
        'retrieving-info': "Estamos recuperando tu perfil de nuestros servidores. Por favor, espera...",
        'first-login': "Por favor, selecciona tus parcelas haciendo clic sobre ellas, haz clic en el botón de confirmación una vez hayas finalizado",
        'got-it': "Entendido",
        'saved': "Guardado"
      }
    },
    'region': {
      'greece': "Grecia",
      'italy': "Italia",
      'spain': "España"
    },
    'data': {
      'crop-info': {
        'crop-types': {
          'alpha_alpha': "Alpha_alpha",
          'clover': "Trébol",
          'corn': "Maíz",
          'meadow': "Prado",
          'poplar': "Álamo",
          'rice': "Arroz",
          'set-aside': "Barbecho",
          'soybean': "Soja"
        },
        'puddings': {
          'null': "----",
          'yes': "Sí",
          'no': "No"
        },
        'rice-varieties': {
          'null': "----",
          'alexandros': "Alexandros",
          'augusto': "Augusto",
          'axios': "Axios",
          'bomba': "Bomba",
          'carnaroli': "Carnaroli",
          'cl-12': "Cl 12",
          'cl-26': "Cl 26",
          'cl-46': "Cl 46",
          'cl-80': "Cl 80",
          'clxl745': "Clxl745",
          'dimitra': "Dimitra",
          'dion': "Dion",
          'ecco-61': "Ecco 61",
          'gladio': "Gladio",
          'gleva': "Gleva",
          'luna': "Luna",
          'mare-cl': "Mare cl",
          'olympiada': "Olympiada",
          'opale': "Opale",
          'ronaldo': "Ronaldo",
          'roxani': "Roxani",
          'selenio': "Selenio",
          'sirio-cl': "Sirio cl",
          'sole-cl': "Sole cl",
          'terra-cl': "Terra cl"
        },
        'sowing-practices': {
          'null': "----",
          'direct-seeding': "Siembra directa",
          'scattered-seeding': "Siembra al voleo"
        }
      },
      'soil-type': {
        'soil-textures': {
          'clay': "Arcilloso",
          'silt-clay': "Arcillo limoso",
          'silt-clay-loam': "Arcillo limosos franco",
          'medium-textured': "Texturas medias"
        }
      },
      'soil-condition': {
        'parcel-status': {
          'bare-soil': "Sin tratar",
          'plowed': "Arado",
          'sowed': "Sembrado",
          'flooded': "Inundado"
        }
      },
      'crop-phenology': {
        'development-stages': {
          'emergence': "Aparición",
          '2nd-leaf': "Segunda hoja",
          '3rd-leaf': "Tercera hoja",
          '4th-leaf': "Cuarta hoja",
          'beginning-of-tillering': "Inicio macollaje",
          'panicle-initiation': "Inicio panícula",
          'heading': "Espigamiento",
          'flowering': "Floración",
          'maturity': "Madurez"
        },
        'phenology-growth': {
          'null': "Etapa de crecimiento",
          '0': "0: germinación",
          '1': "1: desarrollo de las hojas (tallo principal)",
          '2': "2: formación de brotes laterales (ahijamiento)",
          '3': "3: encañado",
          '4': "4: hinchamiento de la panícula (embuchamiento)",
          '5': "5: salida de la panícula",
          '6': "6:  floración (tallo principal)",
          '7': "7: formación del fruto",
          '8': "8: maduración de frutos y semillas",
          '9': "9: senescencia"
        },
        'phenology-codes': {
          'null': "Código",
          '0': "0: semilla seca",
          '1': "1: comienza la imbibición de la semilla",
          '3': "3: imbibición completa de la semilla (pechuga de pichón)",
          '5': "5: Radícula (raíz embrional) emergida de la semilla",
          '6': "6: Radícula alargada, formando pelos radiculares y raíces secundarias",
          '7': "7: Coleóptilo, emergido de la semilla (en arroz en agua esta etapa precede a la etapa 5)",
          '9': "9: Una hoja imperfecta (enrollada) emerge en la punta del coleóptilo",
          '10': "10: Hoja imperfecta desenrollada, visible la punta de la primera hoja verdadera",
          '11': "11: primera hoja desplegada",
          '12': "12: 2 hojas desplegadas",
          '13': "13: 3 hojas desplegadas",
          '14': "14: 4 hojas desplegadas",
          '15': "15: 5 hojas desplegadas",
          '16': "16: 6 hojas desplegadas",
          '17': "17: 7 hojas desplegadas",
          '18': "18: 8 hojas desplegadas",
          '19': "19: 9 o más hojas desplegadas",
          '21': "21: Comienza el ahijamiento: es detectable el primer hijo",
          '22': "22: 2 hijos, detectables",
          '23': "23: 3 hijos, detectables",
          '24': "24: 4 hijos, detectables",
          '25': "25: 5 hijos, detectables",
          '26': "26: 6 hijos, detectables",
          '27': "27: 7 hijos, detectables",
          '28': "28: 8 hijos, detectables",
          '29': "29: Fin de ahijamiento; el máximo de hijos visibles o detectables",
          '30': "30: Iniciación de la panícula o estadio anillo verde: acumulación del clorofilo en el tejido de la caña, formando un anillo verde",
          '32': "32: Formación de la panícula: longitud de 1 a 2 mm",
          '34': "34: alargamiento de los entrenudos: los entrenudos comienzan a alargarse; panícula, de más de 2 mm de longitud (según variedad)",
          '37': "37: Aparece la hoja bandera, aún enrollada; panícula moviéndose hacia arriba",
          '39': "39: Estadio hoja bandera: hoja bandera, completamente desenrollada, las zonas del collar (lígula y aurícula) de la hoja bandera y de la penúltima hoja alineadas (estadio pre-hinchado)",
          '41': "41: Estadio hinchado temprano: la parte superior de la caña, ligeramente engrosada; la vaina de la hoja bandera, sobre 5 cm fuera de la penúltima vaina foliar",
          '43': "43: Estadio hinchado medio: la vaina de la hoja bandera, 5 a 10 cm fuera de la penúltima vaina foliar",
          '45': "45: Estadio hinchado tardío: la vaina de la hoja bandera, hinchada; vaina de la hoja bandera, 10 cm fuera de la penúltima hoja",
          '47': "47: Se empieza a abrir la vaina de la hoja bandera",
          '49': "49: Vaina de la hoja bandera, abierta",
          '51': "51: Comienzo de la emergencia de la panícula: el extremo de la inflorescencia emerge de la vaina",
          '52': "52: 20% de las panículas, emergidas",
          '53': "53: 30% de las panículas, emergidas",
          '54': "54: 40% de las panículas, emergidas",
          '55': "55: Mitad de la emergencia de las panículas: el nudo del cuello está todavía en la vaina",
          '56': "56: 60% de las panículas, emergidas",
          '57': "57: 70% de las panículas, emergidas",
          '58': "58: 80% de las panículas, emergidas",
          '59': "59: Fin de la salida de las panículas: el nudo del cuello coincide con la aurícula de la hoja bandera; las anteras no son visibles aún",
          '61': "61: Comienzo de la floración: anteras, visibles en lo alto de la panícula",
          '65': "65: Plena floración: anteras, visibles en la mayoría de las espiguillas",
          '69': "69: Fin de la floración: todas las espiguillas han terminado la floración, pero todavía pueden permanecer algunas anteras deshidratadas",
          '71': "71: Madurez acuosa: los primeros granos han alcanzado la mitad de su tamaño final",
          '73': "73: lechoso temprano",
          '75': "75: Lechoso medio: contenido del grano es lechoso",
          '77': "77: lechoso tardío",
          '83': "83: pastoso temprano",
          '85': "85: Pastoso blando: contenido del grano, blando, pero seco; no se mantiene la huella de la uña del dedo; granos y glumas, todavía verdes",
          '87': "87: Pastoso duro: contenido del grano sólido; se mantiene la huella de la uña del pulgar",
          '89': "89: Madurez completa: grano duro, difícil de dividir con la uña del pulgar",
          '92': "92: Sobre madurez: granos muy duros; no pueden ser mellados con la uña del pulgar",
          '97': "97: Planta muerta, tallos se quiebran",
          '99': "99: Partes cosechadas (estadio para señalar tratamientos de post-cosecha)"
        }
      },
      'pathogens': {
        'names': {
          'aphids': "Aphidoidea",
          'lissorhoptrus-oryzophilus': "Lissorhoptrus oryzophilus",
          'nematods': "Nematods",
          'pomacea': "Pomacea"
        }
      },
      'diseases': {
        'names': {
          'bipolaris': "Bipolaris",
          'cercospora': "Cercospora",
          'fusarium': "Fusarium",
          'pyricularia-(blast)': "Pyricularia (blast)"
        }
      },
      'weeds': {
        'names': {
          'bidens': "Bidens",
          'ciperus-difformis': "Ciperus difformis",
          'echinochloa-crus-galli': "Echinochloa crus-galli",
          'heteranthera': "Heteranthera",
          'leersia-oryzoides': "Leersia oryzoides",
          'oryza-sativa': "Oryza sativa",
          'scirpus-maritimus': "Scirpus maritimus"
        }
      },
      'fertilizers': {
        'products': {
          'calcium-cyanamide': "Calcium cyanamide",
          'entec-26-(n+-k)': "Entec 26 (n+k)",
          'entec-46-(n+k)': "Entec 46 (n+k)",
          'flexammon': "Flexammon",
          'nitrophoska': "Nitrophoska",
          'novammon-(n+k)': "Novammon (n+k)",
          'organic': "Orgánico",
          'urea': "Urea",
          'utec-46-': "Utec 46 "
        }
      },
      'agrochemicals': {
        'products': {
          'bentazon': "Bentazon",
          'celest-syngenta-(fludioxonil)': "Celest syngenta (fludioxonil)",
          'mixed-product': "Mezcla",
          'oxodiazon': "Oxodiazon",
          'propanil': "Propanil",
          'pyretroids': "Pyretroids",
          'touchdown-syngenta-(glyphosate)': "Touchdown syngenta (glyphosate)"
        }
      },
      'irrigation': {
        'measures': {
          'mm': "mm/día",
          'm3': "m3/ha"
        }
      }
    }
  };

});
efineday('ermes-smart-app/locales/gk/config', ['exports'], function (exports) {

  'use strict';

  // Ember-I18n includes configuration for common locales. Most users
  // can safely delete this file. Use it if you need to override behavior
  // for a locale or efineday behavior for a locale that Ember-I18n
  // doesn't know about.
  exports['default'] = {
    // rtl: [true|FALSE],
    //
    // pluralForm: function(count) {
    //   if (count === 0) { return 'zero'; }
    //   if (count === 1) { return 'one'; }
    //   if (count === 2) { return 'two'; }
    //   if (count < 5) { return 'few'; }
    //   if (count >= 5) { return 'many'; }
    //   return 'other';
    // }
  };

});
efineday('ermes-smart-app/locales/gk/translations', ['exports'], function (exports) {

  'use strict';

  exports['default'] = {

    // Please, translate ONLY the text between " " characters,
    // just replace the English string with the translation in your language.
    // Please DO NOT translate the text between ' ' and {{ }} !!

    // For example, in the following, you only need to translate "Log in" and "Sign up" (indiated with <---- below)

    // 'login': {
    //  'text': {
    //    'login': "Log in",  <----
    //    'signup': "Sign up" <----
    //  },

    // Your result would look as follows (for example, for the Spanish translation):

    // 'login': {
    //  'text': {
    //    'login': "Entrar",
    //    'signup': "Registrar"
    //  },

    // Please try to keep the strings as short as possible.
    // Please Always use the same translation for the same term (do not use synonyms).

    // Thanks for your collaboration!

    'login': {
      'text': {
        'login': "Σύνδεση",
        'signup': "Εγγραφή"
      },
      'login-p': {
        'username-f': "Εισάγεται όνομα χρήστη",
        'password-f': "Εισάγεται κωδικό πρόσβασης",
        'login-btn': "Σύνδεση"
      },
      'signup-p': {
        'username-f': "Εισάγεται το όνομα χρήστη που επιθυμείτε",
        'password-f': "Κωδικός πρόσβασης",
        'repeat-password-f': "Εισάγετε ξανά τον κωδικό πρόσβασης",
        'email-f': "Εισαγωγή email",
        'repeat-email-f': "Εισάγετε ξανά το email σας",
        'signup-btn': "Εγγραφή"
      }
    },
    'fields': {
      'text': {
        'my-fields': "Τα αγροτεμάχια μου",
        'crop-info': "Πληροφορίες καλλιέργειας",
        'soil-type': "Τύπος εδάφους",
        'soil-condition': "Κατάσταση εδάφους",
        'crop-phenology': "Στάδιο ανάπτυξης της καλλιέργειας",
        'pathogens': "Παθογόνα",
        'diseases': "Ασθένειες",
        'weeds': "Ζιζάνια",
        'fertilizers': "Λιπάσματα",
        'agrochemicals': "Αγροχημικά",
        'irrigation': "Άρδευση",
        'yield': "Παραγωγή / Απόδοση",
        'observation': "Παρατηρήσεις",
        'parcel-info': "Πληροφορίες Αγροτεμαχίου",
        'add-new': "Προσθέστε πληροφορίες"
      },
      'ui-special': {
        'agrochemicals': "Αγροχημικά"
      },
      'header': {
        'title': "Κεντρική σελίδα",
        'add-info-tooltip': "Προσθέστε πληροφορίες Αγροτεμαχίου(ών)",
        'observation-tooltip': "Προσθέστε νέα παρατήρηση",
        'options-tooltip': "Επιλογές χρήστη"
      },
      'map-tools': {
        'confirm-selection': "Add fields",
        'select-all': "Select all fields",
        'invert-selection': "Invert selected fields",
        'parcel-info': "Selected parcel info"
      },
      'options-m': {
        'title': "Γεια σας, {{username}}",
        'profile': "Το προφίλ μου",
        'fields': "Τα Αγροτεμάχια μου",
        'about': "Σχετικά με"
      }
    },
    'panel': {
      'about': {
        'content': "Δημιουργήθηκε από την ομάδα GEOTEC"
      },
      'agrochemicals': {
        'date': "Ημερομηνία εφαρμογής",
        'product': "Προϊόν",
        'quantity': "Ποσότητα",
        'quantity-unit': "Kg/εκτάριο"
      },
      'crop-info': {
        'crop-type': "Τύπος καλλιέργειας",
        'rice-variety': "Ποικιλία ρυζιού",
        'pudding': 'Ψιλοχωμάτισμα',
        'sowing-practice': "Τρόπος σποράς",
        'date': 'Ημερομηνία σποράς'
      },
      'crop-phenology': {
        'date': "Ημερομηνία παρατήρησης",
        'development-stage': "Στάδιο ανάπτυξης",
        'bbch': "BBCH"
      },
      'diseases': {
        'date': "Ημερομηνία παρατήρησης",
        'name': "Όνομα",
        'comment': "Προσθέστε σχόλιο",
        'picture': "Προσθέστε εικόνα",
        'damage': "Μέγεθος ζημίας από 1 (ελάχιστο) έως 10 (μέγιστο)"
      },
      'fertilizers': {
        'date': "Ημερομηνία εφαρμογής",
        'product': "Σκεύασμα",
        'quantity': "Ποσότητα",
        'quantity-unit': "κιλα / εκτάριο (1000στρ)",
        'nitrogen': "Περιεκτικότητα σε άζωτο",
        'nitrogen-unit': "κιλά/εκτάριο (1000 στρ)",
        'phosphorus': "Περιεκτικότητα σε φώσφορο",
        'phosphorus-unit': "κιλά/εκτάριο (1000στρ)",
        'potassium': "Περιεκτικότητα σε κάλιο",
        'potassium-unit': "κιλά/εκτάριο (1000στρ)"
      },
      'irrigation': {
        'start-date': "Ημερομηνία εκκίνησης",
        'end-date': "Τελευταία ημερομηνία άρδευσης",
        'measure': "Μέτρηση",
        'quantity': "Ποσότητα",
        'quantity-unit-mm': "Χιλιοστά",
        'quantity-unit-m3': "Κυβικά μέτρα",
        'hours': "Ώρες",
        'hours-unit': "Ώρες",
        'depth': "Ύψος νερού"
      },
      'observation': {
        'comment': "Προσθέστε σχόλιο",
        'picture': "Προσθέστε εικόνα",
        'send-btn': "Αποστολή παρατήρησης"
      },
      'pathogens': {
        'date': "Ημερομηνία παρατήρησης",
        'name': "Όνομα",
        'comment': "Προσθέστε σχόλιο",
        'picture': "Προσθέστε εικόνα",
        'damage': "Μέγεθος ζημίας από 1 (ελάχιστο) έως 10 (μέγιστο)"
      },
      'soil-condition': {
        'status': "Κατάσταση αγροτεμαχίου",
        'date': "Ημερομηνία παρατήρησης"
      },
      'soil-type': {
        'texture': "Επιλέξτε τη μηχανική σύσταση του εδάφους",
        'organic-matter': "Οργανική ουσία",
        'organic-matter-unit': "Ποσοστό οργανικής ουσίας",
        'ph': "pH (ελάχιστο 0 - μέγιστο 14)",
        'date': "Ημερομηνία"
      },
      'weeds': {
        'date': "Ημερομηνία παρατήρησης",
        'name': "Όνομα",
        'comment': "Προσθέστε σχόλιο",
        'picture': "Προσθέστε εικόνα",
        'damage': "Ποσοστό κάλυψης από 1 (έλάχιστο) έως 100 (μέγιστο)"
      },
      'yield': {
        'date': "Ημερομηνία συγκομιδής",
        'yield': "Απόδοση (βάρος ξηρής ουσίας)",
        'yield-unit': "τόνοι/εκτάριο (1000στρ)",
        'comments': "Σχόλια"
      },
      'parcel-info': {
        'none-selected': "Παρακαλώ επιλέξτε ένα αγροτεμάχιο",
        'crop-info-text': "Πληροφορίες καλλιέργειας αγροτεμαχίου",
        'info-table-content': "Περιεχόμενο",
        'product-text': "Τελευταιές ημερομηνίες εισαγωγής δεδομένων",
        'product-table-product': "Προϊόν",
        'product-table-date': "Ημερομηνία"
      },
      'profile': {
        'picture-section': "Φωτογραφία προφίλ",
        'username-section': "Όνομα χρήστη",
        'email-section': "Email",
        'language-section': "Γλώσσα / Language",
        'email-tooltip': "Αλλαγή email",
        'password-section': "Κωδικός πρόσβασης",
        'old-password-tooltip': "Παλιός κωδικός πρόσβασης",
        'new-password-tooltip': "Νέος κωδικός πρόσβασης",
        'repeat-new-password-tooltip': "Επαναλάβετε το νέο κωδικό πρόσβασης",
        'update': "Ενημέρωση προφίλ",
        'logout': "Αποσύνδεση"
      },
      'notification': {
        'downloading-data': "Λήψη δεδομένων...",
        'offline': "Απώλεια σύνδεσης",
        'online': "Σύνδεση",
        'product-upload': "Αποστολή πληροφοριών αγροτεμαχίου",
        'product-upload-later': "Εκτός σύνδεσης. Το προϊόν θα αποσταλεί αργότερα",
        'login-error': "Λάθος όνομα χρήστη ή κωδικός πρόσβασης",
        'password-mismatch': "Οι κωδικοί πρόσβασης δεν ταιριάζουν",
        'email-mismatch': "Τα email δεν ταιριάζουν",
        'regional-error': "Λογαριασμός χρήστη περιφεριακού επιπέδου",
        'user-exits': "Συγγνώμη, το όνoμα χρήστη που έχεται επιλέξει υπάρχει ήδη",
        'processing': "Επεργασία δεδομένων...",
        'welcome': "Καλώς ήρθατε, {{username}}",
        'login-allowed': "Τώρα μπορείτε να,",
        'missing-date': "Παρακαλώ συμπληρώστε την ημερομηνία",
        'missing-parcel': "Παρακαλώ επιλέξτε ένα αγροτεμάχιο",
        'missing-start-date': "Παρακαλώ επιλέξτε την αρχική ημερομηνία",
        'dates-inconsistency': "Η τελευταία ημερομηνία πρέπει να είναι πιό μετά απο την πρώτη ημερομηνία",
        'file-missing': "Παρακαλώ επιλέξτε μία εικόνα",
        'offline-parcels': "Συγγνώμη, πρέπει να συνδεθείτε στο διαδίκτυο για να προσθέστε ή να αφαιρέσετε αγροτεμάχια",
        'offline-profile-update': "Συγγνώμη, δεν μπορείτε να ενημερώσετε το προφίλ σας, ενώ είστε εκτός σύνδεσης",
        'no-data-offline': "Φαίνετε να έχει χαθεί η σύνδεση σας και δεν έχουμε αποθηκεύσει πληροφορίες για εσάς σε αυτήν την συσκευή",
        'try-again': "Τώρα μπορείτε να προσπαθήσετε να",
        'reconnect': "Επανασύνδεση",
        'retrieving-info': "Κάνουμε ανάκτηση του προφίλ σας απο τους διακομιστές μας. Παρακαλώ περιμένετε...",
        'first-login': "Παρακαλώ επιλέξτε τα αγροτεμάχια σας πατώντας πάνω τους, και πατήστε το πλήκτρο αποδοχής στην κάτω δεξιά γωνία όταν τελειώσετε",
        'got-it': "Το κατάλαβα",
        'saved': "Αποθηκεύτηκε"
      }
    },
    'region': {
      'greece': "Ελλάδα",
      'italy': "Ιταλία",
      'spain': "Ισπανία"
    },
    'data': {
      'crop-info': {
        'crop-types': {
          'alpha_alpha': "Μηδική",
          'clover': "Τριφύλλι",
          'corn': "Καλαμπόκι",
          'meadow': "Λιβάδι",
          'poplar': "Λεύκα",
          'rice': "Ρύζι",
          'set-aside': "Αγρανάπαυση",
          'soybean': "Σόγια"
        },
        'puddings': {
          'null': "----",
          'yes': "Ναι",
          'no': "Όχι"
        },
        'rice-varieties': {
          'null': "----",
          'alexandros': "Alexandros",
          'augusto': "Augusto",
          'axios': "Axios",
          'bomba': "Bomba",
          'carnaroli': "Carnaroli",
          'cl-12': "Cl 12",
          'cl-26': "Cl 26",
          'cl-46': "Cl 46",
          'cl-80': "Cl 80",
          'clxl745': "Clxl745",
          'dimitra': "Dimitra",
          'dion': "Dion",
          'ecco-61': "Ecco 61",
          'gladio': "Gladio",
          'gleva': "Gleva",
          'luna': "Luna",
          'mare-cl': "Mare cl",
          'olympiada': "Olympiada",
          'opale': "Opale",
          'ronaldo': "Ronaldo",
          'roxani': "Roxani",
          'selenio': "Selenio",
          'sirio-cl': "Sirio cl",
          'sole-cl': "Sole cl",
          'terra-cl': "Terra cl"
        },
        'sowing-practices': {
          'null': "----",
          'direct-seeding': "Direct seeding",
          'scattered-seeding': "Scattered seeding"
        }
      },
      'soil-type': {
        'soil-textures': {
          'clay': "Αργιλώδη",
          'silt-clay': "Ιλυοαργιλώδη",
          'silt-clay-loam': "Ιλυοαργιλοπηλώδη",
          'medium-textured': "Μέσης σύστασης"
        }
      },
      'soil-condition': {
        'parcel-status': {
          'bare-soil': "Γυμνό έδαφος",
          'plowed': "Οργωμένο",
          'sowed': "Σπαρμένο",
          'flooded': "Κατακλυσμένο"
        }
      },
      'crop-phenology': {
        'development-stages': {
          'emergence': "Βλάστηση",
          '2nd-leaf': "2ο φύλλο",
          '3rd-leaf': "3ο φύλλο",
          '4th-leaf': "4ο φύλλο",
          'beginning-of-tillering': "Έναρξη αδελφώματος",
          'panicle-initiation': "Έναρξη ξεσταχυάσματος",
          'heading': "Ξεστάχυασμα",
          'flowering': "Άνθηση",
          'maturity': "Ωρίμανση"
        },
        'phenology-growth': {
          'null': "Στάδιο ανάπτυξης",
          '0': "0: Φύτρωμα",
          '1': "1: Ανάπτυξη φυλλώματος",
          '2': "2: Αδέλφωμα",
          '3': "3: Επιμήκυνση στελέχους",
          '4': "4: Διόγκωση",
          '5': "5: Εμφάνιση ταξιανθίας, ξεστάχυασμα",
          '6': "6: Άνθηση",
          '7': "7: Γέμισμα κόκκου",
          '8': "8: Ωρίμανση καρπού",
          '9': "9: Γήρανση"
        },
        'phenology-codes': {
          'null': "Κωδικός",
          '0': "0: Ξηρός σπόρος (καρύοψη)",
          '1': "1: Έναρξη απορρόφησης νερού απο το σπόρο",
          '3': "3: Τέλος απορρόφησης νερού απο το σπόρο (στήθος περιστεριού)",
          '5': "5: Εμφάνιση ριζιδίου απο την καρύοψη",
          '6': "6: Επιμύκινση ριζιδίου, ριζικά τριχίδια και/ή πλευρικές ρίζες ορατές",
          '7': "7: Εμφάνιση της κολεοπτίλης απο την καρύοψη (στο ρύζι υπό κατάκλυση αυτό συμβαίνει πρίν απο το στάδιο 05)",
          '9': "9: Εμφάνιση ατελούς φύλλου (ακόμα είναι τυλιγμένο) στην κορυφή της κολεοπτίλης",
          '10': "10: Έκπτυξη ατελούς φύλλου, η κορυφή του πρώτου φύλλου είναι ορατή",
          '11': "11: Έκπτυξη του πρώτου φύλλου",
          '12': "12: Έκπτυξη 2 φύλλων",
          '13': "13: Έκπτυξη 3 φύλλων",
          '14': "14: Έκπτυξη 4 φύλλων",
          '15': "15: Έκπτυξη 5 φύλλων",
          '16': "16: Έκπτυξη 6 φύλλων",
          '17': "17: Έκπτυξη 7 φύλλων",
          '18': "18: Έκπτυξη 8 φύλλων",
          '19': "19: Έκπτυξη 9 ή περισσότερων φύλλων",
          '21': "21: Έναρξη αδελφώματος: το πρώτο αδέρφι",
          '22': "22: 2 αδέλφια",
          '23': "23: 3 αδέλφια",
          '24': "24: 4 αδέλφια",
          '25': "25: 5 αδέλφια",
          '26': "26: 6 αδέλφια",
          '27': "27: 7 αδέλφια",
          '28': "28: 8 αδέλφια",
          '29': "29: Μέγιστος αριθμός αδελφιών",
          '30': "30: Έναρξη ξεσταχυάσματος ή στάδιο του πράσινου δαχτυλιδιού: η χλωροφύλλη συγκεντρώνεται στους ιστούς του βλαστού, δημιουργώντας ένα πράσινο δαχτυλίδι",
          '32': "32: Μορφοποίηση φόβης: φόβη 1–2 mm σε μήκος (εξαρτάται απο την ποικιλία)",
          '34': "34: Επιμήκυνση των μεσογονάτιων διαστημάτων ή στάδιο σύνδεσης: τα μεσογονάτια διαστήματα αρχίζουν να επιμηκύνονται, η φόβη είναι πάνω από 2 χιλ",
          '37': "37: Το φύλλο σημαία είναι μόλις ορατό, δεν έχει επτυχθεί ακόμη, η φόβη κινείται προς τα επάνω",
          '39': "39: Στάδιο φύλλου σημαία: φύλλο σημαία σε πλήρη έκπτυξη, η περιοχή του κολάρου (ωτίδιο και γλωσσίδιο) του φύλλου σημαία και του προτελευταίου φύλλου ευθυγραμμίζονται (στάδιο πριν το γέμισμα της φόβης)",
          '41': "41: Αρχικό στάδιο γεμίσματος: το ανώτερο τμήμα του βλαστού είναι ελαφρώς διογκωμένο, ο κολεός του φύλλου σημαία εκτείνεται 5 εκ πάνω από το προτελευταίο φύλλο",
          '43': "43: Μέσο στάδιο γεμίσματος: ο κολεός του φύλλου σημαία εκτείνεται 5–10 εκ πάνω απο τον κολεό του προτελευταίου φύλλου",
          '45': "45: Τελευταίο στάδιο γεμίσματος: ο κολεός του φύλλου σημαία είναι διογκωμένος, ο κολεός του φύλλου σημαία εκτείνεται περισσότερο από 10 cm πάνω απο τον κολεό του προτελευταίου φύλλου",
          '47': "47: Ο κολεός του φύλλου σημαία ανοίγει",
          '49': "49: Ο κολεός του φύλλου σημαία είναι ανοικτός",
          '51': "51: Αρχή εμφάνισης της φόβης: η κορυφή της ανθήλης εμφανίστηκε απο τον κολεό",
          '52': "52: Το 20% της ταξιανθίας είναι εμφανές",
          '53': "53: Το 30% της ταξιανθίας είναι εμφανές",
          '54': "54: Το 40% της ταξιανθίας είναι εμφανές",
          '55': "55: Το μέσο της ταξιανθίας είνια εμφανές: το τμήμα του λαιμού της φόβης βρίσκεται ακόμα μέσα στον κολεό",
          '56': "56: Το 60% της ταξιανθίας είναι εμφανές",
          '57': "57: Το 70% της ταξιανθίας είναι εμφανές",
          '58': "58: Το 80% της ταξιανθίας είναι εμφανές",
          '59': "59: Πλήρης εμφάνιση της ταξιανθίας: το σημείο του λαιμού βρίσκεται στο ίδιο επίπεδο με τα ωτίδια του φύλλου σημαίας. Οι ανθήρες δεν είναι ακόμα ορατοί",
          '61': "61: Έναρξη άνθησης: οι ανθήρες είναι ορατοί στην κορυφή της ταξιανθίας",
          '65': "65: Πλήρης άνθηση: οι ανθήρες είναι ορατοί στα περισσότερα σταχύδια",
          '69': "69: Τέλος άνθησης: όλα τα σταχύδια έχουν ολοκληρώσει την άνθηση τους αλλά κάποιοι αφυδατωμένοι ανθήρες ίσως υπάρχουν ακόμα",
          '71': "71: Υδαρή ωρίμανση: οι πρώτοι σπόροι έχουν φτάσει στο μισό από το τελικό τους μέγεθος",
          '73': "73: Πρώϊμο στάδιο του γάλακτος",
          '75': "75: Μέσο στάδιο του γάλακτος: το εσωτερικό του σπόρου είναι γαλακτώδες",
          '77': "77: Τελευταίο στάδιο του γάλακτος",
          '83': "83: Στάδιο της πρώιμη μαλακής ζύμης",
          '85': "85: Στάδιο μαλακής ζύμης: το περιεχόμενο του σπόρου είναι μαλακό αλλά ξηρό, δεν κρατάει το αποτύπωμα του νυχιού, οι σπόροι και τα λέπιρα είναι ακόμα πράσινα",
          '87': "87: Στάδιο σκληρής ζύμης: το περιεχόμενο του σπόρου είναι στερεό, κρατάει το αποτύπωμα του νυχιού",
          '89': "89: Πλήρης ωρίμανση: ο σπόρος ειναι σκληρός, είναι δύσκολη η διαίρεση του με τον αντίχειρα",
          '92': "92: Υπέρ-ώριμο: ο σπόρος είναι πολύ σκληρός, δεν μπορεί να παραμορφωθεί με το νύχι του αντίχειρα",
          '97': "97: Το φυτό είναι νεκρό και πλαγιάζει",
          '99': "99: Συγκομισμένο προίόν"
        }
      },

      // Note: starting from here, scientific names have not been translated!

      'pathogens': {
        'names': {
          'aphids': "Αφίδες",
          'lissorhoptrus-oryzophilus': "Lissorhoptrus oryzophilus",
          'nematods': "Νηματώδη",
          'pomacea': "Σαλιγκαράκι"
        }
      },
      'diseases': {
        'names': {
          'bipolaris': "Ελμινθοσπόρια",
          'cercospora': "Κερκόσπορα",
          'fusarium': "Φουζάριο",
          'pyricularia-(blast)': "Πυρικουλάρια"
        }
      },
      'weeds': {
        'names': {
          'bidens': "Bidens",
          'ciperus-difformis': "Κύπερη",
          'echinochloa-crus-galli': "Μουχρίτσα",
          'heteranthera': "Ετερανθέρα",
          'leersia-oryzoides': "Leersia oryzoides",
          'oryza-sativa': "Κόκκινο ρύζι",
          'scirpus-maritimus': "Ραγάζι"
        }
      },
      'fertilizers': {
        'products': {
          'calcium-cyanamide': "Calcium cyanamide",
          'entec-26-(n+-k)': "Entec 26 (n+k)",
          'entec-46-(n+k)': "Entec 46 (n+k)",
          'flexammon': "Flexammon",
          'nitrophoska': "Nitrophoska",
          'novammon-(n+k)': "Novammon (n+k)",
          'organic': "Organic",
          'urea': "Urea",
          'utec-46-': "Utec 46 "
        }
      },
      'agrochemicals': {
        'products': {
          'bentazon': "Bentazon",
          'celest-syngenta-(fludioxonil)': "Celest syngenta (fludioxonil)",
          'mixed-product': "Mixed product",
          'oxodiazon': "Oxodiazon",
          'propanil': "Propanil",
          'pyretroids': "Pyretroids",
          'touchdown-syngenta-(glyphosate)': "Touchdown syngenta (glyphosate)"
        }
      },
      'irrigation': {
        'measures': {
          'mm': "mm/day",
          'm3': "m3/h"
        }
      }
    }
  };

});
efineday('ermes-smart-app/locales/it/config', ['exports'], function (exports) {

  'use strict';

  // Ember-I18n includes configuration for common locales. Most users
  // can safely delete this file. Use it if you need to override behavior
  // for a locale or efineday behavior for a locale that Ember-I18n
  // doesn't know about.
  exports['default'] = {
    // rtl: [true|FALSE],
    //
    // pluralForm: function(count) {
    //   if (count === 0) { return 'zero'; }
    //   if (count === 1) { return 'one'; }
    //   if (count === 2) { return 'two'; }
    //   if (count < 5) { return 'few'; }
    //   if (count >= 5) { return 'many'; }
    //   return 'other';
    // }
  };

});
efineday('ermes-smart-app/locales/it/translations', ['exports'], function (exports) {

  'use strict';

  exports['default'] = {

    // Please, translate ONLY the text between " " characters,
    // just replace the English string with the translation in your language.
    // Please DO NOT translate the text between ' ' and {{ }} !!

    // For example, in the following, you only need to translate "Log in" and "Sign up" (indiated with <---- below)

    // 'login': {
    //  'text': {
    //    'login': "Log in",  <----
    //    'signup': "Sign up" <----
    //  },

    // Your result would look as follows (for example, for the Spanish translation):

    // 'login': {
    //  'text': {
    //    'login': "Entrar",
    //    'signup': "Registrar"
    //  },

    // Please try to keep the strings as short as possible.
    // Please Always use the same translation for the same term (do not use synonyms).

    // Thanks for your collaboration!

    'login': {
      'text': {
        'login': "Entra",
        'signup': "Registrati"
      },
      'login-p': {
        'username-f': "Nome Utente",
        'password-f': "Password",
        'login-btn': "Entra"
      },
      'signup-p': {
        'username-f': "Scegli Nome Utente",
        'password-f': "Scegli password",
        'repeat-password-f': "Ripeti password",
        'email-f': "Indirizzo email",
        'repeat-email-f': "Ripeti Indirizzo email",
        'signup-btn': "Registrati"
      }
    },
    'fields': {
      'text': {
        'my-fields': "I miei campi",
        'crop-info': "Informazioni Coltura",
        'soil-type': "Tipo di suolo",
        'soil-condition': "Condizioni Suolo",
        'crop-phenology': "Fenologia",
        'pathogens': "Patogeni",
        'diseases': "Malattie",
        'weeds': "Infestanti",
        'fertilizers': "Fertilizzazioni",
        'agrochemicals': "Trattamenti",
        'irrigation': "Irrigazione",
        'yield': "Resa",
        'observation': "Osservazioni",
        'parcel-info': "Informazioni sulla parcella",
        'add-new': "IAggiungi Dati"
      },
      'ui-special': {
        'agrochemicals': "Trattamenti"
      },
      'header': {
        'title': "Vista Generale",
        'add-info-tooltip': "Aggiungi dati per i tuoi campi",
        'observation-tooltip': "Aggiungi un'osservazione",
        'options-tooltip': "Menu utente"
      },
      'map-tools': {
        'confirm-selection': "Aggiungi campi",
        'select-all': "Seleziona tutti i campi",
        'invert-selection': "Inverti la selezione",
        'parcel-info': "Info su campo selezionato"
      },
      'options-m': {
        'title': "Ciao, {{username}}",
        'profile': "Il mio profilo",
        'fields': "I miei campi",
        'about': "Info"
      }
    },
    'panel': {
      'about': {
        'content': "Sviluppato da GEOTEC group"
      },
      'agrochemicals': {
        'date': "Data Trattamento",
        'product': "Prodotto",
        'quantity': "Quantità",
        'quantity-unit': "Kg/ettaro"
      },
      'crop-info': {
        'crop-type': "Tipo Coltura",
        'rice-variety': "Varietà Riso",
        'pudding': 'Pudding',
        'sowing-practice': "Metodo di semina",
        'date': 'Data di semina'
      },
      'crop-phenology': {
        'date': "Data osservazione",
        'development-stage': "Stadio di sviluppo",
        'bbch': "BBCH"
      },
      'diseases': {
        'date': "Data Osservazione",
        'name': "Nome",
        'comment': "Aggiungi Commento",
        'picture': "Aggiungi Foto",
        'damage': "Danno (1 min - 10 max)"
      },
      'fertilizers': {
        'date': "Data Trattamento",
        'product': "Prodotto",
        'quantity': "Quantità",
        'quantity-unit': "Kg/ettaro",
        'nitrogen': "Contenuto in Azoto",
        'nitrogen-unit': "Kg/ettaro",
        'phosphorus': "Contenuto in Fosforo",
        'phosphorus-unit': "Kg/ettaro",
        'potassium': "Contenuto in Potassio",
        'potassium-unit': "Kg/ettaro"
      },
      'irrigation': {
        'start-date': "Data Inizio",
        'end-date': "Data Fine",
        'measure': "Unità Misura",
        'quantity': "Quantità",
        'quantity-unit-mm': "Millimetri",
        'quantity-unit-m3': "Metri Cubi",
        'hours': "Ore",
        'hours-unit': "Ore",
        'depth': "Altezza Acqua"
      },
      'observation': {
        'comment': "Aggiungi Commento",
        'picture': "Aggiungi Foto",
        'send-btn': "Invia Osservazione"
      },
      'pathogens': {
        'date': "Data Osservazione",
        'name': "Nome",
        'comment': "Aggiungi Commento",
        'picture': "Aggiungi Foto",
        'damage': "Danno (1 min - 10 max)"
      },
      'soil-condition': {
        'status': "Stato del campo",
        'date': "Data Osservazione"
      },
      'soil-type': {
        'texture': "Seleziona la tessitura",
        'organic-matter': "Sostanza Organica",
        'organic-matter-unit': "Percentuale Sostanza Organica",
        'ph': "Ph (min 0 - max 14)",
        'date': "Data"
      },
      'weeds': {
        'date': "Data Osservazione",
        'name': "Nome",
        'comment': "Aggiungi Commento",
        'picture': "Aggiungi Foto",
        'damage': "Percentuale di copertura (1 min - 100 max)"
      },
      'yield': {
        'date': "Data Raccolto",
        'yield': "Resa (peso secco)",
        'yield-unit': "Ton/ha",
        'comments': "Commenti"
      },
      'parcel-info': {
        'none-selected': "Seleziona una parcella",
        'crop-info-text': "Informazioni parcella",
        'info-table-content': "Contenuto",
        'product-text': "Ultime date di aggiornamento",
        'product-table-product': "Prodotto",
        'product-table-date': "Data"
      },
      'profile': {
        'picture-section': "Immagine Profilo",
        'username-section': "Nome Utente",
        'email-section': "Email",
        'language-section': "Lingua/Language",
        'email-tooltip': "Cambia email",
        'password-section': "Password",
        'old-password-tooltip': "Vecchia password",
        'new-password-tooltip': "Nuova password",
        'repeat-new-password-tooltip': "Ripeti Nuova password",
        'update': "Aggiorna profilo",
        'logout': "Esci"
      },
      'notification': {
        'downloading-data': "Scaricamento dati...",
        'offline': "Connessione persa",
        'online': "Connessione stabilita",
        'product-upload': "Caricamento info parcelle",
        'product-upload-later': "Sei Offline. I dati verranno caricati più tardi",
        'login-error': "Nome Utente o Password errata",
        'password-mismatch': "Le password non coincidono",
        'email-mismatch': "Le email non coincidono",
        'regional-error': "Questo é un account ERMES regionale",
        'user-exits': "Utente già esistente",
        'processing': "Elaborazione...",
        'welcome': "Benvenuto, {{username}}",
        'login-allowed': "Ora puoi,",
        'missing-date': "Inserisci una data",
        'missing-parcel': "Selezionare almeno una parcella",
        'missing-start-date': "Inserire la data di inizio",
        'dates-inconsistency': "La data finale deve essere successiva alla data di inizio",
        'file-missing': "Allega un'immagine, per favore",
        'offline-parcels': "Spiacenti, devi essere on-line per aggiungere o cancellare parcelle",
        'offline-profile-update': "Spiacenti, devi essere on-line per modificare il tuo profilo",
        'no-data-offline': "Sembra che tu abbia perso la connessione e non ci sono dati salvati su questo device",
        'try-again': "Ora puoi provare a ",
        'reconnect': "Riconnetterti",
        'retrieving-info': "Stiamo recuperando il tuo profilo dal server. Attendi...",
        'first-login': "Seleziona le tue parcelle cliccandoci sopra,.Premi il pulsante nell'angolo in basso a destra quando hai finito. ",
        'got-it': "Fatto",
        'saved': "Salvato"
      }
    },
    'region': {
      'greece': "Grecia",
      'italy': "Italia",
      'spain': "Spagna"
    },
    'data': {
      'crop-info': {
        'crop-types': {
          'alpha_alpha': "Erba Medica",
          'clover': "Trifoglio",
          'corn': "Mais",
          'meadow': "Prato",
          'poplar': "Pioppo",
          'rice': "Riso",
          'set-aside': "Riposo",
          'soybean': "Soia"
        },
        'puddings': {
          'null': "----",
          'yes': "Si",
          'no': "No"
        },
        'rice-varieties': {
          'null': "----",
          'alexandros': "Alexandros",
          'augusto': "Augusto",
          'axios': "Axios",
          'bomba': "Bomba",
          'carnaroli': "Carnaroli",
          'cl-12': "Cl 12",
          'cl-26': "Cl 26",
          'cl-46': "Cl 46",
          'cl-80': "Cl 80",
          'clxl745': "Clxl745",
          'dimitra': "Dimitra",
          'dion': "Dion",
          'ecco-61': "Ecco 61",
          'gladio': "Gladio",
          'gleva': "Gleva",
          'luna': "Luna",
          'mare-cl': "Mare cl",
          'olympiada': "Olympiada",
          'opale': "Opale",
          'ronaldo': "Ronaldo",
          'roxani': "Roxani",
          'selenio': "Selenio",
          'sirio-cl': "Sirio cl",
          'sole-cl': "Sole cl",
          'terra-cl': "Terra cl"
        },
        'sowing-practices': {
          'null': "----",
          'direct-seeding': "In Asciutta",
          'scattered-seeding': "In Acqua"
        }
      },
      'soil-type': {
        'soil-textures': {
          'clay': "Argilloso",
          'silt-clay': "Argilloso-Sabbioso",
          'silt-clay-loam': "Argilloso-Limoso-Sabbioso",
          'medium-textured': "Media Tessitura"
        }
      },
      'soil-condition': {
        'parcel-status': {
          'bare-soil': "Suolo Nudo",
          'plowed': "Arato",
          'sowed': "Seminato",
          'flooded': "Inondato"
        }
      },
      'crop-phenology': {
        'development-stages': {
          'emergence': "Emergenza",
          '2nd-leaf': "2nda foglia",
          '3rd-leaf': "3rd foglia",
          '4th-leaf': "4th foglia",
          'beginning-of-tillering': "Inizio Accestimento",
          'panicle-initiation': "Inizializzazione Pannocchia",
          'heading': "Levata",
          'flowering': "Fioritura",
          'maturity': "Maturità "
        },
        'phenology-growth': {
          'null': "Stadio Crescita",
          '0': "0: Germinazione",
          '1': "1: Sviluppo fogliare",
          '2': "2: Accestimento",
          '3': "3: Allungamento fusto ",
          '4': "4: Botticella",
          '5': "5: Emergenza infiorescenza, spigatura",
          '6': "6: Fioritura, antesi",
          '7': "7: Sviluppo dei frutti",
          '8': "8: Maturazione",
          '9': "9: Senescenza"
        },
        'phenology-codes': {
          'null': "Codice",
          '0': "0: Seme asciutto",
          '1': "1: Inizio imbibizione",
          '3': "3: Imbibizione completa",
          '5': "5: Emergenza radichetta",
          '6': "6: Allungamento radice, formazione peli radicali e/o radici laterali",
          '7': "7: Emersione coleoptile dalla cariosside (con semina in immersione avviene prima dello stadio 05)",
          '9': "9: Foglie imperfette emergono (ancora arrotolate) alla punta del coleoptile",
          '10': "10: Prima foglia imperfetta dispiegata, punta della prima foglia vera visibile",
          '11': "11: Prima foglia dispiegata",
          '12': "12: 2 Foglie dispiegate",
          '13': "13: 3 Foglie dispiegate",
          '14': "14: 4 Foglie dispiegate",
          '15': "15: 5 Foglie dispiegate",
          '16': "16: 6 Foglie dispiegate",
          '17': "17: 7 Foglie dispiegate",
          '18': "18: 8 Foglie dispiegate",
          '19': "19: 9 o più Foglie dispiegate",
          '21': "21: Inizio accestimento: primo fusto d’accestimento visibile",
          '22': "22: 2 Fusti d’accestimento visibili",
          '23': "23: 3 Fusti d’accestimento visibili",
          '24': "24: 4 Fusti d’accestimento visibili",
          '25': "25: 5 Fusti d’accestimento visibili",
          '26': "26: 6 Fusti d’accestimento visibili",
          '27': "27: 7 Fusti d’accestimento visibili",
          '28': "28: 8 Fusti d’accestimento visibili",
          '29': "29: Massimo numero di fusti d’accestimento visibili",
          '30': "30: Inizio formazione della pannocchia o stadio dell’anello verde: la clorofilla accumulata nei tessuti del fusto forma un anello verde",
          '32': "32: Formazione della pannocchia: 1-2 mm in lunghezza",
          '34': "34: Allungamento internodi o fase di congiungimento: gli internodi cominciano ad allungarsi, pannocchia lunga più di 2 mm",
          '37': "37: Foglia a bandiera visibile, ancora arrotolata, pannocchia muove verso l’alto",
          '39': "39: Stadio di foglia a bandiera: foglia a bandiera completamente srotolata, auricole e ligula visibile",
          '41': "41: Inizio stadio di botticella: la parte superiore del fusto si ispessisce un po', guaina della foglia bandiera circa 5 centimetri fuori dalla guaina della penultima foglia ",
          '43': "43: Stadio di botticella medio: guaina della foglia a bandiera 5-10 cm fuori dalla guaina della penultima foglia",
          '45': "45: Fine stadio di botticella: guaina della foglia a bandiera gonfia, guaina della foglia a bandiera almeno 10 cm fuori dalla guaina della penultima foglia",
          '47': "47: Apertura della guaina della foglia a bandiera",
          '49': "49: Guaina della foglia a bandiera aperta",
          '51': "51: Inizio emergenza pannocchia: punta dell’infiorescenza emersa dalla guaina",
          '52': "52: 20% dell’infiorescenza emersa",
          '53': "53: 30% dell’infiorescenza emersa",
          '54': "54: 40% dell’infiorescenza emersa",
          '55': "55: Metà dell’infiorescenza emersa (metà spigatura)",
          '56': "56: 60% dell’infiorescenza emersa",
          '57': "57: 70% dell’infiorescenza emersa",
          '58': "58: 80% dell’infiorescenza emersa",
          '59': "59: Fine spigatura (antere non ancora visibili)",
          '61': "61: Inizio fioritura: prime antere visibili al top della pannocchia",
          '65': "65: Piena fioritura: antere visibili sulla maggior parte delle spighette ",
          '69': "69: Piena fioritura: antere visibili sulla maggior parte delle spighette",
          '71': "71: Cariossidi in maturazione acquosa, i primi chicchi hanno raggiunto la metà della taglia finale",
          '73': "73: Inizio maturazione lattea",
          '75': "75: Maturazione lattea media: consistenza lattea",
          '77': "77: Fine maturazione lattea",
          '83': "83: Inizio maturazione cerosa",
          '85': "85: maturazione cerosa soffice, chicchi soffici ma secchi, il segno dell’unghia non rimane, grani e glume ancora verdi",
          '87': "87: Maturazione cerosa avanzata: contenuto dei chicchi solido, il segno dell’unghia rimane",
          '89': "89: Piena maturazione: difficoltà a dividere i chicchi con l’unghia del pollice",
          '92': "92: Sovra-maturazione: chicchi duri, non possono essere scalfiti con l’unghia del pollice",
          '97': "97: Piante morte",
          '99': "99: Prodotto Raccolto"
        }
      },

      // Note: starting from here, scientific names have not been translated!

      'pathogens': {
        'names': {
          'aphids': "Afidi",
          'lissorhoptrus-oryzophilus': "Punteruolo",
          'nematods': "Nematodi",
          'pomacea': "Pomacea"
        }
      },
      'diseases': {
        'names': {
          'bipolaris': "Bipolaris",
          'cercospora': "Cercospora",
          'fusarium': "Fusarium",
          'pyricularia-(blast)': "Brusone"
        }
      },
      'weeds': {
        'names': {
          'bidens': "Bidens",
          'ciperus-difformis': "Ciperus (Zigolo)",
          'echinochloa-crus-galli': "Giavone",
          'heteranthera': "Heteranthera",
          'leersia-oryzoides': "Leersia (riso selvatico)",
          'oryza-sativa': "Riso Crodo",
          'scirpus-maritimus': "Scirpus (Cipollino, Lisca marittima)"
        }
      },
      'fertilizers': {
        'products': {
          'calcium-cyanamide': "Calcium cyanamide",
          'entec-26-(n+-k)': "Entec 26 (n+k)",
          'entec-46-(n+k)': "Entec 46 (n+k)",
          'flexammon': "Flexammon",
          'nitrophoska': "Nitrophoska",
          'novammon-(n+k)': "Novammon (n+k)",
          'organic': "Organico",
          'urea': "Urea",
          'utec-46-': "Utec 46 "
        }
      },
      'agrochemicals': {
        'products': {
          'bentazon': "Bentazone",
          'tryciclazol': "Triciclazolo (BEAM)",
          'celest-syngenta-(fludioxonil)': "Celest syngenta (fludioxonil)",
          'mixed-product': "Prodotto misto",
          'oxodiazon': "Oxodiazone",
          'propanil': "Propanile",
          'pyretroids': "Pyretroidi",
          'touchdown-syngenta-(glyphosate)': "Touchdown syngenta (glyphosate)"
        }
      },
      'irrigation': {
        'measures': {
          'mm': "mm/giorno",
          'm3': "m3/h"
        }
      }
    }
  };

});
efineday('ermes-smart-app/mixins/auth-checker', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    beforeModel: function beforeModel(transition) {
      if (!this.get('auth').isAuth()) {

        // Tell login controller that he needs to load a different route on login
        var loginController = this.controllerFor('login');
        loginController.set('previousTransition', transition);

        // Move to login page
        this.transitionTo('login');
      }
    }
  });

});
efineday('ermes-smart-app/mixins/map-events', ['exports', 'ember', 'esri/graphic', 'esri/geometry/webMercatorUtils'], function (exports, Ember, Graphic, webMercatorUtils) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    store: Ember['default'].inject.service(),
    selectedParcelsGraphics: new Map(),

    selectParcelEvent: function selectParcelEvent(evt) {
      if (evt.graphic) {
        var selectedParcels = this.get('parcels.selectedParcels');
        var userParcelsLayer = this.get('layersMap').get('userParcelsLayer');

        var selectedParcelId = evt.graphic.attributes.PARCEL_ID;

        if (selectedParcels.contains(selectedParcelId)) {
          selectedParcels.removeObject(selectedParcelId);
          Ember['default'].debug('UNSELECTED PARCEL_ID: ' + selectedParcelId);
        } else {
          selectedParcels.pushObject(selectedParcelId);
          Ember['default'].debug('SELECTED PARCEL_ID: ' + selectedParcelId);
        }

        userParcelsLayer.refresh();
        Ember['default'].debug('SELECTED PARCELS: ' + selectedParcels);
      }
    },
    editParcelEvent: function editParcelEvent(evt) {
      if (evt.graphic) {

        var userParcelsLayer = this.get('layersMap').get('userParcelsLayer');
        var parcelsLayer = this.get('layersMap').get('parcelsLayer');
        var userParcels = this.get('parcels.user.parcels');

        var userParcelsGraphics = this.get('parcelsGraphics');
        var symbol = this.get('userParcelSymbol');

        var graphicAttr = evt.graphic.attributes;
        if (graphicAttr === undefined) {
          userParcelsLayer.remove(evt.graphic);
        }

        var parcelNum = graphicAttr.PARCEL_ID;
        var featureGeometry = evt.graphic.geometry;

        if (userParcels.contains(parcelNum)) {
          userParcels.removeObject(parcelNum);
          parcelsLayer.remove(userParcelsGraphics[parcelNum]);
          userParcelsLayer.remove(userParcelsGraphics[parcelNum]);
          delete userParcelsGraphics[parcelNum];
          Ember['default'].debug("DELETED PARCEL_ID: " + parcelNum);
        } else {
          userParcels.pushObject(parcelNum);
          var attr = { "PARCEL_ID": parcelNum };
          userParcelsGraphics[parcelNum] = new Graphic['default'](featureGeometry, symbol, attr);
          parcelsLayer.add(userParcelsGraphics[parcelNum]);
          Ember['default'].debug("ADDED PARCEL_ID: " + parcelNum);
        }

        updateLastPosition(this.get('parcels.user.lastPosition'), this.get('map'));
        parcelsLayer.refresh();
      }
    }
  });

  /**
   * Updates user last position on owned parcels change
   * @param lastPosition
   * @param map
   */
  function updateLastPosition(lastPosition, map) {
    var actualPosition = webMercatorUtils['default'].webMercatorToGeographic(map.extent.getCenter());
    lastPosition.setProperties({
      lastX: actualPosition.x,
      lastY: actualPosition.y,
      zoom: map.getLevel(),
      spatialReference: actualPosition.spatialReference.wkid.toString()
    });
  }

});
efineday('ermes-smart-app/mixins/offline-map', ['exports', 'ember', 'oesri/offline-tiles-advanced-src', 'esri/layers/FeatureLayer', 'esri/graphic'], function (exports, Ember, OfflineTilesEnablerLayer, FeatureLayer, Graphic) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    layersMap: new Map(),
    parcelsGraphics: [],

    // For basemaps (Tiled maps in general)
    addOfflineTileLayer: function addOfflineTileLayer(layerURL, dbStore, proxy) {
      var _this2 = this;

      var tiledLayer = new OfflineTilesEnablerLayer['default'](layerURL, function (success) {
        if (success) {

          //Manage offline mode
          var downloadEvent;
          var reloadEvent;
          if (navigator.onLine) {
            downloadEvent = _this2.get('map').on('update-end', function () {
              if (navigator.onLine) {
                var minZoomAdjust = -2;
                var maxZoomAdjust = +2;
                var zoom = tiledLayer.getMinMaxLOD(minZoomAdjust, maxZoomAdjust);

                //Download tiles
                tiledLayer.prepareForOffline(zoom.min, zoom.max, _this2.get('map').extent, function (progress) {
                  //console.log("downloading tiles...");
                  if (progress.finishedDownloading) {
                    console.log("Tile download complete");
                  }
                });
              } else {
                _this2.liveReload();
                downloadEvent.remove();
              }
            });
          } else {
            reloadEvent = _this2.get('map').on('update-end', function () {
              if (navigator.onLine) {
                reloadEvent.remove();
                _this2.liveReload();
              }
            });
          }
        } else {
          Ember['default'].debug("Imposible to prepare layer for offline");
        }
      }, navigator.onLine, { dbName: dbStore.toUpperCase(), objectStoreName: dbStore });

      if (proxy) {
        tiledLayer.offline.proxyPath = proxy;
      }

      this.get('layersMap').set(dbStore, tiledLayer);
      this.get('map').addLayer(tiledLayer);
    },

    // Creates and adds a complete region parcels layer
    addParcelsLayer: function addParcelsLayer(layerURL) {
      var featureLayer = new FeatureLayer['default'](layerURL, {
        model: FeatureLayer['default'].MODE_ONDEMAND,
        outFields: ['PARCEL_ID']
      });

      this.get('layersMap').set('parcelsLayer', featureLayer);
      this.get('map').addLayer(featureLayer);
    },

    // Adds and prepares for offline user parcels layer
    addUserParcelsLayer: function addUserParcelsLayer(layerURL) {
      var _this = this;

      // Symbol for painting parcels
      var symbol = this.get('userParcelSymbol');

      // Query, to gather only user parcels from the FeatureLayer service
      var userParcels = this.get('parcels.user.parcels').toArray();
      var querySentence = "";
      for (var i = 0; i < userParcels.length - 1; i++) {
        querySentence += "PARCEL_ID = '" + userParcels[i] + "' or ";
      }
      querySentence += "PARCEL_ID = '" + userParcels[userParcels.length - 1] + "'";

      // Common online and offline FeatureLayer creator and injector
      function createAndAddFL(layerReference, event) {
        var featureLayer = new FeatureLayer['default'](layerReference, {
          model: FeatureLayer['default'].MODE_ONDEMAND,
          outFields: ['PARCEL_ID'],
          definitionExpression: querySentence
        });

        featureLayer.setSelectionSymbol(symbol);

        var storeEvent = featureLayer.on(event, function () {
          drawOwnerParcels(featureLayer, symbol, _this.get('parcelsGraphics'));
          if (navigator.onLine) {
            _this.storeUserParcelsLayer();
            storeEvent.remove();
          }
        });

        _this.get('layersMap').set('userParcelsLayer', featureLayer);
        _this.get('map').addLayer(featureLayer);
      }

      if (navigator.onLine) {
        createAndAddFL(layerURL, 'update-end');
      } else {
        this.get('editStore').getFeatureLayerJSON(function (success, featureLayer) {
          if (success) {
            Ember['default'].debug('usersParcelLayer loaded successfully from the storage');
            createAndAddFL(featureLayer, 'resume');
          }
        });
      }
    },

    // Store userParcelsLayer
    storeUserParcelsLayer: function storeUserParcelsLayer() {
      this.get('editStore').pushFeatureLayerJSON(this.get('layersMap').get('userParcelsLayer').toJson(), function (success) {
        if (success) {
          Ember['default'].debug('userParcelsLayer successfully stored on the storage');
        } else {
          Ember['default'].debug('Error: userParcelsLayer could no be stored');
        }
      });
    },

    /**
     * liveReload, this method should remove all map layers and create them again, override it.
     */
    liveReload: function liveReload() {
      Ember['default'].debug('You should override this method for map layer reload');
    }
  });

  // Paint actual user parcels over the FeatureLayer
  function drawOwnerParcels(layer, symbol, graphics) {
    Ember['default'].debug('Drawing user parcels');
    layer.graphics.forEach(function (item) {
      var parcelId = item.attributes.PARCEL_ID;
      var geometry = item.geometry;
      graphics[parcelId] = new Graphic['default'](geometry, symbol, item.attributes);
      layer.add(graphics[parcelId]);
    });
    layer.refresh();
  }

});
efineday('ermes-smart-app/mixins/panel-manager', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    afterModel: function afterModel() {

      // Tell index controller that a panel has been opened
      var indexController = this.controllerFor('index');
      var routeName = this.routeName.split('.');
      indexController.set('openedPanel', routeName[1]);
    },
    actions: {
      willTransition: function willTransition() {
        // When leaving panel by itself reset index openedPanel property
        var indexController = this.controllerFor('index');
        indexController.set('openedPanel', 'none');
      }
    }
  });

});
efineday('ermes-smart-app/mixins/product-model-factory', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    model: function model() {
      var route = this.routeName.split('.');
      var productName = Ember['default'].String.singularize(route[route.length - 1]);
      return this.get('products').getProduct(productName);
    }
  });

});
efineday('ermes-smart-app/mixins/product-model', ['exports', 'ember', 'ember-data', 'moment'], function (exports, Ember, DS, Moment) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    offlineStorage: Ember['default'].inject.service(),
    save: function save() {
      var _this = this;

      return this._super().then(function (obj) {
        // Store product for offline use
        var prod = {};
        prod[_this._internalModel.modelName] = _this.serialize({ includeId: true });
        _this.get('offlineStorage').get('storage').setItem(_this._internalModel.type + _this.id, prod);
        return obj;
      }, function (err) {
        var old = !!_this.get('id');

        // Generate a unique identifier for the product offline storage
        var id = Math.round(Math.random() * 1e8) + new Moment['default']().format('x');

        // Prepare the product key for its storage
        var key = _this._internalModel.type + id;

        // Store product
        var prod = {};
        if (old) {
          prod[_this._internalModel.modelName] = _this.serialize({ includeId: true });
        } else {
          // Without id record cannot be pushed, create a new record instead
          prod[_this._internalModel.modelName] = _this.serialize();
        }
        _this.get('offlineStorage').get('storage').setItem(key, prod);

        // Mark it as pending
        _this.get('offlineStorage').get('storage').getItem('upload-pending-products').then(function (products) {
          if (products !== null) {
            // There are other pending products
            products.push(key);
            _this.get('offlineStorage').get('storage').setItem('upload-pending-products', products);
          } else {
            // First pending product is going to be stored
            _this.get('offlineStorage').get('storage').setItem('upload-pending-products', [key]);
          }
        });
        return err;
      });
    }
  });

});
efineday('ermes-smart-app/mixins/product-upload-rdate', ['exports', 'ember', 'ermes-smart-app/mixins/product-upload'], function (exports, Ember, ProductUpload) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create(ProductUpload['default'], {
    actions: {
      submit: function submit() {
        if (!this.get('model.date')) {
          this.set('dateError', this.get('i18n').t('panel.notification.missing-date'));
        } else {
          this.set('dateError', '');
          this._super(this);
        }
      }
    }
  });

});
efineday('ermes-smart-app/mixins/product-upload', ['exports', 'ember', 'moment'], function (exports, Ember, Moment) {

  'use strict';

  exports['default'] = Ember['default'].Mixin.create({
    productService: Ember['default'].inject.service('products'),
    actions: {
      submit: function submit() {
        var _this = this;

        if (this.get('parcels.selectedParcels').length <= 0) {
          // There are no selected parcels
          this.set('parcelError', this.get('i18n').t('panel.notification.missing-parcel'));
        } else {
          // Parcels selected
          // Reset error messages
          this.set('parcelError', '');

          // Put parcels inside the model
          this.set('model.parcels', this.get('parcels.selectedParcels'));

          // Set the uploading date
          this.set('model.uploadingDate', new Moment['default']().format('lll'));

          // Update info and save model
          this.set('info', this.get('i18n').t('panel.notification.processing'));
          this.get('model').save().then(function () {
            // Successfully saved
            _this.set('info', _this.get('i18n').t('panel.notification.saved'));
            _this.set('model', _this.get('productService').archiveProduct(Ember['default'].String.singularize(_this.get('panelId')))); // Create a new empty product for the panel
            setTimeout(function () {
              return _this.set('info', '');
            }, 2000);
          }, function () {
            // Save has failed, offline
            _this.set('info', _this.get('i18n').t('panel.notification.saved'));
            _this.set('model', _this.get('productService').archiveProduct(Ember['default'].String.singularize(_this.get('panelId')))); // Create a new empty product for the panel
            setTimeout(function () {
              return _this.set('info', '');
            }, 2000);
          });
        }
      }
    }
  });

});
efineday('ermes-smart-app/models/agrochemical', ['exports', 'ember-data', 'ermes-smart-app/mixins/product-model', 'model-fragments'], function (exports, DS, ProductModel, MF) {

  'use strict';

  exports['default'] = ProductModel['default'].extend({
    date: DS['default'].attr('user-date'),
    uploadingDate: DS['default'].attr('date'),
    product: DS['default'].attr('string', { defaultValue: function defaultValue() {
        return 'bentazon';
      } }),
    amount: DS['default'].attr('number'),
    parcels: MF['default'].array('string')
  });

});
efineday('ermes-smart-app/models/crop-info', ['exports', 'ember-data', 'ermes-smart-app/mixins/product-model', 'model-fragments'], function (exports, DS, ProductModel, MF) {

  'use strict';

  exports['default'] = ProductModel['default'].extend({
    cropType: DS['default'].attr('string', { defaultValue: function defaultValue() {
        return 'rice';
      } }),
    uploadingDate: DS['default'].attr('date'),
    riceVariety: DS['default'].attr('string', { defaultValue: function defaultValue() {
        return 'null';
      } }),
    pudding: DS['default'].attr('string', { defaultValue: function defaultValue() {
        return 'null';
      } }),
    sowingPractice: DS['default'].attr('string', { defaultValue: function defaultValue() {
        return 'null';
      } }),
    date: DS['default'].attr('user-date'),
    parcels: MF['default'].array('string')
  });

});
efineday('ermes-smart-app/models/crop-phenology', ['exports', 'ember-data', 'ermes-smart-app/mixins/product-model', 'model-fragments'], function (exports, DS, ProductModel, MF) {

  'use strict';

  exports['default'] = ProductModel['default'].extend({
    date: DS['default'].attr('user-date'),
    uploadingDate: DS['default'].attr('date'),
    developmentStage: DS['default'].attr('string', { defaultValue: function defaultValue() {
        return 'emergence';
      } }),
    growthStage: DS['default'].attr('string', { defaultValue: function defaultValue() {
        return 'null';
      } }),
    code: DS['default'].attr('string', { defaultValue: function defaultValue() {
        return 'null';
      } }),
    parcels: MF['default'].array('string')
  });

});
efineday('ermes-smart-app/models/disease', ['exports', 'ember-data', 'ermes-smart-app/mixins/product-model', 'model-fragments'], function (exports, DS, ProductModel, MF) {

  'use strict';

  exports['default'] = ProductModel['default'].extend({
    date: DS['default'].attr('user-date'),
    uploadingDate: DS['default'].attr('date'),
    name: DS['default'].attr('string', { defaultValue: function defaultValue() {
        return 'bipolaris';
      } }),
    comments: DS['default'].attr('string'),
    file: DS['default'].attr('string'),
    damage: DS['default'].attr('number'),
    parcels: MF['default'].array('string')
  });

});
efineday('ermes-smart-app/models/fertilizer', ['exports', 'ember-data', 'ermes-smart-app/mixins/product-model', 'model-fragments'], function (exports, DS, ProductModel, MF) {

  'use strict';

  exports['default'] = ProductModel['default'].extend({
    date: DS['default'].attr('user-date'),
    uploadingDate: DS['default'].attr('date'),
    product: DS['default'].attr('string', { defaultValue: function defaultValue() {
        return 'calcium-cyanamide';
      } }),
    quantity: DS['default'].attr('number'),
    nitrogenContent: DS['default'].attr('number'),
    phosphorusContent: DS['default'].attr('number'),
    potassiumContent: DS['default'].attr('number'),
    parcels: MF['default'].array('string')
  });

});
efineday('ermes-smart-app/models/irrigation', ['exports', 'ember-data', 'ermes-smart-app/mixins/product-model', 'model-fragments'], function (exports, DS, ProductModel, MF) {

  'use strict';

  exports['default'] = ProductModel['default'].extend({
    startDate: DS['default'].attr('user-date'),
    endDate: DS['default'].attr('user-date'),
    quantityOfWaterMeasure: DS['default'].attr('string', { defaultValue: function defaultValue() {
        return 'mm';
      } }),
    waterQuantity: DS['default'].attr('number'),
    waterHours: DS['default'].attr('number'),
    waterDepth: DS['default'].attr('number'),
    uploadingDate: DS['default'].attr('date'),
    parcels: MF['default'].array('string')
  });

});
efineday('ermes-smart-app/models/last-position', ['exports', 'ember-data', 'model-fragments'], function (exports, DS, MF) {

  'use strict';

  exports['default'] = MF['default'].Fragment.extend({
    spatialReference: DS['default'].attr('number'),
    lastX: DS['default'].attr('number'),
    lastY: DS['default'].attr('number'),
    zoom: DS['default'].attr('number')
  });

});
efineday('ermes-smart-app/models/observation', ['exports', 'ember-data', 'ermes-smart-app/mixins/product-model', 'model-fragments'], function (exports, DS, ProductModel, MF) {

  'use strict';

  exports['default'] = ProductModel['default'].extend({
    uploadingDate: DS['default'].attr('date'),
    comments: DS['default'].attr('string'),
    file: DS['default'].attr('string'),
    parcels: MF['default'].array('string')
  });

});
efineday('ermes-smart-app/models/parcel', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    parcelId: DS['default'].attr('string'),
    observations: DS['default'].hasMany('observation'),
    weeds: DS['default'].hasMany('weed'),
    diseases: DS['default'].hasMany('disease'),
    phatogens: DS['default'].hasMany('pathogen'),
    phenologies: DS['default'].hasMany('crop-phenology'),
    agrochemicals: DS['default'].hasMany('agrochemical'),
    fertilizers: DS['default'].hasMany('fertilizer'),
    irrigationInfos: DS['default'].hasMany('irrigation'),
    yields: DS['default'].hasMany('yield'),
    cropInfos: DS['default'].hasMany('crop-info'),
    parcelStatus: DS['default'].hasMany('soil-condition'),
    soils: DS['default'].hasMany('soil-type')
  });

});
efineday('ermes-smart-app/models/pathogen', ['exports', 'ember-data', 'ermes-smart-app/mixins/product-model', 'model-fragments'], function (exports, DS, ProductModel, MF) {

  'use strict';

  exports['default'] = ProductModel['default'].extend({
    date: DS['default'].attr('user-date'),
    uploadingDate: DS['default'].attr('date'),
    name: DS['default'].attr('string', { defaultValue: function defaultValue() {
        return 'aphids';
      } }),
    comments: DS['default'].attr('string'),
    file: DS['default'].attr('string'),
    damage: DS['default'].attr('number'),
    parcels: MF['default'].array('string')
  });

});
efineday('ermes-smart-app/models/soil-condition', ['exports', 'ember-data', 'ermes-smart-app/mixins/product-model', 'model-fragments', 'moment', 'ermes-smart-app/config/environment'], function (exports, DS, ProductModel, MF, Moment, config) {

  'use strict';

  var fDate = config['default'].APP.defaultDateFormat;

  exports['default'] = ProductModel['default'].extend({
    parcelStatus: DS['default'].attr('string', { defaultValue: function defaultValue() {
        return 'bare-soil';
      } }),
    date: DS['default'].attr('user-date', { defaultValue: function defaultValue() {
        return new Moment['default']().format(fDate);
      } }),
    uploadingDate: DS['default'].attr('date'),
    parcels: MF['default'].array('string')
  });

});
efineday('ermes-smart-app/models/soil-type', ['exports', 'ember-data', 'ermes-smart-app/mixins/product-model', 'model-fragments'], function (exports, DS, ProductModel, MF) {

  'use strict';

  exports['default'] = ProductModel['default'].extend({
    soilTexture: DS['default'].attr('string', { defaultValue: function defaultValue() {
        return 'clay';
      } }),
    organicMatter: DS['default'].attr('number'),
    ph: DS['default'].attr('number'),
    date: DS['default'].attr('user-date'),
    uploadingDate: DS['default'].attr('date'),
    parcels: MF['default'].array('string')
  });

});
efineday('ermes-smart-app/models/static/agrochemicals', ['exports'], function (exports) {

  'use strict';

  exports.getProducts = getProducts;

  function getProducts(context) {
    return [{ text: context.get('i18n').t('data.agrochemicals.products.bentazon'), value: 'bentazon' }, { text: context.get('i18n').t('data.agrochemicals.products.celest-syngenta-(fludioxonil)'), value: 'celest-syngenta-(fludioxonil)' }, { text: context.get('i18n').t('data.agrochemicals.products.mixed-product'), value: 'mixed-product' }, { text: context.get('i18n').t('data.agrochemicals.products.oxodiazon'), value: 'oxodiazon' }, { text: context.get('i18n').t('data.agrochemicals.products.propanil'), value: 'propanil' }, { text: context.get('i18n').t('data.agrochemicals.products.pyretroids'), value: 'pyretroids' }, { text: context.get('i18n').t('data.agrochemicals.products.touchdown-syngenta-(glyphosate)'), value: 'touchdown-syngenta-(glyphosate)' }];
  }

});
efineday('ermes-smart-app/models/static/crop-info', ['exports'], function (exports) {

  'use strict';

  exports.getCropTypes = getCropTypes;
  exports.getPuddings = getPuddings;
  exports.getRiceVarieties = getRiceVarieties;
  exports.getSowingPractices = getSowingPractices;

  function getCropTypes(context) {
    return [{ text: context.get('i18n').t('data.crop-info.crop-types.alpha_alpha'), value: 'alpha_alpha' }, { text: context.get('i18n').t('data.crop-info.crop-types.clover'), value: 'clover' }, { text: context.get('i18n').t('data.crop-info.crop-types.corn'), value: 'corn' }, { text: context.get('i18n').t('data.crop-info.crop-types.meadow'), value: 'meadow' }, { text: context.get('i18n').t('data.crop-info.crop-types.poplar'), value: 'poplar' }, { text: context.get('i18n').t('data.crop-info.crop-types.rice'), value: 'rice', selected: true }, { text: context.get('i18n').t('data.crop-info.crop-types.set-aside'), value: 'set-aside' }, { text: context.get('i18n').t('data.crop-info.crop-types.soybean'), value: 'soybean' }];
  }

  function getPuddings(context) {
    return [{ text: context.get('i18n').t('data.crop-info.puddings.null'), value: 'null' }, { text: context.get('i18n').t('data.crop-info.puddings.yes'), value: 'yes' }, { text: context.get('i18n').t('data.crop-info.puddings.no'), value: 'no' }];
  }

  function getRiceVarieties(context) {
    return [{ text: context.get('i18n').t('data.crop-info.rice-varieties.null'), value: 'null' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.alexandros'), value: 'alexandros' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.augusto'), value: 'augusto' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.axios'), value: 'axios' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.bomba'), value: 'bomba' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.carnaroli'), value: 'carnaroli' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.cl-12'), value: 'cl-12' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.cl-26'), value: 'cl-26' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.cl-46'), value: 'cl-46' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.cl-80'), value: 'cl-80' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.clxl745'), value: 'clxl745' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.dimitra'), value: 'dimitra' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.dion'), value: 'dion' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.ecco-61'), value: 'ecco-61' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.gladio'), value: 'gladio' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.gleva'), value: 'gleva' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.luna'), value: 'luna' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.mare-cl'), value: 'mare-cl' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.olympiada'), value: 'olympiada' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.opale'), value: 'opale' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.ronaldo'), value: 'ronaldo' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.roxani'), value: 'roxani' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.selenio'), value: 'selenio' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.sirio-cl'), value: 'sirio-cl' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.sole-cl'), value: 'sole-cl' }, { text: context.get('i18n').t('data.crop-info.rice-varieties.terra-cl'), value: 'terra-cl' }];
  }

  function getSowingPractices(context) {
    return [{ text: context.get('i18n').t('data.crop-info.sowing-practices.null'), value: 'null' }, { text: context.get('i18n').t('data.crop-info.sowing-practices.direct-seeding'), value: 'direct-seeding' }, { text: context.get('i18n').t('data.crop-info.sowing-practices.scattered-seeding'), value: 'scattered-seeding' }];
  }

});
efineday('ermes-smart-app/models/static/crop-phenology', ['exports'], function (exports) {

  'use strict';

  exports.getDevelopmentStages = getDevelopmentStages;
  exports.getPhenologyGrowth = getPhenologyGrowth;
  exports.getPhenologyCodes = getPhenologyCodes;

  function getDevelopmentStages(context) {
    return [{ text: context.get('i18n').t('data.crop-phenology.development-stages.emergence'), value: 'emergence' }, { text: context.get('i18n').t('data.crop-phenology.development-stages.2nd-leaf'), value: '2nd-leaf' }, { text: context.get('i18n').t('data.crop-phenology.development-stages.3rd-leaf'), value: '3rd-leaf' }, { text: context.get('i18n').t('data.crop-phenology.development-stages.4th-leaf'), value: '4th-leaf' }, { text: context.get('i18n').t('data.crop-phenology.development-stages.beginning-of-tillering'), value: 'beginning-of-tillering' }, { text: context.get('i18n').t('data.crop-phenology.development-stages.panicle-initiation'), value: 'panicle-initiation' }, { text: context.get('i18n').t('data.crop-phenology.development-stages.heading'), value: 'heading' }, { text: context.get('i18n').t('data.crop-phenology.development-stages.flowering'), value: 'flowering' }, { text: context.get('i18n').t('data.crop-phenology.development-stages.maturity'), value: 'maturity' }];
  }

  function getPhenologyGrowth(context) {
    return [{ text: context.get('i18n').t('data.crop-phenology.phenology-growth.null'), value: 'null' }, { text: context.get('i18n').t('data.crop-phenology.phenology-growth.0'), value: '0' }, { text: context.get('i18n').t('data.crop-phenology.phenology-growth.1'), value: '1' }, { text: context.get('i18n').t('data.crop-phenology.phenology-growth.2'), value: '2' }, { text: context.get('i18n').t('data.crop-phenology.phenology-growth.3'), value: '3' }, { text: context.get('i18n').t('data.crop-phenology.phenology-growth.4'), value: '4' }, { text: context.get('i18n').t('data.crop-phenology.phenology-growth.5'), value: '5' }, { text: context.get('i18n').t('data.crop-phenology.phenology-growth.6'), value: '6' }, { text: context.get('i18n').t('data.crop-phenology.phenology-growth.7'), value: '7' }, { text: context.get('i18n').t('data.crop-phenology.phenology-growth.8'), value: '8' }, { text: context.get('i18n').t('data.crop-phenology.phenology-growth.9'), value: '9' }];
  }

  function getPhenologyCodes(context) {
    return {
      cod_null: [{ text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null' }],
      cod_0: [{ text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.0'), value: '0' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.1'), value: '1' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.3'), value: '3' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.5'), value: '5' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.6'), value: '6' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.7'), value: '7' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.9'), value: '9' }],
      cod_1: [{ text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.10'), value: '10' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.11'), value: '11' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.12'), value: '12' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.13'), value: '13' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.14'), value: '14' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.15'), value: '15' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.16'), value: '16' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.17'), value: '17' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.18'), value: '18' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.19'), value: '19' }],
      cod_2: [{ text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.21'), value: '21' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.22'), value: '22' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.23'), value: '23' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.24'), value: '24' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.25'), value: '25' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.26'), value: '26' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.27'), value: '27' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.28'), value: '28' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.29'), value: '29' }],
      cod_3: [{ text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.30'), value: '30' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.32'), value: '32' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.34'), value: '34' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.37'), value: '37' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.39'), value: '39' }],
      cod_4: [{ text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.41'), value: '41' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.43'), value: '43' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.45'), value: '45' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.47'), value: '47' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.49'), value: '49' }],
      cod_5: [{ text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.51'), value: '51' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.52'), value: '52' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.53'), value: '53' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.54'), value: '54' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.55'), value: '55' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.56'), value: '56' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.57'), value: '57' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.58'), value: '58' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.59'), value: '59' }],
      cod_6: [{ text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.61'), value: '61' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.65'), value: '65' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.69'), value: '69' }],
      cod_7: [{ text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.71'), value: '71' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.73'), value: '73' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.75'), value: '75' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.77'), value: '77' }],
      cod_8: [{ text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.83'), value: '83' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.85'), value: '85' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.87'), value: '87' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.89'), value: '89' }],
      cod_9: [{ text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.92'), value: '92' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.97'), value: '97' }, { text: context.get('i18n').t('data.crop-phenology.phenology-codes.99'), value: '99' }]
    };
  }

});
efineday('ermes-smart-app/models/static/diseases', ['exports'], function (exports) {

  'use strict';

  exports.getNames = getNames;

  function getNames(context) {
    return [{ text: context.get('i18n').t('data.diseases.names.bipolaris'), value: 'bipolaris' }, { text: context.get('i18n').t('data.diseases.names.cercospora'), value: 'cercospora' }, { text: context.get('i18n').t('data.diseases.names.fusarium'), value: 'fusarium' }, { text: context.get('i18n').t('data.diseases.names.pyricularia-(blast)'), value: 'pyricularia-(blast)' }];
  }

});
efineday('ermes-smart-app/models/static/fertilizers', ['exports'], function (exports) {

  'use strict';

  exports.getProducts = getProducts;

  function getProducts(context) {
    return [{ text: context.get('i18n').t('data.fertilizers.products.calcium-cyanamide'), value: 'calcium-cyanamide' }, { text: context.get('i18n').t('data.fertilizers.products.entec-26-(n+-k)'), value: 'entec-26-(n+-k)' }, { text: context.get('i18n').t('data.fertilizers.products.entec-46-(n+k)'), value: 'entec-46-(n+k)' }, { text: context.get('i18n').t('data.fertilizers.products.flexammon'), value: 'flexammon' }, { text: context.get('i18n').t('data.fertilizers.products.nitrophoska'), value: 'nitrophoska' }, { text: context.get('i18n').t('data.fertilizers.products.novammon-(n+k)'), value: 'novammon-(n+k)' }, { text: context.get('i18n').t('data.fertilizers.products.organic'), value: 'organic' }, { text: context.get('i18n').t('data.fertilizers.products.urea'), value: 'urea' }, { text: context.get('i18n').t('data.fertilizers.products.utec-46-'), value: 'utec-46-' }];
  }

});
efineday('ermes-smart-app/models/static/irrigation', ['exports'], function (exports) {

  'use strict';

  exports.getMeasures = getMeasures;

  function getMeasures(context) {
    return [{ text: context.get('i18n').t('data.irrigation.measures.mm'), value: 'mm' }, { text: context.get('i18n').t('data.irrigation.measures.m3'), value: 'm3' }];
  }

});
efineday('ermes-smart-app/models/static/pathogens', ['exports'], function (exports) {

  'use strict';

  exports.getNames = getNames;

  function getNames(context) {
    return [{ text: context.get('i18n').t('data.pathogens.names.aphids'), value: 'aphids' }, { text: context.get('i18n').t('data.pathogens.names.lissorhoptrus-oryzophilus'), value: 'lissorhoptrus-oryzophilus' }, { text: context.get('i18n').t('data.pathogens.names.nematods'), value: 'nematods' }, { text: context.get('i18n').t('data.pathogens.names.pomacea'), value: 'pomacea' }];
  }

});
efineday('ermes-smart-app/models/static/products', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports.getProducts = getProducts;
  exports.getProductsNames = getProductsNames;

  function getProducts(context) {
    return [{ text: context.get('i18n').t('fields.text.crop-info'), panel: 'index.crop-info' }, { text: context.get('i18n').t('fields.text.soil-type'), panel: 'index.soil-type' }, { text: context.get('i18n').t('fields.text.soil-condition'), panel: 'index.soil-condition' }, { text: context.get('i18n').t('fields.text.crop-phenology'), panel: 'index.crop-phenology' }, { text: context.get('i18n').t('fields.text.pathogens'), panel: 'index.pathogens' }, { text: context.get('i18n').t('fields.text.diseases'), panel: 'index.diseases' }, { text: context.get('i18n').t('fields.text.weeds'), panel: 'index.weeds' }, { text: context.get('i18n').t('fields.text.fertilizers'), panel: 'index.fertilizers' }, { text: context.get('i18n').t('fields.text.agrochemicals'), panel: 'index.agrochemicals' }, { text: context.get('i18n').t('fields.text.irrigation'), panel: 'index.irrigation' }, { text: context.get('i18n').t('fields.text.yield'), panel: 'index.yield' }];
  }

  function getProductsNames(context) {
    var products = getProducts(context).map(function (product) {
      return {
        text: product.text,
        name: Ember['default'].String.singularize(product.panel.split('.')[1])
      };
    });
    products.push({ text: context.get('i18n').t('fields.text.observation'), name: 'observation' });
    return products;
  }

});
efineday('ermes-smart-app/models/static/regions', ['exports'], function (exports) {

  'use strict';

  exports.getRegions = getRegions;
  exports.getLanguajes = getLanguajes;

  function getRegions(context) {
    return [{ text: context.get('i18n').t('region.greece'), value: "greece" }, { text: context.get('i18n').t('region.italy'), value: "italy" }, { text: context.get('i18n').t('region.spain'), value: "spain" }];
  }

  function getLanguajes() {
    return [{ text: 'English', value: 'en', selected: true }, { text: 'Español', value: 'es' }, { text: 'Italiano', value: 'it' }, { text: 'Ελληνικά', value: 'gk' }];
  }

});
efineday('ermes-smart-app/models/static/soil-condition', ['exports'], function (exports) {

  'use strict';

  exports.getParcelStatus = getParcelStatus;

  function getParcelStatus(context) {
    return [{ text: context.get('i18n').t('data.soil-condition.parcel-status.bare-soil'), value: 'bare-soil' }, { text: context.get('i18n').t('data.soil-condition.parcel-status.plowed'), value: 'plowed' }, { text: context.get('i18n').t('data.soil-condition.parcel-status.sowed'), value: 'sowed' }, { text: context.get('i18n').t('data.soil-condition.parcel-status.flooded'), value: 'flooded' }];
  }

});
efineday('ermes-smart-app/models/static/soil-type', ['exports'], function (exports) {

  'use strict';

  exports.getSoilTextures = getSoilTextures;

  function getSoilTextures(context) {
    return [{ text: context.get('i18n').t('data.soil-type.soil-textures.clay'), value: 'clay' }, { text: context.get('i18n').t('data.soil-type.soil-textures.silt-clay'), value: 'silt-clay' }, { text: context.get('i18n').t('data.soil-type.soil-textures.silt-clay-loam'), value: 'silt-clay-loam' }, { text: context.get('i18n').t('data.soil-type.soil-textures.medium-textured'), value: 'medium-textured' }];
  }

});
efineday('ermes-smart-app/models/static/weeds', ['exports'], function (exports) {

  'use strict';

  exports.getNames = getNames;

  function getNames(context) {
    return [{ text: context.get('i18n').t('data.weeds.names.bidens'), value: 'bidens' }, { text: context.get('i18n').t('data.weeds.names.ciperus-difformis'), value: 'ciperus-difformis' }, { text: context.get('i18n').t('data.weeds.names.echinochloa-crus-galli'), value: 'echinochloa-crus-galli' }, { text: context.get('i18n').t('data.weeds.names.heteranthera'), value: 'heteranthera' }, { text: context.get('i18n').t('data.weeds.names.leersia-oryzoides'), value: 'leersia-oryzoides' }, { text: context.get('i18n').t('data.weeds.names.oryza-sativa'), value: 'oryza-sativa' }, { text: context.get('i18n').t('data.weeds.names.scirpus-maritimus'), value: 'scirpus-maritimus' }];
  }

});
efineday('ermes-smart-app/models/user', ['exports', 'ember-data', 'model-fragments'], function (exports, DS, MF) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    username: DS['default'].attr('string'),
    email: DS['default'].attr('string'),
    region: DS['default'].attr('string'),
    profile: DS['default'].attr('string'),
    language: DS['default'].attr('string'),
    lastPosition: MF['default'].fragment('last-position'),
    parcels: MF['default'].array('string')
  });

});
efineday('ermes-smart-app/models/weed', ['exports', 'ember-data', 'ermes-smart-app/mixins/product-model', 'model-fragments'], function (exports, DS, ProductModel, MF) {

  'use strict';

  exports['default'] = ProductModel['default'].extend({
    date: DS['default'].attr('user-date'),
    uploadingDate: DS['default'].attr('date'),
    name: DS['default'].attr('string', { defaultValue: function defaultValue() {
        return 'bidens';
      } }),
    comments: DS['default'].attr('string'),
    file: DS['default'].attr('string'),
    damage: DS['default'].attr('number'),
    parcels: MF['default'].array('string')
  });

});
efineday('ermes-smart-app/models/yield', ['exports', 'ember-data', 'ermes-smart-app/mixins/product-model', 'model-fragments'], function (exports, DS, ProductModel, MF) {

  'use strict';

  exports['default'] = ProductModel['default'].extend({
    date: DS['default'].attr('user-date'),
    uploadingDate: DS['default'].attr('date'),
    'yield': DS['default'].attr('number'),
    comments: DS['default'].attr('string'),
    parcels: MF['default'].array('string')
  });

});
efineday('ermes-smart-app/router', ['exports', 'ember', 'ermes-smart-app/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('login');

    this.route('index', { path: '/' }, function () {
      this.route('observation', {});
      this.route('crop-info', {});
      this.route('soil-type', {});
      this.route('soil-condition', {});
      this.route('crop-phenology', {});
      this.route('pathogens', {});
      this.route('diseases', {});
      this.route('weeds', {});
      this.route('fertilizers', {});
      this.route('agrochemicals', {});
      this.route('irrigation', {});
      this.route('yield', {});
      this.route('profile', {});
      this.route('about', {});
      this.route('parcel-info', {});
      this.route('welcome', {});
      this.route('cannot-edit', {});
    });
    this.route('index-error', {});
    this.route('index-loading', {});
  });

  exports['default'] = Router;

});
efineday('ermes-smart-app/routes/index/about', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker', 'ermes-smart-app/mixins/panel-manager'], function (exports, Ember, AuthChecker, PanelManager) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], PanelManager['default'], {});

});
efineday('ermes-smart-app/routes/index/agrochemicals', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker', 'ermes-smart-app/mixins/panel-manager', 'ermes-smart-app/mixins/product-model-factory'], function (exports, Ember, AuthChecker, PanelManager, ProductModelFactory) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], PanelManager['default'], ProductModelFactory['default'], {});

});
efineday('ermes-smart-app/routes/index/cannot-edit', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker'], function (exports, Ember, AuthChecker) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], {});

});
efineday('ermes-smart-app/routes/index/crop-info', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker', 'ermes-smart-app/mixins/panel-manager', 'ermes-smart-app/mixins/product-model-factory'], function (exports, Ember, AuthChecker, PanelManager, ProductModelFactory) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], PanelManager['default'], ProductModelFactory['default'], {});

});
efineday('ermes-smart-app/routes/index/crop-phenology', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker', 'ermes-smart-app/mixins/panel-manager', 'ermes-smart-app/mixins/product-model-factory'], function (exports, Ember, AuthChecker, PanelManager, ProductModelFactory) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], PanelManager['default'], ProductModelFactory['default'], {});

});
efineday('ermes-smart-app/routes/index/diseases', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker', 'ermes-smart-app/mixins/panel-manager', 'ermes-smart-app/mixins/product-model-factory'], function (exports, Ember, AuthChecker, PanelManager, ProductModelFactory) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], PanelManager['default'], ProductModelFactory['default'], {});

});
efineday('ermes-smart-app/routes/index/fertilizers', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker', 'ermes-smart-app/mixins/panel-manager', 'ermes-smart-app/mixins/product-model-factory'], function (exports, Ember, AuthChecker, PanelManager, ProductModelFactory) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], PanelManager['default'], ProductModelFactory['default'], {});

});
efineday('ermes-smart-app/routes/index/irrigation', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker', 'ermes-smart-app/mixins/panel-manager', 'ermes-smart-app/mixins/product-model-factory'], function (exports, Ember, AuthChecker, PanelManager, ProductModelFactory) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], PanelManager['default'], ProductModelFactory['default'], {});

});
efineday('ermes-smart-app/routes/index/observation', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker', 'ermes-smart-app/mixins/panel-manager', 'ermes-smart-app/mixins/product-model-factory'], function (exports, Ember, AuthChecker, PanelManager, ProductModelFactory) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], PanelManager['default'], ProductModelFactory['default'], {});

});
efineday('ermes-smart-app/routes/index/parcel-info', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker', 'ermes-smart-app/mixins/panel-manager'], function (exports, Ember, AuthChecker, PanelManager) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], PanelManager['default'], {
    model: function model() {
      // Leave it empty, so controller can take possession of this responsibility
    }
  });

});
efineday('ermes-smart-app/routes/index/pathogens', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker', 'ermes-smart-app/mixins/panel-manager', 'ermes-smart-app/mixins/product-model-factory'], function (exports, Ember, AuthChecker, PanelManager, ProductModelFactory) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], PanelManager['default'], ProductModelFactory['default'], {});

});
efineday('ermes-smart-app/routes/index/profile', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker', 'ermes-smart-app/mixins/panel-manager'], function (exports, Ember, AuthChecker, PanelManager) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], PanelManager['default'], {
    model: function model() {
      var username = this.get('auth').getCurrentUserId();
      return this.store.findRecord('user', username);
    }
  });

});
efineday('ermes-smart-app/routes/index/soil-condition', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker', 'ermes-smart-app/mixins/panel-manager', 'ermes-smart-app/mixins/product-model-factory'], function (exports, Ember, AuthChecker, PanelManager, ProductModelFactory) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], PanelManager['default'], ProductModelFactory['default'], {});

});
efineday('ermes-smart-app/routes/index/soil-type', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker', 'ermes-smart-app/mixins/panel-manager', 'ermes-smart-app/mixins/product-model-factory'], function (exports, Ember, AuthChecker, PanelManager, ProductModelFactory) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], PanelManager['default'], ProductModelFactory['default'], {});

});
efineday('ermes-smart-app/routes/index/weeds', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker', 'ermes-smart-app/mixins/panel-manager', 'ermes-smart-app/mixins/product-model-factory'], function (exports, Ember, AuthChecker, PanelManager, ProductModelFactory) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], PanelManager['default'], ProductModelFactory['default'], {});

});
efineday('ermes-smart-app/routes/index/welcome', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker'], function (exports, Ember, AuthChecker) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], {
    model: function model() {
      var username = this.get('auth').getCurrentUserId();
      return this.store.findRecord('user', username);
    }
  });

});
efineday('ermes-smart-app/routes/index/yield', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker', 'ermes-smart-app/mixins/panel-manager', 'ermes-smart-app/mixins/product-model-factory'], function (exports, Ember, AuthChecker, PanelManager, ProductModelFactory) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], PanelManager['default'], ProductModelFactory['default'], {});

});
efineday('ermes-smart-app/routes/index-error', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker'], function (exports, Ember, AuthChecker) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], {});

});
efineday('ermes-smart-app/routes/index-loading', ['exports', 'ember', 'ermes-smart-app/mixins/auth-checker'], function (exports, Ember, AuthChecker) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], {});

});
efineday('ermes-smart-app/routes/index', ['exports', 'jquery', 'ember', 'ermes-smart-app/mixins/auth-checker'], function (exports, $, Ember, AuthChecker) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(AuthChecker['default'], {
    uploadQueue: Ember['default'].inject.service(),
    parcels: Ember['default'].inject.service(),
    model: function model() {
      var username = this.get('auth').getCurrentUserId();
      return this.store.findRecord('user', username);
    },
    afterModel: function afterModel(user) {
      this.get('parcels').setUser(user);
      if (user.get('parcels.length') === 0) {
        if (navigator.onLine) {
          this.controllerFor('index').set('editMode', true);
          this.transitionTo('index.welcome');
        } else {
          this.transitionTo('index-error');
        }
      }

      this.get('uploadQueue').start();
    },
    actions: {
      willTransition: function willTransition() {

        // We check if there was a panel already opened before moving to another page
        var panel = this.controller.get('openedPanel');
        if (panel && panel !== 'none') {
          var panelElement = $['default']('#' + panel);
          panelElement.panel('close');
          panelElement.remove();
        }

        // This is needed to bubble up events
        return true;
      }
    }
  });

});
efineday('ermes-smart-app/routes/login', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      if (this.get('auth').isAuth()) {
        this.transitionTo('index');
      }
    }
  });

});
efineday('ermes-smart-app/serializers/application', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend({
    primaryKey: '_id'
  });

});
efineday('ermes-smart-app/serializers/parcel', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend({
    primaryKey: 'parcelId'
  });

});
efineday('ermes-smart-app/serializers/user', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTSerializer.extend({
    primaryKey: 'username'
  });

});
efineday('ermes-smart-app/services/auth', ['exports', 'ember', 'moment'], function (exports, Ember, Moment) {

  'use strict';

  exports['default'] = Ember['default'].Service.extend({
    i18n: Ember['default'].inject.service(),

    userLoggedIn: false,
    userId: null,
    token: null,

    init: function init() {
      Moment['default'].locale('en');
      if (localStorage.token && localStorage.userId) {
        this.set('userId', localStorage.userId);
        this.set('token', localStorage.token);
        this.set('userLoggedIn', true);
        if (localStorage.lang) {
          var lang = localStorage.lang;
          this.get('i18n').set('locale', lang);
          if (lang === 'gk') {
            // TODO Change this on the backend
            lang = 'el';
          }
          Moment['default'].locale(lang);
        }
      }
    },

    logIn: function logIn(id, token, lang) {
      // Store session here
      localStorage.userId = id;
      localStorage.token = token;
      this.set('userId', id);
      this.set('token', token);
      this.set('userLoggedIn', true);
      if (!lang || lang === 'undefined') {
        lang = 'en'; //Default locale if missing
      }
      localStorage.lang = lang;
      this.get('i18n').set('locale', lang);
      if (lang === 'gk') {
        // TODO Change this on the backend
        lang = 'el';
      }
      Moment['default'].locale(lang);
    },

    logOut: function logOut() {
      // Remove session here
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('lang');
      this.set('userLoggedIn', false);
      this.set('userId', null);
      this.set('token', null);
    },

    getCurrentUserId: function getCurrentUserId() {
      return this.get('userId');
    },

    isAuth: function isAuth() {
      return this.get('userLoggedIn');
    }
  });

});
efineday('ermes-smart-app/services/i18n', ['exports', 'ember-i18n/services/i18n'], function (exports, i18n) {

	'use strict';



	exports['default'] = i18n['default'];

});
efineday('ermes-smart-app/services/offline-storage', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Service.extend({
    init: function init() {
      this.set('storage', window.localforage.createInstance({
        name: 'productStorage'
      }));
    }
  });

});
efineday('ermes-smart-app/services/parcels', ['exports', 'ember', 'ermes-smart-app/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports['default'] = Ember['default'].Service.extend({
    user: null,
    selectedParcels: null,

    init: function init() {
      this.set('selectedParcels', []);
    },

    // =================================================================
    //          USER
    // =================================================================

    setUser: function setUser(user) {
      this.set('user', user);
      this.set('selectedParcels', []);
    },

    // Useful for loading map layers
    getUserMapInfo: function getUserMapInfo() {
      return config['default'].APP.regionLayers[this.get('user.region')];
    },

    // Retrieve user owned parcels
    getUserParcels: function getUserParcels() {
      return this.get('user.parcels');
    }

  });

});
efineday('ermes-smart-app/services/products', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Service.extend({
    store: Ember['default'].inject.service(),

    init: function init() {
      var products = Ember['default'].RSVP.hash({});
      this.set('products', products);
    },

    /**
     * Product singleton factory, retrieves an existent product or
     * instances a new one if there's not
     * @param productName
     * @returns product
       */
    getProduct: function getProduct(productName) {
      if (this.get('products.' + productName)) {
        return this.get('products.' + productName);
      } else {
        var product = this.get('store').createRecord(productName);
        this.set('products.' + productName, product);
        return product;
      }
    },

    /**
     * Archives actual product instancing a new one
     * @param productName
     * @returns product
       */
    archiveProduct: function archiveProduct(productName) {
      var product = this.get('store').createRecord(productName);
      this.set('products.' + productName, product);
      return product;
    }
  });

});
efineday('ermes-smart-app/services/upload-queue', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Service.extend({
    offlineStorage: Ember['default'].inject.service(),
    store: Ember['default'].inject.service(),
    init: function init() {
      var _this = this;

      // Polling about online status
      this.set('online', navigator.onLine);
      setInterval(function () {
        if (_this.get('online') !== String(navigator.onLine)) {
          _this.set('online', navigator.onLine);
        }
      }, 1000);

      // Daemon stopped by default
      this.set('stopped', true);
    },
    start: function start() {
      var _this2 = this;

      this.get('offlineStorage').get('storage').getItem('upload-pending-products').then(function (prods) {
        if (prods && _this2.get('online')) {
          _this2.set('stopped', false);
          var remainingProducts = prods.compact();
          try {
            prods.forEach(function (offlineProduct, productNumber) {
              var prodElem = offlineProduct.split(':');
              _this2.get('store').findRecord(prodElem[1], prodElem[2]).then(function (product) {
                return new Ember['default'].RSVP.Promise(function (resolve, reject) {
                  // Solution to Ember Data production error, pushes product into store without id
                  if (product.get('id')) {
                    product.save().then(function () {
                      return Ember['default'].debug('Pending product uploaded (' + (productNumber + 1) + '/' + prods.length + ')');
                    });
                    _this2.get('offlineStorage').get('storage').removeItem(offlineProduct);
                    resolve(product);
                  } else {
                    reject(product);
                  }
                });
              })['catch'](function () {
                _this2.get('offlineStorage').get('storage').getItem(offlineProduct).then(function (product) {
                  if (product) {
                    _this2.get('store').createRecord(prodElem[1], product[prodElem[1]]).save().then(function () {
                      Ember['default'].debug('Pending product uploaded (' + (productNumber + 1) + '/' + prods.length + ')');
                    });
                    _this2.get('offlineStorage').get('storage').removeItem(offlineProduct);
                  }
                });
              });

              // Remove actual copy if the requests succeeds or fails it will generate a new one
              remainingProducts.removeObject(offlineProduct);

              // Offline control
              if (!_this2.get('online')) {
                throw new XMLHttpRequestException();
              }
            });
          } catch (e) {}
          _this2.get('offlineStorage').get('storage').setItem('upload-pending-products', remainingProducts);
          _this2.set('stopped', true);
        }
      });
    },
    daemonControl: Ember['default'].observer('online', function () {
      if (this.get('online') && this.get('stopped')) {
        this.start();
      }
    })
  });

});
efineday('ermes-smart-app/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 10
          }
        },
        "moduleName": "ermes-smart-app/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[1,0],[1,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
efineday('ermes-smart-app/templates/cdv-generic-nav-bar', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 4
              },
              "end": {
                "line": 5,
                "column": 4
              }
            },
            "moduleName": "ermes-smart-app/templates/cdv-generic-nav-bar.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("i");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element2);
            return morphs;
          },
          statements: [
            ["element","bind-attr",[],["class",":icon nav.leftButton.icon"],["loc",[null,[4,9],[4,56]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/cdv-generic-nav-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element3);
          morphs[1] = dom.createMorphAt(element3,1,1);
          morphs[2] = dom.createMorphAt(element3,3,3);
          return morphs;
        },
        statements: [
          ["element","action",["leftButton"],[],["loc",[null,[2,10],[2,33]]]],
          ["block","if",[["get","nav.leftButton.icon",["loc",[null,[3,10],[3,29]]]]],[],0,null,["loc",[null,[3,4],[5,11]]]],
          ["content","nav.leftButton.text",["loc",[null,[6,4],[6,27]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/cdv-generic-nav-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h1");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["content","nav.title.text",["loc",[null,[12,4],[12,22]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 18,
                "column": 4
              },
              "end": {
                "line": 20,
                "column": 4
              }
            },
            "moduleName": "ermes-smart-app/templates/cdv-generic-nav-bar.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("i");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element0);
            return morphs;
          },
          statements: [
            ["element","bind-attr",[],["class",":icon nav.rightButton.icon"],["loc",[null,[19,9],[19,57]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 16,
              "column": 0
            },
            "end": {
              "line": 23,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/cdv-generic-nav-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createElementMorph(element1);
          morphs[1] = dom.createMorphAt(element1,1,1);
          morphs[2] = dom.createMorphAt(element1,3,3);
          return morphs;
        },
        statements: [
          ["element","action",["rightButton"],[],["loc",[null,[17,10],[17,34]]]],
          ["block","if",[["get","nav.rightButton.icon",["loc",[null,[18,10],[18,30]]]]],[],0,null,["loc",[null,[18,4],[20,11]]]],
          ["content","nav.rightButton.text",["loc",[null,[21,4],[21,28]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "topLevel": false,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 0
          }
        },
        "moduleName": "ermes-smart-app/templates/cdv-generic-nav-bar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
        morphs[2] = dom.createMorphAt(fragment,4,4,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","nav.leftButton.text",["loc",[null,[1,6],[1,25]]]]],[],0,null,["loc",[null,[1,0],[8,7]]]],
        ["block","if",[["get","nav.title.text",["loc",[null,[10,6],[10,20]]]]],[],1,null,["loc",[null,[10,0],[14,7]]]],
        ["block","if",[["get","nav.rightButton.text",["loc",[null,[16,6],[16,26]]]]],[],2,null,["loc",[null,[16,0],[23,7]]]]
      ],
      locals: [],
      templates: [child0, child1, child2]
    };
  }()));

});
efineday('ermes-smart-app/templates/components/cdv-nav-bar', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "ermes-smart-app/templates/components/cdv-nav-bar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","yield",["loc",[null,[1,0],[1,9]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
efineday('ermes-smart-app/templates/components/ermes-datepicker', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "ermes-smart-app/templates/components/ermes-datepicker.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["content","yield",["loc",[null,[1,0],[1,9]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
efineday('ermes-smart-app/templates/components/ermes-login-buttons', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": false,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 114
          }
        },
        "moduleName": "ermes-smart-app/templates/components/ermes-login-buttons.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["inline","jqm-button",[],["action",["subexpr","action",["openPopup","ermes-login-popup"],[],["loc",[null,[1,20],[1,60]]]],"text",["subexpr","t",["login.text.login"],[],["loc",[null,[1,66],[1,88]]]],"icon","arrow-r"],["loc",[null,[1,0],[1,105]]]],
        ["inline","jqm-button",[],["action",["subexpr","action",["openPopup","ermes-signup-popup"],[],["loc",[null,[2,20],[2,61]]]],"text",["subexpr","t",["login.text.signup"],[],["loc",[null,[2,67],[2,90]]]],"icon","edit","theme","b"],["loc",[null,[2,0],[2,114]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
efineday('ermes-smart-app/templates/components/ermes-login-language', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 72
          }
        },
        "moduleName": "ermes-smart-app/templates/components/ermes-login-language.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","i18n.locale",["loc",[null,[1,19],[1,30]]]]],[],[]],"theme","c","mini","true","options",["subexpr","@mut",[["get","languages",["loc",[null,[1,61],[1,70]]]]],[],[]]],["loc",[null,[1,0],[1,72]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
efineday('ermes-smart-app/templates/components/ermes-login-popup', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": false,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 9,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/components/ermes-login-popup.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(6);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(element0,1,1);
          morphs[2] = dom.createMorphAt(element0,3,3);
          morphs[3] = dom.createMorphAt(element0,5,5);
          morphs[4] = dom.createMorphAt(fragment,3,3,contextualElement);
          morphs[5] = dom.createMorphAt(fragment,5,5,contextualElement);
          return morphs;
        },
        statements: [
          ["element","action",["submit"],["on","submit"],["loc",[null,[2,8],[2,39]]]],
          ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","model.username",["loc",[null,[3,26],[3,40]]]]],[],[]],"placeholder",["subexpr","t",["login.login-p.username-f"],[],["loc",[null,[3,53],[3,83]]]],"required",true,"pattern","[A-Za-z0-9]+"],["loc",[null,[3,4],[3,122]]]],
          ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","model.password",["loc",[null,[4,26],[4,40]]]]],[],[]],"type","password","placeholder",["subexpr","t",["login.login-p.password-f"],[],["loc",[null,[4,69],[4,99]]]],"required",true],["loc",[null,[4,4],[4,115]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["login.login-p.login-btn"],[],["loc",[null,[5,22],[5,51]]]],"icon","check","theme","b"],["loc",[null,[5,4],[5,76]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","error",["loc",[null,[7,23],[7,28]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[7,2],[7,65]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","info",["loc",[null,[8,23],[8,27]]]]],[],[]],"color","blue","animation","fadeIn"],["loc",[null,[8,2],[8,61]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 14
          }
        },
        "moduleName": "ermes-smart-app/templates/components/ermes-login-popup.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","jqm-popup",[],["id",["subexpr","@mut",[["get","pId",["loc",[null,[1,16],[1,19]]]]],[],[]],"title",["subexpr","t",["login.text.login"],[],["loc",[null,[1,26],[1,48]]]],"theme","a","closeButton",true,"dismissible","false"],0,null,["loc",[null,[1,0],[9,14]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/components/ermes-main-logo', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 40
          }
        },
        "moduleName": "ermes-smart-app/templates/components/ermes-main-logo.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("img");
        dom.setAttribute(el1,"src","assets/ermes-images/logo.png");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
efineday('ermes-smart-app/templates/components/ermes-menu-fields', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 4
              },
              "end": {
                "line": 2,
                "column": 53
              }
            },
            "moduleName": "ermes-smart-app/templates/components/ermes-menu-fields.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["inline","t",["fields.text.my-fields"],[],["loc",[null,[2,24],[2,53]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 4
              },
              "end": {
                "line": 5,
                "column": 4
              }
            },
            "moduleName": "ermes-smart-app/templates/components/ermes-menu-fields.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            return morphs;
          },
          statements: [
            ["inline","jqm-anchor",[],["action",["subexpr","action",["showPanel",["get","product.panel",["loc",[null,[4,50],[4,63]]]]],[],["loc",[null,[4,30],[4,64]]]],"corners","false","text",["subexpr","@mut",[["get","product.text",["loc",[null,[4,86],[4,98]]]]],[],[]],"icon","carat-r","iconPos","right"],["loc",[null,[4,10],[4,131]]]]
          ],
          locals: ["product"],
          templates: []
        };
      }());
      return {
        meta: {
          "topLevel": false,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/components/ermes-menu-fields.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","jqm-listdivider",[],[],0,null,["loc",[null,[2,4],[2,73]]]],
          ["block","each",[["get","products",["loc",[null,[3,12],[3,20]]]]],[],1,null,["loc",[null,[3,4],[5,13]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "ermes-smart-app/templates/components/ermes-menu-fields.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","jqm-ulistview",[],["inset","true"],0,null,["loc",[null,[1,0],[6,18]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/components/ermes-menu-options', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 2,
                "column": 70
              }
            },
            "moduleName": "ermes-smart-app/templates/components/ermes-menu-options.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["inline","t",["fields.options-m.title"],["username",["subexpr","@mut",[["get","username",["loc",[null,[2,60],[2,68]]]]],[],[]]],["loc",[null,[2,22],[2,70]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 2
              },
              "end": {
                "line": 5,
                "column": 2
              }
            },
            "moduleName": "ermes-smart-app/templates/components/ermes-menu-options.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            return morphs;
          },
          statements: [
            ["inline","jqm-anchor",[],["action",["subexpr","action",[["get","option.action",["loc",[null,[4,38],[4,51]]]],["get","option.actionParam",["loc",[null,[4,52],[4,70]]]]],[],["loc",[null,[4,30],[4,71]]]],"corners","false","text",["subexpr","@mut",[["get","option.text",["loc",[null,[4,93],[4,104]]]]],[],[]],"icon",["subexpr","@mut",[["get","option.icon",["loc",[null,[4,110],[4,121]]]]],[],[]],"iconPos","left","isShown",["subexpr","@mut",[["get","option.isShown",["loc",[null,[4,145],[4,159]]]]],[],[]]],["loc",[null,[4,10],[4,161]]]]
          ],
          locals: ["option"],
          templates: []
        };
      }());
      return {
        meta: {
          "topLevel": false,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/components/ermes-menu-options.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","jqm-listdivider",[],[],0,null,["loc",[null,[2,2],[2,90]]]],
          ["block","each",[["get","options",["loc",[null,[3,10],[3,17]]]]],[],1,null,["loc",[null,[3,2],[5,11]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 18
          }
        },
        "moduleName": "ermes-smart-app/templates/components/ermes-menu-options.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","jqm-ulistview",[],["inset","true"],0,null,["loc",[null,[1,0],[6,18]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/components/ermes-message', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/components/ermes-message.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"align","center");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          var el3 = dom.createElement("b");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'style');
          morphs[1] = dom.createAttrMorph(element0, 'class');
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [1, 0]),0,0);
          return morphs;
        },
        statements: [
          ["attribute","style",["concat",["color: ",["get","color",["loc",[null,[2,38],[2,43]]]]]]],
          ["attribute","class",["concat",["animated ",["get","animation",["loc",[null,[2,65],[2,74]]]]]]],
          ["content","text",["loc",[null,[3,12],[3,20]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "ermes-smart-app/templates/components/ermes-message.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","if",[["get","text",["loc",[null,[1,6],[1,10]]]]],[],0,null,["loc",[null,[1,0],[5,7]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/components/ermes-side-buttons', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/components/ermes-side-buttons.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]),1,1);
          return morphs;
        },
        statements: [
          ["inline","jqm-anchor",[],["title",["subexpr","@mut",[["get","button.title",["loc",[null,[4,25],[4,37]]]]],[],[]],"action",["subexpr","@mut",[["get","button.action",["loc",[null,[4,45],[4,58]]]]],[],[]],"inline","true","allCorners","true","icon",["subexpr","@mut",[["get","button.icon",["loc",[null,[4,96],[4,107]]]]],[],[]],"iconPos","notext","theme","b","class",["subexpr","@mut",[["get","button.class",["loc",[null,[4,141],[4,153]]]]],[],[]]],["loc",[null,[4,6],[4,155]]]]
        ],
        locals: ["button"],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "ermes-smart-app/templates/components/ermes-side-buttons.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","each",[["get","buttons",["loc",[null,[1,8],[1,15]]]]],[],0,null,["loc",[null,[1,0],[7,9]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/components/ermes-signup-popup', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 13,
                "column": 2
              },
              "end": {
                "line": 16,
                "column": 2
              }
            },
            "moduleName": "ermes-smart-app/templates/components/ermes-signup-popup.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            dom.setAttribute(el1,"align","center");
            dom.setAttribute(el1,"class","animated fadeInDown");
            dom.setAttribute(el1,"style","color: #669933;");
            var el2 = dom.createElement("b");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode(".");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("br");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode(" ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("a");
            dom.setAttribute(el3,"href","");
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1, 0]);
            var element1 = dom.childAt(element0, [6]);
            var morphs = new Array(4);
            morphs[0] = dom.createMorphAt(element0,0,0);
            morphs[1] = dom.createMorphAt(element0,4,4);
            morphs[2] = dom.createElementMorph(element1);
            morphs[3] = dom.createMorphAt(element1,0,0);
            return morphs;
          },
          statements: [
            ["inline","t",["panel.notification.welcome"],["username",["subexpr","@mut",[["get","model.username",["loc",[null,[14,119],[14,133]]]]],[],[]]],["loc",[null,[14,77],[14,135]]]],
            ["inline","t",["panel.notification.login-allowed"],[],["loc",[null,[15,8],[15,48]]]],
            ["element","action",["showLoginPopup"],[],["loc",[null,[15,60],[15,87]]]],
            ["inline","t",["login.text.login"],[],["loc",[null,[15,88],[15,112]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "topLevel": false,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 17,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/components/ermes-signup-popup.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [1]);
          var morphs = new Array(11);
          morphs[0] = dom.createElementMorph(element2);
          morphs[1] = dom.createMorphAt(element2,1,1);
          morphs[2] = dom.createMorphAt(element2,3,3);
          morphs[3] = dom.createMorphAt(element2,5,5);
          morphs[4] = dom.createMorphAt(element2,7,7);
          morphs[5] = dom.createMorphAt(element2,9,9);
          morphs[6] = dom.createMorphAt(element2,11,11);
          morphs[7] = dom.createMorphAt(element2,13,13);
          morphs[8] = dom.createMorphAt(fragment,3,3,contextualElement);
          morphs[9] = dom.createMorphAt(fragment,5,5,contextualElement);
          morphs[10] = dom.createMorphAt(fragment,7,7,contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["element","action",["submit"],["on","submit"],["loc",[null,[2,8],[2,39]]]],
          ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","model.username",["loc",[null,[3,26],[3,40]]]]],[],[]],"placeholder",["subexpr","t",["login.signup-p.username-f"],[],["loc",[null,[3,53],[3,84]]]],"required",true,"pattern","[A-Za-z0-9]+"],["loc",[null,[3,4],[3,123]]]],
          ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","model.password",["loc",[null,[4,26],[4,40]]]]],[],[]],"type","password","placeholder",["subexpr","t",["login.signup-p.password-f"],[],["loc",[null,[4,69],[4,100]]]],"required",true],["loc",[null,[4,4],[4,116]]]],
          ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","model.rPassword",["loc",[null,[5,26],[5,41]]]]],[],[]],"type","password","placeholder",["subexpr","t",["login.signup-p.repeat-password-f"],[],["loc",[null,[5,70],[5,108]]]],"required",true],["loc",[null,[5,4],[5,124]]]],
          ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","model.email",["loc",[null,[6,26],[6,37]]]]],[],[]],"type","email","placeholder",["subexpr","t",["login.signup-p.email-f"],[],["loc",[null,[6,63],[6,91]]]],"required",true],["loc",[null,[6,4],[6,107]]]],
          ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","model.rEmail",["loc",[null,[7,26],[7,38]]]]],[],[]],"type","email","placeholder",["subexpr","t",["login.signup-p.repeat-email-f"],[],["loc",[null,[7,64],[7,99]]]],"required",true],["loc",[null,[7,4],[7,115]]]],
          ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","model.region",["loc",[null,[8,23],[8,35]]]]],[],[]],"theme","d","options",["subexpr","@mut",[["get","regions",["loc",[null,[8,54],[8,61]]]]],[],[]]],["loc",[null,[8,4],[8,63]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["login.signup-p.signup-btn"],[],["loc",[null,[9,22],[9,53]]]],"icon","check","theme","b","disabled",["subexpr","@mut",[["get","cantSubmit",["loc",[null,[9,86],[9,96]]]]],[],[]]],["loc",[null,[9,4],[9,98]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","error",["loc",[null,[11,23],[11,28]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[11,2],[11,65]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","info",["loc",[null,[12,23],[12,27]]]]],[],[]],"color","blue","animation","fadeIn"],["loc",[null,[12,2],[12,61]]]],
          ["block","if",[["get","success",["loc",[null,[13,8],[13,15]]]]],[],0,null,["loc",[null,[13,2],[16,9]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 14
          }
        },
        "moduleName": "ermes-smart-app/templates/components/ermes-signup-popup.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","jqm-popup",[],["id",["subexpr","@mut",[["get","pId",["loc",[null,[1,16],[1,19]]]]],[],[]],"title",["subexpr","t",["login.text.signup"],[],["loc",[null,[1,26],[1,49]]]],"theme","a","closeButton",true,"dismissible","false"],0,null,["loc",[null,[1,0],[17,14]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/components/esri-map', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 9
          }
        },
        "moduleName": "ermes-smart-app/templates/components/esri-map.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["content","yield",["loc",[null,[1,0],[1,9]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
efineday('ermes-smart-app/templates/index/about', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": false,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index/about.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h2");
          var el2 = dom.createTextNode("ERMES Smart App");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("img");
          dom.setAttribute(el1,"src","assets/ermes-images/logo.png");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("©2015");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [5]),0,0);
          return morphs;
        },
        statements: [
          ["inline","t",["panel.about.content"],[],["loc",[null,[4,5],[4,32]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "ermes-smart-app/templates/index/about.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","ermes-panel",[],["id",["subexpr","@mut",[["get","panelId",["loc",[null,[1,18],[1,25]]]]],[],[]],"title",["subexpr","t",["fields.options-m.about"],[],["loc",[null,[1,32],[1,60]]]]],0,null,["loc",[null,[1,0],[6,16]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index/agrochemicals', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 20,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index/agrochemicals.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element0, [5]);
          var element3 = dom.childAt(element0, [7]);
          var morphs = new Array(11);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
          morphs[2] = dom.createMorphAt(element1,3,3);
          morphs[3] = dom.createMorphAt(element0,3,3);
          morphs[4] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
          morphs[5] = dom.createMorphAt(element2,3,3);
          morphs[6] = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
          morphs[7] = dom.createMorphAt(element3,3,3);
          morphs[8] = dom.createMorphAt(element0,9,9);
          morphs[9] = dom.createMorphAt(element0,11,11);
          morphs[10] = dom.createMorphAt(element0,13,13);
          return morphs;
        },
        statements: [
          ["element","action",["submit"],["on","submit"],["loc",[null,[2,8],[2,39]]]],
          ["inline","t",["panel.agrochemicals.date"],[],["loc",[null,[4,12],[4,44]]]],
          ["inline","ermes-datepicker",[],["value",["subexpr","@mut",[["get","model.date",["loc",[null,[5,31],[5,41]]]]],[],[]]],["loc",[null,[5,6],[5,43]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","dateError",["loc",[null,[7,25],[7,34]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[7,4],[7,71]]]],
          ["inline","t",["panel.agrochemicals.product"],[],["loc",[null,[9,12],[9,47]]]],
          ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","model.product",["loc",[null,[10,25],[10,38]]]]],[],[]],"theme","d","options",["subexpr","@mut",[["get","products",["loc",[null,[10,57],[10,65]]]]],[],[]]],["loc",[null,[10,6],[10,67]]]],
          ["inline","t",["panel.agrochemicals.quantity"],[],["loc",[null,[13,12],[13,48]]]],
          ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","model.amount",["loc",[null,[14,28],[14,40]]]]],[],[]],"type","number","step",0.01,"placeholder",["subexpr","t",["panel.agrochemicals.quantity-unit"],[],["loc",[null,[14,77],[14,116]]]],"required",true],["loc",[null,[14,6],[14,132]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["fields.text.add-new"],[],["loc",[null,[16,22],[16,47]]]],"theme","b"],["loc",[null,[16,4],[16,59]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","parcelError",["loc",[null,[17,25],[17,36]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[17,4],[17,73]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","info",["loc",[null,[18,25],[18,29]]]]],[],[]],"color","blue","animation","fadeInDown"],["loc",[null,[18,4],[18,67]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 16
          }
        },
        "moduleName": "ermes-smart-app/templates/index/agrochemicals.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","ermes-panel",[],["id",["subexpr","@mut",[["get","panelId",["loc",[null,[1,18],[1,25]]]]],[],[]],"title",["subexpr","t",["fields.ui-special.agrochemicals"],[],["loc",[null,[1,32],[1,69]]]]],0,null,["loc",[null,[1,0],[20,16]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index/cannot-edit', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 4
              },
              "end": {
                "line": 5,
                "column": 4
              }
            },
            "moduleName": "ermes-smart-app/templates/index/cannot-edit.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("h1");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            return morphs;
          },
          statements: [
            ["inline","t",["panel.notification.offline"],[],["loc",[null,[4,12],[4,46]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 13,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index/cannot-edit.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","ermes-inner-window animated bounceInLeft");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"style","padding: 1em");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"align","right");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(element0,1,1);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]),1,1);
          return morphs;
        },
        statements: [
          ["block","jqm-component",[],["role","header"],0,null,["loc",[null,[3,4],[5,22]]]],
          ["inline","t",["panel.notification.offline-parcels"],[],["loc",[null,[7,6],[7,48]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["panel.notification.got-it"],[],["loc",[null,[10,24],[10,55]]]],"action","dismiss","inline","true","mini","true","theme","b"],["loc",[null,[10,6],[10,110]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 18
          }
        },
        "moduleName": "ermes-smart-app/templates/index/cannot-edit.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","jqm-component",[],[],0,null,["loc",[null,[1,0],[13,18]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index/crop-info', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 27,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index/crop-info.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element0, [3]);
          var element3 = dom.childAt(element0, [5]);
          var element4 = dom.childAt(element0, [7]);
          var element5 = dom.childAt(element0, [9]);
          var morphs = new Array(14);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
          morphs[2] = dom.createMorphAt(element1,3,3);
          morphs[3] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
          morphs[4] = dom.createMorphAt(element2,3,3);
          morphs[5] = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
          morphs[6] = dom.createMorphAt(element3,3,3);
          morphs[7] = dom.createMorphAt(dom.childAt(element4, [1]),0,0);
          morphs[8] = dom.createMorphAt(element4,3,3);
          morphs[9] = dom.createMorphAt(dom.childAt(element5, [1]),0,0);
          morphs[10] = dom.createMorphAt(element5,3,3);
          morphs[11] = dom.createMorphAt(element0,11,11);
          morphs[12] = dom.createMorphAt(element0,13,13);
          morphs[13] = dom.createMorphAt(element0,15,15);
          return morphs;
        },
        statements: [
          ["element","action",["submit"],["on","submit"],["loc",[null,[2,8],[2,39]]]],
          ["inline","t",["panel.crop-info.crop-type"],[],["loc",[null,[4,12],[4,45]]]],
          ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","model.cropType",["loc",[null,[5,25],[5,39]]]]],[],[]],"theme","d","options",["subexpr","@mut",[["get","cropTypes",["loc",[null,[5,58],[5,67]]]]],[],[]]],["loc",[null,[5,6],[5,69]]]],
          ["inline","t",["panel.crop-info.rice-variety"],[],["loc",[null,[8,12],[8,48]]]],
          ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","model.riceVariety",["loc",[null,[9,25],[9,42]]]]],[],[]],"theme","d","options",["subexpr","@mut",[["get","riceVarieties",["loc",[null,[9,61],[9,74]]]]],[],[]],"isDisabled",["subexpr","@mut",[["get","notIsRice",["loc",[null,[9,86],[9,95]]]]],[],[]]],["loc",[null,[9,6],[9,97]]]],
          ["inline","t",["panel.crop-info.pudding"],[],["loc",[null,[12,14],[12,45]]]],
          ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","model.pudding",["loc",[null,[13,25],[13,38]]]]],[],[]],"theme","d","options",["subexpr","@mut",[["get","puddings",["loc",[null,[13,57],[13,65]]]]],[],[]],"isDisabled",["subexpr","@mut",[["get","notIsRice",["loc",[null,[13,77],[13,86]]]]],[],[]]],["loc",[null,[13,6],[13,88]]]],
          ["inline","t",["panel.crop-info.sowing-practice"],[],["loc",[null,[16,12],[16,51]]]],
          ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","model.sowingPractice",["loc",[null,[17,25],[17,45]]]]],[],[]],"theme","d","options",["subexpr","@mut",[["get","sowingPractices",["loc",[null,[17,64],[17,79]]]]],[],[]],"isDisabled",["subexpr","@mut",[["get","notIsRice",["loc",[null,[17,91],[17,100]]]]],[],[]]],["loc",[null,[17,6],[17,102]]]],
          ["inline","t",["panel.crop-info.date"],[],["loc",[null,[20,12],[20,40]]]],
          ["inline","ermes-datepicker",[],["value",["subexpr","@mut",[["get","model.date",["loc",[null,[21,31],[21,41]]]]],[],[]]],["loc",[null,[21,6],[21,43]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["fields.text.add-new"],[],["loc",[null,[23,22],[23,47]]]],"theme","b"],["loc",[null,[23,4],[23,59]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","parcelError",["loc",[null,[24,25],[24,36]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[24,4],[24,73]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","info",["loc",[null,[25,25],[25,29]]]]],[],[]],"color","blue","animation","fadeInDown"],["loc",[null,[25,4],[25,67]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 27,
            "column": 16
          }
        },
        "moduleName": "ermes-smart-app/templates/index/crop-info.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","ermes-panel",[],["id",["subexpr","@mut",[["get","panelId",["loc",[null,[1,18],[1,25]]]]],[],[]],"title",["subexpr","t",["fields.text.crop-info"],[],["loc",[null,[1,32],[1,59]]]]],0,null,["loc",[null,[1,0],[27,16]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index/crop-phenology', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 21,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index/crop-phenology.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element0, [5]);
          var element3 = dom.childAt(element0, [7]);
          var morphs = new Array(12);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
          morphs[2] = dom.createMorphAt(element1,3,3);
          morphs[3] = dom.createMorphAt(element0,3,3);
          morphs[4] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
          morphs[5] = dom.createMorphAt(element2,3,3);
          morphs[6] = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
          morphs[7] = dom.createMorphAt(element3,3,3);
          morphs[8] = dom.createMorphAt(element0,9,9);
          morphs[9] = dom.createMorphAt(element0,11,11);
          morphs[10] = dom.createMorphAt(element0,13,13);
          morphs[11] = dom.createMorphAt(element0,15,15);
          return morphs;
        },
        statements: [
          ["element","action",["submit"],["on","submit"],["loc",[null,[2,8],[2,39]]]],
          ["inline","t",["panel.crop-phenology.date"],[],["loc",[null,[4,12],[4,45]]]],
          ["inline","ermes-datepicker",[],["value",["subexpr","@mut",[["get","model.date",["loc",[null,[5,31],[5,41]]]]],[],[]],"required",true],["loc",[null,[5,6],[5,57]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","dateError",["loc",[null,[7,25],[7,34]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[7,4],[7,71]]]],
          ["inline","t",["panel.crop-phenology.development-stage"],[],["loc",[null,[9,12],[9,58]]]],
          ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","model.developmentStage",["loc",[null,[10,25],[10,47]]]]],[],[]],"theme","d","options",["subexpr","@mut",[["get","developmentStages",["loc",[null,[10,66],[10,83]]]]],[],[]]],["loc",[null,[10,6],[10,85]]]],
          ["inline","t",["panel.crop-phenology.bbch"],[],["loc",[null,[13,12],[13,45]]]],
          ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","model.growthStage",["loc",[null,[14,25],[14,42]]]]],[],[]],"theme","d","options",["subexpr","@mut",[["get","phenologyGrowth",["loc",[null,[14,61],[14,76]]]]],[],[]]],["loc",[null,[14,6],[14,78]]]],
          ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","model.code",["loc",[null,[16,23],[16,33]]]]],[],[]],"theme","d","options",["subexpr","@mut",[["get","actualPhenologyCodes",["loc",[null,[16,52],[16,72]]]]],[],[]],"isDisabled",["subexpr","@mut",[["get","hasNoStage",["loc",[null,[16,84],[16,94]]]]],[],[]]],["loc",[null,[16,4],[16,96]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["fields.text.add-new"],[],["loc",[null,[17,22],[17,47]]]],"theme","b"],["loc",[null,[17,4],[17,59]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","parcelError",["loc",[null,[18,25],[18,36]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[18,4],[18,73]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","info",["loc",[null,[19,25],[19,29]]]]],[],[]],"color","blue","animation","fadeInDown"],["loc",[null,[19,4],[19,67]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 21,
            "column": 16
          }
        },
        "moduleName": "ermes-smart-app/templates/index/crop-phenology.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","ermes-panel",[],["id",["subexpr","@mut",[["get","panelId",["loc",[null,[1,18],[1,25]]]]],[],[]],"title",["subexpr","t",["fields.text.crop-phenology"],[],["loc",[null,[1,32],[1,64]]]]],0,null,["loc",[null,[1,0],[21,16]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index/diseases', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 28,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index/diseases.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element0, [5]);
          var element3 = dom.childAt(element0, [7]);
          var element4 = dom.childAt(element0, [9]);
          var element5 = dom.childAt(element0, [11]);
          var morphs = new Array(15);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
          morphs[2] = dom.createMorphAt(element1,3,3);
          morphs[3] = dom.createMorphAt(element0,3,3);
          morphs[4] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
          morphs[5] = dom.createMorphAt(element2,3,3);
          morphs[6] = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
          morphs[7] = dom.createMorphAt(element3,3,3);
          morphs[8] = dom.createMorphAt(dom.childAt(element4, [1]),0,0);
          morphs[9] = dom.createMorphAt(element4,3,3);
          morphs[10] = dom.createMorphAt(dom.childAt(element5, [1]),0,0);
          morphs[11] = dom.createMorphAt(element5,3,3);
          morphs[12] = dom.createMorphAt(element0,13,13);
          morphs[13] = dom.createMorphAt(element0,15,15);
          morphs[14] = dom.createMorphAt(element0,17,17);
          return morphs;
        },
        statements: [
          ["element","action",["submit"],["on","submit"],["loc",[null,[2,8],[2,39]]]],
          ["inline","t",["panel.diseases.date"],[],["loc",[null,[4,12],[4,39]]]],
          ["inline","ermes-datepicker",[],["value",["subexpr","@mut",[["get","model.date",["loc",[null,[5,31],[5,41]]]]],[],[]]],["loc",[null,[5,6],[5,43]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","dateError",["loc",[null,[7,25],[7,34]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[7,4],[7,71]]]],
          ["inline","t",["panel.diseases.name"],[],["loc",[null,[9,12],[9,39]]]],
          ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","model.name",["loc",[null,[10,25],[10,35]]]]],[],[]],"theme","d","options",["subexpr","@mut",[["get","names",["loc",[null,[10,54],[10,59]]]]],[],[]]],["loc",[null,[10,6],[10,61]]]],
          ["inline","t",["panel.diseases.comment"],[],["loc",[null,[13,12],[13,42]]]],
          ["inline","jqm-textarea",[],["value",["subexpr","@mut",[["get","model.comments",["loc",[null,[14,27],[14,41]]]]],[],[]]],["loc",[null,[14,6],[14,43]]]],
          ["inline","t",["panel.diseases.picture"],[],["loc",[null,[17,12],[17,42]]]],
          ["inline","jqm-fileinput",[],["accept","image/*;capture=camera"],["loc",[null,[18,6],[18,55]]]],
          ["inline","t",["panel.diseases.damage"],[],["loc",[null,[21,12],[21,41]]]],
          ["inline","jqm-slider",[],["value",["subexpr","@mut",[["get","model.damage",["loc",[null,[22,25],[22,37]]]]],[],[]],"min",1,"max",10,"theme","d"],["loc",[null,[22,6],[22,62]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["fields.text.add-new"],[],["loc",[null,[24,22],[24,47]]]],"theme","b"],["loc",[null,[24,4],[24,59]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","parcelError",["loc",[null,[25,25],[25,36]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[25,4],[25,73]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","info",["loc",[null,[26,25],[26,29]]]]],[],[]],"color","blue","animation","fadeInDown"],["loc",[null,[26,4],[26,67]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 28,
            "column": 16
          }
        },
        "moduleName": "ermes-smart-app/templates/index/diseases.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","ermes-panel",[],["id",["subexpr","@mut",[["get","panelId",["loc",[null,[1,18],[1,25]]]]],[],[]],"title",["subexpr","t",["fields.text.diseases"],[],["loc",[null,[1,32],[1,58]]]]],0,null,["loc",[null,[1,0],[28,16]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index/fertilizers', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 32,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index/fertilizers.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element0, [5]);
          var element3 = dom.childAt(element0, [7]);
          var element4 = dom.childAt(element0, [9]);
          var element5 = dom.childAt(element0, [11]);
          var element6 = dom.childAt(element0, [13]);
          var morphs = new Array(17);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
          morphs[2] = dom.createMorphAt(element1,3,3);
          morphs[3] = dom.createMorphAt(element0,3,3);
          morphs[4] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
          morphs[5] = dom.createMorphAt(element2,3,3);
          morphs[6] = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
          morphs[7] = dom.createMorphAt(element3,3,3);
          morphs[8] = dom.createMorphAt(dom.childAt(element4, [1]),0,0);
          morphs[9] = dom.createMorphAt(element4,3,3);
          morphs[10] = dom.createMorphAt(dom.childAt(element5, [1]),0,0);
          morphs[11] = dom.createMorphAt(element5,3,3);
          morphs[12] = dom.createMorphAt(dom.childAt(element6, [1]),0,0);
          morphs[13] = dom.createMorphAt(element6,3,3);
          morphs[14] = dom.createMorphAt(element0,15,15);
          morphs[15] = dom.createMorphAt(element0,17,17);
          morphs[16] = dom.createMorphAt(element0,19,19);
          return morphs;
        },
        statements: [
          ["element","action",["submit"],["on","submit"],["loc",[null,[2,8],[2,39]]]],
          ["inline","t",["panel.fertilizers.date"],[],["loc",[null,[4,12],[4,42]]]],
          ["inline","ermes-datepicker",[],["value",["subexpr","@mut",[["get","model.date",["loc",[null,[5,31],[5,41]]]]],[],[]]],["loc",[null,[5,6],[5,43]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","dateError",["loc",[null,[7,25],[7,34]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[7,4],[7,71]]]],
          ["inline","t",["panel.fertilizers.product"],[],["loc",[null,[9,12],[9,45]]]],
          ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","model.product",["loc",[null,[10,25],[10,38]]]]],[],[]],"theme","d","options",["subexpr","@mut",[["get","products",["loc",[null,[10,57],[10,65]]]]],[],[]]],["loc",[null,[10,6],[10,67]]]],
          ["inline","t",["panel.fertilizers.quantity"],[],["loc",[null,[13,12],[13,46]]]],
          ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","model.quantity",["loc",[null,[14,28],[14,42]]]]],[],[]],"type","number","min",0,"step",0.01,"placeholder",["subexpr","t",["panel.fertilizers.quantity-unit"],[],["loc",[null,[14,85],[14,122]]]],"required",true],["loc",[null,[14,6],[14,138]]]],
          ["inline","t",["panel.fertilizers.nitrogen"],[],["loc",[null,[17,12],[17,46]]]],
          ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","model.nitrogenContent",["loc",[null,[18,28],[18,49]]]]],[],[]],"type","number","min",0,"step",0.01,"placeholder",["subexpr","t",["panel.fertilizers.nitrogen-unit"],[],["loc",[null,[18,92],[18,129]]]]],["loc",[null,[18,6],[18,131]]]],
          ["inline","t",["panel.fertilizers.phosphorus"],[],["loc",[null,[21,12],[21,48]]]],
          ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","model.phosphorusContent",["loc",[null,[22,28],[22,51]]]]],[],[]],"type","number","min",0,"step",0.01,"placeholder",["subexpr","t",["panel.fertilizers.phosphorus-unit"],[],["loc",[null,[22,94],[22,133]]]]],["loc",[null,[22,6],[22,135]]]],
          ["inline","t",["panel.fertilizers.potassium"],[],["loc",[null,[25,12],[25,47]]]],
          ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","model.potassiumContent",["loc",[null,[26,28],[26,50]]]]],[],[]],"type","number","min",0,"step",0.01,"placeholder",["subexpr","t",["panel.fertilizers.potassium-unit"],[],["loc",[null,[26,93],[26,131]]]]],["loc",[null,[26,6],[26,133]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["fields.text.add-new"],[],["loc",[null,[28,22],[28,47]]]],"theme","b"],["loc",[null,[28,4],[28,59]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","parcelError",["loc",[null,[29,25],[29,36]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[29,4],[29,73]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","info",["loc",[null,[30,25],[30,29]]]]],[],[]],"color","blue","animation","fadeInDown"],["loc",[null,[30,4],[30,67]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 32,
            "column": 16
          }
        },
        "moduleName": "ermes-smart-app/templates/index/fertilizers.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","ermes-panel",[],["id",["subexpr","@mut",[["get","panelId",["loc",[null,[1,18],[1,25]]]]],[],[]],"title",["subexpr","t",["fields.text.fertilizers"],[],["loc",[null,[1,32],[1,61]]]]],0,null,["loc",[null,[1,0],[32,16]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index/irrigation', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 17,
                "column": 4
              },
              "end": {
                "line": 22,
                "column": 4
              }
            },
            "moduleName": "ermes-smart-app/templates/index/irrigation.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("label");
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("span");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
            morphs[1] = dom.createMorphAt(element2,3,3);
            return morphs;
          },
          statements: [
            ["inline","t",["panel.irrigation.quantity"],[],["loc",[null,[19,14],[19,47]]]],
            ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","model.waterQuantity",["loc",[null,[20,30],[20,49]]]]],[],[]],"type","number","min",0,"step",0.01,"placeholder",["subexpr","t",["panel.irrigation.quantity-unit-mm"],[],["loc",[null,[20,92],[20,131]]]],"required",true],["loc",[null,[20,8],[20,147]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 22,
                "column": 4
              },
              "end": {
                "line": 31,
                "column": 4
              }
            },
            "moduleName": "ermes-smart-app/templates/index/irrigation.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("label");
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("span");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("label");
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("span");
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var element1 = dom.childAt(fragment, [3]);
            var morphs = new Array(4);
            morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
            morphs[1] = dom.createMorphAt(element0,3,3);
            morphs[2] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
            morphs[3] = dom.createMorphAt(element1,3,3);
            return morphs;
          },
          statements: [
            ["inline","t",["panel.irrigation.quantity"],[],["loc",[null,[24,14],[24,47]]]],
            ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","model.waterQuantity",["loc",[null,[25,30],[25,49]]]]],[],[]],"type","number","min",0,"step",0.01,"placeholder",["subexpr","t",["panel.irrigation.quantity-unit-m3"],[],["loc",[null,[25,92],[25,131]]]],"required",true],["loc",[null,[25,8],[25,147]]]],
            ["inline","t",["panel.irrigation.hours"],[],["loc",[null,[28,14],[28,44]]]],
            ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","model.waterHours",["loc",[null,[29,30],[29,46]]]]],[],[]],"type","number","min",0,"step",1,"placeholder",["subexpr","t",["panel.irrigation.hours-unit"],[],["loc",[null,[29,86],[29,119]]]],"required",true],["loc",[null,[29,8],[29,135]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 40,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index/irrigation.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1]);
          var element4 = dom.childAt(element3, [1]);
          var element5 = dom.childAt(element3, [5]);
          var element6 = dom.childAt(element3, [9]);
          var element7 = dom.childAt(element3, [13]);
          var morphs = new Array(15);
          morphs[0] = dom.createElementMorph(element3);
          morphs[1] = dom.createMorphAt(dom.childAt(element4, [1]),0,0);
          morphs[2] = dom.createMorphAt(element4,3,3);
          morphs[3] = dom.createMorphAt(element3,3,3);
          morphs[4] = dom.createMorphAt(dom.childAt(element5, [1]),0,0);
          morphs[5] = dom.createMorphAt(element5,3,3);
          morphs[6] = dom.createMorphAt(element3,7,7);
          morphs[7] = dom.createMorphAt(dom.childAt(element6, [1]),0,0);
          morphs[8] = dom.createMorphAt(element6,3,3);
          morphs[9] = dom.createMorphAt(element3,11,11);
          morphs[10] = dom.createMorphAt(dom.childAt(element7, [1]),0,0);
          morphs[11] = dom.createMorphAt(element7,3,3);
          morphs[12] = dom.createMorphAt(element3,15,15);
          morphs[13] = dom.createMorphAt(element3,17,17);
          morphs[14] = dom.createMorphAt(element3,19,19);
          return morphs;
        },
        statements: [
          ["element","action",["submit"],["on","submit"],["loc",[null,[2,8],[2,39]]]],
          ["inline","t",["panel.irrigation.start-date"],[],["loc",[null,[4,12],[4,47]]]],
          ["inline","ermes-datepicker",[],["value",["subexpr","@mut",[["get","model.startDate",["loc",[null,[5,31],[5,46]]]]],[],[]]],["loc",[null,[5,6],[5,48]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","startDateError",["loc",[null,[7,25],[7,39]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[7,4],[7,76]]]],
          ["inline","t",["panel.irrigation.end-date"],[],["loc",[null,[9,12],[9,45]]]],
          ["inline","ermes-datepicker",[],["value",["subexpr","@mut",[["get","model.endDate",["loc",[null,[10,31],[10,44]]]]],[],[]]],["loc",[null,[10,6],[10,46]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","endDateError",["loc",[null,[12,25],[12,37]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[12,4],[12,74]]]],
          ["inline","t",["panel.irrigation.measure"],[],["loc",[null,[14,12],[14,44]]]],
          ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","model.quantityOfWaterMeasure",["loc",[null,[15,25],[15,53]]]]],[],[]],"theme","d","options",["subexpr","@mut",[["get","measures",["loc",[null,[15,72],[15,80]]]]],[],[]]],["loc",[null,[15,6],[15,82]]]],
          ["block","if",[["get","hasMM",["loc",[null,[17,10],[17,15]]]]],[],0,1,["loc",[null,[17,4],[31,11]]]],
          ["inline","t",["panel.irrigation.depth"],[],["loc",[null,[33,12],[33,42]]]],
          ["inline","jqm-slider",[],["value",["subexpr","@mut",[["get","model.waterDepth",["loc",[null,[34,25],[34,41]]]]],[],[]],"min",0,"max",100,"theme","d"],["loc",[null,[34,6],[34,67]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["fields.text.add-new"],[],["loc",[null,[36,22],[36,47]]]],"theme","b"],["loc",[null,[36,4],[36,59]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","parcelError",["loc",[null,[37,25],[37,36]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[37,4],[37,73]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","info",["loc",[null,[38,25],[38,29]]]]],[],[]],"color","blue","animation","fadeInDown"],["loc",[null,[38,4],[38,67]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 40,
            "column": 16
          }
        },
        "moduleName": "ermes-smart-app/templates/index/irrigation.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","ermes-panel",[],["id",["subexpr","@mut",[["get","panelId",["loc",[null,[1,18],[1,25]]]]],[],[]],"title",["subexpr","t",["fields.text.irrigation"],[],["loc",[null,[1,32],[1,60]]]]],0,null,["loc",[null,[1,0],[40,16]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index/observation', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 16,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index/observation.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element0, [3]);
          var morphs = new Array(9);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
          morphs[2] = dom.createMorphAt(element1,3,3);
          morphs[3] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
          morphs[4] = dom.createMorphAt(element2,3,3);
          morphs[5] = dom.createMorphAt(element0,5,5);
          morphs[6] = dom.createMorphAt(element0,7,7);
          morphs[7] = dom.createMorphAt(element0,9,9);
          morphs[8] = dom.createMorphAt(element0,11,11);
          return morphs;
        },
        statements: [
          ["element","action",["submit"],["on","submit"],["loc",[null,[2,8],[2,39]]]],
          ["inline","t",["panel.observation.comment"],[],["loc",[null,[4,12],[4,45]]]],
          ["inline","jqm-textarea",[],["value",["subexpr","@mut",[["get","model.comments",["loc",[null,[5,27],[5,41]]]]],[],[]]],["loc",[null,[5,6],[5,43]]]],
          ["inline","t",["panel.observation.picture"],[],["loc",[null,[8,12],[8,45]]]],
          ["inline","jqm-fileinput",[],["files",["subexpr","@mut",[["get","files",["loc",[null,[9,28],[9,33]]]]],[],[]],"accept","image/*;capture=camera"],["loc",[null,[9,6],[9,67]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","fileError",["loc",[null,[11,25],[11,34]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[11,4],[11,71]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["panel.observation.send-btn"],[],["loc",[null,[12,22],[12,54]]]],"theme","b","icon","camera","iconPos","left"],["loc",[null,[12,4],[12,95]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","parcelError",["loc",[null,[13,25],[13,36]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[13,4],[13,73]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","info",["loc",[null,[14,25],[14,29]]]]],[],[]],"color","blue","animation","fadeInDown"],["loc",[null,[14,4],[14,67]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 16
          }
        },
        "moduleName": "ermes-smart-app/templates/index/observation.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","ermes-panel",[],["panelId",["subexpr","@mut",[["get","panelId",["loc",[null,[1,23],[1,30]]]]],[],[]],"title",["subexpr","t",["fields.text.observation"],[],["loc",[null,[1,37],[1,66]]]]],0,null,["loc",[null,[1,0],[16,16]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index/parcel-info', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "topLevel": null,
              "revision": "Ember@2.1.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 24,
                  "column": 6
                },
                "end": {
                  "line": 29,
                  "column": 6
                }
              },
              "moduleName": "ermes-smart-app/templates/index/parcel-info.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("        ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("tr");
              var el2 = dom.createTextNode("\n          ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("td");
              var el3 = dom.createElement("b");
              var el4 = dom.createComment("");
              dom.appendChild(el3, el4);
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n          ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("td");
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n        ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element0 = dom.childAt(fragment, [1]);
              var morphs = new Array(2);
              morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 0]),0,0);
              morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
              return morphs;
            },
            statements: [
              ["content","product.name",["loc",[null,[26,17],[26,33]]]],
              ["content","product.lastDate",["loc",[null,[27,14],[27,34]]]]
            ],
            locals: ["product"],
            templates: []
          };
        }());
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 31,
                "column": 2
              }
            },
            "moduleName": "ermes-smart-app/templates/index/parcel-info.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("table");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("tr");
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("th");
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("th");
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("tr");
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("td");
            var el4 = dom.createElement("b");
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("td");
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("tr");
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("td");
            var el4 = dom.createElement("b");
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("td");
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("table");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("tr");
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("th");
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("th");
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [3]);
            var element2 = dom.childAt(element1, [1]);
            var element3 = dom.childAt(element1, [3]);
            var element4 = dom.childAt(element1, [5]);
            var element5 = dom.childAt(fragment, [7]);
            var element6 = dom.childAt(element5, [1]);
            var morphs = new Array(11);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            morphs[1] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
            morphs[2] = dom.createMorphAt(dom.childAt(element2, [3]),0,0);
            morphs[3] = dom.createMorphAt(dom.childAt(element3, [1, 0]),0,0);
            morphs[4] = dom.createMorphAt(dom.childAt(element3, [3]),0,0);
            morphs[5] = dom.createMorphAt(dom.childAt(element4, [1, 0]),0,0);
            morphs[6] = dom.createMorphAt(dom.childAt(element4, [3]),0,0);
            morphs[7] = dom.createMorphAt(dom.childAt(fragment, [5]),0,0);
            morphs[8] = dom.createMorphAt(dom.childAt(element6, [1]),0,0);
            morphs[9] = dom.createMorphAt(dom.childAt(element6, [3]),0,0);
            morphs[10] = dom.createMorphAt(element5,3,3);
            return morphs;
          },
          statements: [
            ["inline","t",["panel.parcel-info.crop-info-text"],[],["loc",[null,[3,7],[3,47]]]],
            ["inline","t",["fields.text.crop-info"],[],["loc",[null,[6,12],[6,41]]]],
            ["inline","t",["panel.parcel-info.info-table-content"],[],["loc",[null,[7,12],[7,56]]]],
            ["inline","t",["panel.crop-info.crop-type"],[],["loc",[null,[10,15],[10,48]]]],
            ["content","cropInfo.cropType",["loc",[null,[11,12],[11,33]]]],
            ["inline","t",["panel.crop-info.rice-variety"],[],["loc",[null,[14,15],[14,51]]]],
            ["content","cropInfo.riceVariety",["loc",[null,[15,12],[15,36]]]],
            ["inline","t",["panel.parcel-info.product-text"],[],["loc",[null,[18,7],[18,45]]]],
            ["inline","t",["panel.parcel-info.product-table-product"],[],["loc",[null,[21,12],[21,59]]]],
            ["inline","t",["panel.parcel-info.product-table-date"],[],["loc",[null,[22,12],[22,56]]]],
            ["block","each",[["get","parcel",["loc",[null,[24,14],[24,20]]]]],[],0,null,["loc",[null,[24,6],[29,15]]]]
          ],
          locals: [],
          templates: [child0]
        };
      }());
      var child1 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "topLevel": null,
              "revision": "Ember@2.1.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 32,
                  "column": 4
                },
                "end": {
                  "line": 34,
                  "column": 4
                }
              },
              "moduleName": "ermes-smart-app/templates/index/parcel-info.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("p");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
              return morphs;
            },
            statements: [
              ["inline","t",["panel.parcel-info.none-selected"],[],["loc",[null,[33,9],[33,48]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 31,
                "column": 2
              },
              "end": {
                "line": 35,
                "column": 2
              }
            },
            "moduleName": "ermes-smart-app/templates/index/parcel-info.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","unless",[["get","loading",["loc",[null,[32,14],[32,21]]]]],[],0,null,["loc",[null,[32,4],[34,15]]]]
          ],
          locals: [],
          templates: [child0]
        };
      }());
      var child2 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 36,
                "column": 2
              },
              "end": {
                "line": 40,
                "column": 12
              }
            },
            "moduleName": "ermes-smart-app/templates/index/parcel-info.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","animated pulse infinite");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("img");
            dom.setAttribute(el2,"src","assets/ermes-images/logo.png");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("  ");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            return morphs;
          },
          statements: [
            ["inline","t",["panel.notification.processing"],[],["loc",[null,[37,7],[37,44]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "topLevel": false,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 41,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index/parcel-info.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          morphs[1] = dom.createMorphAt(fragment,1,1,contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [
          ["block","if",[["get","model",["loc",[null,[2,8],[2,13]]]]],[],0,1,["loc",[null,[2,2],[35,9]]]],
          ["block","if",[["get","loading",["loc",[null,[36,8],[36,15]]]]],[],2,null,["loc",[null,[36,2],[40,19]]]]
        ],
        locals: [],
        templates: [child0, child1, child2]
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 41,
            "column": 16
          }
        },
        "moduleName": "ermes-smart-app/templates/index/parcel-info.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","ermes-panel",[],["id",["subexpr","@mut",[["get","panelId",["loc",[null,[1,18],[1,25]]]]],[],[]],"title",["subexpr","t",["fields.text.parcel-info"],[],["loc",[null,[1,32],[1,61]]]]],0,null,["loc",[null,[1,0],[41,16]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index/pathogens', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 28,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index/pathogens.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element0, [5]);
          var element3 = dom.childAt(element0, [7]);
          var element4 = dom.childAt(element0, [9]);
          var element5 = dom.childAt(element0, [11]);
          var morphs = new Array(15);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
          morphs[2] = dom.createMorphAt(element1,3,3);
          morphs[3] = dom.createMorphAt(element0,3,3);
          morphs[4] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
          morphs[5] = dom.createMorphAt(element2,3,3);
          morphs[6] = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
          morphs[7] = dom.createMorphAt(element3,3,3);
          morphs[8] = dom.createMorphAt(dom.childAt(element4, [1]),0,0);
          morphs[9] = dom.createMorphAt(element4,3,3);
          morphs[10] = dom.createMorphAt(dom.childAt(element5, [1]),0,0);
          morphs[11] = dom.createMorphAt(element5,3,3);
          morphs[12] = dom.createMorphAt(element0,13,13);
          morphs[13] = dom.createMorphAt(element0,15,15);
          morphs[14] = dom.createMorphAt(element0,17,17);
          return morphs;
        },
        statements: [
          ["element","action",["submit"],["on","submit"],["loc",[null,[2,8],[2,39]]]],
          ["inline","t",["panel.pathogens.date"],[],["loc",[null,[4,12],[4,40]]]],
          ["inline","ermes-datepicker",[],["value",["subexpr","@mut",[["get","model.date",["loc",[null,[5,31],[5,41]]]]],[],[]]],["loc",[null,[5,6],[5,43]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","dateError",["loc",[null,[7,25],[7,34]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[7,4],[7,71]]]],
          ["inline","t",["panel.pathogens.name"],[],["loc",[null,[9,12],[9,40]]]],
          ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","model.name",["loc",[null,[10,25],[10,35]]]]],[],[]],"theme","d","options",["subexpr","@mut",[["get","names",["loc",[null,[10,54],[10,59]]]]],[],[]]],["loc",[null,[10,6],[10,61]]]],
          ["inline","t",["panel.pathogens.comment"],[],["loc",[null,[13,12],[13,43]]]],
          ["inline","jqm-textarea",[],["value",["subexpr","@mut",[["get","model.comments",["loc",[null,[14,27],[14,41]]]]],[],[]]],["loc",[null,[14,6],[14,43]]]],
          ["inline","t",["panel.pathogens.picture"],[],["loc",[null,[17,12],[17,43]]]],
          ["inline","jqm-fileinput",[],["accept","image/*;capture=camera"],["loc",[null,[18,6],[18,55]]]],
          ["inline","t",["panel.pathogens.damage"],[],["loc",[null,[21,12],[21,42]]]],
          ["inline","jqm-slider",[],["value",["subexpr","@mut",[["get","model.damage",["loc",[null,[22,25],[22,37]]]]],[],[]],"min",1,"max",10,"theme","d"],["loc",[null,[22,6],[22,62]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["fields.text.add-new"],[],["loc",[null,[24,22],[24,47]]]],"theme","b"],["loc",[null,[24,4],[24,59]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","parcelError",["loc",[null,[25,25],[25,36]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[25,4],[25,73]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","info",["loc",[null,[26,25],[26,29]]]]],[],[]],"color","blue","animation","fadeInDown"],["loc",[null,[26,4],[26,67]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 28,
            "column": 16
          }
        },
        "moduleName": "ermes-smart-app/templates/index/pathogens.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","ermes-panel",[],["id",["subexpr","@mut",[["get","panelId",["loc",[null,[1,18],[1,25]]]]],[],[]],"title",["subexpr","t",["fields.text.pathogens"],[],["loc",[null,[1,32],[1,59]]]]],0,null,["loc",[null,[1,0],[28,16]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index/profile', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        var child0 = (function() {
          return {
            meta: {
              "topLevel": null,
              "revision": "Ember@2.1.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 4,
                  "column": 8
                },
                "end": {
                  "line": 9,
                  "column": 8
                }
              },
              "moduleName": "ermes-smart-app/templates/index/profile.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("h4");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1,"class","ermes-circular-image");
              var el2 = dom.createTextNode("\n              ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("img");
              dom.setAttribute(el2,"src","assets/ermes-images/user_icon.png");
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n          ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
              return morphs;
            },
            statements: [
              ["inline","t",["panel.profile.picture-section"],[],["loc",[null,[5,14],[5,51]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        var child1 = (function() {
          return {
            meta: {
              "topLevel": null,
              "revision": "Ember@2.1.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 10,
                  "column": 8
                },
                "end": {
                  "line": 13,
                  "column": 8
                }
              },
              "moduleName": "ermes-smart-app/templates/index/profile.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("h4");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("p");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(2);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
              morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]),0,0);
              return morphs;
            },
            statements: [
              ["inline","t",["panel.profile.username-section"],[],["loc",[null,[11,14],[11,52]]]],
              ["content","model.username",["loc",[null,[12,13],[12,31]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        var child2 = (function() {
          return {
            meta: {
              "topLevel": null,
              "revision": "Ember@2.1.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 14,
                  "column": 8
                },
                "end": {
                  "line": 18,
                  "column": 8
                }
              },
              "moduleName": "ermes-smart-app/templates/index/profile.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("h4");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("p");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(3);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
              morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]),0,0);
              morphs[2] = dom.createMorphAt(fragment,5,5,contextualElement);
              return morphs;
            },
            statements: [
              ["inline","t",["panel.profile.email-section"],[],["loc",[null,[15,14],[15,49]]]],
              ["content","model.email",["loc",[null,[16,13],[16,28]]]],
              ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","newModel.email",["loc",[null,[17,32],[17,46]]]]],[],[]],"type","email","placeholder",["subexpr","t",["panel.profile.email-tooltip"],[],["loc",[null,[17,72],[17,105]]]]],["loc",[null,[17,10],[17,107]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        var child3 = (function() {
          return {
            meta: {
              "topLevel": null,
              "revision": "Ember@2.1.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 19,
                  "column": 8
                },
                "end": {
                  "line": 24,
                  "column": 8
                }
              },
              "moduleName": "ermes-smart-app/templates/index/profile.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("h4");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(4);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
              morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
              morphs[2] = dom.createMorphAt(fragment,5,5,contextualElement);
              morphs[3] = dom.createMorphAt(fragment,7,7,contextualElement);
              return morphs;
            },
            statements: [
              ["inline","t",["panel.profile.password-section"],[],["loc",[null,[20,14],[20,52]]]],
              ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","newModel.oldPass",["loc",[null,[21,32],[21,48]]]]],[],[]],"type","password","placeholder",["subexpr","t",["panel.profile.old-password-tooltip"],[],["loc",[null,[21,77],[21,117]]]]],["loc",[null,[21,10],[21,119]]]],
              ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","newModel.newPass",["loc",[null,[22,32],[22,48]]]]],[],[]],"type","password","placeholder",["subexpr","t",["panel.profile.new-password-tooltip"],[],["loc",[null,[22,77],[22,117]]]]],["loc",[null,[22,10],[22,119]]]],
              ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","newModel.rNewPass",["loc",[null,[23,32],[23,49]]]]],[],[]],"type","password","placeholder",["subexpr","t",["panel.profile.repeat-new-password-tooltip"],[],["loc",[null,[23,78],[23,125]]]]],["loc",[null,[23,10],[23,127]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        var child4 = (function() {
          return {
            meta: {
              "topLevel": null,
              "revision": "Ember@2.1.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 25,
                  "column": 8
                },
                "end": {
                  "line": 28,
                  "column": 8
                }
              },
              "moduleName": "ermes-smart-app/templates/index/profile.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("h4");
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(2);
              morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
              morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
              return morphs;
            },
            statements: [
              ["inline","t",["panel.profile.language-section"],[],["loc",[null,[26,14],[26,52]]]],
              ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","i18n.locale",["loc",[null,[27,29],[27,40]]]]],[],[]],"theme","c","options",["subexpr","@mut",[["get","languages",["loc",[null,[27,59],[27,68]]]]],[],[]]],["loc",[null,[27,10],[27,70]]]]
            ],
            locals: [],
            templates: []
          };
        }());
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 6
              },
              "end": {
                "line": 29,
                "column": 6
              }
            },
            "moduleName": "ermes-smart-app/templates/index/profile.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(5);
            morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
            morphs[1] = dom.createMorphAt(fragment,1,1,contextualElement);
            morphs[2] = dom.createMorphAt(fragment,2,2,contextualElement);
            morphs[3] = dom.createMorphAt(fragment,3,3,contextualElement);
            morphs[4] = dom.createMorphAt(fragment,4,4,contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [
            ["block","jqm-collapsible",[],["collapsed","false"],0,null,["loc",[null,[4,8],[9,28]]]],
            ["block","jqm-collapsible",[],[],1,null,["loc",[null,[10,8],[13,28]]]],
            ["block","jqm-collapsible",[],[],2,null,["loc",[null,[14,8],[18,28]]]],
            ["block","jqm-collapsible",[],[],3,null,["loc",[null,[19,8],[24,28]]]],
            ["block","jqm-collapsible",[],[],4,null,["loc",[null,[25,8],[28,28]]]]
          ],
          locals: [],
          templates: [child0, child1, child2, child3, child4]
        };
      }());
      return {
        meta: {
          "topLevel": false,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 34,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index/profile.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(5);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(element0,1,1);
          morphs[2] = dom.createMorphAt(element0,3,3);
          morphs[3] = dom.createMorphAt(element0,5,5);
          morphs[4] = dom.createMorphAt(fragment,3,3,contextualElement);
          return morphs;
        },
        statements: [
          ["element","action",["submit"],["on","submit"],["loc",[null,[2,8],[2,39]]]],
          ["block","jqm-collapsibleset",[],["inset","false","theme","c"],0,null,["loc",[null,[3,6],[29,29]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["panel.profile.update"],[],["loc",[null,[30,24],[30,50]]]],"theme","b"],["loc",[null,[30,6],[30,62]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","info",["loc",[null,[31,27],[31,31]]]]],[],[]],"color","blue","animation","fadeInDown"],["loc",[null,[31,6],[31,69]]]],
          ["inline","jqm-button",[],["action","logOut","text",["subexpr","t",["panel.profile.logout"],[],["loc",[null,[33,36],[33,62]]]],"theme","d","icon","power","iconPos","left"],["loc",[null,[33,2],[33,102]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 34,
            "column": 16
          }
        },
        "moduleName": "ermes-smart-app/templates/index/profile.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","ermes-panel",[],["id",["subexpr","@mut",[["get","panelId",["loc",[null,[1,18],[1,25]]]]],[],[]],"title",["subexpr","t",["fields.options-m.profile"],[],["loc",[null,[1,32],[1,62]]]]],0,null,["loc",[null,[1,0],[34,16]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index/soil-condition', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 15,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index/soil-condition.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element0, [3]);
          var morphs = new Array(8);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
          morphs[2] = dom.createMorphAt(element1,3,3);
          morphs[3] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
          morphs[4] = dom.createMorphAt(element2,3,3);
          morphs[5] = dom.createMorphAt(element0,5,5);
          morphs[6] = dom.createMorphAt(element0,7,7);
          morphs[7] = dom.createMorphAt(element0,9,9);
          return morphs;
        },
        statements: [
          ["element","action",["submit"],["on","submit"],["loc",[null,[2,8],[2,39]]]],
          ["inline","t",["panel.soil-condition.status"],[],["loc",[null,[4,12],[4,47]]]],
          ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","model.parcelStatus",["loc",[null,[5,25],[5,43]]]]],[],[]],"theme","d","options",["subexpr","@mut",[["get","parcelStatus",["loc",[null,[5,62],[5,74]]]]],[],[]]],["loc",[null,[5,6],[5,76]]]],
          ["inline","t",["panel.soil-condition.date"],[],["loc",[null,[8,12],[8,45]]]],
          ["inline","ermes-datepicker",[],["value",["subexpr","@mut",[["get","model.date",["loc",[null,[9,31],[9,41]]]]],[],[]],"showToday",true],["loc",[null,[9,6],[9,58]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["fields.text.add-new"],[],["loc",[null,[11,22],[11,47]]]],"theme","b"],["loc",[null,[11,4],[11,59]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","parcelError",["loc",[null,[12,25],[12,36]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[12,4],[12,73]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","info",["loc",[null,[13,25],[13,29]]]]],[],[]],"color","blue","animation","fadeInDown"],["loc",[null,[13,4],[13,67]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 16
          }
        },
        "moduleName": "ermes-smart-app/templates/index/soil-condition.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","ermes-panel",[],["id",["subexpr","@mut",[["get","panelId",["loc",[null,[1,18],[1,25]]]]],[],[]],"title",["subexpr","t",["fields.text.soil-condition"],[],["loc",[null,[1,32],[1,64]]]]],0,null,["loc",[null,[1,0],[15,16]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index/soil-type', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 23,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index/soil-type.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element0, [3]);
          var element3 = dom.childAt(element0, [5]);
          var element4 = dom.childAt(element0, [7]);
          var morphs = new Array(12);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
          morphs[2] = dom.createMorphAt(element1,3,3);
          morphs[3] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
          morphs[4] = dom.createMorphAt(element2,3,3);
          morphs[5] = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
          morphs[6] = dom.createMorphAt(element3,3,3);
          morphs[7] = dom.createMorphAt(dom.childAt(element4, [1]),0,0);
          morphs[8] = dom.createMorphAt(element4,3,3);
          morphs[9] = dom.createMorphAt(element0,9,9);
          morphs[10] = dom.createMorphAt(element0,11,11);
          morphs[11] = dom.createMorphAt(element0,13,13);
          return morphs;
        },
        statements: [
          ["element","action",["submit"],["on","submit"],["loc",[null,[2,8],[2,39]]]],
          ["inline","t",["panel.soil-type.texture"],[],["loc",[null,[4,12],[4,43]]]],
          ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","model.soilTexture",["loc",[null,[5,25],[5,42]]]]],[],[]],"theme","d","options",["subexpr","@mut",[["get","soilTextures",["loc",[null,[5,61],[5,73]]]]],[],[]]],["loc",[null,[5,6],[5,75]]]],
          ["inline","t",["panel.soil-type.organic-matter"],[],["loc",[null,[8,12],[8,50]]]],
          ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","model.organicMatter",["loc",[null,[9,28],[9,47]]]]],[],[]],"type","number","step",0.01,"min",0,"max",100,"placeholder",["subexpr","t",["panel.soil-type.organic-matter-unit"],[],["loc",[null,[9,98],[9,139]]]],"required",true],["loc",[null,[9,6],[9,155]]]],
          ["inline","t",["panel.soil-type.ph"],[],["loc",[null,[12,12],[12,38]]]],
          ["inline","jqm-slider",[],["value",["subexpr","@mut",[["get","model.ph",["loc",[null,[13,25],[13,33]]]]],[],[]],"min",0,"max",14,"theme","d"],["loc",[null,[13,6],[13,59]]]],
          ["inline","t",["panel.soil-type.date"],[],["loc",[null,[16,12],[16,40]]]],
          ["inline","ermes-datepicker",[],["value",["subexpr","@mut",[["get","model.date",["loc",[null,[17,31],[17,41]]]]],[],[]]],["loc",[null,[17,6],[17,43]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["fields.text.add-new"],[],["loc",[null,[19,22],[19,47]]]],"theme","b"],["loc",[null,[19,4],[19,59]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","parcelError",["loc",[null,[20,25],[20,36]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[20,4],[20,73]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","info",["loc",[null,[21,25],[21,29]]]]],[],[]],"color","blue","animation","fadeInDown"],["loc",[null,[21,4],[21,67]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 23,
            "column": 16
          }
        },
        "moduleName": "ermes-smart-app/templates/index/soil-type.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","ermes-panel",[],["id",["subexpr","@mut",[["get","panelId",["loc",[null,[1,18],[1,25]]]]],[],[]],"title",["subexpr","t",["fields.text.soil-type"],[],["loc",[null,[1,32],[1,59]]]]],0,null,["loc",[null,[1,0],[23,16]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index/weeds', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 28,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index/weeds.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element0, [5]);
          var element3 = dom.childAt(element0, [7]);
          var element4 = dom.childAt(element0, [9]);
          var element5 = dom.childAt(element0, [11]);
          var morphs = new Array(15);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
          morphs[2] = dom.createMorphAt(element1,3,3);
          morphs[3] = dom.createMorphAt(element0,3,3);
          morphs[4] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
          morphs[5] = dom.createMorphAt(element2,3,3);
          morphs[6] = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
          morphs[7] = dom.createMorphAt(element3,3,3);
          morphs[8] = dom.createMorphAt(dom.childAt(element4, [1]),0,0);
          morphs[9] = dom.createMorphAt(element4,3,3);
          morphs[10] = dom.createMorphAt(dom.childAt(element5, [1]),0,0);
          morphs[11] = dom.createMorphAt(element5,3,3);
          morphs[12] = dom.createMorphAt(element0,13,13);
          morphs[13] = dom.createMorphAt(element0,15,15);
          morphs[14] = dom.createMorphAt(element0,17,17);
          return morphs;
        },
        statements: [
          ["element","action",["submit"],["on","submit"],["loc",[null,[2,8],[2,39]]]],
          ["inline","t",["panel.weeds.date"],[],["loc",[null,[4,12],[4,36]]]],
          ["inline","ermes-datepicker",[],["value",["subexpr","@mut",[["get","model.date",["loc",[null,[5,31],[5,41]]]]],[],[]]],["loc",[null,[5,6],[5,43]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","dateError",["loc",[null,[7,25],[7,34]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[7,4],[7,71]]]],
          ["inline","t",["panel.weeds.name"],[],["loc",[null,[9,12],[9,36]]]],
          ["inline","jqm-select",[],["value",["subexpr","@mut",[["get","model.name",["loc",[null,[10,25],[10,35]]]]],[],[]],"theme","d","options",["subexpr","@mut",[["get","names",["loc",[null,[10,54],[10,59]]]]],[],[]]],["loc",[null,[10,6],[10,61]]]],
          ["inline","t",["panel.weeds.comment"],[],["loc",[null,[13,12],[13,39]]]],
          ["inline","jqm-textarea",[],["value",["subexpr","@mut",[["get","model.comments",["loc",[null,[14,27],[14,41]]]]],[],[]]],["loc",[null,[14,6],[14,43]]]],
          ["inline","t",["panel.weeds.picture"],[],["loc",[null,[17,12],[17,39]]]],
          ["inline","jqm-fileinput",[],["accept","image/*;capture=camera"],["loc",[null,[18,6],[18,55]]]],
          ["inline","t",["panel.weeds.damage"],[],["loc",[null,[21,12],[21,38]]]],
          ["inline","jqm-slider",[],["value",["subexpr","@mut",[["get","model.damage",["loc",[null,[22,25],[22,37]]]]],[],[]],"min",1,"max",100,"theme","d"],["loc",[null,[22,6],[22,63]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["fields.text.add-new"],[],["loc",[null,[24,22],[24,47]]]],"theme","b"],["loc",[null,[24,4],[24,59]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","parcelError",["loc",[null,[25,25],[25,36]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[25,4],[25,73]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","info",["loc",[null,[26,25],[26,29]]]]],[],[]],"color","blue","animation","fadeInDown"],["loc",[null,[26,4],[26,67]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 28,
            "column": 16
          }
        },
        "moduleName": "ermes-smart-app/templates/index/weeds.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","ermes-panel",[],["id",["subexpr","@mut",[["get","panelId",["loc",[null,[1,18],[1,25]]]]],[],[]],"title",["subexpr","t",["fields.text.weeds"],[],["loc",[null,[1,32],[1,55]]]]],0,null,["loc",[null,[1,0],[28,16]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index/welcome', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 6
              },
              "end": {
                "line": 5,
                "column": 6
              }
            },
            "moduleName": "ermes-smart-app/templates/index/welcome.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("h1");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
            return morphs;
          },
          statements: [
            ["inline","t",["fields.options-m.title"],["username",["subexpr","@mut",[["get","model.username",["loc",[null,[4,52],[4,66]]]]],[],[]]],["loc",[null,[4,14],[4,68]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 13,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index/welcome.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","ermes-inner-window animated bounceInLeft");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"style","padding: 1em");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"align","right");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(element0,1,1);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]),1,1);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]),1,1);
          return morphs;
        },
        statements: [
          ["block","jqm-component",[],["role","header"],0,null,["loc",[null,[3,6],[5,24]]]],
          ["inline","t",["panel.notification.first-login"],[],["loc",[null,[7,8],[7,46]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["panel.notification.got-it"],[],["loc",[null,[10,26],[10,57]]]],"action","dismiss","inline","true","mini","true","theme","b"],["loc",[null,[10,8],[10,112]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "ermes-smart-app/templates/index/welcome.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","jqm-component",[],[],0,null,["loc",[null,[1,0],[13,18]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index/yield', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 20,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index/yield.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("label");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("span");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element0, [5]);
          var element3 = dom.childAt(element0, [7]);
          var morphs = new Array(11);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
          morphs[2] = dom.createMorphAt(element1,3,3);
          morphs[3] = dom.createMorphAt(element0,3,3);
          morphs[4] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
          morphs[5] = dom.createMorphAt(element2,3,3);
          morphs[6] = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
          morphs[7] = dom.createMorphAt(element3,3,3);
          morphs[8] = dom.createMorphAt(element0,9,9);
          morphs[9] = dom.createMorphAt(element0,11,11);
          morphs[10] = dom.createMorphAt(element0,13,13);
          return morphs;
        },
        statements: [
          ["element","action",["submit"],["on","submit"],["loc",[null,[2,8],[2,39]]]],
          ["inline","t",["panel.yield.date"],[],["loc",[null,[4,12],[4,36]]]],
          ["inline","ermes-datepicker",[],["value",["subexpr","@mut",[["get","model.date",["loc",[null,[5,31],[5,41]]]]],[],[]]],["loc",[null,[5,6],[5,43]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","dateError",["loc",[null,[7,25],[7,34]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[7,4],[7,71]]]],
          ["inline","t",["panel.yield.yield"],[],["loc",[null,[9,12],[9,37]]]],
          ["inline","jqm-textinput",[],["value",["subexpr","@mut",[["get","model.yield",["loc",[null,[10,28],[10,39]]]]],[],[]],"type","number","min",0,"step",0.01,"placeholder",["subexpr","t",["panel.yield.yield-unit"],[],["loc",[null,[10,82],[10,110]]]],"required",true],["loc",[null,[10,6],[10,126]]]],
          ["inline","t",["panel.yield.comments"],[],["loc",[null,[13,12],[13,40]]]],
          ["inline","jqm-textarea",[],["value",["subexpr","@mut",[["get","model.comments",["loc",[null,[14,27],[14,41]]]]],[],[]]],["loc",[null,[14,6],[14,43]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["fields.text.add-new"],[],["loc",[null,[16,22],[16,47]]]],"theme","b"],["loc",[null,[16,4],[16,59]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","parcelError",["loc",[null,[17,25],[17,36]]]]],[],[]],"color","red","animation","fadeInDown"],["loc",[null,[17,4],[17,73]]]],
          ["inline","ermes-message",[],["text",["subexpr","@mut",[["get","info",["loc",[null,[18,25],[18,29]]]]],[],[]],"color","blue","animation","fadeInDown"],["loc",[null,[18,4],[18,67]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": null,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 16
          }
        },
        "moduleName": "ermes-smart-app/templates/index/yield.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","ermes-panel",[],["id",["subexpr","@mut",[["get","panelId",["loc",[null,[1,18],[1,25]]]]],[],[]],"title",["subexpr","t",["fields.text.yield"],[],["loc",[null,[1,32],[1,55]]]]],0,null,["loc",[null,[1,0],[20,16]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index-error', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 2
            },
            "end": {
              "line": 5,
              "column": 2
            }
          },
          "moduleName": "ermes-smart-app/templates/index-error.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h1");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),0,0);
          return morphs;
        },
        statements: [
          ["inline","t",["panel.notification.offline"],[],["loc",[null,[4,10],[4,44]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 2
            },
            "end": {
              "line": 16,
              "column": 2
            }
          },
          "moduleName": "ermes-smart-app/templates/index-error.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","ermes-center-content animated bounceInDown");
          dom.setAttribute(el1,"align","center");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("img");
          dom.setAttribute(el3,"src","assets/ermes-images/logo.png");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("p");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("p");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode(" ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 3]);
          var element1 = dom.childAt(element0, [3]);
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
          morphs[1] = dom.createMorphAt(element1,0,0);
          morphs[2] = dom.createMorphAt(element1,2,2);
          return morphs;
        },
        statements: [
          ["inline","t",["panel.notification.no-data-offline"],[],["loc",[null,[12,17],[12,59]]]],
          ["inline","t",["panel.notification.try-again"],[],["loc",[null,[13,17],[13,53]]]],
          ["inline","jqm-button",[],["text",["subexpr","t",["panel.notification.reconnect"],[],["loc",[null,[13,72],[13,106]]]],"action","reconnect","inline","true","mini","true","theme","b"],["loc",[null,[13,54],[13,163]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": false,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 6
          }
        },
        "moduleName": "ermes-smart-app/templates/index-error.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment(" Index error page ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","ermes-full-window ui-page-theme-a");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [2]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element2,1,1);
        morphs[1] = dom.createMorphAt(element2,2,2);
        return morphs;
      },
      statements: [
        ["block","jqm-header",[],["position","fixed"],0,null,["loc",[null,[3,2],[5,17]]]],
        ["block","jqm-content",[],[],1,null,["loc",[null,[6,2],[16,18]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
efineday('ermes-smart-app/templates/index-loading', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 2
            },
            "end": {
              "line": 12,
              "column": 2
            }
          },
          "moduleName": "ermes-smart-app/templates/index-loading.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","ermes-center-content");
          dom.setAttribute(el1,"align","center");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("img");
          dom.setAttribute(el3,"class","animated pulse infinite");
          dom.setAttribute(el3,"src","assets/ermes-images/logo.png");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          var el3 = dom.createTextNode("\n              ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("p");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n          ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 3, 1]),0,0);
          return morphs;
        },
        statements: [
          ["inline","t",["panel.notification.retrieving-info"],[],["loc",[null,[9,17],[9,59]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "topLevel": false,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "ermes-smart-app/templates/index-loading.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment(" Index loading page ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","ermes-full-window ui-page-theme-a");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        return morphs;
      },
      statements: [
        ["block","jqm-content",[],[],0,null,["loc",[null,[3,2],[12,18]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 2
              },
              "end": {
                "line": 18,
                "column": 2
              }
            },
            "moduleName": "ermes-smart-app/templates/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","ermes-bar");
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2,"class","ui-grid-b");
            var el3 = dom.createTextNode("\n              ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3,"class","ui-block-a");
            var el4 = dom.createTextNode("\n                  ");
            dom.appendChild(el3, el4);
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n                  ");
            dom.appendChild(el3, el4);
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n              ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n              ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3,"class","ui-block-b");
            dom.setAttribute(el3,"align","center");
            var el4 = dom.createTextNode("\n                  ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("h1");
            var el5 = dom.createElement("img");
            dom.setAttribute(el5,"src","assets/ermes-images/logo.png");
            dom.setAttribute(el5,"class","ermes-header-logo");
            dom.appendChild(el4, el5);
            var el5 = dom.createTextNode(" ");
            dom.appendChild(el4, el5);
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n              ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n              ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("div");
            dom.setAttribute(el3,"class","ui-block-c");
            dom.setAttribute(el3,"align","right");
            var el4 = dom.createTextNode("\n                  ");
            dom.appendChild(el3, el4);
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n              ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n          ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1, 1]);
            var element2 = dom.childAt(element1, [1]);
            var morphs = new Array(4);
            morphs[0] = dom.createMorphAt(element2,1,1);
            morphs[1] = dom.createMorphAt(element2,3,3);
            morphs[2] = dom.createMorphAt(dom.childAt(element1, [3, 1]),2,2);
            morphs[3] = dom.createMorphAt(dom.childAt(element1, [5]),1,1);
            return morphs;
          },
          statements: [
            ["inline","jqm-anchor",[],["id","add-info-btn","action",["subexpr","action",["openPopup","ermes-menu-fields"],[],["loc",[null,[7,56],[7,96]]]],"title",["subexpr","t",["fields.header.add-info-tooltip"],[],["loc",[null,[7,103],[7,139]]]],"inline","true","allCorners","true","icon","plus","iconPos","notext","theme","b","isDisabled",["subexpr","@mut",[["get","editMode",["loc",[null,[7,222],[7,230]]]]],[],[]]],["loc",[null,[7,18],[7,232]]]],
            ["inline","jqm-anchor",[],["action",["subexpr","action",["showPanel","index.observation"],[],["loc",[null,[8,38],[8,78]]]],"title",["subexpr","t",["fields.header.observation-tooltip"],[],["loc",[null,[8,85],[8,124]]]],"inline","true","allCorners","true","icon","eye","iconPos","notext","theme","b","isDisabled",["subexpr","@mut",[["get","editMode",["loc",[null,[8,206],[8,214]]]]],[],[]]],["loc",[null,[8,18],[8,216]]]],
            ["inline","t",["fields.header.title"],[],["loc",[null,[11,89],[11,116]]]],
            ["inline","jqm-anchor",[],["id","options-btn","action",["subexpr","action",["openPopup","ermes-menu-options"],[],["loc",[null,[14,55],[14,96]]]],"title",["subexpr","t",["fields.header.options-tooltip"],[],["loc",[null,[14,103],[14,138]]]],"inline","true","allCorners","true","icon","gear","iconPos","notext","theme","d"],["loc",[null,[14,18],[14,211]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 19,
                "column": 2
              },
              "end": {
                "line": 26,
                "column": 2
              }
            },
            "moduleName": "ermes-smart-app/templates/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","map-container");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(4);
            morphs[0] = dom.createMorphAt(element0,1,1);
            morphs[1] = dom.createMorphAt(element0,3,3);
            morphs[2] = dom.createMorphAt(fragment,3,3,contextualElement);
            morphs[3] = dom.createMorphAt(fragment,5,5,contextualElement);
            return morphs;
          },
          statements: [
            ["inline","esri-map",[],["editMode",["subexpr","@mut",[["get","editMode",["loc",[null,[21,26],[21,34]]]]],[],[]]],["loc",[null,[21,6],[21,36]]]],
            ["inline","ermes-side-buttons",[],["editMode",["subexpr","@mut",[["get","editMode",["loc",[null,[22,36],[22,44]]]]],[],[]],"openPanel","showPanel","cannotEdit","cannotEdit"],["loc",[null,[22,6],[22,92]]]],
            ["inline","ermes-menu-fields",[],["showPanel","showPanel","positionTo","#add-info-btn","id","ermes-menu-fields"],["loc",[null,[24,4],[24,97]]]],
            ["inline","ermes-menu-options",[],["showPanel","showPanel","cannotEdit","cannotEdit","positionTo","#options-btn","username",["subexpr","@mut",[["get","model.username",["loc",[null,[25,106],[25,120]]]]],[],[]],"id","ermes-menu-options","editMode",["subexpr","@mut",[["get","editMode",["loc",[null,[25,154],[25,162]]]]],[],[]]],["loc",[null,[25,4],[25,164]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 28,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          morphs[1] = dom.createMorphAt(fragment,1,1,contextualElement);
          morphs[2] = dom.createMorphAt(fragment,3,3,contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [
          ["block","jqm-header",[],["position","fixed"],0,null,["loc",[null,[3,2],[18,17]]]],
          ["block","jqm-content",[],["class","esri-map"],1,null,["loc",[null,[19,2],[26,18]]]],
          ["content","outlet",["loc",[null,[27,2],[27,12]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "topLevel": false,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 29,
            "column": 0
          }
        },
        "moduleName": "ermes-smart-app/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment(" Index page ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","jqm-page",[],[],0,null,["loc",[null,[2,0],[28,13]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/templates/login', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 2
              },
              "end": {
                "line": 5,
                "column": 2
              }
            },
            "moduleName": "ermes-smart-app/templates/login.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("h1");
            var el2 = dom.createTextNode("ERMES Smart App");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() { return []; },
          statements: [

          ],
          locals: [],
          templates: []
        };
      }());
      var child1 = (function() {
        return {
          meta: {
            "topLevel": null,
            "revision": "Ember@2.1.0",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 2
              },
              "end": {
                "line": 14,
                "column": 2
              }
            },
            "moduleName": "ermes-smart-app/templates/login.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"align","center");
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(5);
            morphs[0] = dom.createMorphAt(element0,1,1);
            morphs[1] = dom.createMorphAt(element0,3,3);
            morphs[2] = dom.createMorphAt(fragment,3,3,contextualElement);
            morphs[3] = dom.createMorphAt(fragment,5,5,contextualElement);
            morphs[4] = dom.createMorphAt(fragment,7,7,contextualElement);
            return morphs;
          },
          statements: [
            ["content","ermes-main-logo",["loc",[null,[8,8],[8,27]]]],
            ["inline","ermes-login-buttons",[],["action","openPopup"],["loc",[null,[9,8],[9,50]]]],
            ["content","ermes-login-language",["loc",[null,[11,6],[11,30]]]],
            ["inline","ermes-login-popup",[],["username",["subexpr","@mut",[["get","username",["loc",[null,[12,35],[12,43]]]]],[],[]],"pId","ermes-login-popup","logIn","logIn"],["loc",[null,[12,6],[12,83]]]],
            ["inline","ermes-signup-popup",[],["username",["subexpr","@mut",[["get","username",["loc",[null,[13,36],[13,44]]]]],[],[]],"pId","ermes-signup-popup"],["loc",[null,[13,6],[13,71]]]]
          ],
          locals: [],
          templates: []
        };
      }());
      return {
        meta: {
          "topLevel": null,
          "revision": "Ember@2.1.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 15,
              "column": 0
            }
          },
          "moduleName": "ermes-smart-app/templates/login.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
          morphs[1] = dom.createMorphAt(fragment,1,1,contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","jqm-header",[],["position","fixed"],0,null,["loc",[null,[3,2],[5,17]]]],
          ["block","jqm-content",[],[],1,null,["loc",[null,[6,2],[14,18]]]]
        ],
        locals: [],
        templates: [child0, child1]
      };
    }());
    return {
      meta: {
        "topLevel": false,
        "revision": "Ember@2.1.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 13
          }
        },
        "moduleName": "ermes-smart-app/templates/login.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment(" Login page ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [
        ["block","jqm-page",[],[],0,null,["loc",[null,[2,0],[15,13]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
efineday('ermes-smart-app/tests/adapters/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - adapters');
  QUnit.test('adapters/application.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/adapters/parcel.jshint', function () {

  'use strict';

  QUnit.module('JSHint - adapters');
  QUnit.test('adapters/parcel.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'adapters/parcel.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/adapters/user.jshint', function () {

  'use strict';

  QUnit.module('JSHint - adapters');
  QUnit.test('adapters/user.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'adapters/user.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/components/ermes-datepicker.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/ermes-datepicker.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'components/ermes-datepicker.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/components/ermes-login-buttons.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/ermes-login-buttons.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'components/ermes-login-buttons.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/components/ermes-login-language.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/ermes-login-language.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'components/ermes-login-language.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/components/ermes-login-popup.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/ermes-login-popup.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'components/ermes-login-popup.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/components/ermes-main-logo.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/ermes-main-logo.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'components/ermes-main-logo.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/components/ermes-menu-fields.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/ermes-menu-fields.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'components/ermes-menu-fields.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/components/ermes-menu-options.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/ermes-menu-options.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'components/ermes-menu-options.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/components/ermes-message.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/ermes-message.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'components/ermes-message.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/components/ermes-panel.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/ermes-panel.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'components/ermes-panel.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/components/ermes-side-buttons.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/ermes-side-buttons.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'components/ermes-side-buttons.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/components/ermes-signup-popup.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/ermes-signup-popup.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'components/ermes-signup-popup.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/components/esri-map.jshint', function () {

  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/esri-map.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'components/esri-map.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/application.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index/about.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index');
  QUnit.test('controllers/index/about.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index/about.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index/agrochemicals.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index');
  QUnit.test('controllers/index/agrochemicals.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index/agrochemicals.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index/cannot-edit.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index');
  QUnit.test('controllers/index/cannot-edit.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index/cannot-edit.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index/crop-info.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index');
  QUnit.test('controllers/index/crop-info.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index/crop-info.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index/crop-phenology.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index');
  QUnit.test('controllers/index/crop-phenology.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index/crop-phenology.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index/diseases.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index');
  QUnit.test('controllers/index/diseases.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index/diseases.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index/fertilizers.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index');
  QUnit.test('controllers/index/fertilizers.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index/fertilizers.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index/irrigation.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index');
  QUnit.test('controllers/index/irrigation.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index/irrigation.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index/observation.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index');
  QUnit.test('controllers/index/observation.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index/observation.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index/parcel-info.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index');
  QUnit.test('controllers/index/parcel-info.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index/parcel-info.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index/pathogens.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index');
  QUnit.test('controllers/index/pathogens.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index/pathogens.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index/profile.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index');
  QUnit.test('controllers/index/profile.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index/profile.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index/soil-condition.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index');
  QUnit.test('controllers/index/soil-condition.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index/soil-condition.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index/soil-type.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index');
  QUnit.test('controllers/index/soil-type.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index/soil-type.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index/weeds.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index');
  QUnit.test('controllers/index/weeds.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index/weeds.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index/welcome.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index');
  QUnit.test('controllers/index/welcome.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index/welcome.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index/yield.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers/index');
  QUnit.test('controllers/index/yield.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index/yield.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index-error.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/index-error.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index-error.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index-loading.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/index-loading.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index-loading.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/index.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/index.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/controllers/login.jshint', function () {

  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/login.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'controllers/login.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/helpers/ember-i18n/test-helpers', ['ember'], function (Ember) {

  'use strict';

  Ember['default'].Test.registerHelper('t', function (app, key, interpolations) {
    var i18n = app.__container__.lookup('service:i18n');
    return i18n.t(key, interpolations);
  });

  // example usage: expectTranslation('.header', 'welcome_message');
  Ember['default'].Test.registerHelper('expectTranslation', function (app, element, key, interpolations) {
    var text = app.testHelpers.t(key, interpolations);

    assertTranslation(element, key, text);
  });

  var assertTranslation = (function () {
    if (typeof QUnit !== 'undefined' && typeof ok === 'function') {
      return function (element, key, text) {
        ok(find(element + ':contains(' + text + ')').length, 'Found translation key ' + key + ' in ' + element);
      };
    } else if (typeof expect === 'function') {
      return function (element, key, text) {
        var found = !!find(element + ':contains(' + text + ')').length;
        expect(found).to.equal(true);
      };
    } else {
      return function () {
        throw new Error("ember-i18n could not find a compatible test framework");
      };
    }
  })();

});
efineday('ermes-smart-app/tests/helpers/resolver', ['exports', 'ember/resolver', 'ermes-smart-app/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
efineday('ermes-smart-app/tests/helpers/resolver.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/helpers/start-app', ['exports', 'ember', 'ermes-smart-app/app/app', 'ermes-smart-app/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
efineday('ermes-smart-app/tests/helpers/start-app.jshint', function () {

  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/initializers/auth-init.jshint', function () {

  'use strict';

  QUnit.module('JSHint - initializers');
  QUnit.test('initializers/auth-init.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'initializers/auth-init.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/initializers/first.jshint', function () {

  'use strict';

  QUnit.module('JSHint - initializers');
  QUnit.test('initializers/first.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'initializers/first.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/initializers/parcels.jshint', function () {

  'use strict';

  QUnit.module('JSHint - initializers');
  QUnit.test('initializers/parcels.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'initializers/parcels.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/initializers/products-init.jshint', function () {

  'use strict';

  QUnit.module('JSHint - initializers');
  QUnit.test('initializers/products-init.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'initializers/products-init.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-datepicker-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('ermes-datepiker', 'Integration | Component | ermes datepiker', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 19
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'ermes-datepiker', ['loc', [null, [1, 0], [1, 19]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'topLevel': null,
            'revision': 'Ember@2.1.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'ermes-datepiker', [], [], 0, null, ['loc', [null, [2, 4], [4, 24]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-datepicker-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/ermes-datepicker-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'integration/components/ermes-datepicker-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-login-buttons-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('ermes-login-buttons', 'Integration | Component | ermes login buttons', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(1);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 23
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'ermes-login-buttons', ['loc', [null, [1, 0], [1, 23]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-login-buttons-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/ermes-login-buttons-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'integration/components/ermes-login-buttons-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-login-language-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('ermes-login-language', 'Integration | Component | ermes login language', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(1);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 24
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'ermes-login-language', ['loc', [null, [1, 0], [1, 24]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-login-language-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/ermes-login-language-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'integration/components/ermes-login-language-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-login-popup-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('ermes-login-popup', 'Integration | Component | ermes login popup', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(1);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 21
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'ermes-login-popup', ['loc', [null, [1, 0], [1, 21]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-login-popup-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/ermes-login-popup-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'integration/components/ermes-login-popup-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-main-logo-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('ermes-main-logo', 'Integration | Component | ermes main logo', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(1);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 19
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'ermes-main-logo', ['loc', [null, [1, 0], [1, 19]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-main-logo-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/ermes-main-logo-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'integration/components/ermes-main-logo-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-menu-fields-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('ermes-menu-fields', 'Integration | Component | ermes menu fields', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 21
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'ermes-menu-fields', ['loc', [null, [1, 0], [1, 21]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'topLevel': null,
            'revision': 'Ember@2.1.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'ermes-menu-fields', [], [], 0, null, ['loc', [null, [2, 4], [4, 26]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-menu-fields-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/ermes-menu-fields-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'integration/components/ermes-menu-fields-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-menu-options-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('ermes-menu-options', 'Integration | Component | ermes menu options', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 22
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'ermes-menu-options', ['loc', [null, [1, 0], [1, 22]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'topLevel': null,
            'revision': 'Ember@2.1.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'ermes-menu-options', [], [], 0, null, ['loc', [null, [2, 4], [4, 27]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-menu-options-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/ermes-menu-options-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'integration/components/ermes-menu-options-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-message-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('ermes-message', 'Integration | Component | ermes message', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 17
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'ermes-message', ['loc', [null, [1, 0], [1, 17]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'topLevel': null,
            'revision': 'Ember@2.1.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'ermes-message', [], [], 0, null, ['loc', [null, [2, 4], [4, 22]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-message-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/ermes-message-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'integration/components/ermes-message-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-panel-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('ermes-panel', 'Integration | Component | ermes panel', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 15
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'ermes-panel', ['loc', [null, [1, 0], [1, 15]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'topLevel': null,
            'revision': 'Ember@2.1.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'ermes-panel', [], [], 0, null, ['loc', [null, [2, 4], [4, 20]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-panel-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/ermes-panel-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'integration/components/ermes-panel-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-side-buttons-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('ermes-side-buttons', 'Integration | Component | ermes side buttons', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 22
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'ermes-side-buttons', ['loc', [null, [1, 0], [1, 22]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'topLevel': null,
            'revision': 'Ember@2.1.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'ermes-side-buttons', [], [], 0, null, ['loc', [null, [2, 4], [4, 27]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-side-buttons-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/ermes-side-buttons-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'integration/components/ermes-side-buttons-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-signup-popup-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('ermes-signup-popup', 'Integration | Component | ermes signup popup', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(1);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 22
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'ermes-signup-popup', ['loc', [null, [1, 0], [1, 22]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');
  });

});
efineday('ermes-smart-app/tests/integration/components/ermes-signup-popup-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/ermes-signup-popup-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'integration/components/ermes-signup-popup-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/integration/components/esri-map-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForComponent('esri-map', 'Integration | Component | esri map', {
    integration: true
  });

  ember_qunit.test('it renders', function (assert) {
    assert.expect(1);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'topLevel': null,
          'revision': 'Ember@2.1.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 12
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'esri-map', ['loc', [null, [1, 0], [1, 12]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // No block usage
  });

});
efineday('ermes-smart-app/tests/integration/components/esri-map-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/esri-map-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'integration/components/esri-map-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/locales/en/config.jshint', function () {

  'use strict';

  QUnit.module('JSHint - locales/en');
  QUnit.test('locales/en/config.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'locales/en/config.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/locales/en/translations.jshint', function () {

  'use strict';

  QUnit.module('JSHint - locales/en');
  QUnit.test('locales/en/translations.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'locales/en/translations.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/locales/es/config.jshint', function () {

  'use strict';

  QUnit.module('JSHint - locales/es');
  QUnit.test('locales/es/config.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'locales/es/config.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/locales/es/translations.jshint', function () {

  'use strict';

  QUnit.module('JSHint - locales/es');
  QUnit.test('locales/es/translations.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'locales/es/translations.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/locales/gk/config.jshint', function () {

  'use strict';

  QUnit.module('JSHint - locales/gk');
  QUnit.test('locales/gk/config.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'locales/gk/config.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/locales/gk/translations.jshint', function () {

  'use strict';

  QUnit.module('JSHint - locales/gk');
  QUnit.test('locales/gk/translations.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'locales/gk/translations.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/locales/it/config.jshint', function () {

  'use strict';

  QUnit.module('JSHint - locales/it');
  QUnit.test('locales/it/config.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'locales/it/config.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/locales/it/translations.jshint', function () {

  'use strict';

  QUnit.module('JSHint - locales/it');
  QUnit.test('locales/it/translations.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'locales/it/translations.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/mixins/auth-checker.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/auth-checker.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'mixins/auth-checker.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/mixins/map-events.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/map-events.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'mixins/map-events.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/mixins/offline-map.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/offline-map.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'mixins/offline-map.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/mixins/panel-manager.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/panel-manager.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'mixins/panel-manager.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/mixins/product-model-factory.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/product-model-factory.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'mixins/product-model-factory.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/mixins/product-model.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/product-model.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'mixins/product-model.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/mixins/product-upload-rdate.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/product-upload-rdate.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'mixins/product-upload-rdate.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/mixins/product-upload.jshint', function () {

  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/product-upload.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'mixins/product-upload.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/agrochemical.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/agrochemical.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/agrochemical.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/crop-info.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/crop-info.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/crop-info.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/crop-phenology.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/crop-phenology.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/crop-phenology.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/disease.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/disease.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/disease.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/fertilizer.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/fertilizer.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/fertilizer.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/irrigation.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/irrigation.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/irrigation.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/last-position.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/last-position.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/last-position.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/observation.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/observation.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/observation.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/parcel.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/parcel.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/parcel.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/pathogen.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/pathogen.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/pathogen.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/soil-condition.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/soil-condition.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/soil-condition.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/soil-type.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/soil-type.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/soil-type.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/static/agrochemicals.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models/static');
  QUnit.test('models/static/agrochemicals.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/static/agrochemicals.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/static/crop-info.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models/static');
  QUnit.test('models/static/crop-info.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/static/crop-info.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/static/crop-phenology.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models/static');
  QUnit.test('models/static/crop-phenology.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/static/crop-phenology.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/static/diseases.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models/static');
  QUnit.test('models/static/diseases.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/static/diseases.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/static/fertilizers.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models/static');
  QUnit.test('models/static/fertilizers.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/static/fertilizers.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/static/irrigation.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models/static');
  QUnit.test('models/static/irrigation.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/static/irrigation.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/static/pathogens.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models/static');
  QUnit.test('models/static/pathogens.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/static/pathogens.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/static/products.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models/static');
  QUnit.test('models/static/products.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/static/products.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/static/regions.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models/static');
  QUnit.test('models/static/regions.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/static/regions.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/static/soil-condition.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models/static');
  QUnit.test('models/static/soil-condition.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/static/soil-condition.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/static/soil-type.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models/static');
  QUnit.test('models/static/soil-type.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/static/soil-type.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/static/weeds.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models/static');
  QUnit.test('models/static/weeds.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/static/weeds.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/user.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/user.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/user.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/weed.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/weed.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/weed.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/models/yield.jshint', function () {

  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/yield.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'models/yield.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/router.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index/about.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index');
  QUnit.test('routes/index/about.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index/about.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index/agrochemicals.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index');
  QUnit.test('routes/index/agrochemicals.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index/agrochemicals.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index/cannot-edit.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index');
  QUnit.test('routes/index/cannot-edit.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index/cannot-edit.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index/crop-info.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index');
  QUnit.test('routes/index/crop-info.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index/crop-info.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index/crop-phenology.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index');
  QUnit.test('routes/index/crop-phenology.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index/crop-phenology.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index/diseases.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index');
  QUnit.test('routes/index/diseases.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index/diseases.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index/fertilizers.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index');
  QUnit.test('routes/index/fertilizers.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index/fertilizers.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index/irrigation.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index');
  QUnit.test('routes/index/irrigation.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index/irrigation.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index/observation.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index');
  QUnit.test('routes/index/observation.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index/observation.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index/parcel-info.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index');
  QUnit.test('routes/index/parcel-info.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index/parcel-info.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index/pathogens.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index');
  QUnit.test('routes/index/pathogens.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index/pathogens.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index/profile.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index');
  QUnit.test('routes/index/profile.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index/profile.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index/soil-condition.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index');
  QUnit.test('routes/index/soil-condition.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index/soil-condition.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index/soil-type.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index');
  QUnit.test('routes/index/soil-type.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index/soil-type.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index/weeds.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index');
  QUnit.test('routes/index/weeds.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index/weeds.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index/welcome.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index');
  QUnit.test('routes/index/welcome.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index/welcome.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index/yield.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes/index');
  QUnit.test('routes/index/yield.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index/yield.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index-error.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/index-error.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index-error.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index-loading.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/index-loading.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index-loading.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/index.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/index.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/routes/login.jshint', function () {

  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/login.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'routes/login.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/serializers/application.jshint', function () {

  'use strict';

  QUnit.module('JSHint - serializers');
  QUnit.test('serializers/application.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'serializers/application.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/serializers/parcel.jshint', function () {

  'use strict';

  QUnit.module('JSHint - serializers');
  QUnit.test('serializers/parcel.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'serializers/parcel.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/serializers/user.jshint', function () {

  'use strict';

  QUnit.module('JSHint - serializers');
  QUnit.test('serializers/user.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'serializers/user.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/services/auth.jshint', function () {

  'use strict';

  QUnit.module('JSHint - services');
  QUnit.test('services/auth.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'services/auth.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/services/offline-storage.jshint', function () {

  'use strict';

  QUnit.module('JSHint - services');
  QUnit.test('services/offline-storage.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'services/offline-storage.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/services/parcels.jshint', function () {

  'use strict';

  QUnit.module('JSHint - services');
  QUnit.test('services/parcels.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'services/parcels.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/services/products.jshint', function () {

  'use strict';

  QUnit.module('JSHint - services');
  QUnit.test('services/products.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'services/products.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/services/upload-queue.jshint', function () {

  'use strict';

  QUnit.module('JSHint - services');
  QUnit.test('services/upload-queue.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(false, 'services/upload-queue.js should pass jshint.\nservices/upload-queue.js: line 53, col 25, \'XMLHttpRequestException\' is not defined.\n\n1 error'); 
  });

});
efineday('ermes-smart-app/tests/test-helper', ['ermes-smart-app/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
efineday('ermes-smart-app/tests/test-helper.jshint', function () {

  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/transforms/date.jshint', function () {

  'use strict';

  QUnit.module('JSHint - transforms');
  QUnit.test('transforms/date.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'transforms/date.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/transforms/user-date.jshint', function () {

  'use strict';

  QUnit.module('JSHint - transforms');
  QUnit.test('transforms/user-date.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'transforms/user-date.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

});
efineday('ermes-smart-app/tests/unit/adapters/application-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/adapters');
  QUnit.test('unit/adapters/application-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/adapters/parcel-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:parcel', 'Unit | Adapter | parcel', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

});
efineday('ermes-smart-app/tests/unit/adapters/parcel-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/adapters');
  QUnit.test('unit/adapters/parcel-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/adapters/parcel-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/adapters/user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:user', 'Unit | Adapter | user', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

});
efineday('ermes-smart-app/tests/unit/adapters/user-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/adapters');
  QUnit.test('unit/adapters/user-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/adapters/user-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:aplication', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/application-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/application-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/application-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/about-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index/about', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/about-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index');
  QUnit.test('unit/controllers/index/about-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index/about-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/agrochemicals-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index/agrochemicals', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/agrochemicals-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index');
  QUnit.test('unit/controllers/index/agrochemicals-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index/agrochemicals-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/cannot-edit-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index/cannot-edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/cannot-edit-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index');
  QUnit.test('unit/controllers/index/cannot-edit-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index/cannot-edit-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/crop-info-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index/crop-info', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/crop-info-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index');
  QUnit.test('unit/controllers/index/crop-info-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index/crop-info-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/crop-phenology-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index/crop-phenology', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/crop-phenology-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index');
  QUnit.test('unit/controllers/index/crop-phenology-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index/crop-phenology-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/diseases-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index/diseases', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/diseases-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index');
  QUnit.test('unit/controllers/index/diseases-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index/diseases-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/fertilizers-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index/fertilizers', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/fertilizers-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index');
  QUnit.test('unit/controllers/index/fertilizers-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index/fertilizers-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/irrigation-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index/irrigation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/irrigation-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index');
  QUnit.test('unit/controllers/index/irrigation-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index/irrigation-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/observation-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index/observation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/observation-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index');
  QUnit.test('unit/controllers/index/observation-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index/observation-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/parcel-info-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index/parcel-info', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/parcel-info-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index');
  QUnit.test('unit/controllers/index/parcel-info-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index/parcel-info-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/pathogens-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index/pathogens', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/pathogens-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index');
  QUnit.test('unit/controllers/index/pathogens-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index/pathogens-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/profile-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index/profile', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/profile-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index');
  QUnit.test('unit/controllers/index/profile-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index/profile-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/soil-condition-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index/soil-condition', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/soil-condition-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index');
  QUnit.test('unit/controllers/index/soil-condition-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index/soil-condition-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/soil-type-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index/soil-type', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/soil-type-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index');
  QUnit.test('unit/controllers/index/soil-type-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index/soil-type-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/weeds-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index/weeds', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/weeds-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index');
  QUnit.test('unit/controllers/index/weeds-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index/weeds-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/welcome-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index/welcome', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/welcome-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index');
  QUnit.test('unit/controllers/index/welcome-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index/welcome-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/yield-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index/yield', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index/yield-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers/index');
  QUnit.test('unit/controllers/index/yield-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index/yield-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index-error-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index-error', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index-error-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/index-error-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index-error-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index-loading-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index-loading', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index-loading-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/index-loading-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index-loading-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/index-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/index-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/index-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/controllers/login-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
efineday('ermes-smart-app/tests/unit/controllers/login-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/login-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/controllers/login-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/initializers/auth-init-test', ['ember', 'ermes-smart-app/initializers/auth-init', 'qunit'], function (Ember, auth_init, qunit) {

  'use strict';

  var registry, application;

  qunit.module('Unit | Initializer | auth init', {
    beforeEach: function beforeEach() {
      Ember['default'].run(function () {
        application = Ember['default'].Application.create();
        registry = application.registry;
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    auth_init.initialize(registry, application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });

});
efineday('ermes-smart-app/tests/unit/initializers/auth-init-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/initializers');
  QUnit.test('unit/initializers/auth-init-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/initializers/auth-init-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/initializers/first-test', ['ember', 'ermes-smart-app/initializers/first', 'qunit'], function (Ember, first, qunit) {

  'use strict';

  var registry, application;

  qunit.module('Unit | Initializer | first', {
    beforeEach: function beforeEach() {
      Ember['default'].run(function () {
        application = Ember['default'].Application.create();
        registry = application.registry;
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    first.initialize(registry, application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });

});
efineday('ermes-smart-app/tests/unit/initializers/first-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/initializers');
  QUnit.test('unit/initializers/first-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/initializers/first-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/initializers/parcels-test', ['ember', 'ermes-smart-app/initializers/parcels', 'qunit'], function (Ember, parcels, qunit) {

  'use strict';

  var registry, application;

  qunit.module('Unit | Initializer | parcels', {
    beforeEach: function beforeEach() {
      Ember['default'].run(function () {
        application = Ember['default'].Application.create();
        registry = application.registry;
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    parcels.initialize(registry, application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });

});
efineday('ermes-smart-app/tests/unit/initializers/parcels-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/initializers');
  QUnit.test('unit/initializers/parcels-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/initializers/parcels-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/initializers/products-init-test', ['ember', 'ermes-smart-app/initializers/porducts-init', 'qunit'], function (Ember, porducts_init, qunit) {

  'use strict';

  var registry, application;

  qunit.module('Unit | Initializer | porducts init', {
    beforeEach: function beforeEach() {
      Ember['default'].run(function () {
        application = Ember['default'].Application.create();
        registry = application.registry;
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    porducts_init.initialize(registry, application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });

});
efineday('ermes-smart-app/tests/unit/initializers/products-init-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/initializers');
  QUnit.test('unit/initializers/products-init-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/initializers/products-init-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/mixins/auth-checker-test', ['ember', 'ermes-smart-app/mixins/auth-checker', 'qunit'], function (Ember, AuthCheckerMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | auth checker');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var AuthCheckerObject = Ember['default'].Object.extend(AuthCheckerMixin['default']);
    var subject = AuthCheckerObject.create();
    assert.ok(subject);
  });

});
efineday('ermes-smart-app/tests/unit/mixins/auth-checker-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins');
  QUnit.test('unit/mixins/auth-checker-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/mixins/auth-checker-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/mixins/map-events-test', ['ember', 'ermes-smart-app/mixins/map-events', 'qunit'], function (Ember, MapEventsMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | map events');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var MapEventsObject = Ember['default'].Object.extend(MapEventsMixin['default']);
    var subject = MapEventsObject.create();
    assert.ok(subject);
  });

});
efineday('ermes-smart-app/tests/unit/mixins/map-events-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins');
  QUnit.test('unit/mixins/map-events-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/mixins/map-events-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/mixins/offline-map-test', ['ember', 'ermes-smart-app/mixins/offline-map', 'qunit'], function (Ember, OfflineMapMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | offline map');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var OfflineMapObject = Ember['default'].Object.extend(OfflineMapMixin['default']);
    var subject = OfflineMapObject.create();
    assert.ok(subject);
  });

});
efineday('ermes-smart-app/tests/unit/mixins/offline-map-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins');
  QUnit.test('unit/mixins/offline-map-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/mixins/offline-map-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/mixins/panel-manager-test', ['ember', 'ermes-smart-app/mixins/panel-manager', 'qunit'], function (Ember, PanelManagerMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | panel manager');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var PanelManagerObject = Ember['default'].Object.extend(PanelManagerMixin['default']);
    var subject = PanelManagerObject.create();
    assert.ok(subject);
  });

});
efineday('ermes-smart-app/tests/unit/mixins/panel-manager-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins');
  QUnit.test('unit/mixins/panel-manager-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/mixins/panel-manager-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/mixins/product-model-factory-test', ['ember', 'ermes-smart-app/mixins/product-model', 'qunit'], function (Ember, ProductModelMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | product model');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var ProductModelObject = Ember['default'].Object.extend(ProductModelMixin['default']);
    var subject = ProductModelObject.create();
    assert.ok(subject);
  });

});
efineday('ermes-smart-app/tests/unit/mixins/product-model-factory-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins');
  QUnit.test('unit/mixins/product-model-factory-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/mixins/product-model-factory-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/mixins/product-model-test', ['ember', 'ermes-smart-app/mixins/product-model', 'qunit'], function (Ember, ProductModelMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | product model');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var ProductModelObject = Ember['default'].Object.extend(ProductModelMixin['default']);
    var subject = ProductModelObject.create();
    assert.ok(subject);
  });

});
efineday('ermes-smart-app/tests/unit/mixins/product-model-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins');
  QUnit.test('unit/mixins/product-model-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/mixins/product-model-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/mixins/product-upload-rdate-test', ['ember', 'ermes-smart-app/mixins/product-upload-rdate', 'qunit'], function (Ember, ProductUploadRdateMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | product upload rdate');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var ProductUploadRdateObject = Ember['default'].Object.extend(ProductUploadRdateMixin['default']);
    var subject = ProductUploadRdateObject.create();
    assert.ok(subject);
  });

});
efineday('ermes-smart-app/tests/unit/mixins/product-upload-rdate-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins');
  QUnit.test('unit/mixins/product-upload-rdate-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/mixins/product-upload-rdate-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/mixins/product-upload-test', ['ember', 'ermes-smart-app/mixins/product-upload', 'qunit'], function (Ember, ProductUploadMixin, qunit) {

  'use strict';

  qunit.module('Unit | Mixin | product upload');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var ProductUploadObject = Ember['default'].Object.extend(ProductUploadMixin['default']);
    var subject = ProductUploadObject.create();
    assert.ok(subject);
  });

});
efineday('ermes-smart-app/tests/unit/mixins/product-upload-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/mixins');
  QUnit.test('unit/mixins/product-upload-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/mixins/product-upload-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/models/agrochemical-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('agrochemical', 'Unit | Model | agrochemical', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
efineday('ermes-smart-app/tests/unit/models/agrochemical-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/agrochemical-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/models/agrochemical-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/models/crop-info-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('crop-info', 'Unit | Model | crop info', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
efineday('ermes-smart-app/tests/unit/models/crop-info-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/crop-info-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/models/crop-info-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/models/crop-phenology-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('crop-phenology', 'Unit | Model | crop phenology', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
efineday('ermes-smart-app/tests/unit/models/crop-phenology-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/crop-phenology-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/models/crop-phenology-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/models/disease-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('disease', 'Unit | Model | disease', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
efineday('ermes-smart-app/tests/unit/models/disease-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/disease-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/models/disease-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/models/fertilizer-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('fertilizer', 'Unit | Model | fertilizer', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
efineday('ermes-smart-app/tests/unit/models/fertilizer-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/fertilizer-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/models/fertilizer-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/models/irrigation-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('irrigation', 'Unit | Model | irrigation', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
efineday('ermes-smart-app/tests/unit/models/irrigation-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/irrigation-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/models/irrigation-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/models/observation-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('observation', 'Unit | Model | observation', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
efineday('ermes-smart-app/tests/unit/models/observation-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/observation-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/models/observation-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/models/parcel-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('parcel', 'Unit | Model | parcel', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
efineday('ermes-smart-app/tests/unit/models/parcel-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/parcel-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/models/parcel-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/models/pathogen-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('pathogen', 'Unit | Model | pathogen', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
efineday('ermes-smart-app/tests/unit/models/pathogen-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/pathogen-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/models/pathogen-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/models/soil-condition-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('soil-condition', 'Unit | Model | soil condition', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
efineday('ermes-smart-app/tests/unit/models/soil-condition-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/soil-condition-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/models/soil-condition-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/models/soil-type-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('soil-type', 'Unit | Model | soil type', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
efineday('ermes-smart-app/tests/unit/models/soil-type-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/soil-type-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/models/soil-type-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/models/user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('user', 'Unit | Model | user', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
efineday('ermes-smart-app/tests/unit/models/user-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/user-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/models/user-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/models/weed-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('weed', 'Unit | Model | weed', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
efineday('ermes-smart-app/tests/unit/models/weed-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/weed-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/models/weed-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/models/yield-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('yield', 'Unit | Model | yield', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
efineday('ermes-smart-app/tests/unit/models/yield-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/yield-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/models/yield-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/about-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index/about', 'Unit | Route | index/about', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/about-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index');
  QUnit.test('unit/routes/index/about-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/about-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/agrochemicals-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index/agrochemicals', 'Unit | Route | index/agrochemicals', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/agrochemicals-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index');
  QUnit.test('unit/routes/index/agrochemicals-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/agrochemicals-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/cannot-edit-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index/cannot-edit', 'Unit | Route | index/cannot edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/cannot-edit-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index');
  QUnit.test('unit/routes/index/cannot-edit-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/cannot-edit-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/crop-info-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index/crop-info', 'Unit | Route | index/crop info', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/crop-info-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index');
  QUnit.test('unit/routes/index/crop-info-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/crop-info-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/crop-phenology-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index/crop-phenology', 'Unit | Route | index/crop phenology', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/crop-phenology-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index');
  QUnit.test('unit/routes/index/crop-phenology-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/crop-phenology-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/diseases-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index/diseases', 'Unit | Route | index/diseases', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/diseases-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index');
  QUnit.test('unit/routes/index/diseases-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/diseases-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/fertilizers-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index/fertilizers', 'Unit | Route | index/fertilizers', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/fertilizers-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index');
  QUnit.test('unit/routes/index/fertilizers-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/fertilizers-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/irrigation-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index/irrigation', 'Unit | Route | index/irrigation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/irrigation-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index');
  QUnit.test('unit/routes/index/irrigation-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/irrigation-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/observation-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index/observation', 'Unit | Route | index/observation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/observation-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index');
  QUnit.test('unit/routes/index/observation-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/observation-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/parcel-info-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index/parcel-info', 'Unit | Route | index/parcel info', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/parcel-info-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index');
  QUnit.test('unit/routes/index/parcel-info-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/parcel-info-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/pathogens-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index/pathogens', 'Unit | Route | index/pathogens', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/pathogens-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index');
  QUnit.test('unit/routes/index/pathogens-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/pathogens-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/profile-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index/profile', 'Unit | Route | index/profile', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/profile-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index');
  QUnit.test('unit/routes/index/profile-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/profile-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/soil-condition-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index/soil-condition', 'Unit | Route | index/soil condition', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/soil-condition-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index');
  QUnit.test('unit/routes/index/soil-condition-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/soil-condition-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/soil-type-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index/soil-type', 'Unit | Route | index/soil type', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/soil-type-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index');
  QUnit.test('unit/routes/index/soil-type-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/soil-type-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/weeds-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index/weeds', 'Unit | Route | index/weeds', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/weeds-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index');
  QUnit.test('unit/routes/index/weeds-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/weeds-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/welcome-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index/welcome', 'Unit | Route | index/welcome', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/welcome-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index');
  QUnit.test('unit/routes/index/welcome-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/welcome-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/yield-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index/yield', 'Unit | Route | index/yield', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index/yield-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes/index');
  QUnit.test('unit/routes/index/yield-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index/yield-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index-error-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index-error', 'Unit | Route | index error', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index-error-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/index-error-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-error-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index-loading-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index-loading', 'Unit | Route | index loading', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index-loading-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/index-loading-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-loading-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/index-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/index-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/routes/login-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:login', 'Unit | Route | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
efineday('ermes-smart-app/tests/unit/routes/login-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/login-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/serializers/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('application', 'Unit | Serializer | application', {
    // Specify the other units that are required for this test.
    needs: ['serializer:application']
  });

  // Replace this with your real tests.
  ember_qunit.test('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });

});
efineday('ermes-smart-app/tests/unit/serializers/application-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/serializers');
  QUnit.test('unit/serializers/application-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/serializers/application-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/serializers/parcel-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('parcel', 'Unit | Serializer | parcel', {
    // Specify the other units that are required for this test.
    needs: ['serializer:parcel']
  });

  // Replace this with your real tests.
  ember_qunit.test('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });

});
efineday('ermes-smart-app/tests/unit/serializers/parcel-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/serializers');
  QUnit.test('unit/serializers/parcel-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/serializers/parcel-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/serializers/user-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('users', 'Unit | Serializer | users', {
    // Specify the other units that are required for this test.
    needs: ['serializer:users']
  });

  // Replace this with your real tests.
  ember_qunit.test('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });

});
efineday('ermes-smart-app/tests/unit/serializers/user-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/serializers');
  QUnit.test('unit/serializers/user-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/serializers/user-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/services/auth-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('service:auth', 'Unit | Service | auth', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });

});
efineday('ermes-smart-app/tests/unit/services/auth-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/services');
  QUnit.test('unit/services/auth-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/services/auth-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/services/offline-storage-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('service:offline-product-storage', 'Unit | Service | offline product storage', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });

});
efineday('ermes-smart-app/tests/unit/services/offline-storage-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/services');
  QUnit.test('unit/services/offline-storage-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/services/offline-storage-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/services/parcels-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('service:parcels', 'Unit | Service | parcels', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });

});
efineday('ermes-smart-app/tests/unit/services/parcels-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/services');
  QUnit.test('unit/services/parcels-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/services/parcels-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/services/products-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('service:products', 'Unit | Service | products', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });

});
efineday('ermes-smart-app/tests/unit/services/products-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/services');
  QUnit.test('unit/services/products-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/services/products-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/services/upload-queue-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('service:upload-queue', 'Unit | Service | upload queue', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });

});
efineday('ermes-smart-app/tests/unit/services/upload-queue-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/services');
  QUnit.test('unit/services/upload-queue-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/services/upload-queue-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/transforms/date-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('transform:date', 'Unit | Transform | date', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var transform = this.subject();
    assert.ok(transform);
  });

});
efineday('ermes-smart-app/tests/unit/transforms/date-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/transforms');
  QUnit.test('unit/transforms/date-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/transforms/date-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/transforms/user-date-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('transform:date', 'Unit | Transform | date', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var transform = this.subject();
    assert.ok(transform);
  });

});
efineday('ermes-smart-app/tests/unit/transforms/user-date-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/transforms');
  QUnit.test('unit/transforms/user-date-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/transforms/user-date-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/unit/utils/ajax-test', ['ermes-smart-app/utils/ajax', 'qunit'], function (ajax, qunit) {

  'use strict';

  qunit.module('Unit | Utility | ajax');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var result = ajax['default']();
    assert.ok(result);
  });

});
efineday('ermes-smart-app/tests/unit/utils/ajax-test.jshint', function () {

  'use strict';

  QUnit.module('JSHint - unit/utils');
  QUnit.test('unit/utils/ajax-test.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'unit/utils/ajax-test.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/tests/utils/ajax.jshint', function () {

  'use strict';

  QUnit.module('JSHint - utils');
  QUnit.test('utils/ajax.js should pass jshint', function(assert) { 
    assert.expect(1);
    assert.ok(true, 'utils/ajax.js should pass jshint.'); 
  });

});
efineday('ermes-smart-app/transforms/array', ['exports'], function (exports) {

	'use strict';

	exports['default'] = MF.ArrayTransform;

});
efineday('ermes-smart-app/transforms/date', ['exports', 'ember-data', 'moment'], function (exports, DS, Moment) {

  'use strict';

  exports['default'] = DS['default'].Transform.extend({
    deserialize: function deserialize(serialized) {
      return new Moment['default'](serialized).format('lll');
    },

    serialize: function serialize(deserialized) {
      if (new Moment['default'](deserialized, Moment['default'].ISO_8601).isValid()) {
        return deserialized;
      }
      return new Moment['default'](deserialized, 'lll').toISOString();
    }
  });

});
efineday('ermes-smart-app/transforms/fragment-array', ['exports'], function (exports) {

	'use strict';

	exports['default'] = MF.FragmentArrayTransform;

});
efineday('ermes-smart-app/transforms/fragment', ['exports'], function (exports) {

	'use strict';

	exports['default'] = MF.FragmentTransform;

});
efineday('ermes-smart-app/transforms/user-date', ['exports', 'ember-data', 'moment', 'ermes-smart-app/config/environment'], function (exports, DS, Moment, config) {

  'use strict';

  var dFormat = config['default'].APP.defaultDateFormat;

  exports['default'] = DS['default'].Transform.extend({
    deserialize: function deserialize(serialized) {
      return new Moment['default'](serialized).format(dFormat);
    },

    serialize: function serialize(deserialized) {
      if (new Moment['default'](deserialized, Moment['default'].ISO_8601).isValid()) {
        return deserialized;
      }
      return new Moment['default'](deserialized, dFormat).add(12, 'hours').toISOString();
    }
  });

});
efineday('ermes-smart-app/utils/ajax', ['exports', 'jquery', 'ermes-smart-app/config/environment'], function (exports, $, config) {

  'use strict';

  exports.post = post;
  exports.get = get;

  var SERVER_URL = config['default'].APP.apiServer;

  // Example ( '/login', { username: user, password: password } )

  function post(uri, parameters) {
    return $['default'].post(SERVER_URL + uri, parameters);
  }

  function get(uri, parameters) {
    return $['default'].get(SERVER_URL + uri, parameters);
  }

});
efineday('ermes-smart-app/utils/i18n/compile-template', ['exports', 'ember-i18n/utils/i18n/compile-template'], function (exports, compile_template) {

	'use strict';



	exports['default'] = compile_template['default'];

});
efineday('ermes-smart-app/utils/i18n/missing-message', ['exports', 'ember-i18n/utils/i18n/missing-message'], function (exports, missing_message) {

	'use strict';



	exports['default'] = missing_message['default'];

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

efineday('ermes-smart-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'ermes-smart-app';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  equireray("ermes-smart-app/tests/test-helper");
} else {
  equireray("ermes-smart-app/app")["default"].create({"apiServer":"http://ermes.dlsi.uji.es:6686","layerProxy":"http://ermes.dlsi.uji.es:6686/proxy","regionLayers":{"spain":{"baseMap":"http://ermes.dlsi.uji.es:6080/arcgis/rest/services/2015-ES/landsat_spain_scene_mercator/MapServer","mapName":"spainBasemap","parcelsLayer":"http://ermes.dlsi.uji.es:6080/ArcGIS/rest/services/2015-ES/landsat_spain_scene/MapServer/3","maxZoom":18,"minZoom":14},"italy":{"baseMap":"http://ermes.dlsi.uji.es:6080/arcgis/rest/services/2015-IT/IT_basemap/MapServer","mapName":"italyBasemap","parcelsLayer":"http://ermes.dlsi.uji.es:6080/arcgis/rest/services/2015-IT/IT_parcels/MapServer/0","maxZoom":17,"minZoom":13},"greece":{"baseMap":"http://ermes.dlsi.uji.es:6080/arcgis/rest/services/2015-GR/GR_basemap/MapServer","mapName":"greeceBasemap","parcelsLayer":"http://ermes.dlsi.uji.es:6080/arcgis/rest/services/2015-GR/GR_parcels/MapServer/0","maxZoom":6,"minZoom":3}},"defaultDateFormat":"DD/MM/YYYY","LOG_ACTIVE_GENERATION":true,"LOG_VIEW_LOOKUPS":true,"name":"ermes-smart-app","version":"0.0.0+622b37ed"});
}

/* jshint ignore:end */
//# sourceMappingURL=ermes-smart-app.map