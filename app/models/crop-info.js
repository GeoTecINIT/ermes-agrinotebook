import DS from 'ember-data';
import ProductModel from 'ermes-smart-app/mixins/product-model';
import MF from 'model-fragments';

export default ProductModel.extend({
  uploadingDate: DS.attr('date'),
  cropType: DS.attr('string', { defaultValue() { return 'rice'; }}),
  riceVariety: DS.attr('string', { defaultValue() { return 'null'; }}),
  puddling: DS.attr('string', { defaultValue() { return 'null'; }}),
  seedsPerHa: DS.attr('number'),
  sowingType: DS.attr('string', { defaultValue() { return 'null'; }}),
  sowingDate: DS.attr('user-date'),
  parcels: MF.array('string')
});
