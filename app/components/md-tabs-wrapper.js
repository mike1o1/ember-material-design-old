import Ember from 'ember';

var MdTabWrapper = Ember.Component.extend({
    tagName: 'md-tabs-wrapper',
    classNameBindings: ['shouldStretchTabs:md-stretch-tabs'],

    tabsComponent: Ember.computed.alias('parentView'),

    tabs: Ember.computed.alias('tabsComponent.tabs'),

    shouldStretchTabs: function() {
        return this.get('tabsComponent.shouldStretchTabs');
    }.property('tabsComponent.shouldStretchTabs'),

    shouldPaginate: function() {
        return this.get('tabsComponent.shouldPaginate');
    }.property('tabsComponent.shouldPaginate')
});

export default MdTabWrapper;
