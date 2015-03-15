import Ember from 'ember';

var MdIcon = Ember.Component.extend({

    iconService: Ember.inject.service('icon'),

    tagName: 'md-icon',

    attributeBindings: ['mdFontIcon', 'md-svg-icon', 'md-svg-src', 'style'],

    iconName: function() {
        return this.get('md-svg-icon') || this.get('md-svg-src') || '';
    }.property('md-svg-icon', 'md-svg-src'),

    classNameBindings: ['iconClass'],

    fontIcon: function() {
        return 'md-font ' + this.get('mdFontIcon');
    }.property('mdFontIcon'),

    loadIcon: function() {
        var iconName = this.get('iconName'),
            element = this.$();

        element.empty();
        if (iconName) {
            var is = this.get('iconService');
            is.getIcon(iconName)
                .then(function(svg) {
                    debugger;
                    element.append(svg);
                });
        }
    }.observes('iconName'),

    setupIcon: function() {

        if (!this.get('mdFontIcon')) {
            this.loadIcon();
        }



    }.on('didInsertElement')

});

export default MdIcon;
