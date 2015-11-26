import $ from 'jquery';
import Ember from 'ember';
import AuthChecker from 'ermes-smart-app/mixins/auth-checker';

export default Ember.Route.extend(AuthChecker, {
  model() {
    var username = this.get('auth').getCurrentUserId();
    return this.store.findRecord('user', username);
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
