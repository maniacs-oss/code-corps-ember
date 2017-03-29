import { moduleFor, test } from 'ember-qunit';

moduleFor('service:project-user', 'Unit | Service | project user', {
  // Specify the other units that are required for this test.
  needs: [
    'service:current-user',
    'service:flash-messages'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});
