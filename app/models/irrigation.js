import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  startDate: DS.attr('user-date'),
  endDate: DS.attr('user-date'),
  quantityOfWaterMeasure: DS.attr('string', { defaultValue() { return 'mm'; }}),
  waterQuantity: DS.attr('number'),
  waterHours: DS.attr('number'),
  waterDepth: DS.attr('number'),
  uploadingDate: DS.attr('date'),
  parcels: MF.array('string')
});
