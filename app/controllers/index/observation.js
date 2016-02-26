import Ember from 'ember';
import ProductUpload from 'ermes-smart-app/mixins/product-upload';
import ImageUpload from 'ermes-smart-app/mixins/image-upload';
import ProductParcelCheck from 'ermes-smart-app/mixins/product-parcel-check';

export default Ember.Controller.extend(ProductUpload, ProductParcelCheck, ImageUpload, {
  panelId: 'observation',
  i18n: Ember.inject.service(),
  actions: {
    submit() {
      if (!this.get('files')) {
        this.set('fileError', this.get('i18n').t('panel.notification.file-missing'));
      } else {
        this.set('fileError', '');
        // Manage file upload
        this._super(this);
      }
    }
  }
});
