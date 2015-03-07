import Ember from 'ember';

var RbInputContainer = Ember.Component.extend({

    tagName: 'md-input-container',

    attributeBindings: ['style'],

    classNameBindings: ['isFocused:md-input-focused',
        'hasValue:md-input-has-value',
        'isInvalid:md-input-invalid'],

    isFocused: false,

    hasValue: function() {
        return this.get('value') && this.get('value').length > 0;
    }.property('value'),

    iInvalid: false
});

export default RbInputContainer;
