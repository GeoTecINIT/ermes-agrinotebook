import Ember from 'ember';
import MapEventsMixin from '../../../mixins/map-events';
import { module, test } from 'qunit';

module('Unit | Mixin | map events');

// Replace this with your real tests.
test('it works', function(assert) {
  var MapEventsObject = Ember.Object.extend(MapEventsMixin);
  var subject = MapEventsObject.create();
  assert.ok(subject);
});
