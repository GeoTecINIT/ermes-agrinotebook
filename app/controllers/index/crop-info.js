import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/crop-info';
import ProductUploadCO from 'ermes-smart-app/mixins/product-upload-c-opt';

export default Ember.Controller.extend(ProductUploadCO, {
  panelId: 'crop-info',
  i18n: Ember.inject.service(),
  cropTypes: Ember.computed('i18n.locale', function() {
    return dd.getCropTypes(this);
  }),
  riceVarieties: Ember.computed('i18n.locale', 'model.customOptions.options.[]', function () {
    // User options
    var customOptions = {
      optgroup: this.get('i18n').t('fields.text.default'),
      elements: this.get('model.customOptions.options').toArray()
    };

    // Default options + user options
    //var productNames = dd.getRiceVarieties(this).concat(customOptions);
    var productNames = dd.getRiceVarieties(this);
    if (customOptions.elements.length !== 0) {
      productNames = productNames.concat(customOptions);
    }
    return productNames.concat({text: this.get('i18n').t('fields.text.other'), value: 'other'});
  }),
  isOther: Ember.computed('model.product.riceVariety', function() {
    return this.get('model.product.riceVariety') === 'other';
  }),
  puddlings: Ember.computed('i18n.locale', function() {
    return dd.getPuddlings(this);
  }),
  sowingTypes: Ember.computed('i18n.locale', function() {
    return dd.getSowingTypes(this);
  }),

  notIsRice: Ember.computed('model.product.cropType', function () {
    if (this.get('model.product.cropType') === 'rice') {
      return false;
    } else {
      this.get('model.product').setProperties({
        riceVariety: 'null',
        pudding: 'null',
        sowingPractice: 'null'
      });
      return true;
    }
  })
});
