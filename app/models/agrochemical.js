import DS from 'ember-data';
import ProductModel from 'ermes-smart-app/mixins/product-model';
import MF from 'model-fragments';

export default ProductModel.extend({
  date: DS.attr('user-date'),
  uploadingDate: DS.attr('date'),
  product: DS.attr('string', { defaultValue() { return 'bentazon'; }}),
  amount: DS.attr('number'),
  parcels: MF.array('string')
});
