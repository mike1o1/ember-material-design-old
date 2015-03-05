import Ember from 'ember';

var RbInputContainer = Ember.Component.extend({

    tagName: 'md-input-container',

    classNameBindings: ['isFocused:md-input-focused',
        'hasValue:md-input-has-value',
        'isInvalid:md-input-invalid'],

    isFocused: false,
    hasValue: false,
    iInvalid: false
});

export default RbInputContainer;
