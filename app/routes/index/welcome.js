import Ember from 'ember';
import AuthChecker from 'ermes-smart-app/mixins/auth-checker';

export default Ember.Route.extend({
  model() {
    var username = this.get('auth').getCurrentUserId();
    return this.store.findRecord('user', username);
  }
});
