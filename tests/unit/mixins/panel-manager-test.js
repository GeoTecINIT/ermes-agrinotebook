import Ember from 'ember';
import PanelManagerMixin from '../../../mixins/panel-manager';
import { module, test } from 'qunit';

module('Unit | Mixin | panel manager');

// Replace this with your real tests.
test('it works', function(assert) {
  var PanelManagerObject = Ember.Object.extend(PanelManagerMixin);
  var subject = PanelManagerObject.create();
  assert.ok(subject);
});
