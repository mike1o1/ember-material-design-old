import Ember from 'ember';
import { CSS } from '../utils/constants';

var MdProgressCircular = Ember.Component.extend({

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
        if (value > 100) {
            return 100;
        }

        if (value < 0) {
            return 0;
        }

        return Math.ceil(value || 0);
    }.property('value'),

    fill: function() {
        this.$()
    },

    circleStyle: function() {
        return CSS.TRANSFORM + ': ' + 'scale(' + this.get('scale').toString() + ')';
    }.property('scale'),

    fillStyle: function() {
        return CSS.TRANSFORM + ': ' + this.fillRotations(this.get('clampvedValue'));
    }.property('clampedValue'),

    fixStyle: function() {
        return CSS.TRANSFORM + ': ' + this.fixRotations[this.get('clampedValue')];
    }.property('clampedValue'),



    setupRotations: function() {
        for (var i = 0; i < 101; i++) {
            var percent = i / 100;
            var rotation = Math.floor(percent * 180);

            this.fillRotations[i] = 'rotate(' + rotation.toString() + 'deg)';
            this.fixRotations[i] = 'rotate(' + (rotation * 2).toString() + 'deg)';
        }
    }.on('didInsertElement')

});

export default MdProgressCircular;
