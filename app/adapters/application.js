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
  findRecord(store, type, id, snapshot) {
    return this._super(store, type, id, snapshot).then((res) => { // Record found online
      window.localforage.setItem(type +'#'+ id, res);
      return res;
    }, (err) => { // Record not found, connection lost
      return window.localforage.getItem(type +'#'+ id).then((obj) => { // Recovering record from the local database
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
