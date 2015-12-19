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
    return this._super(store, type, id, snapshot).then((res) => {
      window.localforage.setItem(type +'#'+ id, res);
      return res;
    }, (err) => {
      return window.localforage.getItem(type +'#'+ id).then((obj) => obj, () => err);
    });
  }
});
