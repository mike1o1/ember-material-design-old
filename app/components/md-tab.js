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

    headerItems: Ember.computed.alias('parentView'),

    tabsContainer: Ember.computed.alias('parentView.parentView'),

    isSelected: function() {
        return this.get('position') === this.get('tabsContainer.md-selected');
    }.property('position', 'tabsContainer.md-selected'),

    click: function() {
        this.get('tabsContainer').select(this);
    }



});

export default MdTab;
