import Ember from 'ember';

var MdTab = Ember.Component.extend({
    tagName: 'md-tab',

    attributeBindings: ['label', 'disabled', 'tab', 'active'],

    classNameBindings: ['isSelected:active'],

    tabs: Ember.computed.alias('tabsComponent.tabs'),

    tabsComponent: Ember.computed.alias('parentView'),

    data: null,

    setupComponent: function() {

        var tabs = this.$().parent()[0].getElementsByTagName('md-tab'),
            index = Array.prototype.indexOf.call(tabs, this.$()[0]),
            data = this.get('tabsComponent').insertTab({
                index: index,
                tabContent: this.getTemplate(),
                label: this.getLabel()
            }, index);

        this.set('data', data);
    }.on('didInsertElement'),

    setActive: function() {
        if (this.get('active')) {
            this.get('tabsComponent').select(this.get('data').getIndex());
        }
    }.observes('active'),

    updateLabel: function() {
        this.set('data.label', this.get('label'));
        this.get('tabsComponent').updateInkBarStyles();
    }.observes('label'),

    getLabel: function() {

        // if label provided, then send label
        if (this.get('label')) {
            return this.get('label');
        }

        // otherwise, we have to search for the md-tab-label element
        var label = this.$().find('md-tab-label');
        if (label) {
            return label.html();
        }

        // otherwise we have no label
        return 'Missing Label';
    },

    getTemplate: function() {
        var content = this.$().find('md-tab-template');
        return content.length ? content.html() : this.get('label') ? this.$().html() : null;
    }


});

export default MdTab;
