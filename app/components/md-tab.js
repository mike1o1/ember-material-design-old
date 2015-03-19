import Ember from 'ember';

var MdTab = Ember.Component.extend({
    tagName: 'md-tab',

    attributeBindings: ['label', 'disabled'],

    setupLabel: function() {

        var tabLabel = this.$().find('md-tab-label');

        if (tabLabel.length) {
            tabLabel.remove();
        } else if (this.get('label')) {
            tabLabel = Ember.$('<md-tab-label>').html(this.get('label'));
        } else {
            // if nothing is found, use the tabs content as the label
            tabLabel = Ember.$('<md-tab-panel>')
                            .append(this.$().contents().remove());

        }

        this.$().append(tabLabel);



    }.on('didInsertElement')


});

export default MdTab;
