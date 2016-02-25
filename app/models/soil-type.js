import DS from 'ember-data';
import ProductModel from 'ermes-smart-app/mixins/product-model';
import MF from 'model-fragments';

export default ProductModel.extend({
  uploadDate: DS.attr('date'),
  soilTexture: DS.attr('string', { defaultValue() { return 'clay'; }}),
  organicMatter: DS.attr('number'),
  ph: DS.attr('number'),
  observationDate: DS.attr('user-date'),
  parcels: MF.array('string')
});
