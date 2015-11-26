import DS from 'ember-data';
import config from '../config/environment'

export default DS.RESTAdapter.extend({
  namespace: 'api',
  host: config.APP.apiServer,
  auth: Ember.inject.service(),
  headers: Ember.computed('auth.token', function() {
    return {
      "X-Auth-Key": this.get("auth.token")
    };
  })
});
