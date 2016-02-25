import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/abiotic-stresses';
import ProductUpload from 'ermes-smart-app/mixins/product-upload';
import ProductRequiredDate from 'ermes-smart-app/mixins/product-required-date';

export default Ember.Controller.extend(ProductUpload, ProductRequiredDate, {
  panelId: 'abiotic-stresses',
  i18n: Ember.inject.service(),
  causes: Ember.computed('i18n.locale', function () {
    return dd.getCauses(this);
  })
});
