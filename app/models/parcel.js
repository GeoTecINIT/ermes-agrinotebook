import DS from 'ember-data';

export default DS.Model.extend({
  _id: DS.attr('string'),
  parcelId: DS.attr('string')
  // Parcel products here
});
