import Ember from 'ember';
import App from 'client/app';

const Promise = Ember.RSVP.Promise;
const forEach = Ember.EnumerableUtils.forEach;

const ELEMENT_NODE = 1;
const RB_ANIMATE_STATE = '$$rbAnimateState';
const RB_ANIMATE_CLASS_NAME = 'rb-animate';

const extractElementNode = (element) => {
    for (var i = 0; i < element.length; i++) {
        const elm = element[i];
        if (elm.nodeType == ELEMENT_NODE) {
            return elm;
        }
    }
};

const prepareElement = (element) => {
    return element && Ember.$(element);
};

const runAnimationPostSync = (fn) => {
    return new Promise((resolve, reject) => {
        Ember.run.schedule('render', null, fn(() => {

            resolve('test');
        }));
    });
};

const resolveElementClasses = (element, cache, runningAnimations) => {
    runningAnimations = runningAnimations || {};

    var lookup = {};
    forEach(runningAnimations, (data, selector) => {
        forEach(selector.split(' '), (s) => {
            lookup[s] = data;
        });
    });

    var hasClasses = Object.create(null);
    forEach((element.attr('class') || '').split(/\s+/), (className) => {
        hasClasses[className] = true;
    });

    var toAdd = [], toRemove = [];
    forEach((cache && cache.classes) || [], (status, className) => {
        var hasClass = hasClasses[className];
        var matchingAnimation = lookup[className] || {};

        if (status === false) {
            if (hasClass || matchingAnimation.event == 'addClass') {
                toRemove.push(className);
            }
        } else if (status === true) {
            // is the class missing or will it be removed?
            if (!hasClass || matchingAnimation.event == 'removeClass') {
                toAdd.push(className);
            }
        }
    });

    return (toAdd.length + toRemove.length) > 0 && [toAdd.join(' '), toRemove.join(' ')];
};

const lookup = (name) => {
    if (name) {
        var matches = [],
            flagMap = {},
            classes = name.substr(1).split('.');
    }


};

var AnimationService = Ember.Service.extend({

    sniffer: Ember.injector.service('sniffer'),

    rootElement: function() {
        return this.container.lookup('application:main').get('rootElement');
    }.property(),

    lookup: function(name) {
        if (name) {
            var matches = [],
                flagMap = {},
                classes = name.substr(1).split('.');

        }


    },

    animate: function() {
        var p = runAnimationPostSync((done) => {

            console.log('step 1');

            return done;

        })
            .then(() => {
                console.log('step 2');
            });
    },



    hasTransitions: function() {
        return hasTransitions();
    }
});

export default AnimationService;
