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

    Ember.LinkView.reopen(RipplesMixin, {});

}

export default {
    name: 'rb-link-to',
    initialize: initialize
};
