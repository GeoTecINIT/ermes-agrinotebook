import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),
  region: DS.attr('string'),
  profile: DS.attr('string'),
  language: DS.attr('string'),
  lastPosition: MF.fragment('last-position'),
  parcels: MF.array('string')
});
