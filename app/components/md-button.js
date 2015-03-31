import Ember from 'ember';
import RipplesMixin from '../mixins/ripples';

var RbButtonComponent = Ember.Component.extend(RipplesMixin, {

    tagName: 'button',

    classNames: ['md-button'],

    attributeBindings: ['disabled', 'href', 'style', 'type'],

    setupRipples: function() {
        if (this.get('mdNoInk')) {
            return;
        }
        this.get('rippleService').attachButtonBehavior(this.$());

    }.on('didInsertElement'),


    buttonClassNames: function() {

        var classNames = '';

        this.get('classNames').forEach((cn) => {
            classNames = classNames + " " + (cn);
        });

        return classNames;

    }.property('classNames'),

    click: function() {
        this.sendAction();
    }

});

export default RbButtonComponent;
