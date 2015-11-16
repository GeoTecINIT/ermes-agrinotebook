import OfflineTilesEnablerLayer from 'oesri/offline-tiles-advanced-src';
import Offline from 'offline';
import Ember from 'ember';


export function addOfflineTileLayer(map, layerURL, dbStore, proxy) {

  var tiledLayer = new OfflineTilesEnablerLayer(layerURL, function(success) {
    if (success) {
      Ember.debug(layerURL + ' successfully initialized.');


      //When map is updated, download the tiles locally.
      var downloadEvent;

      if (Offline.state) {
        downloadEvent = map.on('update-end', function () {
          downloadTiles(tiledLayer, downloadEvent, map);
        });
      }
    } else {
      Ember.debug("Imposible to prepare layer for offline");
    }
  }, true, {dbName: dbStore.toUpperCase(), objectStoreName: dbStore});

  if (proxy) {
    Ember.debug('Proxy working');
    tiledLayer.offline.proxyPath = proxy;
  }

  map.addLayer(tiledLayer);
}

// Function for Offline Functionality.
function downloadTiles(tiledLayer, downloadEvent, map) {
  if (Offline.state) {
    var minZoomAdjust = -4;
    var maxZoomAdjust = +4;
    var zoom = tiledLayer.getMinMaxLOD(minZoomAdjust, maxZoomAdjust);

    //Download tiles
    tiledLayer.prepareForOffline(zoom.min, zoom.max, map.extent, function (progress) {
      console.log("downloading tiles...");
      if (progress.finishedDownloading) {
        console.log("Tile download complete");
      }
    });
  } else {
    downloadEvent.remove();
  }
}
