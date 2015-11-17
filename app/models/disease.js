import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  uploadingDate: DS.attr('date'),
  name: DS.attr('string'),
  comments: DS.attr('string'),
  file: DS.attr('string'),
  damage: DS.attr('number')
});
