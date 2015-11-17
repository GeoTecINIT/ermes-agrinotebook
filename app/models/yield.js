import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  uploadingDate: DS.attr('date'),
  yield: DS.attr('number'),
  comments: DS.attr('string')
});
