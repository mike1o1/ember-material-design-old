import Ember from 'ember';

var PAGINATORS_WIDTH = (8 * 4) * 2;

var MdTabHeaderItems = Ember.Component.extend({
    tagName: 'section',
    classNames: ['md-header'],

    mediaQueries: Ember.inject.service('media-queries'),

    // TODO: should move these initial declarations to an initializer
    setupMediaQuery: function() {
        this.get('mediaQueries').match('sm', '(max-width: 600px)');
    }.on('willInsertElement'),

    tabsContainer: Ember.computed.alias('parentView'),

    tabs: Ember.computed.alias('tabsContainer.tabComponents'),

    previousIndex: 0,

    pagination: function() {

        var state = {
            page: -1,
            active: false
        };

        return state;

    }.property(),

    updatePagination: function() {

        if (!this.get('tabsContainer.isCreated')) {
            console.log('skipping update');
            return;
        }

        Ember.run.throttle(this, () => {
            this.set('tabData', this.calculateTabData());
            console.log('updated');
        }, 1/60);
    }.observes('tabsContainer.selectedItem', 'tabsContainer.isCreated'),

    calculateTabData: function(noAdjust) {
        // element is probably destroyed
        if (!this.get('element')) {
            return;
        }
        console.log('calcing tab data');
        var self = this;
        var clientWidth = this.$().prop('offsetWidth');
        var tabsWidth = clientWidth - PAGINATORS_WIDTH - 1;
        var totalWidth = 0;
        var tabs = this.$()[0].getElementsByTagName('md-tab');
        var $tabs = Ember.$(tabs);
        var max = 0;
        var tabData = [];
        var pages = [];
        var currentPage;  

        $tabs.css('max-width', '');
        Ember.EnumerableUtils.forEach(tabs, function(tab, index) {
            if (index === 0) {
                console.log('offset: ' + tab.offsetWidth);
            }
            var tabWidth = Math.min(tabsWidth, tab.offsetWidth);
            var data = {
                element: tab,
                left: totalWidth,
                width: tabWidth,
                right: totalWidth + tabWidth,
                filler: 0
            };

            data.page = Math.ceil(data.right / (pages.length === 1 && index === tabs.length - 1 ? clientWidth : tabsWidth)) - 1;
            data.page = Math.ceil(data.right / (pages.length === 1 && index === tabs.length - 1 ? clientWidth : tabsWidth)) - 1;

            if (data.page >= pages.length) {
                data.filler = (tabsWidth * data.page) - data.left;
                data.right += data.filler;
                data.left += data.filler;
                currentPage = {
                    left: data.left,
                    firstTabIndex: index,
                    lastTabIndex: index,
                    tabs: [data]
                };
                pages.push(currentPage);
            } else {
                currentPage.lastTabIndex = index;
                currentPage.tabs.push(data);
            }
            totalWidth = data.right;
            max = Math.max(max, tabWidth);
            tabData.push(data);
        });

        $tabs.css('max-width', tabsWidth + 'px');

        if (!noAdjust && this.shouldStretchTabs()) {
            return adjustForStretchedtabs();
        } else {
            return {
                width: totalWidth,
                max: max,
                tabs: tabData,
                pages: pages,
                tabElements: tabs
            }
        };

        function adjustForStretchedtabs() {
            var canvasWidth = pages.length === 1 ? clientWidth : tabsWidth;
            var tabsPerPage = Math.min(Math.floor(canvasWidth / max), tabs.length);
            var tabWidth = Math.floor(canvasWidth / tabsPerPage);
            $tabs.css('width', tabWidth + 'px');
            return self.calculateTabData(true);
        }


    },

    shouldStretchTabs: function() {
        switch (this.get('stretchTabs')) {
            case 'never':
                return false;
            case 'always':
                return true;
            default:
                return this.get('mediaQueries.isSm');
        }
    },

    inkBarClassName: function() {
        var previousIndex = this.get('previousIndex'),
            index = this.get('tabsContainer.selectedIndex');

        this.set('previousIndex', index);

        return previousIndex > index ? 'md-transition-left' : previousIndex < index ? 'md-transition-right' : 'md-no-transition';

    }.property('tabsContainer.selectedItem'),

    inkBarStyle: function() {

        if (!this.get('tabsContainer.isCreated')) {
            console.log('skip, not created yet');
            return;
        }

        if (!this.get('tabData')) {
            console.log('skipping, not setting up');
            this.set('tabData', this.calculateTabData());
        }

        console.log('setting inkbar style');

        var index = this.get('tabsContainer.selectedIndex');
        var data = this.get('tabData').tabs[index] || {
            left: 0,
            right: 0,
            width: 0
        };
        var right = this.$('.md-header-items').prop('offsetWidth') - data.right;

        var displayStyle = this.get('tabs.length') < 2 ? 'none' : 'block';

        var style = 'left: ' + data.left + 'px; right: ' + right + 'px; display: ' + displayStyle + ';';

        return style;

    }.property('tabData')
});


export default MdTabHeaderItems;