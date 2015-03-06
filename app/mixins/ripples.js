import Ember from 'ember';

var RipplesMixin = Ember.Mixin.create({

    buttonService: Ember.inject.service('ripple'),

    didInsertElement: function() {
        this._super();

        var isMdButton = this.get('classNames').contains('md-button');

        if (!isMdButton || this.get('mdNoInk')) {
            return;
        }

        var $element = this.$();

        var elementHasText = $element[0].textContent.trim();

        if (!elementHasText) {
            // show ARIA warning
        }

        // we only want to insert on a tags if the md-button class name is present
        var bs = this.get('buttonService');


        bs.attachButtonBehavior($element);

    }

});

export default RipplesMixin;
