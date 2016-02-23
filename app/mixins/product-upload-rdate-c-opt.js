import Ember from 'ember';
import ProductUploadCO from './product-upload-c-opt';

export default Ember.Mixin.create(ProductUploadCO, {
  actions: {
    submit() {
      if (!this.get('model.product.observationDate')) {
        this.set('dateError', this.get('i18n').t('panel.notification.missing-date'));
      } else {
        this.set('dateError', '');
        this._super(this);
      }
    }
  }
});
