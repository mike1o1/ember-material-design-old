import Ember from 'ember';

var MdTabHeaderItems = Ember.Component.extend({
    tagName: 'section',
    classNames: ['md-header'],

    tabsContainer: Ember.computed.alias('parentView'),

    tabs: Ember.computed.alias('tabsContainer.tabs'),

    previousIndex: 0,

    inkBarClassName: function() {
        var previousIndex = this.get('previousIndex'),
            index = this.get('tabsContainer.md-selected');

        this.set('previousIndex', index);

        return previousIndex > index
            ? 'md-transition-left'
            : previousIndex < index ? 'md-transition-right'
            : 'md-no-transition';

    }.property('tabsContainer.selectedItem'),

    inkBarStyle: function() {
        var data = {
            left: 76 * this.get('tabsContainer.md-selected'),
            right: 99923 - (this.get('tabsContainer.md-selected') * 76)
        };





        var displayStyle = this.get('tabs.length') < 2 ? 'none' : 'block';

        var style = 'left: ' + data.left + 'px; right: ' + data.right + 'px; display: ' + displayStyle + ';';

        var selectedItem = this.get('tabsContainer.selectedItem');

        return style;

    }.property('tabsContainer.selectedItem')
});


export default MdTabHeaderItems;
