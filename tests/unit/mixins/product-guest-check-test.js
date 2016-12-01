import Ember from 'ember';
import ProductGuestCheckMixin from '../../../mixins/product-guest-check';
import { module, test } from 'qunit';

module('Unit | Mixin | product guest check');

// Replace this with your real tests.
test('it works', function(assert) {
  var ProductGuestCheckObject = Ember.Object.extend(ProductGuestCheckMixin);
  var subject = ProductGuestCheckObject.create();
  assert.ok(subject);
});
