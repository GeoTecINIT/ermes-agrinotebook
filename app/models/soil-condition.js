import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  parcelStatus: DS.attr('string'),
  date: DS.attr('user-date'),
  uploadingDate: DS.attr('date'),
  parcels: MF.array('string')
});
