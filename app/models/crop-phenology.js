import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('user-date'),
  uploadingDate: DS.attr('date'),
  developmentStage: DS.attr('string'),
  growthStage: DS.attr('string'),
  code: DS.attr('string')
});
