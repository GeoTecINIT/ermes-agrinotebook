import DS from 'ember-data';
import ProductModel from 'ermes-smart-app/mixins/product-model';
import MF from 'model-fragments';

export default ProductModel.extend({
  uploadingDate: DS.attr('date'),
  comments: DS.attr('string'),
  file: DS.attr('string'),
  parcels: MF.array('string')
});
