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

    //this.store.pushPayload({
    //  'agrochemicals': {
    //    _id: '7245860192514548521',
    //    amount: 15,
    //    date: '2015-12-16T00:00:00.000Z',
    //    parcels: ['ITC4801814400700005A'],
    //    product: 'oxodiazon',
    //    uploadingDate: '2015-12-20T21:12:00.000Z'
    //  }
    //});
    //this.store.findRecord('agrochemical', '7245860192514548521').then((agrochemical) => {
    //  agrochemical.save().then((agro) => {
    //    console.debug('AGRO:', agro);
    //  }, (err) => {
    //    console.debug('ERR:', err);
    //  });
    //});

    window.localforage.getItem('upload-pending-products').then((prods) => {
      if (prods) {
        var prod = prods[0].split(':');
        console.debug('PROD_T:', prod[1], 'PROD:', prod[2]);
        this.store.findRecord(prod[1], prod[2]).then((agro) => {
          console.debug('AGRO:', agro);
        }, (err) => {
          console.debug('ERROR:', err);
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
