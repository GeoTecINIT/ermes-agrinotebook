import DS from 'ember-data';

export default DS.Model.extend({
  parcelStatus: DS.attr('string'),
  date: DS.attr('date'),
  uploadingDate: DS.attr('date')
});