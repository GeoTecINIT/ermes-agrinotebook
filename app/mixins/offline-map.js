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
  layersMap: [],
  parcelsGraphics: [],

  // For basemaps (Tiled maps in general)
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
      tiledLayer.offline.proxyPath = proxy;
    }

    this.get('layersMap')[dbStore] = tiledLayer;
    this.get('map').addLayer(tiledLayer);
  },

  // Creates and adds a complete region parcels layer
  addParcelsLayer(layerURL) {
    var featureLayer = new FeatureLayer(layerURL, {
      model: FeatureLayer.MODE_ONDEMAND,
      outFields: ['PARCEL_ID']
    });

    this.get('layersMap')['parcelsLayer'] = featureLayer;
    this.get('map').addLayer(featureLayer);
  },

  // Adds and prepares for offline user parcels layer
  addUserParcelsLayer(layerURL) {
    var _this = this;

    // Symbol for painting parcels
    var symbol = new SimpleFillSymbol(
      SimpleFillSymbol.STYLE_SOLID,
      new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 0]), 2),
      new Color([255, 255, 0, 0.90])
    );

    // Query, to gather only user parcels from the FeatureLayer service
    var userParcels = this.get('parcels').getUserParcels();
    var querySentence = "";
    for (var i = 0; i < userParcels.length - 1; i++) {
      querySentence += "PARCEL_ID = '" + userParcels[i] + "' or ";
    }
    querySentence += "PARCEL_ID = '" + userParcels[userParcels.length - 1] + "'";

    // Common online and offline FeatureLayer creator and injector
    function createAndAddFL(layerReference) {
      var featureLayer = new FeatureLayer(layerReference, {
        model: FeatureLayer.MODE_ONDEMAND,
        outFields: ['PARCEL_ID'],
        definitionExpression: querySentence
      });

      featureLayer.setSelectionSymbol(symbol);

      featureLayer.on('update-end', () => {
        if (_this.get('isOnline')) {
          drawOwnerParcels(featureLayer, symbol, userParcels, _this.get('parcelsGraphics'));
          _this.storeUserParcelsLayer();
        }
      });

      _this.get('layersMap')['userParcelsLayer'] = featureLayer;
      _this.get('map').addLayer(featureLayer);
    }

    if (this.get('isOnline')) {
      createAndAddFL(layerURL);
    } else {
      this.get('editStore').getFeatureLayerJSON(function (success, featureLayer) {
        if (success) {
          Ember.debug('usersParcelLayer loaded successfully from the storage');
          createAndAddFL(featureLayer);
        }
      })
    }
  },

  // Store userParcelsLayer
  storeUserParcelsLayer() {
    this.get('editStore').pushFeatureLayerJSON(this.get('layersMap')['userParcelsLayer'].toJson(),
      function (success, error) {
        if (success) {
          Ember.debug('userParcelsLayer successfully stored on the storage');
        } else {
          Ember.debug('Error: userParcelsLayer could no be stored');
        }
    });
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
function drawOwnerParcels(layer, symbol, graphics) {
  layer.graphics.forEach(function (item, index) {
    let parcelId = item.attributes.PARCEL_ID;
    let geometry = item.geometry;
    graphics[parcelId] = new Graphic(geometry, symbol, item.attributes);
    layer.add(graphics[parcelId]);
  });
}
