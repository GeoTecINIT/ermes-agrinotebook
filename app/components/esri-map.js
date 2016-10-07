import Ember from 'ember';
import $ from 'jquery';
import config from '../config/environment';
import OfflineMap from 'ermes-smart-app/mixins/offline-map';
import MapEvents from 'ermes-smart-app/mixins/map-events';

import Map from 'esri/map';
import EditStore from 'oesri/offline-edit-store-src';
import SimpleFillSymbol from "esri/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "esri/symbols/SimpleLineSymbol";
import Color from "esri/Color";
import Graphic from "esri/graphic";
import PictureMarkerSymbol from 'esri/symbols/PictureMarkerSymbol';
import Point from 'esri/geometry/Point';
import SpatialReference from 'esri/SpatialReference';
import webMercatorUtils from "esri/geometry/webMercatorUtils";

export default Ember.Component.extend(OfflineMap, MapEvents, {
  elementId: 'mapDiv',
  map: null,
  editStore: null,
  parcels: Ember.inject.service(),
  ermesCordova: Ember.inject.service(),
  selectedParcelsGraphics: new Ember.Map(),
  loading : true,


  /**
   * Persistent symbol
   */
  userParcelSymbol: new SimpleFillSymbol(
    SimpleFillSymbol.STYLE_SOLID,
    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([135, 238, 124]), 2),
    new Color([255, 213, 87, 1])
  ),

  /**
   * Volatile symbol
   */
  selectSymbol: new SimpleFillSymbol(
    SimpleFillSymbol.STYLE_SOLID,
    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([242, 38, 19]), 2),
    new Color([211, 84, 0, 1])
  ),

  /**
   * Esri map component inserted to the DOM
   */
  didInsertElement() {
    var _this = this;
    $(document).ready(function() { // Wait until DOM is ready to prevent map fixed size
      var editStore = new EditStore();
      editStore.dbName = "fieldsStore";
      editStore.objectStoreName = "fields";
      editStore.init(function (success) {
        if (success) {
          _this.createMap();
           var loaded = false;
           var __this = _this;
           _this.get("map").on("layer-add-result",(evt)=>{

             if (!loaded){
               __this.loadUserParcelsLayer();
               __this.mapLoaded();
               loaded = true;
             }
           });
          _this.loadBasemap();

        }
        // else: load online basemap
      });
      _this.set('editStore', editStore);
    });
  },

  /**
   * Map layers fully initialized
   */
  getBaseMapLayer(){
    var map = this.get('map');
    return map.getLayer(map.layerIds[0]);
  },

  createMap() {
    var user = this.get('parcels.user');
    var mapInfo = this.get('parcels').getUserMapInfo();

    var mapProperties = {
      "zoom": 15,
      "minZoom": 13,
      "maxZoom": 17,
      "logo": false
    };

    if (user.get('type') !== 'guest') {
      mapProperties.center = [user.get('lastLongitude'), user.get('lastLatitude')];
      mapProperties.zoom = user.get('zoomLevel');
    }

    var map = new Map(this.elementId, mapProperties);


    var maxExtent;

    map.on("load", ()=>{
      var layer =  this.getBaseMapLayer();//map.getLayer(map.layerIds[0]);
      maxExtent = layer.fullExtent;//map.fullExtent;
    });

    map.on("extent-change", function(extent) {
     /* if (!maxExtent) return;

      if ((map.extent.xmin < maxExtent.xmin) ||
        (map.extent.ymin < maxExtent.ymin) ||
        (map.extent.xmax > maxExtent.xmax) ||
        (map.extent.ymax > maxExtent.ymax)
      ) {
        map.setExtent(maxExtent);
        console.log("max extent reached, rolling back to previous extent");
      }*/
    });

    this.set('map', map);
  },

  /**
   * Load default basemap for the actual user region
   */
  loadBasemap() {
      var mapInfo = this.get('parcels').getUserMapInfo();

      if (this.get('ermesCordova').isNative() && !this.get('useOnlineBasemap')) {
        this.addTPKLayer();
      }
      else {
        this.addOfflineTileLayer(mapInfo.baseMap, mapInfo.mapName, config.APP.layerProxy, mapInfo);
        this.set("loading", false);
      }

  },

  /**
   * Special feature layer, contains only actual user fields
   */
  loadUserParcelsLayer() {
    var mapInfo = this.get('parcels').getUserMapInfo();
    var userType = this.get('parcels.user.type');

    if (userType !== 'guest') {
      this.addUserParcelsLayer(mapInfo.parcelsLayer);
    }
  },

  /**
   * Full parcels layer for the actual user region
   */
  loadFullParcelsLayer() {
    var mapInfo = this.get('parcels').getUserMapInfo();

    this.addParcelsLayer(mapInfo.parcelsLayer);
  },

  /**
   * Reload all layer for the current esri map configuration
   */
  liveReload() {
    // Clear parcel selection
    this.get('parcels.selectedParcels').clear();

    // Remove all layers
    var layersMap = this.get('layersMap');
    //var baseLayer = this.getBaseMapLayer();

    layersMap.forEach((layerObject) => {
      this.get('map').removeLayer(layerObject);
    });

    // Clear parcels
    this.set('parcelsGraphics', []);

    // Remove draw event

    var drawEvent = this.get('drawEvent');
    if (drawEvent) {
      drawEvent.remove();
    }

    // Add layers
    this.get('layersMap').clear();
    this.loadUserParcelsLayer();
  },

  /**
   * Once the map has been fully configured,
   * trigger Edit Mode decision event
   */
  mapLoaded() {
    Ember.debug('Map was successfully loaded');
    this.notifyPropertyChange('editMode');

    var map = this.get('map');
    var userType = this.get('parcels.user.type');

    map.on('update-end', () => this.setPositionMarker());
    if (userType !== 'guest') {
      map.on('pan-end', () => this.updateLastPosition());
    }
  },

  /**
   * Sets a marker for the actual user position
   */
  setPositionMarker(){
    //todo: check NaN
    if (navigator.geolocation) {
      var map = this.get('map');
      var myPositionGraphic = this.get('myPositionGraphic');
      navigator.geolocation.getCurrentPosition((location) => {
        var myPos = new Point(location.coords.longitude, location.coords.latitude);
        if (!myPositionGraphic) {
          var myPositionSymbol = new PictureMarkerSymbol({
            "angle": 0,
            "xoffset": 2,
            "yoffset": 8,
            "type": "esriPMS",
            "url": "assets/ermes-images/BlueCircleLargeB.png",
            "contentType": "image/png",
            "width": 24,
            "height": 24
          });
          myPositionGraphic = new Graphic(myPos, myPositionSymbol);
          map.graphics.add(myPositionGraphic);
          this.set('myPositionGraphic', myPositionGraphic);
        }
        else { //move the graphic if it already exists
          myPositionGraphic.setGeometry(myPos);
          map.graphics.add(myPositionGraphic);
        }
      });
    }
  },

  /**
   * If the user has looked for a parcel, then print a marker on the map
   */
  updateSearch: Ember.on('mapLoad', Ember.observer('parcels.searchedParcel', function () {
    var searchedParcel = this.get('parcels.searchedParcel');
    if (searchedParcel) {
      var map = this.get('map');
      var searchMarker = this.get('searchMarker');
      var parcelPos = new Point(searchedParcel.x, searchedParcel.y, new SpatialReference(searchedParcel.spatialReference));

      if (!searchMarker) {
        var searchMarkerSymbol = new PictureMarkerSymbol({
          "yoffset": 8,
          "url": "assets/ermes-images/parcelMarker.png",
          "contentType": "image/png",
          "width": 20,
          "height": 24
        });

        searchMarker = new Graphic(parcelPos, searchMarkerSymbol);
        map.graphics.add(searchMarker);
        this.set('searchMarker', searchMarker);
      }
      else {
        searchMarker.setGeometry(parcelPos);
        map.graphics.add(searchMarker);
      }
      map.centerAt(parcelPos);
    }
  })),

  /**
   * Decides if it is needed to switch to the editMode or not
   * on map load and when editMode variable changes
   */
  onMapLoad: Ember.on('mapLoaded', Ember.observer('editMode', function () {
    var clickEvent = this.get('clickEvent');
    var userType = this.get('parcels.user.type');

    // If an event already exists, remove it
    if (clickEvent) {
      clickEvent.remove();
    }

    if (userType !== 'guest') { // Behavior for normal users

      // Enter edit mode
      if (this.get('editMode')) {
        this.get('parcels.selectedParcels').clear();
        this.loadFullParcelsLayer();
        this.set('clickEvent', this.get('map').on('click', (evt) => this.editParcelEvent(evt) ));
        return;
        // Exit edit mode, remove full layer
      } else if (this.get('layersMap').get('parcelsLayer')) {
        this.get('map').removeLayer(this.get('layersMap').get('parcelsLayer'));
        this.get('layersMap').delete('parcelsLayer');
        this.liveReload();
      }
      // Default behavior while not editing
      this.set('clickEvent', this.get('map').on('click', (evt) => this.selectParcelEvent(evt) ));

    } else { // Behavior for guest users

      this.set('clickEvent', this.get('map').on('click', (evt) => this.putOrDisplaceAMarker(evt) ));

    }

  })),

  /**
   * When a parcel is selected / deselected, update map graphics
   */
  onParcelSelectionChange: Ember.on('mapLoaded', Ember.observer('parcels.selectedParcels.[]', function () {
    var parcelsCount = this.get('parcels.selectedParcels').length;
    var graphicsCount = this.get('selectedParcelsGraphics').size;

    if (graphicsCount < parcelsCount) {
      Ember.run.once(this, 'addSelectedGraphics'); // Reduces cost from exponential to linear on multiple update

    } else if (graphicsCount > parcelsCount) {
      var userParcelsLayer = this.get('layersMap').get('userParcelsLayer');
      var selectedParcels = this.get('parcels.selectedParcels');
      var selectedParcelsGraphics = this.get('selectedParcelsGraphics');

      var iterableGraphics = selectedParcelsGraphics.copy();
      iterableGraphics.forEach((graphic, parcelId) => {
        if (!selectedParcels.contains(parcelId)) {
          userParcelsLayer.remove(graphic);
          selectedParcelsGraphics.delete(parcelId);
        }
      });
    }
  })),

  /**
   * Adds missing parcel graphics
   */

  addSelectedGraphics() {
    var userParcelsLayer = this.get('layersMap').get('userParcelsLayer');
    var selectedParcels = this.get('parcels.selectedParcels');
    var selectedParcelsGraphics = this.get('selectedParcelsGraphics');

    var symbol = this.get('selectSymbol');
    userParcelsLayer.graphics.forEach((element) => {
      var parcelId = element.attributes.PARCEL_ID;
      if (selectedParcels.contains(parcelId) && !selectedParcelsGraphics.has(parcelId)) {
        var selectedAttr = { 'PARCEL_ID': parcelId};
        selectedParcelsGraphics.set(parcelId, new Graphic(element.geometry, symbol, selectedAttr));
        userParcelsLayer.add(selectedParcelsGraphics.get(parcelId));
      }
    });
    userParcelsLayer.refresh();
  },

  /**
   * Updates user last position on owned parcels change
   */
  updateLastPosition() {
    var map = this.get('map');
    var user = this.get('parcels.user');

    var actualPosition = webMercatorUtils.webMercatorToGeographic(map.extent.getCenter());
    user.setProperties({
      lastLongitude: actualPosition.x,
      lastLatitude: actualPosition.y,
      zoomLevel: map.getLevel(),
      spatialReference: (actualPosition.spatialReference.wkid).toString()
    });
    user.save();
  }
});

