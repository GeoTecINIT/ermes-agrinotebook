import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/soil-type';
import ProductUpload from 'ermes-smart-app/mixins/product-upload';

export default Ember.Controller.extend(ProductUpload, {
  panelId: 'soil-type',
  i18n: Ember.inject.service(),
  soilTextures: Ember.computed('i18n.locale', function() {
    return dd.getSoilTextures(this);
  })
});
