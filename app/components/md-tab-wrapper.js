import Ember from 'ember';

var MdTabWrapper = Ember.Component.extend({
    tagName: 'md-tab-wrapper',
    classNameBindings: ['shouldStretchTabs:md-stretch-tabs'],

    tabsComponent: Ember.computed.alias('parentView'),

    tabs: Ember.computed.alias('tabsComponent.tabs'),

    shouldStretchTabs: function() {
        return this.get('tabsComponent.shouldStretchTabs');
    }.property('tabsComponent.shouldStretchTabs'),

    shouldPaginate: function() {
        console.log('should tab wrapper paginate?', this.get('tabsComponent.shouldPaginate'));
        return this.get('tabsComponent.shouldPaginate');
    }.property('tabsComponent.shouldPaginate')
});

export default MdTabWrapper;
