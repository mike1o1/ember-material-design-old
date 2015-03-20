import Ember from 'ember';

var MdTabContent = Ember.Component.extend({
    tagName: 'div',
    classNames: ['md-tab-content'],
    attributeBindings: ['tab', 'position'],

    tabsContainer: Ember.computed.alias('parentView.parentView'),

    isSelected: function() {
        //var selected = this.get('tabsContainer.md-selected');
        //var selectedTab = this.get('tabsContainer.tabs').objectAt(selected);
        //return selectedTab === this.get('tab');

        return this.get('position') === this.get('tabsContainer.md-selected');

    }.property('tabsContainer.md-selected')


});

export default MdTabContent;
