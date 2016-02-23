import { moduleForModel, test } from 'ember-qunit';

moduleForModel('custom-option', 'Unit | Serializer | custom option', {
  // Specify the other units that are required for this test.
  needs: ['serializer:custom-option']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
