import Ember from 'ember';
import EventsMixin from '../mixins/events';
import { KEY_CODE } from '../utils/constants';

var MdSlider = Ember.Component.extend(EventsMixin, {

    tagName: 'md-slider',

    attributeBindings: ['min', 'max', 'step', 'md-discrete', 'disabled', 'flex', 'tabindex'],

    classNameBindings: ['isMinimum:md-min', 'active', 'dragging'],

    min: 0,
    max: 100,
    step: 1,
    tabindex: 0,

    trackContainer: function() {
        var element = this.$()[0];

        return this.$(element.querySelector('.md-track-container'));
    }.property(),

    activeTrackStyle: function() {
        var percent = this.get('percent') || 0;
        return "width: " + (percent * 100) + "%";
    }.property('percent'),

    thumbContainerStyle: function() {
        var percent = this.get('percent') || 0;
        return "left: " + (percent * 100) + "%";
    }.property('percent'),

    isMinimum: function() {
        return this.get('percent') === 0;
    }.property('percent'),

    percent: function() {
        var min = parseInt(this.get('min'));
        var max = parseInt(this.get('max'));

        return (this.get('value') - min) / (max - min);
    }.property('value'),

    positionToPercent: function(x) {
        return Math.max(0, Math.min(1, (x - this.get('sliderDimensions.left')) / this.get('sliderDimensions.width')));
    },

    percentToValue: function(x) {
        var min = parseInt(this.get('min'));
        var max = parseInt(this.get('max'));
        return (min + x * (max - min));
    },

    minMaxValidator: function(value) {
        var min = parseInt(this.get('min'));
        var max = parseInt(this.get('max'));
        return Math.max(min, Math.min(max, value));
    },

    stepValidator: function(value) {
        var step = parseInt(this.get('step'));
        return Math.round(value / step) * step;
    },

    active: false,
    dragging: false,

    sliderDimensions: function() {
        return this.get('trackContainer')[0].getBoundingClientRect();
    }.property(),

    start: function(event) {
        if (this.get('disabled')) {
            return;
        }

        this.set('active', true);
        this.$().focus();

        this.get('sliderDimensions');

        var exactVal = this.percentToValue(this.positionToPercent(event.clientX || event.originalEvent.touches[0].clientX));
        var closestVal = this.minMaxValidator( this.stepValidator(exactVal));

        this.set('value', closestVal);
    },

    end: function() {
        if (this.get('disabled')) {
            return;
        }

        this.beginPropertyChanges();
        this.set('active', false);
        this.set('dragging', false);
        this.endPropertyChanges();
    },

    keyDown: function(event) {
        if (this.get('disabled')) {
            return;
        }

        var changeAmount;

        if (event.keyCode === KEY_CODE.LEFT_ARROW) {
            changeAmount = this.get('step') * -1;
        } else if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
            changeAmount = this.get('step')
        }
        if (changeAmount) {
            if (event.metaKey || event.ctrlKey || event.altKey) {
                changeAmount *= 4;
            }

            this.incrementProperty('value', changeAmount);

            event.preventDefault();
            event.stopPropagation();
        }
    }

});

export default MdSlider;
