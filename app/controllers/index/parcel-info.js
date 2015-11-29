import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/products';

export default Ember.Controller.extend({
  panelId: 'parcel-info',
  i18n: Ember.inject.service(),
  parcels: Ember.inject.service(),
  products: Ember.computed('i18n.locale', function() {
    return dd.getProducts(this);
  }),
  modelChange: Ember.on('init', Ember.observer('parcels.selectedParcels.[]', function () {
    this.set('loading', true);

    var selectedParcels = this.get('parcels.selectedParcels');
    if (selectedParcels.length === 1) {
      let parcel = selectedParcels.get('firstObject');
      this.store.findRecord('parcel', parcel).then((parcel) => {
        this.set('model', parcel);
        this.set('loading', false);
      });
    } else {
      this.set('model', null); // Nº of parcels != 1, then decouple model
      this.set('loading', false);
    }
  }))
});
