import Ember from 'ember';
import RipplesMixin from '../mixins/ripples';

var RbButtonComponent = Ember.Component.extend(RipplesMixin, {

    tagName: 'button',

    setupRipples: function() {
        this.get('rippleService').attachButtonBehavior(this.$());
    }.on('didInsertElement'),

    classNames: ['md-button'],

    attributeBindings: ['disabled', 'href'],

    buttonClassNames: function() {

        var classNames = '';

        this.get('classNames').forEach((cn) => {
            classNames = classNames + " " + (cn);
        });

        return classNames;

    }.property('classNames')

});

export default RbButtonComponent;
