import Ember from 'ember';
import Moment from 'moment';

const optionField = {
  'crop-info': 'riceVariety',
  'weeds': 'name',
  'diseases': 'name',
  'insects': 'name'
};

export default Ember.Mixin.create({
  productService: Ember.inject.service('products'),
  actions: {
    submit() {
      if (this.get('parcels.selectedParcels').length <= 0) { // There are no selected parcels
        this.set('parcelError', this.get('i18n').t('panel.notification.missing-parcel'));
      } else { // Parcels selected
        // Reset error messages
        this.set('parcelError', '');

        // Put parcels inside the model
        this.set('model.product.parcels', this.get('parcels.selectedParcels'));

        // Set the uploading date
        this.set('model.product.uploadDate', new Moment().format('lll'));

        new Ember.RSVP.Promise((resolve, reject) => {
          // Check if a new option has to be added
          if (this.get('model.product.'+optionField[this.get('panelId')]) === 'other') {
            var newOptionText = this.get('model.newOption');
            var newOptionValue = Ember.String.underscore(newOptionText).toLowerCase();

            // Add the option to the model
            this.set('model.product.'+optionField[this.get('panelId')], newOptionValue);

            // Save the new option
            var customOptions = this.get('model.customOptions');
            customOptions.get('options').createFragment({text: newOptionText, value: newOptionValue});
            customOptions.save().then(() => resolve(), () => reject());
          } else {
            return resolve();
          }
        }).finally(() => {
          // Remove newOption from the form
          this.set('model.newOption', '');

          // Update info and save model
          this.set('info', this.get('i18n').t('panel.notification.processing'));
          this.get('model.product').save().then(() => { // Successfully saved
            archiveAndCreateANewProduct(this);
          }, () => { // Save has failed, offline
            archiveAndCreateANewProduct(this);
          });
        });
      }
    }
  }
});

function archiveAndCreateANewProduct(ctx) {
  ctx.set('info', ctx.get('i18n').t('panel.notification.saved'));
  ctx.set('model.product', ctx.get('productService')
    .archiveProduct(Ember.String.singularize(ctx.get('panelId')))); // Create a new empty product for the panel
  setTimeout(() => ctx.set('info', ''), 2000);
}
