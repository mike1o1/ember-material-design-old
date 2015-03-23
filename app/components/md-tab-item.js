import Ember from 'ember';

var MdTabItem = Ember.Component.extend({
    tagName: 'md-tab-item',

    attributeBindings: ['tab', 'role', 'disabled', 'label'],
    classNameBindings: ['isActive:md-active', 'isFocused:md-focus', 'isDisabled:md-disabled'],

    tabWrapperComponent: Ember.computed.alias('parentView'),
    tabsComponent: Ember.computed.alias('tabWrapperComponent.parentView'),

    setupRipples: function() {
        this.get('tabsComponent').attachRipple(this.$());
    }.on('didInsertElement'),

    click: function() {
        this.get('tabsComponent').select(this.get('tab').getIndex());
    },

    isActive: function() {
        return this.get('tab').isActive();
    }.property('tabsComponent.selectedIndex'),

    isFocused: function() {
        return this.get('tab').hasFocus();
    }.property('tabsComponent.selectedIndex')

});

export default MdTabItem;
