import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  date: DS.attr('user-date'),
  uploadingDate: DS.attr('date'),
  developmentStage: DS.attr('string', { defaultValue() { return 'emergence'; }}),
  growthStage: DS.attr('string', { defaultValue() { return 'null'; }}),
  code: DS.attr('string', { defaultValue() { return 'null'; }}),
  parcels: MF.array('string')
});
