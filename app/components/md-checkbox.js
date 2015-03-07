import Ember from 'ember';
import RippleMixin from '../mixins/ripples';

var KEY_CODE_SPACE = 32;

var MdCheckbox = Ember.Component.extend(RippleMixin, {


    tagName: 'md-checkbox',
    classNames: ['md-checkbox'],
    classNameBindings: ['checked:md-checked'],

    attributeBindings: ['isDisabled:disabled', 'aria-label', 'mdNoInk'],

    isDisabled: function() {
        return this.get('disabled') ? 'disabled' : null;
    }.property('disabled'),

    setupRipples: function() {
        if (this.get('mdNoInk')) {
            return;
        }
        this.get('rippleService').attachCheckboxBehavior(this.$('.md-container'));

    }.on('didInsertElement'),

    checked: false,

    click: function() {
        if (this.get('disabled')) {
            return;
        }

        this.toggleProperty('checked');
    },

    keyPress: function(event) {
        if (event.which === KEY_CODE_SPACE) {
            this.click();
        }
    }


});

export default MdCheckbox;
