import Ember from 'ember';
import RippleMixin from '../mixins/ripples';

var MdTabs = Ember.Component.extend(Ember.Evented, RippleMixin, {
    tagName: 'md-tabs',

    constants: Ember.inject.service('constants'),

    attributeBindings: ['selectedIndex', 'tabs', 'md-border-bottom', 'md-stretch-tabs'],

    tabs: Ember.ArrayProxy.create({content: []}),
    lastSelectedIndex: null,
    focusIndex: 0,
    offsetLeft: 0,
    hasContent: true,
    hasFocus: false,
    lastClick: false,

    tabsLength: function() {
        return this.get('tabs.length');
    }.property('tabs.[]'),

    elements: function() {
        return {};
    }.property(),

    setupComponent: function() {
        Ember.run.schedule('afterRender', this, this.updateInkBarStyles);
        Ember.run.schedule('afterRender', this, this.getElements);
    }.on('didInsertElement'),

    getElements: function() {
        // TODO: make these components and have them auto register?
        var elements = {};
        elements.canvas = this.$()[0].getElementsByTagName('md-tab-canvas')[0];
        elements.wrapper = elements.canvas.getElementsByTagName('md-pagination-wrapper')[0];
        elements.tabs = elements.wrapper.getElementsByTagName('md-tab-item');
        elements.dummies = elements.canvas.getElementsByTagName('md-dummy-tab');
        elements.inkBar = elements.wrapper.getElementsByTagName('md-ink-bar')[0];

        this.set('elements', elements);
    }.on('didInsertElement'),

    keyDown: function(event) {
        switch(event.keyCode) {
            case this.get('constants.KEY_CODE.LEFT_ARROW'):
                event.preventDefault();
                this.incrementSelectedIndex(-1, true);
                break;
            case this.get('constants.KEY_CODE.RIGHT_ARROW'):
                event.preventDefault();
                this.incrementSelectedIndex(1, true);
                break;
            case this.get('constants.KEY_CODE.SPACE'):
            case this.get('constants.KEY_CODE.ENTER'):
                event.preventDefault();
                this.set('selectedIndex', this.get('focusIndex'));
                break;
        }
        this.set('lastClick', false);
    },

    incrementSelectedIndex: function(inc, focus) {
        var newIndex,
            index = focus ? this.get('focusIndex') : this.get('selectedIndex');
        for (newIndex = index + inc;
            this.get('tabs').objectAt(newIndex) && this.get('tabs').objectAt(newIndex).get('disabled');
            newIndex += inc) {}
        if (this.get('tabs').objectAt(newIndex)) {
            if (focus) {
                this.set('focusIndex', newIndex);
            } else {
                this.set('selectedIndex', newIndex);
            }
        }
    },

    handleOffseChange: function() {
        var left = this.get('offsetLeft');
        Ember.$(this.get('elements.wrapper')).css('left', '-' + left + 'px');
    }.observes('offsetLeft'),

    handleFocusIndexChange: function() {
        var newIndex = this.get('focusIndex');
        if (!this.get('elements.tabs')[newIndex]) {
            return;
        }

        this.adjustOffset();
        this.redirectFocus();

    }.observes('focusIndex'),

    redirectFocus: function() {
        // TODO: implement after dummies are implemented
        //this.get('elements.dummies')[this.get('focusIndex')].focus();
    },

    adjustOffset: function() {
        var tab = this.get('elements.tabs')[this.get('focusIndex')],
            left = tab.offsetLeft,
            right = tab.offsetWidth + left;

        this.beginPropertyChanges();
        var offsetLeft = this.get('offsetLeft');
        this.set('offsetLeft', Math.max(offsetLeft, this.fixOffset(right - this.get('elements.canvas.clientWidth'))));
        this.set('offsetLeft', Math.min(offsetLeft, this.fixOffset(left)));
        this.endPropertyChanges();
    },

    attachRipple: function(element) {
        var options = {
            colorElement: Ember.$(this.get('elements.inkBar'))
        };

        this.get('rippleService').attachTabBehavior(element, options);
    },

    shouldStretchTabs: function() {
        switch (this.get('md-stretch-tabs')) {
            case 'always': return true;
            case 'never': return false;
            default: return !this.get('shouldPaginate') && window.matchMedia('(max-width: 600px)').matches;
        }
    }.property('shouldPaginate'),

    shouldPaginate: function() {
        if (!this.get('elements.tabs') || this.get('elements.tabs.length') <= 1) {
            return false;
        }
        var canvasWidth = this.$().prop('clientWidth');
        Ember.EnumerableUtils.forEach(this.get('element.tabs'), function(tab) {
            canvasWidth -= tab.offsetWidth;
        });
        return canvasWidth <= 0;
    }.property('element.tabs.[]'),

    insertTab: function(tabData, index) {
        var self = this;
        var proto = {
            getIndex: function() {
                return self.get('tabs').indexOf(tab);
            },
            isActive: function() {
                return this.getIndex() === self.get('selectedIndex');
            },
            isLeft: function() {
                return this.getIndex() < self.get('selectedIndex');
            },
            isRight: function() {
                return this.getIndex() > self.get('selectedIndex');
            },
            hasFocus: function() {
                return !self.get('lastClick') && self.get('hasFocus') && this.getIndex() === self.get('focusIndex');
            }
        },
            tab = Ember.merge(proto, tabData);

        if (typeof tabData.template !== 'string') {
            self.set('hasContent', false);
        }

        if (Ember.isPresent(index)) {
            this.get('tabs').insertAt(Math.min(this.get('tabs.length'), index), tab);
        } else {
            this.get('tabs').addObject(tab);
        }

        return tab;
    },

    removeTab: function(tabData) {
        this.get('tabs').removeAt(tabData.getIndex());
        this.refreshIndex();

        // wait for the item to be removed from the DOM
        Ember.run.schedule('afterRender', this, this.updateInkBarStyles);
    },

    select: function(index) {
        this.beginPropertyChanges();
        this.set('focusIndex', index);
        this.set('selectedIndex', index);
        this.set('lastClick', true);
        this.endPropertyChanges();
    },

    scroll: function(event) {
        if (!this.get('shouldPaginate')) {
            return;
        }

        event.preventDefault();

        this.set('offsetLeft', this.fixOffset(this.get('offsetLeft') - event.wheelDelta));
    },

    fixOffset: function(value) {
        var lastTab = this.get('elements.tabs')[this.get('elements.tabs.length') - 1],
            totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;

        value = Math.max(0, value);
        value = Math.min(totalWidth - this.get('elements.canvas.clientWidth'), value);
        return value;
    },

    nextPage: function() {
        var viewportWidth = this.get('elements.canvas.clientWidth'),
            totalWidth = viewportWidth + this.get('offsetLeft'),
            i, tab;

        for(i = 0; i < this.get('elements.tabs.length'); i++) {
            tab = this.get('elements.tabs')[i];
            if (tab.offsetLeft + tab.offsetWidth > totalWidth) break;
        }
        this.set('offsetLeft', this.fixOffset(tab.offsetLeft));
    },

    previousPage: function() {
        var i, tab;
        for (i = 0; i < this.get('elements.tabs.length'); i++) {
            tab = this.get('elements.tabs')[i];
            if (tab.offsetLeft + tab.offsetWidth >= this.get('offsetLeft')) break;
        }
        this.set('offsetLeft', this.fixOffset(tab.offsetLeft + tab.offsetWidth - this.get('elements.canvas.clientWidth')));
    },

    canPageBack: function() {
        return this.get('offsetLeft') > 0;
    }.property('offsetLeft'),

    canPageForward: function() {

        if (!this.get('elements.tabs')) {
            return false;
        }

        var lastTab = this.get('elements.tabs')[this.get('elements.tabs.length') - 1];
        return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > this.get('elements.canvas.clientWidth') + this.get('offsetLeft');
    }.property('offsetLeft'),

    refreshIndex: function() {
        this.set('selectedIndex', this.getNearestSafeIndex(this.get('selectedIndex')));
        this.set('focusIndex', this.getNearestSafeIndex(this.get('focusIndex')));
    },

    handleSelectedIndexChange: function() {
        this.set('lastSelectedIndex', this.get('selectedIndex'));
        this.set('selectedIndex', this.getNearestSafeIndex(this.get('selectedIndex')));
        this.updateInkBarStyles();
    }.observes('selectedIndex'),

    updateInkBarStyles: function() {
        if (!this.get('tabs.length') > 0) {
            return;
        }

        var index = this.get('selectedIndex'),
            totalWidth = this.get('elements.wrapper.offsetWidth'),
            tab = this.get('elements.tabs')[index],
            left = tab.offsetLeft,
            right = totalWidth - left - tab.offsetWidth;

        this.updateInkBarClassName();
        Ember.$(this.get('elements.inkBar')).css({left: left + 'px', right: right + 'px'});
    },

    updateInkBarClassName: function() {
        var newIndex = this.get('selectedIndex'),
            oldIndex = this.get('lastSelectedIndex'),
            ink = Ember.$(this.get('elements.inkBar'));

        ink.removeClass('md-left md-right');
        if (!typeof oldIndex === 'number') {
            return;
        }

        if (newIndex < oldIndex) {
            ink.addClass('md-left');
        } else if (newIndex > oldIndex) {
            ink.addClass('md-right');
        }
    },

    getNearestSafeIndex: function(newIndex) {
        var maxOffset = Math.max(this.get('tabs.length') - newIndex, newIndex),
            i, tab;

        for (i = 0; i <= maxOffset; i++) {
            tab = this.get('tabs').objectAt(newIndex + i);
            if (tab && (tab.get('disabled') !== true)) {
                return tab.getIndex();
            }

            tab = this.get('tabs').objectAt(newIndex - 1);
            if (tab && (tab.get('disabled') !== true)) {
                return tab.getIndex();
            }
        }
        return newIndex;
    }




});

export default MdTabs;
