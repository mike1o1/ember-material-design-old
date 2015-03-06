import Ember from 'ember';
import RipplesMixin from '../mixins/ripples';

var RbButtonComponent = Ember.Component.extend(RipplesMixin, {

    buttonService: Ember.inject.service('ripple'),

    tagName: 'button',

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
