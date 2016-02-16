import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  username: DS.attr('string'),
  name: DS.attr('string'),
  surname: DS.attr('string'),
  email: DS.attr('string'),
  region: DS.attr('string', {defaultValue: 'greece'}),
  profile: DS.attr('string', {defaultValue: 'local'}),
  type: DS.attr('string', {defaultValue: 'owner'}),
  language: DS.attr('string'),
  active: DS.attr('boolean', {defaultValue: false}),
  enableAlerts: DS.attr('boolean', {defaultValue: true}),
  enableNotifications: DS.attr('boolean', {defaultValue: true}),
  //lastPosition: MF.fragment('last-position'),
  lastLongitude: DS.attr('number'),
  lastLatitude: DS.attr('number'),
  zoomLevel: DS.attr('number'),
  spatialReference: DS.attr('number'),
  parcels: MF.array('string')
});
