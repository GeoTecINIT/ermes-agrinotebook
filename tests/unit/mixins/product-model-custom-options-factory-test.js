import Ember from 'ember';
import ProductModelCustomOptionsFactoryMixin from '../../../mixins/product-model-custom-options-factory';
import { module, test } from 'qunit';

module('Unit | Mixin | product model custom options factory');

// Replace this with your real tests.
test('it works', function(assert) {
  var ProductModelCustomOptionsFactoryObject = Ember.Object.extend(ProductModelCustomOptionsFactoryMixin);
  var subject = ProductModelCustomOptionsFactoryObject.create();
  assert.ok(subject);
});
