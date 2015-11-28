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

export default Ember.Component.extend(OfflineMap, MapEvents, {
  elementId: 'mapDiv',
  map: null,
  editStore: null,
  parcels: Ember.inject.service(),

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
  createMap() {
    var pos = this.get('parcels.user.lastPosition');
    var mapInfo = this.get('parcels').getUserMapInfo();

    var map = new Map(this.elementId, {
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
  loadBasemap() {
    var mapInfo = this.get('parcels').getUserMapInfo();

    this.addOfflineTileLayer(mapInfo.baseMap, mapInfo.mapName, config.APP.layerProxy);
  },

  /**
   * Special feature layer, contains only actual user fields
   */
  loadUserParcelsLayer() {
    var mapInfo = this.get('parcels').getUserMapInfo();

    this.addUserParcelsLayer(mapInfo.parcelsLayer);
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
    var layersMap = this.get('layersMap');
    for(let layerObject of layersMap.values()) {
      this.get('map').removeLayer(layerObject);
    }

    this.get('layersMap').clear();
    this.loadBasemap();
    this.loadUserParcelsLayer();
  },

  /**
   * Once the map has been fully configured,
   * trigger Edit Mode decision event
   */
  mapLoaded() {
    Ember.debug('Map was successfully loaded');
    this.notifyPropertyChange('editMode');
  },

  /**
   * Decides if it is needed to switch to the editMode or not
   * on map load and when editMode variable changes
   */
  onMapLoad: Ember.on('mapLoaded', Ember.observer('editMode', function () {
    var clickEvent = this.get('clickEvent');
    // If an event already exists, remove it
    if (clickEvent) {
      clickEvent.remove();
    }

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
  })),

  /**
   * When a parcel is selected / deselected, update map graphics
   */
  onParcelSelectionChange: Ember.on('mapLoaded', Ember.observer('parcels.selectedParcels.[]', function () {
    var userParcelsLayer = this.get('layersMap').get('userParcelsLayer');
    var selectedParcels = this.get('parcels.selectedParcels');
    var selectedParcelsGraphics = this.get('selectedParcelsGraphics');
    var symbol = this.get('selectSymbol');

    var parcelsCount = selectedParcels.length;
    var graphicsCount = selectedParcelsGraphics.size;

    if (graphicsCount < parcelsCount) {
      userParcelsLayer.graphics.forEach((element) => {
        var parcelId = element.attributes.PARCEL_ID;
        if (selectedParcels.contains(parcelId) && !selectedParcelsGraphics.has(parcelId)) {
          var selectedAttr = { 'PARCEL_ID': parcelId};
          selectedParcelsGraphics.set(parcelId, new Graphic(element.geometry, symbol, selectedAttr));
          userParcelsLayer.add(selectedParcelsGraphics.get(parcelId));
        }
      });

    } else if (graphicsCount > parcelsCount) {
      for (var [parcelId, graphic] of selectedParcelsGraphics.entries()) {
        if (!selectedParcels.contains(parcelId)) {
          userParcelsLayer.remove(graphic);
          selectedParcelsGraphics.delete(parcelId);
        }
      }
    }
    userParcelsLayer.refresh();
  }))
});
