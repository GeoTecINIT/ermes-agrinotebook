import DS from 'ember-data';

export default DS.Model.extend({
  parcelStatus: DS.attr('string'),
  date: DS.attr('user-date'),
  uploadingDate: DS.attr('date')
});
