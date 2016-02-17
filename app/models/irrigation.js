import DS from 'ember-data';
import ProductModel from 'ermes-smart-app/mixins/product-model';
import MF from 'model-fragments';

export default ProductModel.extend({
  uploadingDate: DS.attr('date'),
  startDate: DS.attr('user-date'),
  endDate: DS.attr('user-date'),
  measureUnit: DS.attr('string', { defaultValue() { return 'mm'; }}),
  waterQuantity: DS.attr('number'),
  waterHours: DS.attr('number'),
  waterHeight: DS.attr('number'),
  parcels: MF.array('string')
});
