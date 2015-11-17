import DS from 'ember-data';

export default DS.Model.extend({
  uploadingDate: DS.attr('date'),
  comments: DS.attr('string'),
  file: DS.attr('string')
});
