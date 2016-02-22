import DS from 'ember-data';
import ProductModel from 'ermes-smart-app/mixins/product-model';
import MF from 'model-fragments';

export default ProductModel.extend({
  uploadDate: DS.attr('date'),
  comments: DS.attr('string'),
  longitude: DS.attr('number'),
  latitude: DS.attr('number'),
  file: DS.attr('string'),
  parcels: MF.array('string')
});
