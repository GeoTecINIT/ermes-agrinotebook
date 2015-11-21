import Ember from 'ember';
import ProductUploadMixin from '../../../mixins/product-upload';
import { module, test } from 'qunit';

module('Unit | Mixin | product upload');

// Replace this with your real tests.
test('it works', function(assert) {
  var ProductUploadObject = Ember.Object.extend(ProductUploadMixin);
  var subject = ProductUploadObject.create();
  assert.ok(subject);
});
