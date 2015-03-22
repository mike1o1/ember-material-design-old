import Ember from 'ember';

var MdTabs = Ember.Component.extend({
    tagName: 'md-tabs',

    attributeBindings: ['selectedIndex'],

    selectedIndex: -1,

    isCreated: false,

    setupTabs: function() {
        this.set('isCreated', true);

        // if no tabs have been selected, select the first item
        if (this.get('selectedIndex') === -1) {
            this.set('selectedIndex', 0);
        }

        this.set('selectedItem.isSelected', true);

    }.on('didInsertElement'),

    childTabs: function() {

    },

    tabComponents: function() {
        return Ember.ArrayProxy.create({
            content: []
        });
    }.property(),

    selectedItem: function() {
        if (this.get('selectedIndex') >= this.get('tabComponents.length')) {
            return null;
        }

        return this.get('tabComponents').objectAt(this.get('selectedIndex'));
    }.property('selectedIndex', 'tabComponents.[]'),

    add: function(tabComponent, index) {

        if (!this.get('isCreated')) {
            this.get('tabComponents').insertAt(0, tabComponent);
        } else if (typeof index !== 'undefined' && index <= this.get('tabComponents.length')) {
            this.get('tabComponents').insertAt(index, tabComponent);
        } else {
            this.get('tabComponents').addObject(tabComponent);
        }

        
        // if component has been created, and this tab matches our index, select it
        if (this.get('isCreated') && (this.indexOf(tabComponent) === this.get('selectedIndex') || this.get('selectedIndex') === -1)) {
            this.select(tabComponent);
            //tabComponent.set('isSelected', true);
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

        this.set('selectedIndex', this.indexOf(tabComponent));
        tabComponent.set('isSelected', true);
    },

    deselect: function(tabComponent) {
        if (!tabComponent || !tabComponent.get('isSelected')) {
            return;
        }

        this.set('selectedIndex', -1);
        tabComponent.set('isSelected', false);
    },

    next: function(tabComponent) {
        var currentIndex = this.indexOf(tabComponent || this.get('selectedItem'));

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
        var currentIndex = this.indexOf(tabComponent || this.get('selectedItem'));

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
