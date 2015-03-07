import Ember from 'ember';

var MdTextArea = Ember.TextArea.extend({
    classNames: ['md-input'],

    inputContainer: Ember.computed.alias('parentView'),

    resetContainer: function() {

        this.get('inputContainer').set('isFocused', false);
        this.get('inputContainer').set('hasValue', false);


    }.on('willDestroyElement'),

    setupTextArea: function() {
        if (this.get('value')) {
            this.processInput();
        }


        this.changeTextArea();
    }.on('didInsertElement'),


    setFocused: function(ev) {
        var focused = ev.type === 'focusin';
        this.get('inputContainer').set('isFocused', focused);
    }.on('focusIn', 'focusOut'),

    processInput: function() {
        var hasValue = this.get('value').length > 0;
        this.get('inputContainer').set('hasValue', hasValue);

    }.on('input'),

    changeTextArea: function() {
        var node = this.$()[0];
        node.style.height = 'auto';
        node.scrollTop = 0;
        var height = this.getHeight(node);
        if (height) {
            node.style.height = height + 'px';
        }
    }.on('keydown input'),

    getHeight: function(node) {
        var line = node.scrollHeight - node.offsetHeight;
        return node.offsetHeight + (line > 0 ? line : 0);
    },

    scroll: function() {
        var node = this.$()[0];
        var line = node.scrollheight - node.offsetHeight;
        var height = node.offsetHeight + line;
        node.style.height = height + 'px';
    }
});

export default MdTextArea;
