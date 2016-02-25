import Ember from 'ember';
import ProductUploadRdateNestProdMixin from '../../../mixins/product-upload-rdate-nest-prod';
import { module, test } from 'qunit';

module('Unit | Mixin | product upload rdate nest prod');

// Replace this with your real tests.
test('it works', function(assert) {
  var ProductUploadRdateNestProdObject = Ember.Object.extend(ProductUploadRdateNestProdMixin);
  var subject = ProductUploadRdateNestProdObject.create();
  assert.ok(subject);
});
