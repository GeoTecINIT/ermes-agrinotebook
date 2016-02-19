import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/insects';
import ProductUploadRDate from 'ermes-smart-app/mixins/product-upload-rdate';

export default Ember.Controller.extend(ProductUploadRDate, {
  panelId: 'insects',
  i18n: Ember.inject.service(),
  names: Ember.computed('i18n.locale', function () {
    return dd.getNames(this);
  })
});
