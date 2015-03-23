import Ember from 'ember';

var MdTabWrapper = Ember.Component.extend({
    tagName: 'md-tab-wrapper',
    classNameBindings: ['shouldStretchTabs:md-stretch-tabs'],

    tabsComponent: Ember.computed.alias('parentView'),

    tabs: Ember.computed.alias('tabsComponent.tabs'),

    shouldStretchTabs: function() {
        return this.get('tabsComponent.shouldStretchTabs');
    }.property('tabsComponent.shouldStretchTabs')
});

export default MdTabWrapper;
