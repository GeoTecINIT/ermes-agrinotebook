import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/crop-info';
import ProductUpload from 'ermes-smart-app/mixins/product-upload';

export default Ember.Controller.extend(ProductUpload, {
  panelId: 'crop-info',
  i18n: Ember.inject.service(),
  cropTypes: Ember.computed('i18n.locale', function() {
    return dd.getCropTypes(this);
  }),
  riceVarieties: Ember.computed('i18n.locale', function() {
    return dd.getRiceVarieties(this);
  }),
  puddlings: Ember.computed('i18n.locale', function() {
    return dd.getPuddlings(this);
  }),
  sowingTypes: Ember.computed('i18n.locale', function() {
    return dd.getSowingTypes(this);
  }),

  notIsRice: Ember.computed('model.cropType', function () {
    if (this.get('model.cropType') === 'rice') {
      return false;
    } else {
      this.get('model').setProperties({
        riceVariety: 'null',
        pudding: 'null',
        sowingPractice: 'null'
      });
      return true;
    }
  })
});
