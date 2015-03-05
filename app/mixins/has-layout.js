import Ember from 'ember';

var HasLayoutMixin = Ember.Mixin.create({
    attributeBindings: ['layoutType:layout'],

    layoutType: null

});

export default HasLayoutMixin;
