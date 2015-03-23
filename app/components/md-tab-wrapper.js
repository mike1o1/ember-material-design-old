import Ember from 'ember';

var MdTabWrapper = Ember.Component.extend({
    tagName: 'md-tab-wrapper',
    attributeBindings: ['shouldStretchTabs'],
    classNameBindings: ['shouldStretchTabs:md-stretch-tabs'],

    tabsComponent: Ember.computed.alias('parentView'),

    tabs: Ember.computed.alias('tabsComponent.tabs')
});

export default MdTabWrapper;
