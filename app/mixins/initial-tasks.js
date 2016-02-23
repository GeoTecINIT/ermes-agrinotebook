import Ember from 'ember';
import {getJSON} from 'ermes-smart-app/utils/ajax';
import config from '../config/environment';
import * as dd from 'ermes-smart-app/models/static/custom-options';

const customOptionProducts = dd.getCustomOptionProducts();
const ASSETS_URL = config.APP.assetDescriptor;

export default Ember.Mixin.create({

  uploadQueue: Ember.inject.service(),
  parcels: Ember.inject.service(),
  offlineStorage: Ember.inject.service(),
  ermesCordova:  Ember.inject.service(),

  initialChecks(user) {


    user.get('parcels').then((parcels) => {
      if (parcels.length === 0) {
        if (navigator.onLine) {
          this.controllerFor('index').set('editMode', true);
          this.transitionTo('index.welcome');
        } else {
          throw new Error();
        }
      }
    }).catch(() => {
      this.transitionTo('index-error');
    });
    this.startSync();
    this.retrieveCustomOptions();

    //if with cordova .. the tpk should be downloaded
    var useOnline = this.controllerFor('index').get('useOnlineBasemap');
    if (this.get('ermesCordova').isNative() && !useOnline) {
      return this.prepareBaseMap(user);
    } else {
      return Ember.RSVP.resolve();
    }
  },

  startSync() {
    this.get('uploadQueue').start();
  },

  retrieveCustomOptions() {
    for (var productType in customOptionProducts) {
      this.store.findRecord('custom-option', Ember.String.camelize(Ember.String.pluralize(productType)));
    }
  },

  prepareBaseMap(user){

    var region = user.get('region');
    var offlineStorage = this.get('offlineStorage');
    var configStorage = offlineStorage.get('configStorage');
    var basemapName = 'basemap_'+ region + '.zip';

    this.get('parcels').set('basemapName', basemapName);

    return configStorage.getItem(basemapName).then((basemap) => {

      // The same code, but using ES6 Promises.
      //todo: check that navigator.onLine could be changed to consume  a  service to ask for more appropriate things
      if (navigator.onLine) {
        return new Ember.RSVP.Promise((resolve, reject) => {
          getJSON(ASSETS_URL).done((descriptor) => {
            resolve(descriptor);
          }).fail((err) => {
            reject(err);
          });
        }).catch((err) => {
          console.log(err);
          if (!basemap) {
            return Ember.RSVP.reject(err);
          }
        }).then((descriptor) => {
          var regionEntry =  descriptor.regionsBaseMaps[region];
          if (basemap) {
            var version = basemap.version;
            if (regionEntry.version!== version){
              this.controllerFor('download-asset').setProperties({"downloadUrl": regionEntry.url, "assetsKey": basemapName, "assetsDetails": regionEntry, "message": "download-assets.download-basemap", "askingForDownload": true });
              offlineStorage.set('downloading', true);
              this.transitionTo('download-asset');
            }
            //else  no need to download nothing
          }
          else {
            this.controllerFor('download-asset').setProperties({"downloadUrl": regionEntry.url, "assetsKey": basemapName, "assetsDetails": regionEntry, "message": "download-assets.download-basemap", "askingForDownload": true});
            offlineStorage.set('downloading', true);
            this.transitionTo('download-asset');
          }
        });
      } else if (!basemap) { /*offline*/
        return Ember.RSVP.reject();
      }
      //else nothing to do, no connection but a basemap was found
    }).catch(() => {
      this.transitionTo('index-error');
    });

  }

});
