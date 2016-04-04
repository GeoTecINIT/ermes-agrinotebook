import Ember from 'ember';

import TPKLayer from "oesri/offline-tpk-src";
import OfflineTilesEnablerLayer from 'oesri/offline-tiles-advanced-src';
import TiledMapServiceLayer from "esri/layers/TiledMapServiceLayer";
import FeatureLayer from "esri/layers/FeatureLayer";
import Graphic from "esri/graphic";

export default Ember.Mixin.create({
  layersMap: new Ember.Map(),
  parcelsGraphics: [],
  ermesCordova: Ember.inject.service(),

  // For basemaps (Tiled maps in general)
  addOfflineTileLayer(layerURL, dbStore, proxy, /*Luis*/mapInfo/*luis*/) {
    var tiledLayer = new OfflineTilesEnablerLayer(layerURL, (success) => {
      if (success) {
        var maxExtent = this.get('map').extent;
        var map = this.get('map');

        //Manage offline mode
        var downloadEvent;
        var reloadEvent;
        var tilesLoaded = false;//Luis E

        // FIXME Uncomment this section to re-enable the partial offline functionality on browsers (non-hybrid)
        /*if (navigator.onLine) {
          downloadEvent = this.get('map').on('update-end', () => {
            if (navigator.onLine) {
              /!**Luis only load  the tiles of not already loaded for the levels of the map
              *!/
              if (!tilesLoaded) {
                var minZoomAdjust = -2;
                var maxZoomAdjust = +2;
                /!*get all levels.. *!/
                tiledLayer.getMaxZoom(function (max) {
                  maxZoomAdjust = max;
                });
                tiledLayer.getMinZoom(function (min) {
                  minZoomAdjust = min;
                });
                var zoom = tiledLayer.getMinMaxLOD(minZoomAdjust, maxZoomAdjust);
                zoom.max = Math.min(mapInfo.maxZoom, maxZoomAdjust);//10;
                zoom.min = Math.max(mapInfo.minZoom, minZoomAdjust);//12;
                /!*Luis*!/
                //Download tiles
                tiledLayer.prepareForOffline(zoom.min, zoom.max, this.get('map').extent, function (progress) {
                  //console.log("downloading tiles...");
                  if (progress.finishedDownloading) {
                    console.log("Tile download complete");
                    tilesLoaded = true;
                  } else {
                    console.log("loading (" + progress.countNow + "/" + progress.countMax + ")");
                  }
                });
              }
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
        }*/
      } else {
        Ember.debug("Imposible to prepare layer for offline");
      }

    },
    navigator.onLine, {dbName: dbStore.toUpperCase(), objectStoreName: dbStore});

    if (proxy) {
      tiledLayer.offline.proxyPath = proxy;
    }
    
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
    var user = this.get('parcels.user');
    var _this = this;

    // Symbol for painting parcels
    var symbol = this.get('userParcelSymbol');
    var querySentence = "";

    // Common online and offline FeatureLayer creator and injector
    function createAndAddFL(layerReference, event) {
      var featureLayer = new FeatureLayer(layerReference, {
        model: FeatureLayer.MODE_SNAPSHOT,
        outFields: ['PARCEL_ID'],
        definitionExpression: querySentence
      });

      featureLayer.setSelectionSymbol(symbol);

      var readyEvent = featureLayer.on(event, () => {

        // Draw parcels, and if online, store layer
        drawOwnerParcels(featureLayer, symbol, _this.get('parcelsGraphics'), user);
        if (navigator.onLine) {
          _this.storeUserParcelsLayer();
        }

        // Each time map is being panned, draw parcels
        var drawEvent = _this.get('map').on('pan-end', () => {
          Ember.run.once(_this, () => {
            drawOwnerParcels(featureLayer, symbol, _this.get('parcelsGraphics'), user);

            // And if online, store layer
            if (navigator.onLine) {
              _this.storeUserParcelsLayer();
            }
          });
        });
        _this.set('drawEvent', drawEvent);

        readyEvent.remove();
      });

      _this.get('layersMap').set('userParcelsLayer', featureLayer);
      _this.get('map').addLayer(featureLayer);
    }

    // Query, to gather only user parcels from the FeatureLayer service
    this.get('parcels.user.parcels').then((parcels) => {
      var userParcels = parcels.map((parcel) => parcel.get('parcelId').toUpperCase());

      for (var i = 0; i < userParcels.length - 1; i++) {
        querySentence += "PARCEL_ID = '" + userParcels[i] + "' or ";
      }
      querySentence += "PARCEL_ID = '" + userParcels[userParcels.length - 1] + "'";

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
    });
  },

  // Store userParcelsLayer
  storeUserParcelsLayer() {
    this.get('editStore').pushFeatureLayerJSON(this.get('layersMap').get('userParcelsLayer').toJson(), function (success) {
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
  },

  /*Added by Luis in order to retrieve use the tpk layer*/

  // Parse the zip file contents into a zip.Entries object
  zipParser(blob){
    var zip = O.esri.zip;
    var _this = this;
  /*O.esri.*/zip.createReader(new /*O.esri.*/zip.BlobReader(blob), function (zipReader) {
      zipReader.getEntries(function (entries) {
        _this.initMap(entries);
        //if(entries)alert("TPK downloaded and unzipped!");
        zipReader.close(function(evt){
          console.log("Done reading zip file." + evt);
          _this.set("loading", false);
        });
      }, function (err) {
        alert("There was a problem reading the file!: " + err);
      });
    });
  },
// Retrieve the TPK file via an HTTP request
  addTPKLayer(){
    //<editor-fold desc="old code to eliminate">
    /* if (typeof local == 'undefined') {

      //todo: maybe based on this url we could decide if taking the tpk from File API or form URL
      var xhrRequest = new XMLHttpRequest();
      var _this = this;
      xhrRequest.open("GET", url, true);
      xhrRequest.responseType = "blob";
      xhrRequest.onprogress = function(evt){
        var percent = 0;
        if(/!*evt.hasOwnProperty("total")*!/typeof evt["total"] !== 'undefined'){
          percent = (parseFloat(evt.loaded / evt.total) * 100).toFixed(0);
        }
        else{
          percent = (parseFloat(evt.loaded / evt.totalSize) * 100).toFixed(0);
        }

        console.log("Get file via url " + percent + "%");
        console.log("Begin downloading remote tpk file...");
      };

      xhrRequest.error = function(err){
        console.log("ERROR retrieving TPK file: " + err.toString());
        alert("There was a problem retrieve the file.");
      };
      var __this = _this;
      xhrRequest.onload = function(oEvent) {
        if(this.status === 200) {
          console.log("Remote tpk download finished." + oEvent);
          __this.zipParser(this.response);
        }
        else{
          alert("There was a problem loading the file. " + this.status + ": " + this.statusText );
        }
      };
      xhrRequest.send();
    }
*/
    //</editor-fold>
    if (this.get('ermesCordova').isNative()){

      var basemapName = this.get('parcels').get('basemapName');
      var store = cordova.file.dataDirectory;
      var fileName = basemapName;
      this.set("loading", true);
      this.getBaseMapZip (store, fileName).then((binary)=>{
        if (binary!== null) {
          this.zipParser(binary);
        }
        else {
           Ember.debug("getBaseMapZip: error loading the zip file");
        }
      });
    }

  },
  getBaseMapZip(store, fileName){
    return new Ember.RSVP.Promise( (resolve, reject )=> {
      window.resolveLocalFileSystemURL(store + fileName,  (fileEntry) => {
      //delete the file
        fileEntry.file((file)=>{
          console.debug("the file was opened successfuly");
          resolve(file);
        });
      }
      ,()=> { resolve(null)});
    });
  },



  // Initialize the Map and the TPKLayer
  initMap(entries){
    //Destroy the old map so we can reload a new map
    var map = this.get('map');

    var tpkLayer = new TPKLayer();

    tpkLayer.on("progress", function (evt) {
      console.log("TPK loading..." + evt);
    });
    tpkLayer.extend(entries);

    tpkLayer.map = map;
    var addedLayer =  map.addLayer(tpkLayer, 0);
  }

});

// Paint actual user parcels over the FeatureLayer
function drawOwnerParcels(layer, symbol, graphics, user) {
  Ember.debug('Drawing user parcels');
  var changed = false;

  user.get('parcels').then((parcels) => {
    var userParcels = parcels.map((parcel) => parcel.get('parcelId').toUpperCase());

    layer.graphics.forEach(function (item) {
      let parcelId = item.attributes.PARCEL_ID;
      let geometry = item.geometry;
      if (!graphics[parcelId] && userParcels.contains(parcelId)) {
        graphics[parcelId] = new Graphic(geometry, symbol, item.attributes);
        layer.add(graphics[parcelId]);
        changed = true;
      }
    });
    if (changed) {
      layer.refresh();
    }
  });
}
