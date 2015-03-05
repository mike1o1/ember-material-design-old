import Ember from 'ember';

var RbInputComponent = Ember.TextField.extend({

    inputContainer: Ember.computed.alias('parentView'),

    setupPlaceholder: function() {

        if (!this.get('inputContainer') || !this.get('placeholder')) {
            return;
        }

        var placeholderText = this.get('placeholder');

        this.get('inputContainer').$().append('<div class="md-placeholder">' + placeholderText + '</div>');

        // we don't need this on the element anymore, so get rid of it
        this.set('placeholder', '');

    }.on('didInsertElement'),

    resetContainer: function() {
        this.get('inputContainer').set('isFocused', false);
        this.get('inputContainer').set('hasValue', false);
    }.on('willDestroyElement'),

    setFocused: function(ev) {
        var focused = ev.type === 'focusin';
        this.get('inputContainer').set('isFocused', focused);
    }.on('focusIn', 'focusOut'),

    processInput: function() {
        var hasValue = this.$().val().length > 0;
        this.get('inputContainer').set('hasValue', hasValue);

    }.on('input')


});

export default RbInputComponent;
