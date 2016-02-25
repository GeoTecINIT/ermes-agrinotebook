import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/insects';
import ProductUploadCO from 'ermes-smart-app/mixins/product-upload-c-opt';
import ProductRequiredDateCO from 'ermes-smart-app/mixins/product-required-date-c-opt';

export default Ember.Controller.extend(ProductUploadCO, ProductRequiredDateCO, {
  panelId: 'insects',
  i18n: Ember.inject.service(),
  names: Ember.computed('i18n.locale', 'model.customOptions.options.[]', function () {
    // User options
    var customOptions = {
      optgroup: this.get('i18n').t('fields.text.custom'),
      elements: this.get('model.customOptions.options').toArray()
    };

    // Default options + user options
    var productNames = dd.getNames(this);
    if (customOptions.elements.length !== 0) {
      productNames = productNames.concat(customOptions);
    }
    return productNames.concat({text: this.get('i18n').t('fields.text.other'), value: 'other'});
  }),
  isOther: Ember.computed('model.product.name', function() {
    return this.get('model.product.name') === 'other';
  })
});
