import Ember from 'ember';
import OfflineMapMixin from '../../../mixins/offline-map';
import { module, test } from 'qunit';

module('Unit | Mixin | offline map');

// Replace this with your real tests.
test('it works', function(assert) {
  var OfflineMapObject = Ember.Object.extend(OfflineMapMixin);
  var subject = OfflineMapObject.create();
  assert.ok(subject);
});
