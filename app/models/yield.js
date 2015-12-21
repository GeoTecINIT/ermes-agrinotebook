import DS from 'ember-data';
import ProductModel from 'ermes-smart-app/mixins/product-model';
import MF from 'model-fragments';

export default ProductModel.extend({
  date: DS.attr('user-date'),
  uploadingDate: DS.attr('date'),
  yield: DS.attr('number'),
  comments: DS.attr('string'),
  parcels: MF.array('string')
});
