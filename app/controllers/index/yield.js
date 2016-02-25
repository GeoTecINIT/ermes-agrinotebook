import Ember from 'ember';
import ProductUpload from 'ermes-smart-app/mixins/product-upload';
import ProductRequiredDate from 'ermes-smart-app/mixins/product-required-date';

export default Ember.Controller.extend(ProductUpload, ProductRequiredDate, {
  panelId: 'yield',
  i18n: Ember.inject.service()
});
