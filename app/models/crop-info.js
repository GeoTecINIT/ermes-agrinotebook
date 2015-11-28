import DS from 'ember-data';

export default DS.Model.extend({
  cropType: DS.attr('string'),
  uploadingDate: DS.attr('date'),
  riceVariety: DS.attr('string'),
  pudding: DS.attr('string'),
  sowingPractice: DS.attr('string'),
  date: DS.attr('user-date')
});
