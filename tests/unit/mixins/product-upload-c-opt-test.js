import Ember from 'ember';
import ProductUploadCOptMixin from '../../../mixins/product-upload-c-opt';
import { module, test } from 'qunit';

module('Unit | Mixin | product upload c opt');

// Replace this with your real tests.
test('it works', function(assert) {
  var ProductUploadCOptObject = Ember.Object.extend(ProductUploadCOptMixin);
  var subject = ProductUploadCOptObject.create();
  assert.ok(subject);
});
