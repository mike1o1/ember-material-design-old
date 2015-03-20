import Ember from 'ember';

var MdTabs = Ember.Component.extend({
    tagName: 'md-tabs',

    attributeBindings: ['md-selected', 'tabs'],

    updateBar: function() {

    },

    selectedItem: function() {
        if (!this.get('md-selected') || this.get('md-selected') >= this.get('tabs.length')) {
            return null;
        }
        return this.get('tabs').objectAt(this.get('md-selected'));
    }.property('md-selected', 'tabs'),

    select: function(tab) {
        if (!tab || tab.get('isSelected') || tab.get('disabled')) {
            return;
        }

        this.deselect(tab);

        this.set('md-selected', this.indexOf(tab));
    },

    deselect: function(tab) {
        if (!tab || !tab.get('isSelected')) {
            return;
        }

        this.set('md-selected', -1);
        tab.set('isSelected', false);
    },

    indexOf: function(tab) {
        return this.get('tabs').indexOf(tab.get('tab'));
    }
});

export default MdTabs;
