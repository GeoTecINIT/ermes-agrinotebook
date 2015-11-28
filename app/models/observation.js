import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  uploadingDate: DS.attr('date'),
  comments: DS.attr('string'),
  file: DS.attr('string'),
  parcels: MF.array('string')
});
