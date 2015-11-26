import DS from 'ember-data';

export default DS.Model.extend({
  parcelId: DS.belongsTo('user')
  // Parcel products here
});
