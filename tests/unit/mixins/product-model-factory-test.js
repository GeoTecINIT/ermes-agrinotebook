import Ember from 'ember';
import ProductModelMixin from '../../../mixins/product-model';
import { module, test } from 'qunit';

module('Unit | Mixin | product model');

// Replace this with your real tests.
test('it works', function(assert) {
  var ProductModelObject = Ember.Object.extend(ProductModelMixin);
  var subject = ProductModelObject.create();
  assert.ok(subject);
});
