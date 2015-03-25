import Ember from 'ember';
import HasFlex from '../mixins/has-flex';
import HasLayout from '../mixins/has-layout';
import RipplesMixin from '../mixins/ripples';

export function initialize(/* container, application */) {

    // We want to inject the flex and layout parameters to every element
    // so we don't need to customize each view or component to add it
    Ember.View.reopen(HasFlex, HasLayout, {
        flex: null
    });

    // by default we will insert the ripples mixin to links,
    // but ripples will only apply if the class is named 'md-button'
    // and the 'md-no-ink' attribute isn't set
    Ember.LinkView.reopen(RipplesMixin, {
        didInsertElement: function() {
            this._super();

            var isMdButton = this.get('classNames').contains('md-button');
            if (!isMdButton || this.get('mdNoInk')) {
                return;
            }

            var rs = this.get('rippleService');
            rs.attachButtonBehavior(this.$());
        }
    });

}

export default {
    name: 'md-link-to',
    initialize: initialize
};
