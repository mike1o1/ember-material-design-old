import Ember from 'ember';

export default Ember.Controller.extend({

    toastsService: Ember.inject.service('toasts'),

    toastPositions: function() {
        return [{
            position: 'bottom',
            enabled: false
        }, {
            position: 'top',
            enabled: true
        }, {
            position: 'left',
            enabled: false
        }, {
            position: 'right',
            enabled: true
        }];
    }.property(),

    getToastPosition: function() {

        return this.get('toastPositions')
            .map((pos) => {
                if (pos.enabled) {
                    return pos.position;
                }
            })
            .join(' ');

    }.property('toastPositions.@each.enabled'),

    actions: {
        showCustomToast: function() {
            this.get('toastService').show({
                hideDelay: 6000,
                position: this.get('getToastPosition')
            });
        },

        showSimpleToast: function() {
            this.get('toastService').show(
                this.get('toastService').simple()
                    .content('Simple Toast!')
                    .position(this.get('getToastPosition'))
                    .hideDelay(3000)
            );
        },

        showActionToast: function() {
            var toast = this.get('toastService').simple()
                .content('Action Toast!')
                .action('OK')
                .highlightAction(false)
                .position(this.get('getToastPosition'));

            this.get('toastService').show(toast)
                .then(function() {
                    alert('You clicked \'OK\'.');
                });
        }
    }

});
