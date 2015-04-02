import Ember from 'ember';

var MdTabContent = Ember.Component.extend({
    tagName: 'md-tab-content',

    attributeBindings: ['tab', 'active'],

    tabContentWrapperComponent: Ember.computed.alias('parentView'),

    tabsComponent: Ember.computed.alias('tabContentWrapperComponent.parentView'),

    tabs: Ember.computed.alias('tabsComponent.tabs'),

    index: function() {
        return null;
    }.property(''),

    setupTabContent: function() {

        var tabs = this.$().parent()[0].getElementsByTagName('md-tab-content'),
            index = Array.prototype.indexOf.call(tabs, this.$()[0]);

        this.set('index', index);

    }.on('didInsertElement'),

    recalculateTabIndex: function() {

        if (!this.get('index')) {
            // we don't want to run this until the initial calculation has been performed on element insertion
            return;
        }

        // TODO: does this fire too often?
        //console.log('recalculating tabs');

        var tabs = this.$().parent()[0].getElementsByTagName('md-tab-content'),
            index = Array.prototype.indexOf.call(tabs, this.$()[0]);

        this.set('index', index);
    }.observes('tabs.[]'),

    classNameBindings: ['tabIsRight:md-right', 'tabIsLeft:md-left', 'noTransition:md-no-transition', 'isActive:md-active', 'dynamicHeight:md-no-scroll'],

    tabIsRight: function() {

        return this.get('index') > this.get('tabsComponent.selectedIndex');

        //return this.get('tab') && this.get('tab').isRight();
    }.property('tabsComponent.selectedIndex', 'index'),

    dynamicHeight: function() {
        return this.get('tabsComponent.dynamicHeight');
    }.property('tabsComponent.dynamicHeight'),

    tabIsLeft: function() {
        return this.get('index') < this.get('tabsComponent.selectedIndex');
        //return this.get('tab') && this.get('tab').isLeft();
    }.property('tabsComponent.selectedIndex', 'index'),

    noTransition: function() {
        return this.get('tabsComponent.lastSelectedIndex') == null;
    }.property('tabsComponent.lastSelectedIndex'),

    isActive: function() {
        return this.get('index') === this.get('tabsComponent.selectedIndex');
        //return this.get('tab') && this.get('tab').isActive();
    }.property('tabsComponent.selectedIndex', 'index')
});

export default MdTabContent;
