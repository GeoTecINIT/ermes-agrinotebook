import DS from 'ember-data';
import ProductModel from 'ermes-smart-app/mixins/product-model';
import MF from 'model-fragments';

export default ProductModel.extend({
  startDate: DS.attr('user-date'),
  endDate: DS.attr('user-date'),
  quantityOfWaterMeasure: DS.attr('string', { defaultValue() { return 'mm'; }}),
  waterQuantity: DS.attr('number'),
  waterHours: DS.attr('number'),
  waterDepth: DS.attr('number'),
  uploadingDate: DS.attr('date'),
  parcels: MF.array('string')
});
