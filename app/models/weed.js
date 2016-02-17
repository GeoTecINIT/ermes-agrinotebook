import DS from 'ember-data';
import ProductModel from 'ermes-smart-app/mixins/product-model';
import MF from 'model-fragments';

export default ProductModel.extend({
  uploadingDate: DS.attr('date'),
  name: DS.attr('string', { defaultValue() { return 'bidens'; }}),
  comments: DS.attr('string'),
  file: DS.attr('string'),
  percentCovered: DS.attr('number'),
  observationDate: DS.attr('user-date'),
  parcels: MF.array('string')
});
