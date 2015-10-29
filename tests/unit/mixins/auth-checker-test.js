import Ember from 'ember';
import AuthCheckerMixin from '../../../mixins/auth-checker';
import { module, test } from 'qunit';

module('Unit | Mixin | auth checker');

// Replace this with your real tests.
test('it works', function(assert) {
  var AuthCheckerObject = Ember.Object.extend(AuthCheckerMixin);
  var subject = AuthCheckerObject.create();
  assert.ok(subject);
});
