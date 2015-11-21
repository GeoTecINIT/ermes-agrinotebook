import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/fertilizers';
import ProductUploadRDate from 'ermes-smart-app/mixins/product-upload-rdate';

export default Ember.Controller.extend(ProductUploadRDate, {
  panelId: 'fertilizers',
  i18n: Ember.inject.service(),
  products: Ember.computed('i18n.locale', function () {
    return dd.getProducts(this);
  })
});
