import Ember from 'ember';

var MdProgressCircular = Ember.Component.extend({
    constants: Ember.inject.service('constants'),

    tagName: 'md-progress-circular',

    attributeBindings: ['value', 'md-mode'],

    fillRotations: new Array(101),
    fixRotations: new Array(101),

    mdDiameter: 48,

    scale: function() {
        return this.get('mdDiameter') / 48;
    }.property('mdDiameter'),

    clampedValue: function() {

        var value = this.get('value');

        return Math.max(0, Math.min(value || 0, 100));
        
    }.property('value'),

    circleStyle: function() {
        return this.get('constants.CSS.TRANSFORM') + ': ' + 'scale(' + this.get('scale').toString() + ')';
    }.property('scale')

});

export default MdProgressCircular;
