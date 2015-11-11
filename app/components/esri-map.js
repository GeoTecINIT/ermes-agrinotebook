import Ember from 'ember';
import arcgisUtils from 'esri/arcgis/utils';
import OfflineTilesEnabler from 'arcgis/oesri/offline-tiles-basic-min.js';

export default Ember.Component.extend({

  classNames: ['viewDiv'],

  didInsertElement() {
    arcgisUtils.arcgisUrl = arcgisUtils.arcgisUrl.replace("file:", "http:");
    this.set('mapid', 'c4abfd3d3b03423e9990c844fcfefe34');
    arcgisUtils.createMap(this.get('mapid'), this.elementId).then(function (response) {
      let map = response.map;
      let basemapLayer = map.getLayer( map.layerIds[0] );
      let offlineTilesEnabler = new OfflineTilesEnabler();
      offlineTilesEnabler.extend(basemapLayer, function (success) {
        if (success) {
          Ember.debug('Offline library is working fine');
        } else {
          Ember.debug('Something gone wrong with indexedDB :(');
        }
      });
    });
  },

  willRemoveElement() {
    var map = this.get('map');
    if (map) {
      map.destroy();
    }
  },

  onSwitchMap: function() {
    var mapid = this.get('mapid');
    var map = this.get('map');
    if (map) {
      map.destroy();
      arcgisUtils.createMap(mapid, this.elementId)
        .then((response) => {
          this.set('map', response.map);
        });
    }
  }.observes('mapid')

});
