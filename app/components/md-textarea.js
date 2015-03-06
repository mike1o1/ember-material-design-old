import Ember from 'ember';

var MdTextArea = Ember.TextArea.extend({
    classNames: ['md-input'],

    inputContainer: Ember.computed.alias('parentView'),

    resetContainer: function() {

        this.get('inputContainer').set('isFocused', false);
        this.get('inputContainer').set('hasValue', false);
    }.on('willDestroyElement'),


    setFocused: function(ev) {
        var focused = ev.type === 'focusin';
        this.get('inputContainer').set('isFocused', focused);
    }.on('focusIn', 'focusOut'),

    processInput: function() {
        var hasValue = this.get('value').length > 0;
        this.get('inputContainer').set('hasValue', hasValue);

    }.on('input')
});

export default MdTextArea;
