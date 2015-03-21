import Ember from 'ember';
import RippleMixin from '../mixins/ripples';


var MdTab = Ember.Component.extend(RippleMixin, {
    tagName: 'md-tab',

    attributeBindings: ['label', 'disabled', 'tab', 'position'],

    classNameBindings: ['isSelected:active'],

    setupRipples: function() {
        if (this.get('mdNoInk')) {
            return;
        }

        var inkBarElement = this.get('headerItems').$('md-tabs-ink-bar');

        this.get('rippleService').attachTabBehavior(this.$(), {
            colorElement: inkBarElement
        });

    }.on('didInsertElement'),

    insertToParent: function() {
        var parentContainer = this.get('tabsContainer');
        parentContainer.add(this);
    }.on('didInsertElement'),

    removeFromParent: function() {
        var parentContainer = this.get('tabsContainer');
        parentContainer.remove(this);
    }.on('willDestroyElement'),


    headerItems: Ember.computed.alias('parentView'),

    tabsContainer: Ember.computed.alias('parentView.parentView'),

    isSelected: false,

    click: function() {
        this.get('tabsContainer').select(this);
    }



});

export default MdTab;
