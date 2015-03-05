import Ember from 'ember';

var RipplesMixin = Ember.Mixin.create({

    buttonService: Ember.inject.service('ripple'),

    didInsertElement: function() {
        this._super();

        var $element = this.$();

        var elementHasText = $element[0].textContent.trim();

        if (!elementHasText) {
            // show ARIA warning
        }

        var bs = this.get('buttonService');

        if (!this.get('mdNoInk')) {
            bs.attachButtonBehavior($element);
        }


    }

});

export default RipplesMixin;
