import Ember from 'ember';
import RippleMixin from '../mixins/ripples';

var MdTabs = Ember.Component.extend(Ember.Evented, RippleMixin, {
    tagName: 'md-tabs',

    mediaQueries: Ember.inject.service('media-queries'),

    setupMediaQuery: function() {
        this.get('mediaQueries').match('sm', '(max-width: 600px)');
    }.on('didInsertElement'),

    constants: Ember.inject.service('constants'),

    attributeBindings: ['selectedIndex', 'tabs', 'md-border-bottom', 'md-stretch-tabs'],

    tabs: function() {
        return [];
    }.property(),
    elements: null,
    lastSelectedIndex: null,
    focusIndex: 0,
    offsetLeft: 0,
    hasContent: true,
    hasFocus: false,
    lastClick: false,

    setupTabs: function() {
        this.set('tabs', Ember.ArrayProxy.create({
            content: []
        }));
    }.on('init'),

    tabElements: function() {
        return {};
    }.property(),

    setupComponent: function() {
        console.log('main component setup');
        this.set('tabs.content', this.get('tabs').sortBy('index'));
        Ember.run.schedule('afterRender', this, function() {


            this.getElements();

            this.calculatePagination();




            //Ember.run.later(this, this.updateInkBarStyles, 350);

            //Ember.run.schedule('sync', this, this.calculatePagination);

            console.log('component setup');
            this.select(this.get('selectedIndex'));
            this.updateInkBarStyles();

        });
    }.on('didInsertElement'),

    setupWindowResize: function() {
        var self = this;
        Ember.$(window).on('resize', function() {
            Ember.run.schedule('sync', self, function() {
                self.handleWindowResize();
            });
        });
    }.on('didInsertElement'),

    removeWindowResize: function() {
        Ember.$(window).off('resize')
    }.on('willDestroyElement'),

    handleWindowResize: function() {
        // recalculate pagination
        Ember.run.throttle(this, this.calculatePagination, 16);


        this.set('lastSelectedIndex', this.get('selectedIndex'));
        this.updateInkBarStyles();
    }.on('resize'),

    getElements: function() {
        // TODO: make these components and have them auto register?
        var elements = {};
        elements.canvas = this.$()[0].getElementsByTagName('md-tab-canvas')[0];
        elements.wrapper = elements.canvas.getElementsByTagName('md-pagination-wrapper')[0];
        elements.tabs = elements.wrapper.getElementsByTagName('md-tab-item');
        elements.dummies = elements.canvas.getElementsByTagName('md-dummy-tab');
        elements.inkBar = elements.wrapper.getElementsByTagName('md-ink-bar')[0];

        //console.log('element tabs: ' + elements.tabs.length + ' compared to ' + this.get('tabs.length') + ' tabs length');

        this.elements = elements;



        console.log('elements', this.elements.tabs[0]);
    },

    keyDown: function(event) {
        switch (event.keyCode) {
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
             newIndex += inc) {
        }
        if (this.get('tabs').objectAt(newIndex)) {
            if (focus) {
                this.set('focusIndex', newIndex);
            } else {
                this.set('selectedIndex', newIndex);
            }
        }
    },

    handleOffsetChange: function() {
        var left = this.get('offsetLeft');
        Ember.$(this.elements.wrapper).css('left', '-' + left + 'px');
    }.observes('offsetLeft'),

    handleFocusIndexChange: function() {
        var newIndex = this.get('focusIndex');
        if (!this.elements.tabs[newIndex]) {
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
        var tab = this.elements.tabs[this.get('focusIndex')],
            left = tab.offsetLeft,
            right = tab.offsetWidth + left;

        this.beginPropertyChanges();
        var offsetLeft = this.get('offsetLeft');
        this.set('offsetLeft', Math.max(offsetLeft, this.fixOffset(right - this.elements.canvas.clientWidth)));
        this.set('offsetLeft', Math.min(offsetLeft, this.fixOffset(left)));
        this.endPropertyChanges();
    },

    attachRipple: function(element) {

        if (!this.elements) {

            return;
        }

        var options = {
            colorElement: Ember.$(this.elements.inkBar)
        };

        this.get('rippleService').attachTabBehavior(element, options);
    },

    shouldStretchTabs: function() {
        switch (this.get('md-stretch-tabs')) {
            case 'always':
                return true;
            case 'never':
                return false;
            default:
                return !this.get('shouldPaginate') && this.get('mediaQueries.isSm')
        }
    }.property('mediaQueries.isSm', 'shouldPaginate'),

    calculatePagination: function() {
        if (!this.elements || !this.elements.tabs || this.elements.tabs.length <= 1) {
            if (!this.elements) {
                console.log('skipping because elements not set');
                return false;
            }
            if (this.elements.tabs) {
                console.log("skipping pagination calculation: this.elements.tabs.length: ", this.elements.tabs);
            }

            //debugger;

            return false;
        }
        var canvasWidth = this.$().prop('clientWidth');
        Ember.EnumerableUtils.forEach(this.elements.tabs, function(tab) {
            canvasWidth -= tab.offsetWidth;
        });
        console.log('canvasWidth', canvasWidth);


        var shouldPaginate = canvasWidth <= 0;

        //console.log('setting paginate ', shouldPaginate);

        this.set('shouldPaginate', shouldPaginate);
        //console.log('should paginate: ', this.get('shouldPaginate'));
    }.observes('tabs.[]'),

    shouldPaginate: function() {
        return false;
    }.property(''),

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

        if (typeof tabData.tabContent !== 'string') {
            self.set('hasContent', false);
        }

        if (Ember.isPresent(index)) {
            var position;
            if (index > this.get('tabs.length')) {
                position = 0;
            } else {
                position = index;
            }

            this.get('tabs').insertAt(position, tab);
        } else {
            this.get('tabs').addObject(tab);
        }

        Ember.run.schedule('afterRender', this, function() {
            if (!this.elements) {
                console.log('somebody added a tab time to update styles but no elements setup so we just ignore');
            } else {
                this.updateInkBarStyles();
            }


        });

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
        var lastTab = this.elements.tabs[this.elements.tabs.length - 1],
            totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;

        value = Math.max(0, value);
        value = Math.min(totalWidth - this.elements.canvas.clientWidth, value);
        return value;
    },



    canPageBack: function() {
        return this.get('offsetLeft') > 0;
    }.property('offsetLeft'),

    canPageForward: function() {

        if (!this.elements.tabs) {
            return false;
        }

        var lastTab = this.elements.tabs[this.elements.tabs.length - 1];
        return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > this.elements.canvas.clientWidth + this.get('offsetLeft');
    }.property('offsetLeft'),

    refreshIndex: function() {
        this.set('selectedIndex', this.getNearestSafeIndex(this.get('selectedIndex')));
        this.set('focusIndex', this.getNearestSafeIndex(this.get('focusIndex')));
    },

    handleSelectedIndexChange: function() {
        this.set('selectedIndex', this.getNearestSafeIndex(this.get('selectedIndex')));
        console.log('selected index changed, so im gonna update ink bar styles');
        this.updateInkBarStyles();
        this.set('lastSelectedIndex', this.get('selectedIndex'));
    }.observes('selectedIndex'),

    updateInkBarStyles: function() {
        console.log('updating ink bar styles');
        if (!this.elements.tabs.length > 0) {
            console.log('tried to update stles but tab elements not setup yet');
            return;
        }

        var index = this.get('selectedIndex'),
            totalWidth = this.elements.wrapper.offsetWidth,
            tab = this.elements.tabs[index],
            left = tab.offsetLeft,
            right = totalWidth - left - tab.offsetWidth;

        this.updateInkBarClassName();
        Ember.$(this.elements.inkBar).css({left: left + 'px', right: right + 'px'});
    },

    updateInkBarClassName: function() {
        var newIndex = this.get('selectedIndex'),
            oldIndex = this.get('lastSelectedIndex'),
            ink = Ember.$(this.elements.inkBar);

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
            if (tab && (tab.disabled !== true)) {
                return tab.getIndex();
            }

            tab = this.get('tabs').objectAt(newIndex - 1);
            if (tab && (tab.disabled !== true)) {
                return tab.getIndex();
            }
        }
        return newIndex;
    },

    actions: {
        nextPage: function() {
            console.log('next page');
            var viewportWidth = this.elements.canvas.clientWidth,
                totalWidth = viewportWidth + this.get('offsetLeft'),
                i, tab;

            for (i = 0; i < this.elements.tabs.length; i++) {
                tab = this.elements.tabs[i];
                if (tab.offsetLeft + tab.offsetWidth > totalWidth) {
                    break;
                }
            }
            this.set('offsetLeft', this.fixOffset(tab.offsetLeft));
        },

        previousPage: function() {
            var i, tab;
            for (i = 0; i < this.elements.tabs.length; i++) {
                tab = this.elements.tabs[i];
                if (tab.offsetLeft + tab.offsetWidth >= this.get('offsetLeft')) {
                    break;
                }
            }
            this.set('offsetLeft', this.fixOffset(tab.offsetLeft + tab.offsetWidth - this.elements.canvas.clientWidth));
        },
    }


});

export default MdTabs;
