import Ember from 'ember';
import ProductUpload from 'ermes-smart-app/mixins/product-upload';
import ImageUpload from 'ermes-smart-app/mixins/image-upload';
import ProductGuestCheck from 'ermes-smart-app/mixins/product-guest-check';

export default Ember.Controller.extend(ProductUpload, ImageUpload, ProductGuestCheck, {
  panelId: 'observation',
  i18n: Ember.inject.service(),
  actions: {
    submit() {
      if (!this.get('files')) {
        this.set('fileError', this.get('i18n').t('panel.notification.file-missing'));
      } else {
        this.set('fileError', '');
        // Check geometry selection requirements & manage file upload
        this._super(this);
      }
    }
  }
});
