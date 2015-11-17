import { moduleForModel, test } from 'ember-qunit';

moduleForModel('crop-info', 'Unit | Model | crop info', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
