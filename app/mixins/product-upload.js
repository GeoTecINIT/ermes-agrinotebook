import Ember from 'ember';
import Moment from 'moment';
import config from '../config/environment';

export default Ember.Mixin.create({
  productService: Ember.inject.service('products'),
  actions: {
    submit() {
      if (this.get('parcels.selectedParcels').length <= 0) {
        this.set('parcelError', this.get('i18n').t('panel.notification.missing-parcel'));
      } else {
        this.set('parcelError', '');
        this.set('model.parcels', this.get('parcels.selectedParcels'));
        this.set('model.uploadingDate', new Moment());
        console.debug('uploading product...');
        this.get('model').save().then(() => {
          this.set('model', this.get('productService')
            .archiveProduct(Ember.String.singularize(this.get('panelId'))));
          console.debug('success!')
        }, () => {
          console.debug('ERROR');
        });
      }
    }
  }
});
