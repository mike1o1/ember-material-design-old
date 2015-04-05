import Ember from 'ember';

var MdItemComponent = Ember.Component.extend({
    tagName: 'md-item',
    classNameBindings: ['hasProxiedElement::md-no-style'],
    hasProxiedElement: false,

    setupComponent: function() {

        var proxiedTypes = ['md-checkbox', 'md-switch'],
            secondaryItem = this.$()[0].querySelector('.md-selector'),
            proxyElement;

        if (!this.action) {
            for (var i = 0, type; type=proxiedTypes[i]; ++i) {
                if (proxyElement = this.$()[0].querySelector(type)) {
                    this.set('hasProxiedElement', true);
                    break;
                }
            }

            if (this.get('hasProxiedElement')) {
                this.wrapIn('div');
            }
        } else {
            this.wrapIn('button')
        }

    }.on('didInsertElement'),

    wrapIn: function(type) {
        var container;
        if (type == 'div') {
            container = Ember.$('<div class="md-no-style md-item-inner">');
            container.append(this.$().contents());
            this.$().addClass('md-proxy-focus');
        } else {
            container = Ember.$('<button tabindex="0" class="md-no-style"><div class="md-item-inner"></div></button>');

            // TODO: setup button click action
            container.children().eq(0).append(this.$().contents());
        }

        this.$()[0].setAttribute('tabindex', '-1');
        this.$().append(container);
    }
});

export default MdItemComponent;
