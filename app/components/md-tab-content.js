import Ember from 'ember';

var MdTabContent = Ember.Component.extend({
    tagName: 'div',
    classNames: ['md-tab-content'],
    attributeBindings: ['tab', 'position'],

    tabsContainer: Ember.computed.alias('parentView.parentView'),

    isSelected: function() {
        return this.get('tabsContainer.selectedItem.tab') === this.get('tab');

    }.property('tabsContainer.selectedItem.tab')


});

export default MdTabContent;
