import Ember from 'ember';
import ProductUpload from 'ermes-smart-app/mixins/product-upload';
import ProductRequiredDate from 'ermes-smart-app/mixins/product-required-date';
import ProductParcelCheck from 'ermes-smart-app/mixins/product-parcel-check';

export default Ember.Controller.extend(ProductUpload, ProductParcelCheck, ProductRequiredDate, {
  panelId: 'yield',
  i18n: Ember.inject.service()
});
