import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  uploadingDate: DS.attr('date'),
  product: DS.attr('string'),
  quantity: DS.attr('number'),
  nitrogenContent: DS.attr('number'),
  phosphorusContent: DS.attr('number'),
  potassiumContent: DS.attr('number')
});
