import DS from 'ember-data';
import ProductModel from 'ermes-smart-app/mixins/product-model';
import MF from 'model-fragments';

export default ProductModel.extend({
  uploadDate: DS.attr('date'),
  name: DS.attr('string', { defaultValue() { return 'calcium-cyanamide'; }}),
  quantity: DS.attr('number'),
  nitrogenContent: DS.attr('number'),
  phosphorusContent: DS.attr('number'),
  potassiumContent: DS.attr('number'),
  observationDate: DS.attr('user-date'),
  parcels: MF.array('string')
});
