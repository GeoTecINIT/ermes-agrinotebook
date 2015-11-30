import Ember from 'ember';
import Moment from 'moment';

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
        this.set('info', this.get('i18n').t('panel.notification.processing'));
        this.get('model').save().then(() => {
          this.set('info', this.get('i18n').t('panel.notification.saved'));
          this.set('model', this.get('productService')
            .archiveProduct(Ember.String.singularize(this.get('panelId'))));
          setTimeout(() => this.set('info', ''), 2000);
        }, () => {
          this.set('info', this.get('i18n').t('panel.notification.saved'));
          this.set('model', this.get('productService')
            .archiveProduct(Ember.String.singularize(this.get('panelId'))));
          setTimeout(() => this.set('info', ''), 2000);
        });
      }
    }
  }
});
