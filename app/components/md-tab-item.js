import Ember from 'ember';

var MdTabItem = Ember.Component.extend({
    tagName: 'md-tab-item',

    attributeBindings: ['tab', 'role', 'disabled', 'label'],

    tabsComponent: Ember.computed.alias('parentView'),

    setupRipples: function() {
        this.get('tabsComponent').attachRipple(this.$());
    }.on('didInsertElement')


});

export default MdTabItem;
