import Ember from 'ember';
import * as dd from 'ermes-smart-app/models/static/weeds';
import ProductUploadRDateCO from 'ermes-smart-app/mixins/product-upload-rdate-c-opt';

export default Ember.Controller.extend(ProductUploadRDateCO, {
  panelId: 'weeds',
  i18n: Ember.inject.service(),
  names: Ember.computed('i18n.locale', 'model.customOptions.options.[]', function () {
    // User options
    var customOptions = {
      optgroup: this.get('i18n').t('fields.text.default'),
      elements: this.get('model.customOptions.options').toArray()
    };

    // Default options + user options
    var productNames = dd.getNames(this).concat(customOptions);
    return productNames.concat({text: this.get('i18n').t('fields.text.other'), value: 'other'});
  }),
  isOther: Ember.computed('model.product.name', function() {
    return this.get('model.product.name') === 'other';
  })
});
