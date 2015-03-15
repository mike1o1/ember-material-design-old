import Ember from 'ember';

function makeTransform(value) {
    var scale = value / 100;
    var translateX = (value - 100) / 2;
    return 'translateX(' + translateX.toString() + '%) scale(' + scale.toString() + ', 1)';
}

var MdProgressLinear = Ember.Component.extend({

    isInserted: false,

    didInsertElement: function() {
        this._super();

        this.set('isInserted', true);
    },

    constants: Ember.inject.service('constants'),

    tagName: 'md-progress-linear',

    attributeBindings: ['value', 'md-mode', 'md-buffer-value'],

    transforms: new Array(101),

    setupTransforms: function() {
        for (var i = 0; i < 101; i++) {
            this.transforms[i] = makeTransform(i);
        }

        this.$('.md-container').addClass('md-ready');
    }.on('didInsertElement'),

    bar1Style: function() {
        return this.get('constants.CSS.TRANSFORM') + ': ' + this.transforms[this.get('clampedBufferValue')];
    }.property('clampedBufferValue'),

    bar2Style: function() {
        return this.get('constants.CSS.TRANSFORM') + ': ' + this.transforms[this.get('clampedValue')];
    }.property('clampedValue'),

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

    clampedBufferValue: function() {
        var value = this.get('md-buffer-value');
        if (value > 100) {
            return 100;
        }

        if (value < 0) {
            return 0;
        }

        return Math.ceil(value || 0);
    }.property('md-buffer-value')

});

export default MdProgressLinear;
