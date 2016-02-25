import DS from 'ember-data';
import MF from 'model-fragments';

export default MF.Fragment.extend({
  text: DS.attr('string'),
  value: DS.attr('string')
});
