import Ember from 'ember';
import ImageUploadMixin from '../../../mixins/image-upload';
import { module, test } from 'qunit';

module('Unit | Mixin | image upload');

// Replace this with your real tests.
test('it works', function(assert) {
  var ImageUploadObject = Ember.Object.extend(ImageUploadMixin);
  var subject = ImageUploadObject.create();
  assert.ok(subject);
});
