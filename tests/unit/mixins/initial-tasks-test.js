import Ember from 'ember';
import InitialTasksMixin from '../../../mixins/initial-tasks';
import { module, test } from 'qunit';

module('Unit | Mixin | initial tasks');

// Replace this with your real tests.
test('it works', function(assert) {
  var InitialTasksObject = Ember.Object.extend(InitialTasksMixin);
  var subject = InitialTasksObject.create();
  assert.ok(subject);
});
