import Ember from 'ember';


var MdToolbar = Ember.Component.extend({
    tagName: ['md-toolbar'],

    shrinkSpeedFactor: 0.5,

    setupScrollShrink: function() {

        // Current "y" position of scroll
        var y = 0;

        // Store the last scroll top position
        var prevScrollTop = 0;

        var shrinkSpeedFactor = this.get('shrinkSpeedFactor');

        var toolbarHeight;
        var contentElement;

        //var debouncedContentScroll =

    }
});

export default MdToolbar;
