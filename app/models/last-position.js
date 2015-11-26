import DS from 'ember-data';
import MF from 'model-fragments';

export default MF.Fragment.extend({
  spatialReference: DS.attr('number'),
  lastX: DS.attr('number'),
  lastY: DS.attr('number'),
  zoom: DS.attr('number')
});
