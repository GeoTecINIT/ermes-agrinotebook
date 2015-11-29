import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  cropType: DS.attr('string', { defaultValue() { return 'rice'; }}),
  uploadingDate: DS.attr('date'),
  riceVariety: DS.attr('string', { defaultValue() { return 'null'; }}),
  pudding: DS.attr('string', { defaultValue() { return 'null'; }}),
  sowingPractice: DS.attr('string', { defaultValue() { return 'null'; }}),
  date: DS.attr('user-date'),
  parcels: MF.array('string')
});
