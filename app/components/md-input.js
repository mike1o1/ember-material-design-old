import Ember from 'ember';

var MdInputComponent = Ember.TextField.extend({

    classNames: ['md-input'],

    inputContainer: Ember.computed.alias('parentView'),
    value: Ember.computed.alias('parentView.value'),

    attributeBindings: ['style'],

    originalPlaceholder: '',

    setupPlaceholder: function() {

        this.set('originalPlaceholder', this.get('placeholder'));

        if (!this.get('inputContainer') || !this.get('placeholder')) {
            return;
        }

        if (typeof this.get('inputContainer.md-no-float') !== 'undefined') {

            return;
        }

        this.set('inputContainer.placeholder', this.get('placeholder'));
        //var placeholderText = this.get('placeholder');
        //
        //this.get('inputContainer').$().append('<div class="md-placeholder">' + this.get('placeholder') + '</div>');
        //
        //// we don't need this on the element anymore, so get rid of it
        this.set('placeholder', '');

        this.processInput();

    }.on('willInsertElement'),

    resetContainer: function() {
        this.get('inputContainer').set('isFocused', false);
    }.on('willDestroyElement'),

    setFocused: function(ev) {
        var focused = ev.type === 'focusin';
        this.get('inputContainer').set('isFocused', focused);
    }.on('focusIn', 'focusOut'),

    processInput: function() {

        if (this.get('value') && this.get('value').length > 0) {
            this.get('inputContainer').set('value', this.get('value'));
            this.set('inputContainer.placeholder', '');

        } else {
            this.get('inputContainer').set('placeholder', this.get('originalPlaceholder'));
        }


    }.on('input')


});

export default MdInputComponent;
