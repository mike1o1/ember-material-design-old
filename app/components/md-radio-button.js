import Ember from 'ember';
import RipplesMixin from '../mixins/ripples';

var MdRadioButton = Ember.Component.extend(RipplesMixin, {

    attributeBindings: ['disabled'],

    classNameBindings: ['checked:md-checked'],

    tagName: 'md-radio-button',

    setupRipples: function() {
        if (this.get('mdNoInk')) {
            return;
        }
        this.get('rippleService').attachCheckboxBehavior(this.$('.md-container'));

    }.on('didInsertElement'),

    checked: function() {
        return this.get('value') === this.get('selected');
    }.property('value', 'selected'),

    checkedDidChange: Ember.observer('checked', function() {
        if (this.get('checked')) {
            this.set('selected', this.get('value'));
        }
    }),

    click: function() {
        if (this.get('disabled')) {
            return;
        }

        this.set('selected', this.get('value'));
    }

});

export default MdRadioButton;
