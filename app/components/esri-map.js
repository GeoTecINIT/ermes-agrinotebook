import Ember from 'ember';
import $ from 'jquery';
import Map from 'esri/map';
import { addOfflineTileLayer } from 'ermes-smart-app/utils/offline-map';

export default Ember.Component.extend({
  elementId: 'mapDiv',

  didInsertElement() {
    var that = this;
    $(document).ready(function () { // Wait until DOM is ready to prevent map fixed size
      setTimeout(function () { // Extra wait to prevent errors due single page app
        Ember.debug('Page shown');
        var map = new Map(that.elementId, {
          "center": [-0.3, 39.3],
          "zoom": 15,
          "logo": false
        });

        //addOfflineTileLayer(map,
        //  'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer', 'basemap');
        //addOfflineTileLayer(map,
        //  'http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer',
        //  'labels');
        //addOfflineTileLayer(map,
        //  'http://ermes.dlsi.uji.es:6080/arcgis/rest/services/2015-ES/ES_parcels/MapServer', 'spainParcels',
        //  'http://ermes.dlsi.uji.es:6585/proxy');
        addOfflineTileLayer(map,
          'http://ermes.dlsi.uji.es:6080/arcgis/rest/services/2015-ES/landsat_spain_scene_mercator/MapServer', 'spainParcels',
          'http://ermes.dlsi.uji.es:6585/proxy');
      }, 50);
    });
  }
});
