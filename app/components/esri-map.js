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

  editMode: true,

  liveReload: Ember.observer('isOnline', function () {
    //console.debug('Offline state changed:', this.get('offline').state);
    //var layersMap = this.get('layersMap');
    //for(let [layerName, layerObject] of layersMap.entries()) {
    //  this.get('map').removeLayer(layerObject);
    //}
    ////console.debug(this.get('layersMap'));
    //this.set('layersMap', new Map());
    //this.loadBasemap();
    //this.loadFieldsLayer();
  }),

  didInsertElement() {
    var _this = this;
    $(document).ready(function() { // Wait until DOM is ready to prevent map fixed size
      var editStore = new EditStore();
      editStore.dbName = "fieldsStore";
      editStore.objectStoreName = "fields";
      editStore.init(function (success) {
        if (success) {
          _this.get('offline').check();
          _this.createMap();
          _this.loadBasemap();
          _this.loadFieldsLayer();
          //_this.initEventHandlers()
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
    if (this.get('editMode')) {
      this.addParcelsLayer(mapInfo.parcelsLayer);
    }
  }
});
