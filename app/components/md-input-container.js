import Ember from 'ember';

var MdInputContainer = Ember.Component.extend({

    tagName: 'md-input-container',

    attributeBindings: ['style', 'md-no-float'],

    classNameBindings: ['isFocused:md-input-focused',
        'hasValue:md-input-has-value',
        'isInvalid:md-input-invalid'],

    isFocused: false,

    placeholder: '',

    hasValue: function() {
        return !Ember.isNone(this.get('value')) && !Ember.isEmpty(this.get('value'));
        //return this.get('value') && this.get('value').length > 0;
    }.property('value'),

    iInvalid: false
});

export default MdInputContainer;
