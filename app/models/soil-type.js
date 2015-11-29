import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  soilTexture: DS.attr('string', { defaultValue() { return 'clay'; }}),
  organicMatter: DS.attr('number'),
  ph: DS.attr('number'),
  date: DS.attr('user-date'),
  uploadingDate: DS.attr('date'),
  parcels: MF.array('string')
});
