import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/agrochemicals';
import ProductUpload from 'ermes-smart-app/mixins/product-upload';
import ProductRequiredDate from 'ermes-smart-app/mixins/product-required-date';
import ProductParcelCheck from 'ermes-smart-app/mixins/product-parcel-check';

export default Ember.Controller.extend(ProductUpload, ProductParcelCheck, ProductRequiredDate, {
  panelId: 'agrochemicals',
  i18n: Ember.inject.service(),
  products: Ember.computed('i18n.locale', function () {
    return dd.getProducts(this);
  })
});
