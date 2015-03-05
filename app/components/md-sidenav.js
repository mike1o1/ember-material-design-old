import Ember from 'ember';

var RbSidenav = Ember.Component.extend({
    tagName: 'md-sidenav',

    mediaQueries: Ember.inject.service('media-queries'),

    classNames: ['md-closed'],
    classNameBindings: ['mediaQueries.isGtSm:md-locked-open'],

    setupMediaQuery: function() {
        this.get('mediaQueries').match('gt-sm', '(min-width: 600px)');
    }.on('didInsertElement'),

    backdrop: function() {
        return $('<rb-backdrop class="md-sidenav-backdrop md-opaque">');
    }.property(),

    isLocked: function() {
        // how to animate?
        if (this.get('mediaQueries.isGtSm')) {
            this.$().addClass('md-locked-open');
        } else {
            this.$().removeClass('md-locked-open');
        }

    }.observes('mediaQueries.isGtSm'),

    toggleSidebar: function() {

        var sidebarVisible = this.get('sidebarVisible');

        var backdrop = this.get('backdrop');

        var closeBackdrop = (ev) => {
            ev.preventDefault();
            ev.stopPropagation();

            this.set('sidebarVisible', false);
        };

        backdrop[sidebarVisible ? 'on' : 'off']('click', closeBackdrop);

        if (sidebarVisible) {
            this.$().removeClass('md-closed');
            this.get('parentView').$().prepend(backdrop);
            backdrop.addClass('ng-enter');
            backdrop.removeClass('ng-leave');
        } else {
            this.$().addClass('md-closed');
            backdrop.removeClass('ng-enter');
            backdrop.addClass('ng-leave');

            console.log('backdrop delay', backdrop.css.transitionDelay);

            Ember.run.later(() => {
                backdrop.remove();
            }, .2 * 1000);
            //backdrop.remove();
        }
    }.observes('sidebarVisible')


});

export default RbSidenav;
