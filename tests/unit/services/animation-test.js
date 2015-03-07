import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:animation', {
  // Specify the other units that are required for this test.
  needs: ['service:sniffer']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});


moduleFor('service:animation - $animate - enable / disable', {
    // Specify the other units that are required for this test.
    needs: ['service:sniffer']
});

test('it should work for all animations', function(assert) {
    var service = this.subject();



});
