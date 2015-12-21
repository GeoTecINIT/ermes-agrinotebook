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
      if (navigator.onLine) {
        this.controllerFor('index').set('editMode', true);
        this.transitionTo('index.welcome');
      } else {
        this.transitionTo('index-error');
      }
    }

    window.localforage.getItem('upload-pending-products').then((prods) => {
      if (prods) {
        var prod = prods[0].split(':');
        console.debug('PROD_T:', prod[1], 'PROD:', prod[2]);
        this.store.findRecord(prod[1], prod[2]).then((agro) => {
          console.debug('AGRO:', agro);
          agro.save().then((saved) => {
            console.debug('SAVED:', saved);
          }, (err) => {
            console.debug('SAVE_ERR:', err);
          });
        }, (err) => {
          console.debug('NEW RECORD');
          window.localforage.getItem(prods[0]).then((agro) => {
            if (agro) {
              console.debug('CREATED:', this.store.createRecord(prod[1], agro[prod[1]]));
            }
          })
        });
      }
    });
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
