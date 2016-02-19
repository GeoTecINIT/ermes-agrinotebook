import $ from 'jquery';
import Ember from 'ember';
import AuthChecker from 'ermes-smart-app/mixins/auth-checker';
import InitialTasks from 'ermes-smart-app/mixins/initial-tasks';

export default Ember.Route.extend(AuthChecker, InitialTasks, {
  //uploadQueue: Ember.inject.service(),
  parcels: Ember.inject.service(),
  model() {
    var username = this.get('auth').getCurrentUserId();
    return this.store.findRecord('user', username).then((user) => {
      return user.reload();
    });
  },
  afterModel(user) {
    this.get('parcels').setUser(user);
    this.initialChecks(user);     // TODO this return a promise
    //is being done in InitialTaks this.get('uploadQueue').start();
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
