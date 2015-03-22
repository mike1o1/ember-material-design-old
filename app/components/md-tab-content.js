import Ember from 'ember';

var MdTabContent = Ember.Component.extend({
    tagName: 'md-tab-content',

    attributeBindings: ['tab', 'active'],

    tabsComponent: Ember.computed.alias('parentView'),

    tabs: Ember.computed.alias('tabsComponent.tabs'),

    classNameBindings: ['tabIsRight:md-right', 'tabIsLeft:md-left', 'noTransition:md-no-transition', 'isActive:md-active'],

    tabIsRight: function() {
        return this.get('tab') && this.get('tab').isRight();
    }.property('tabsComponent.selectedIndex'),

    tabIsLeft: function() {
        return this.get('tab') && this.get('tab').isLeft();
    }.property('tabsComponent.selectedIndex'),

    noTransition: function() {
        return this.get('tabsComponent.lastSelectedIndex') == null;
    }.property('tabsComponent.lastSelectedIndex'),

    isActive: function() {
        return this.get('tab') && this.get('tab').isActive();
    }.property('tabsComponent.selectedIndex')
});

export default MdTabContent;
