import Ember from 'ember';
import OfflineTilesEnablerLayer from 'oesri/offline-tiles-advanced-src';
import FeatureLayer from "esri/layers/FeatureLayer";
import SimpleFillSymbol from "esri/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "esri/symbols/SimpleLineSymbol";
import Color from "esri/Color";
import Graphic from "esri/graphic";

export default Ember.Mixin.create({
  offline: Ember.inject.service(),
  isOnline: Ember.computed.alias('offline.isUp'),
  layersQueue: [],
  parcelsGraphics: [],

  // For basemaps
  addOfflineTileLayer(layerURL, dbStore, proxy) {
    var tiledLayer = new OfflineTilesEnablerLayer(layerURL, (success) => {
      if (success) {

        //When online, download the tiles locally.
        this.get('map').on('update-end', () => {
          if (this.get('isOnline')) {
            downloadTiles(tiledLayer, this.get('map'));
          }
        });
      } else {
        Ember.debug("Imposible to prepare layer for offline");
      }
    }, true, {dbName: dbStore.toUpperCase(), objectStoreName: dbStore});

    if (proxy) {
      Ember.debug('Proxy working');
      tiledLayer.offline.proxyPath = proxy;
    }

    this.get('layersQueue').push(tiledLayer);
    this.get('map').addLayer(tiledLayer);
  },

  addCompleteFeatureLayer(layerURL) {
    var featureLayer = new FeatureLayer(layerURL, {
      model: FeatureLayer.MODE_ONDEMAND,
      outFields: ['PARCEL_ID']
    });

    this.get('layersQueue').push(featureLayer);
    this.get('map').addLayer(featureLayer);
  },

  addFeatureLayer(layerURL) {
    var symbol = new SimpleFillSymbol(
      SimpleFillSymbol.STYLE_SOLID,
      new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 0]), 2),
      new Color([255, 255, 0, 0.90])
    );

    var userParcels = this.get('parcels').getUserParcels();
    var querySentence = "";
    for (var i = 0; i < userParcels.length-1; i++) {
      querySentence += "PARCEL_ID = '" + userParcels[i] + "' or ";
    }
    querySentence += "PARCEL_ID = '" + userParcels[userParcels.length-1] + "'";

    var featureLayer = new FeatureLayer(layerURL, {
      model: FeatureLayer.MODE_ONDEMAND,
      outFields: ['PARCEL_ID'],
      definitionExpression: querySentence
    });

    featureLayer.setSelectionSymbol(symbol);

    featureLayer.on('update-end', () => {
      drawOwnerParcels(featureLayer, symbol, userParcels, this.get('parcelsGraphics'));
    });

    this.get('layersQueue').push(featureLayer);
    this.get('map').addLayer(featureLayer);
  }

});

// Function for Offline Functionality.
function downloadTiles(tiledLayer, map) {
  var minZoomAdjust = -4;
  var maxZoomAdjust = +4;
  var zoom = tiledLayer.getMinMaxLOD(minZoomAdjust, maxZoomAdjust);

  //Download tiles
  tiledLayer.prepareForOffline(zoom.min, zoom.max, map.extent, function (progress) {
    //console.log("downloading tiles...");
    if (progress.finishedDownloading) {
      console.log("Tile download complete");
    }
  });
}

// Paint actual user parcels over the FeatureLayer
function drawOwnerParcels(layer, symbol, parcels, graphics) {
  layer.graphics.forEach(function (item, index) {
    let parcelId = item.attributes.PARCEL_ID;
    let geometry = item.geometry;
    graphics[parcelId] = new Graphic(geometry, symbol, item.attributes);
    layer.add(graphics[parcelId]);
  });
}
