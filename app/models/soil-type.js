import DS from 'ember-data';
import ProductModel from 'ermes-smart-app/mixins/product-model';
import MF from 'model-fragments';

export default ProductModel.extend({
  soilTexture: DS.attr('string', { defaultValue() { return 'clay'; }}),
  organicMatter: DS.attr('number'),
  ph: DS.attr('number'),
  date: DS.attr('user-date'),
  uploadingDate: DS.attr('date'),
  parcels: MF.array('string')
});
