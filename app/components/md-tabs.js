import Ember from 'ember';

var MdTabs = Ember.Component.extend({
    tagName: 'md-tabs',

    attributeBindings: ['md-selected'],

    isCreated: false,

    setCreatedProperty: function() {
        this.set('isCreated', true);
    }.on('didInsertElement'),

    childTabs: function() {

    },

    tabComponents: function() {
        return Ember.ArrayProxy.create({
            content: []
        });
    }.property(),

    tabsLength: function() {
        return this.get('tabComponents.length');
    }.property('tabComponents.[]'),

    selectedItem: function() {
        if (this.get('md-selected') >= this.get('tabComponents.length')) {
            return null;
        }
        return this.get('tabComponents').objectAt(this.get('md-selected'));
    }.property('md-selected', 'tabComponents.[]'),

    add: function(tabComponent, index) {

        if (!this.get('isCreated')) {
            this.get('tabComponents').insertAt(0, tabComponent);
        } else if (typeof index !== 'undefined' && index <= this.get('tabComponents.length')) {
            this.get('tabComponents').insertAt(index, tabComponent);
        } else {
            this.get('tabComponents').addObject(tabComponent);
        }

        if (this.indexOf(tabComponent) === this.get('md-selected')) {
            tabComponent.set('isSelected', true);
        }
    },

    remove: function(tabComponent, noReselect) {
        if (!this.get('tabComponents').contains(tabComponent)) {
            return;
        }

        if (noReselect) {
            return;
        }

        var isSelectedItem = this.get('selectedItem') === tabComponent,
            newTab = this.previous() || this.next();

        this.deselect(tabComponent);
        this.get('tabComponents').removeObject(tabComponent);

        if (isSelectedItem) {
            this.select(newTab);
        }
    },

    select: function(tabComponent, rightToLeft) {
        if (!tabComponent || tabComponent.get('isSelected') || tabComponent.get('disabled')) {
            return;
        }

        if (!this.get('tabComponents').contains(tabComponent)) {
            return;
        }

        this.deselect(this.get('selectedItem'));

        this.set('md-selected', this.indexOf(tabComponent));
        tabComponent.set('isSelected', true);
    },

    deselect: function(tabComponent) {
        if (!tabComponent || !tabComponent.get('isSelected')) {
            return;
        }

        this.set('md-selected', -1);
        tabComponent.set('isSelected', false);
    },

    next: function(tabComponent) {
        var currentIndex = this.indexOf(tabComponent);

        while (true) {
            if (!this.inRange(currentIndex)) {
                return null;
            }

            var nextIndex = currentIndex + 1;
            var foundItem = null;
            if (this.inRange(nextIndex)) {
                foundItem = this.get('tabComponents').objectAt(nextIndex);
            }

            if ((foundItem === null) || (nextIndex === this.get('tabComponents.length'))) {
                return null;
            }

            if (foundItem && !foundItem.get('disabled')) {
                return foundItem;
            }

            currentIndex = nextIndex;
        }
    },

    previous: function(tabComponent) {
        var currentIndex = this.indexOf(tabComponent);

        while (true) {
            if (!this.inRange(currentIndex)) {
                return null;
            }

            var nextIndex = currentIndex + -1;
            var foundItem = null;
            if (this.inRange(nextIndex)) {
                foundItem = this.get('tabComponents').objectAt(nextIndex);
            }

            if ((foundItem === null) || (nextIndex === this.get('tabComponents.length'))) {
                return null;
            }

            if (foundItem && !foundItem.get('disabled')) {
                return foundItem;
            }

            currentIndex = nextIndex;
        }
    },

    indexOf: function(tabComponent) {
        return this.get('tabComponents').indexOf(tabComponent);
    },

    inRange: function(index) {
        var length = this.get('tabComponents.length');
        return length && (index > -1) && (index < length);
    }
});

export default MdTabs;
