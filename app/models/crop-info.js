import DS from 'ember-data';
import ProductModel from 'ermes-smart-app/mixins/product-model';
import MF from 'model-fragments';

export default ProductModel.extend({
  cropType: DS.attr('string', { defaultValue() { return 'rice'; }}),
  uploadingDate: DS.attr('date'),
  riceVariety: DS.attr('string', { defaultValue() { return 'null'; }}),
  pudding: DS.attr('string', { defaultValue() { return 'null'; }}),
  sowingPractice: DS.attr('string', { defaultValue() { return 'null'; }}),
  date: DS.attr('user-date'),
  parcels: MF.array('string')
});
