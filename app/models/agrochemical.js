import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('user-date'),
  uploadingDate: DS.attr('date'),
  product: DS.attr('string'),
  amount: DS.attr('number')
});
