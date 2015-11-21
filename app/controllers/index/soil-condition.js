import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/soil-condition';
import ProductUpload from 'ermes-smart-app/mixins/product-upload';

export default Ember.Controller.extend(ProductUpload, {
  panelId: 'soil-condition',
  i18n: Ember.inject.service(),
  parcelStatus: Ember.computed('i18n.locale', function () {
    return dd.getParcelStatus(this);
  })
});
