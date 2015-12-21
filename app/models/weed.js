import DS from 'ember-data';
import ProductModel from 'ermes-smart-app/mixins/product-model';
import MF from 'model-fragments';

export default ProductModel.extend({
  date: DS.attr('user-date'),
  uploadingDate: DS.attr('date'),
  name: DS.attr('string', { defaultValue() { return 'bidens'; }}),
  comments: DS.attr('string'),
  file: DS.attr('string'),
  damage: DS.attr('number'),
  parcels: MF.array('string')
});
