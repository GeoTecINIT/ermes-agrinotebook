import DS from 'ember-data';

export default DS.Model.extend({
  //_id: DS.attr('string'),
  username: DS.attr('string'),
  email: DS.attr('string'),
  region: DS.attr('string'),
  profile: DS.attr('string'),
  language: DS.attr('string')
  //lastPosition: {
  //  spatialReference: DS.attr('number'),
  //  lastX: DS.attr('number'),
  //  lastY: DS.attr('number'),
  //  zoom: DS.attr('number')
  //}
  //parcels: [DS.attr('string')]
});
