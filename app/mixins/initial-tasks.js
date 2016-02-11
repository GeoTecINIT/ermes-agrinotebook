import Ember from 'ember';
import {getJSON} from 'ermes-smart-app/utils/ajax';
import config from '../config/environment';

const ASSETS_URL = config.APP.assetDescriptor;

export default Ember.Mixin.create({

  uploadQueue: Ember.inject.service(),
  parcels: Ember.inject.service(),
  offlineStorage: Ember.inject.service(),
  ermesCordova:  Ember.inject.service(),
  //index: Ember.inject.controller(),

  //downloadAsset: Ember.inject.controller(),
  //user: Ember.computed.alias('parcels.user'),

  initialChecks() {
    //place here all the initial tasks
    var user = this.get('parcels.user');

    //if with cordova .. the tpk should be downloaded
    var useOnline = this.controllerFor('index').get('useOnlineBasemap');
    if (this.get('ermesCordova').isNative() && !useOnline) {
      this.prepareBaseMap();
    }

    if (user.get('parcels.length') === 0) {
      if (navigator.onLine) {
        this.controllerFor('index').set('editMode', true);
        this.transitionTo('index.welcome');
      } else {
        this.transitionTo('index-error');
      }
    }
    this.startSync();

  },

  startSync(){
    this.get('uploadQueue').start();
  },

  prepareBaseMap(){

    var user = this.get('parcels.user');
    var region = user.get('region');
    var offlineStorage = this.get('offlineStorage');
    var configStorage = offlineStorage.get('configStorage');
    var basemapName = 'basemap_'+ region + '.zip';

    this.get('parcels').set('basemapName', basemapName);

    configStorage.getItem(basemapName).then((basemap) => {

      // The same code, but using ES6 Promises.
      //todo: check that navigator.onLine coul be changed to consume  a  service to ask for more appropriate things
      if (navigator.onLine) {
          getJSON(ASSETS_URL).done((descriptor) => {
              var regionEntry =  descriptor.regionsBaseMaps[region];
              if (basemap) {
                var version = basemap.version;
                if (regionEntry.version!== version){
                  this.controllerFor('download-asset').setProperties({"downloadUrl": regionEntry.url, "assetsKey": basemapName, "assetsDetails": regionEntry, "message": "panel.notification.download-basemap" });
                  offlineStorage.set('downloading', true);
                  this.transitionTo('download-asset');
                }
                //else  no need to download nothing
              }
              else {
                this.controllerFor('download-asset').setProperties({"downloadUrl": regionEntry.url, "assetsKey": basemapName, "assetsDetails": regionEntry, "message": "panel.notification.download-basemap"});
                offlineStorage.set('downloading', true);
                this.transitionTo('download-asset');
              }
            } //download is done
          ).fail ((error) => {console.log(error);}) ;

        }
       else /*offline*/
          if (!basemap) {
             this.transitionTo('index-error');
           }
           //else nothing to do, no connection but a basemap was found
    });

  }

});
