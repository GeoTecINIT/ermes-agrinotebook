import Ember from 'ember';
import arcgisUtils from 'esri/arcgis/utils';

export default Ember.Component.extend({

  classNames: ['viewDiv'],

  didInsertElement() {
    this.set('mapid', '010f412d4d0a4e8f9ff09ead37963ac7');
    arcgisUtils
      .createMap(this.get('mapid'), this.elementId);
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
