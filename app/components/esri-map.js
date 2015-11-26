import Ember from 'ember';
import $ from 'jquery';
import config from '../config/environment';
import OfflineMap from 'ermes-smart-app/mixins/offline-map';
import Map from 'esri/map';
import EditStore from 'oesri/offline-edit-store-src';

export default Ember.Component.extend(OfflineMap, {
  elementId: 'mapDiv',
  map: null,
  editStore: null,
  parcels: Ember.inject.service(),

  editMode: false, // Represents iif the user is editing his parcels or not
  onMapLoad: Ember.on('mapLoaded', Ember.observer('editMode', function () {
    // Enter edit mode
    if (this.get('editMode')) {
      this.loadFullParcelsLayer();

    // Exit edit mode, remove full layer
    } else if (this.get('layersMap').get('parcelsLayer')) {
      this.get('map').removeLayer(this.get('layersMap').get('parcelsLayer'));
      this.get('layersMap').delete('parcelsLayer')
    }
  })),
  didInsertElement() {
    var _this = this;
    $(document).ready(function() { // Wait until DOM is ready to prevent map fixed size
      var editStore = new EditStore();
      editStore.dbName = "fieldsStore";
      editStore.objectStoreName = "fields";
      editStore.init(function (success) {
        if (success) {
          _this.createMap();
          _this.loadBasemap();
          _this.loadFieldsLayer();
          //_this.initEventHandlers();
          _this.mapLoaded();
        }
        // else: load online basemap
      });
      _this.set('editStore', editStore);
    });
  },
  createMap() {
    var pos = this.get('parcels').getUserLastPosition();
    var mapInfo = this.get('parcels').getUserMapInfo();

    var map = new Map(this.elementId, {
      "center": [pos.lastX, pos.lastY],
      "zoom": pos.zoom,
      "maxZoom": mapInfo.maxZoom,
      "minZoom": mapInfo.minZoom,
      "logo": false
    });
    this.set('map', map);
  },
  loadBasemap() {
    var mapInfo = this.get('parcels').getUserMapInfo();

    this.addOfflineTileLayer(mapInfo.baseMap, mapInfo.mapName, config.APP.layerProxy);
  },
  loadFieldsLayer() {
    var mapInfo = this.get('parcels').getUserMapInfo();

    this.addUserParcelsLayer(mapInfo.parcelsLayer);
    //if (this.get('editMode')) {
    //  this.addParcelsLayer(mapInfo.parcelsLayer);
    //}
  },
  loadFullParcelsLayer() {
    var mapInfo = this.get('parcels').getUserMapInfo();

    this.addParcelsLayer(mapInfo.parcelsLayer);
  },

  // Reload all layers
  liveReload() {
    var layersMap = this.get('layersMap');
    for(let [layerName, layerObject] of layersMap.entries()) {
      this.get('map').removeLayer(layerObject);
    }
    //this.get('layersMap').forEach(function (item) {
    //  this.get('map').removeLayer(item);
    //});

    // Reset
    this.get('layersMap').clear();
    this.loadBasemap();
    this.loadFieldsLayer();
  },

  // This is important, once this is called, then user can start editing
  mapLoaded() {
    Ember.debug('Map was successfully loaded');
    this.notifyPropertyChange('editMode');
  }
});
