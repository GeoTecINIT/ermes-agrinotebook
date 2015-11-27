import Ember from 'ember';

import OfflineTilesEnablerLayer from 'oesri/offline-tiles-advanced-src';
import FeatureLayer from "esri/layers/FeatureLayer";
import Graphic from "esri/graphic";

export default Ember.Mixin.create({
  layersMap: new Map(),
  parcelsGraphics: [],

  // For basemaps (Tiled maps in general)
  addOfflineTileLayer(layerURL, dbStore, proxy) {
    var tiledLayer = new OfflineTilesEnablerLayer(layerURL, (success) => {
      if (success) {

        //Manage offline mode
        var downloadEvent;
        var reloadEvent;
        if (navigator.onLine) {
          downloadEvent = this.get('map').on('update-end', () => {
            if (navigator.onLine) {
              var minZoomAdjust = -4;
              var maxZoomAdjust = +4;
              var zoom = tiledLayer.getMinMaxLOD(minZoomAdjust, maxZoomAdjust);

              //Download tiles
              tiledLayer.prepareForOffline(zoom.min, zoom.max, this.get('map').extent, function (progress) {
                //console.log("downloading tiles...");
                if (progress.finishedDownloading) {
                  console.log("Tile download complete");
                }
              });
            } else {
              this.liveReload();
              downloadEvent.remove();
            }
          });
        } else {
          reloadEvent = this.get('map').on('update-end', () => {
            if (navigator.onLine) {
              reloadEvent.remove();
              this.liveReload();
            }
          });
        }

      } else {
        Ember.debug("Imposible to prepare layer for offline");
      }
    }, navigator.onLine, {dbName: dbStore.toUpperCase(), objectStoreName: dbStore});

    if (proxy) {
      tiledLayer.offline.proxyPath = proxy;
    }

    this.get('layersMap').set(dbStore, tiledLayer);
    this.get('map').addLayer(tiledLayer);
  },

  // Creates and adds a complete region parcels layer
  addParcelsLayer(layerURL) {
    var featureLayer = new FeatureLayer(layerURL, {
      model: FeatureLayer.MODE_ONDEMAND,
      outFields: ['PARCEL_ID']
    });

    this.get('layersMap').set('parcelsLayer', featureLayer);
    this.get('map').addLayer(featureLayer);
  },

  // Adds and prepares for offline user parcels layer
  addUserParcelsLayer(layerURL) {
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
      var featureLayer = new FeatureLayer(layerReference, {
        model: FeatureLayer.MODE_ONDEMAND,
        outFields: ['PARCEL_ID'],
        definitionExpression: querySentence
      });

      featureLayer.setSelectionSymbol(symbol);

      var storeEvent = featureLayer.on(event, () => {
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
          Ember.debug('usersParcelLayer loaded successfully from the storage');
          createAndAddFL(featureLayer, 'resume');
        }
      });
    }
  },

  // Store userParcelsLayer
  storeUserParcelsLayer() {
    this.get('editStore').pushFeatureLayerJSON(this.get('layersMap').get('userParcelsLayer').toJson(),
      function (success) {
        if (success) {
          Ember.debug('userParcelsLayer successfully stored on the storage');
        } else {
          Ember.debug('Error: userParcelsLayer could no be stored');
        }
    });
  },

  /**
   * liveReload, this method should remove all map layers and create them again, override it.
   */
  liveReload() {
    Ember.debug('You should override this method for map layer reload');
  }
});

// Paint actual user parcels over the FeatureLayer
function drawOwnerParcels(layer, symbol, graphics) {
  layer.graphics.forEach(function (item) {
    let parcelId = item.attributes.PARCEL_ID;
    let geometry = item.geometry;
    graphics[parcelId] = new Graphic(geometry, symbol, item.attributes);
    layer.add(graphics[parcelId]);
  });
}
