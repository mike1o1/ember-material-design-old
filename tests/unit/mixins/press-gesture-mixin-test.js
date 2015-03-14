import Ember from 'ember';
import PressGestureMixinMixin from '../../../mixins/press-gesture-mixin';
import { module, test } from 'qunit';

module('PressGestureMixinMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var PressGestureMixinObject = Ember.Object.extend(PressGestureMixinMixin);
  var subject = PressGestureMixinObject.create();
  assert.ok(subject);
});
