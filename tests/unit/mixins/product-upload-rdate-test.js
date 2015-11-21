import Ember from 'ember';
import ProductUploadRdateMixin from '../../../mixins/product-upload-rdate';
import { module, test } from 'qunit';

module('Unit | Mixin | product upload rdate');

// Replace this with your real tests.
test('it works', function(assert) {
  var ProductUploadRdateObject = Ember.Object.extend(ProductUploadRdateMixin);
  var subject = ProductUploadRdateObject.create();
  assert.ok(subject);
});
