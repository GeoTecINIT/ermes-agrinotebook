import DS from 'ember-data';

export default DS.Model.extend({
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  quantityOfWaterMeasure: DS.attr('string'),
  waterQuantity: DS.attr('number'),
  waterHours: DS.attr('number'),
  waterDepth: DS.attr('number'),
  uploadingDate: DS.attr('date')
});
