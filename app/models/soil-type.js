import DS from 'ember-data';

export default DS.Model.extend({
  soilTexture: DS.attr('string'),
  organicMatter: DS.attr('number'),
  ph: DS.attr('number'),
  date: DS.attr('date'),
  uploadingDate: DS.attr('date')
});
