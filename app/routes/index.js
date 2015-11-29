import $ from 'jquery';
import Ember from 'ember';
import AuthChecker from 'ermes-smart-app/mixins/auth-checker';

export default Ember.Route.extend(AuthChecker, {
  parcels: Ember.inject.service(),
  model() {
    var username = this.get('auth').getCurrentUserId();
    return this.store.findRecord('user', username);
  },
  afterModel(user) {
    this.get('parcels').setUser(user);
    if (user.get('parcels.length') === 0) {
      this.controllerFor('index').set('editMode', true);
    }
  },
  actions: {
    willTransition() {

      // We check if there was a panel already opened before moving to another page
      var panel = this.controller.get('openedPanel');
      if (panel && panel !== 'none') {
        var panelElement = $('#'+panel);
        panelElement.panel('close');
        panelElement.remove();
      }

      // This is needed to bubble up events
      return true;
    }
  }
});
