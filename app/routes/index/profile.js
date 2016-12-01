import Ember from 'ember';
import AuthChecker from 'ermes-smart-app/mixins/auth-checker';
import PanelManager from 'ermes-smart-app/mixins/panel-manager';

export default Ember.Route.extend(AuthChecker, PanelManager, {
  model() {
    var username = this.get('auth').getCurrentUserId();
    return this.store.findRecord('user', username).then((user) => {
      if (user.get('type') === 'guest') {
        this.transitionTo('index');
      } else {
        return user;
      }
    });
  }
});
