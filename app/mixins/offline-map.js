import Ember from 'ember';

import TPKLayer from "oesri/offline-tpk-src";
//import OfflineTilesEnablerLayer from 'oesri/offline-tiles-advanced-src';
import TiledMapServiceLayer from "esri/layers/TiledMapServiceLayer";
import FeatureLayer from "esri/layers/FeatureLayer";
import Graphic from "esri/graphic";

export default Ember.Mixin.create({
  layersMap: new Map(),
  parcelsGraphics: [],
  ermesCordova: Ember.inject.service(),

  // For basemaps (Tiled maps in general)
  addOfflineTileLayer(layerURL, dbStore, proxy, /*Luis*/mapInfo/*luis*/)
{
  var tiledLayer = new OfflineTilesEnablerLayer(layerURL, (success) => {
      if (success)
    {
    var maxExtent = this.get('map').extent;
    var buffer = 0;
    var adjustedEx = maxExtent;
    var flag = false;
    var map = this.get('map');
 /*   this.get('map').on('pan-end', (d) => {
      var extent = d.extent;
      if(extent.xmin < maxExtent.xmin - buffer)
    {
      adjustedEx.xmin = maxExtent.xmin;
      adjustedEx.xmax = Math.abs(extent.xmin - maxExtent.xmin) + extent.xmax;
      flag = true;
    }
    if (extent.ymin < maxExtent.ymin - buffer) {
      adjustedEx.ymin = maxExtent.ymin;
      adjustedEx.ymax = Math.abs(extent.ymin - maxExtent.ymin) + extent.ymax;
      flag = true;
    }
    if (extent.xmax - buffer > maxExtent.xmax) {
      adjustedEx.xmax = maxExtent.xmax;
      adjustedEx.xmin = extent.xmin - Math.abs(extent.xmax - maxExtent.xmax);
      flag = true;
    }
    if (extent.ymax - buffer > maxExtent.ymax) {
      adjustedEx.ymax = maxExtent.ymax;
      adjustedEx.ymin = extent.ymin - Math.abs(extent.ymax - maxExtent.ymax);
      flag = true;
    }
    if (flag === true) {
      map.setExtent(adjustedEx);
    }
    flag = false;
  }
);*/

  //Manage offline mode
  var downloadEvent;
  var reloadEvent;
  var tilesLoaded = false;//Luis E


  if (navigator.onLine) {
    downloadEvent = this.get('map').on('update-end', () => {
      if (navigator.onLine)
    {
      /**Luis only load  the tiles of not already loaded for the levels of the map
       */
      if (!tilesLoaded) {
        var minZoomAdjust = -2;
        var maxZoomAdjust = +2;
        /*get all levels.. */
        tiledLayer.getMaxZoom(function (max) {
          maxZoomAdjust = max;
        });
        tiledLayer.getMinZoom(function (min) {
          minZoomAdjust = min;
        });
        var zoom = tiledLayer.getMinMaxLOD(minZoomAdjust, maxZoomAdjust);
        zoom.max = Math.min(mapInfo.maxZoom, maxZoomAdjust);//10;
        zoom.min = Math.max(mapInfo.minZoom, minZoomAdjust);//12;
        /*Luis*/
        //Download tiles
        tiledLayer.prepareForOffline(zoom.min, zoom.max, this.get('map').extent, function (progress) {
          //console.log("downloading tiles...");
          if (progress.finishedDownloading) {
            console.log("Tile download complete");
            tilesLoaded = true;
          }
          else {
            console.log("loading (" + progress.countNow + "/" + progress.countMax + ")");
          }
        });
      }
    }
  else
    {
      this.liveReload();
      downloadEvent.remove();
    }
  }
);
}
else
{
  reloadEvent = this.get('map').on('update-end', () => {
    if (navigator.onLine)
  {
    reloadEvent.remove();
    this.liveReload();
  }
}
);
}
} else
{
  Ember.debug("Imposible to prepare layer for offline");
}
},
navigator.onLine, {dbName: dbStore.toUpperCase(), objectStoreName: dbStore}
)
;

if (proxy) {
  tiledLayer.offline.proxyPath = proxy;
}

this.get('layersMap').set(dbStore, tiledLayer);
this.get('map').addLayer(tiledLayer);
},

// Creates and adds a complete region parcels layer
addParcelsLayer(layerURL)
{
  var featureLayer = new FeatureLayer(layerURL, {
    model: FeatureLayer.MODE_ONDEMAND,
    outFields: ['PARCEL_ID']
  });

  this.get('layersMap').set('parcelsLayer', featureLayer);

  this.get('map').addLayer(featureLayer);
},

// Adds and prepares for offline user parcels layer
addUserParcelsLayer(layerURL)
{
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
     }
   );

  _this.get('layersMap').set('userParcelsLayer', featureLayer);
  /*_this.get('map').on('layer-add-result', (evt)=> {
    drawOwnerParcels(featureLayer, symbol, _this.get('parcelsGraphics'));
    if (navigator.onLine) {
      _this.storeUserParcelsLayer();
      //storeEvent.remove();
    }
  });*/
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
storeUserParcelsLayer()
{
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
liveReload()
{
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
  addTPKLayer(url, local){

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
      , ()=> { resolve(null)});
  } );
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
    this.get('layersMap').set("tpkLayer", tpkLayer);
  }

})
;

// Paint actual user parcels over the FeatureLayer
function drawOwnerParcels(layer, symbol, graphics) {
  Ember.debug('Drawing user parcels');
  layer.graphics.forEach(function (item) {
    let parcelId = item.attributes.PARCEL_ID;
    let geometry = item.geometry;
    graphics[parcelId] = new Graphic(geometry, symbol, item.attributes);
    layer.add(graphics[parcelId]);
  });
  layer.refresh();
}
