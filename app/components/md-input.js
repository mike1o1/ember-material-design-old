import Ember from 'ember';

var MdInputComponent = Ember.TextField.extend({

    classNames: ['md-input'],

    inputContainer: Ember.computed.alias('parentView'),

    attributeBindings: ['style'],

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
    }.on('willDestroyElement'),

    setFocused: function(ev) {
        var focused = ev.type === 'focusin';
        this.get('inputContainer').set('isFocused', focused);
    }.on('focusIn', 'focusOut'),

    processInput: function() {
        console.log('input input: ', this.get('value'));
        this.get('inputContainer').set('value', this.get('value'));

    }.on('input')


});

export default MdInputComponent;
