import Ember from 'ember';
import ProductParcelCheckMixin from '../../../mixins/product-parcel-check';
import { module, test } from 'qunit';

module('Unit | Mixin | product parcel check');

// Replace this with your real tests.
test('it works', function(assert) {
  var ProductParcelCheckObject = Ember.Object.extend(ProductParcelCheckMixin);
  var subject = ProductParcelCheckObject.create();
  assert.ok(subject);
});
