import Ember from 'ember';
import Moment from 'moment';

export default Ember.Mixin.create({
  productService: Ember.inject.service('products'),
  actions: {
    submit() {
      // Put parcels inside the model
      this.set('model.parcels', this.get('parcels.selectedParcels'));

      // Set the uploading date
      this.set('model.uploadDate', new Moment().format('lll'));

      // Update info and save model
      this.set('info', this.get('i18n').t('panel.notification.processing'));
      this.get('model').save().then(() => { // Successfully saved
        this.set('info', this.get('i18n').t('panel.notification.saved'));
        this.set('model', this.get('productService')
          .archiveProduct(Ember.String.singularize(this.get('panelId')))); // Create a new empty product for the panel
        setTimeout(() => this.set('info', ''), 2000);
      }, () => { // Save has failed, offline
        this.set('info', this.get('i18n').t('panel.notification.saved'));
        this.set('model', this.get('productService')
          .archiveProduct(Ember.String.singularize(this.get('panelId')))); // Create a new empty product for the panel
        setTimeout(() => this.set('info', ''), 2000);
      });
    }
  }
});
