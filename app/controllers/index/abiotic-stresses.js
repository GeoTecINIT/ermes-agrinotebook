import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/abiotic-stresses';
import ProductUploadRDate from 'ermes-smart-app/mixins/product-upload-rdate';

export default Ember.Controller.extend(ProductUploadRDate, {
  panelId: 'abiotic-stresses',
  i18n: Ember.inject.service(),
  causes: Ember.computed('i18n.locale', function () {
    return dd.getCauses(this);
  })
});
