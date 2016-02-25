import DS from 'ember-data';
import ProductModel from 'ermes-smart-app/mixins/product-model';
import MF from 'model-fragments';

export default ProductModel.extend({
  uploadDate: DS.attr('date'),
  developmentStage: DS.attr('string', { defaultValue() { return 'emergence'; }}),
  growthStage: DS.attr('string', { defaultValue() { return 'null'; }}),
  code: DS.attr('string', { defaultValue() { return 'null'; }}),
  observationDate: DS.attr('user-date'),
  parcels: MF.array('string')
});
