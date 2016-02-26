import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/abiotic-stresses';
import ProductUpload from 'ermes-smart-app/mixins/product-upload';
import ImageUpload from 'ermes-smart-app/mixins/image-upload';
import ProductRequiredDate from 'ermes-smart-app/mixins/product-required-date';
import ProductParcelCheck from 'ermes-smart-app/mixins/product-parcel-check';

export default Ember.Controller.extend(ProductUpload, ImageUpload, ProductParcelCheck, ProductRequiredDate, {
  panelId: 'abiotic-stresses',
  i18n: Ember.inject.service(),
  causes: Ember.computed('i18n.locale', function () {
    return dd.getCauses(this);
  })
});
