import Ember from 'ember';

var MdIcon = Ember.Component.extend({

    iconService: Ember.inject.service('icon'),

    tagName: 'md-icon',

    attributeBindings: ['mdFontIcon', 'md-svg-icon', 'md-svg-src', 'style'],

    classNameBindings: ['iconClass'],

    fontIcon: function() {
        return 'md-font ' + this.get('mdFontIcon');
    }.property('mdFontIcon')

});

export default MdIcon;
