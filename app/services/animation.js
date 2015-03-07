import Ember from 'ember';

const Promise = Ember.RSVP.Promise;
const forEach = Ember.EnumerableUtils.forEach;

const ELEMENT_NODE = 1;
const RB_ANIMATE_STATE = '$$rbAnimateState';
const RB_ANIMATE_CLASS_NAME = 'rb-animate';

var rootAnimateState = {running: false};

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

    sniffer: Ember.inject.service('sniffer'),

    rootElement: function() {
        return this.container.lookup('application:main').get('rootElement');
    }.property(),

    extractElementNode: function(element) {
        for (var i = 0; i < element.length; i++) {
            const elm = element[i];
            if (elm.nodeType == ELEMENT_NODE) {
                return elm;
            }
        }
    },

    prepareElement: function(element) {
        return element && Ember.$(element);
    },

    stripCommentsFromElement: function(element) {
        return Ember.$(this.extractElementNode(element));
    },

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

    cleanup: function(element, className) {
        if (this.isMatchingElement(element, this.rootElement())) {
            if (!rootAnimateState.disabled) {
                rootAnimateState.running = false;
                rootAnimateState.structural = false;
            }
        } else if (className) {
            var data = element.data(RB_ANIMATE_STATE) || {};

            var removeAnimations = className === true;
            if (!removeAnimations && data.active && data.active[className]) {
                data.totalActive--;
            }
        }
    },

    enabled: function(value, element) {
        switch (arguments.length) {
            case 2:
                if (value) {
                    cleanup(element);
                } else {
                    var data = element.data(RB_ANIMATE_STATE) || {};
                    data.disabled = true;
                    element.data(RB_ANIMATE_STATE, data);
                }
                break;
            case 1:
                rootAnimateState.disabled = !value;
                break;

            default:
                value = !rootAnimateState.disabled;
                break;

        }

        return !!value;
    },

    hasTransitions: function() {
        return hasTransitions();
    }
});

export default AnimationService;
