import Ember from 'ember';
import ProductUpload from './product-upload';

export default Ember.Mixin.create(ProductUpload, {
  actions: {
    submit() {
      if (!this.get('model.date')) {
        this.set('dateError', 'Please fill date');
      } else {
        this.set('dateError', '');
        this._super(this);
      }
    }
  }
});
