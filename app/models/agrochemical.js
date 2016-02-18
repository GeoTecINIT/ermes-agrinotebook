import DS from 'ember-data';
import ProductModel from 'ermes-smart-app/mixins/product-model';
import MF from 'model-fragments';

export default ProductModel.extend({
  uploadDate: DS.attr('date'),
  name: DS.attr('string', { defaultValue() { return 'bentazon'; }}),
  amount: DS.attr('number'),
  observationDate: DS.attr('user-date'),
  parcels: MF.array('string')
});
