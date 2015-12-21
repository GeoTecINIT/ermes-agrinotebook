import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  namespace: 'api/products',
  host: config.APP.apiServer,
  auth: Ember.inject.service(),
  headers: Ember.computed('auth.token', function() {
    return {
      "X-Auth-Key": this.get("auth.token")
    };
  }),
  offlineStorage: Ember.inject.service(),
  findRecord(store, type, id, snapshot) {
    return this._super(store, type, id, snapshot).then((res) => { // Record found online
      this.get('offlineStorage').get('storage').setItem(type + id, res);
      return res;
    }, (err) => { // Record not found, connection lost
      // Recovering record from the local database
      return this.get('offlineStorage').get('storage').getItem(type + id).then((obj) => {
        // Masquerade for not breaking the Application.RESTAdapter object
        return new Ember.RSVP.Promise(function(resolve, reject) {
          if (obj !== null) {
            resolve(obj); // User profile successfully recovered
          } else {
            reject(err); // There is no user data on the local database
          }
        });
      });
    });
  }
});
