import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/soil-condition';
import ProductUpload from 'ermes-smart-app/mixins/product-upload';
import ProductParcelCheck from 'ermes-smart-app/mixins/product-parcel-check';

export default Ember.Controller.extend(ProductUpload, ProductParcelCheck, {
  panelId: 'soil-condition',
  i18n: Ember.inject.service(),
  parcelStatus: Ember.computed('i18n.locale', function () {
    return dd.getParcelStatus(this);
  })
});
