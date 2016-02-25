import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/fertilizers';
import ProductUpload from 'ermes-smart-app/mixins/product-upload';
import ProductRequiredDate from 'ermes-smart-app/mixins/product-required-date';

export default Ember.Controller.extend(ProductUpload, ProductRequiredDate, {
  panelId: 'fertilizers',
  i18n: Ember.inject.service(),
  products: Ember.computed('i18n.locale', function () {
    return dd.getProducts(this);
  })
});
