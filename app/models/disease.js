import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  date: DS.attr('user-date'),
  uploadingDate: DS.attr('date'),
  name: DS.attr('string', { defaultValue() { return 'bipolaris'; }}),
  comments: DS.attr('string'),
  file: DS.attr('string'),
  damage: DS.attr('number'),
  parcels: MF.array('string')
});
