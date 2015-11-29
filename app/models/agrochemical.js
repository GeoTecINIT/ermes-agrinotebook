import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  date: DS.attr('user-date'),
  uploadingDate: DS.attr('date'),
  product: DS.attr('string', { defaultValue() { return 'bentazon'; }}),
  amount: DS.attr('number'),
  parcels: MF.array('string')
});
