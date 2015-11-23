import Ember from 'ember';
import ProductUpload from 'ermes-smart-app/mixins/product-upload';

export default Ember.Controller.extend(ProductUpload, {
  panelId: 'observation',
  actions: {
    submit() {
      if (!this.get('files')) {
        this.set('fileError', 'Please upload an image');
      } else {
        this.set('fileError', '');
        // Manage file upload
        this._super(this);
      }
    }
  }
});
