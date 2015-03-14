import Ember from 'ember';

const START_EVENTS = ['mouseDown', 'touchStart', 'pointerDown'];

const MOVE_EVENTS = 'mousemove touchmove pointermove';
const END_EVENTS = 'mouseup mouseleave touchend touchcancel pointerup pointercancel';
const KEY_CODE = {
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40,
    TAB: 9
};

var SnifferService = Ember.inject.service('sniffer');

var webkit = /webkit/i.test(Ember.get('SnifferService.vendorPrefix'));
function vendorProperty(name) {
    return webkit ? ('webkit' + name.charAt(0).toUpperCase() + name.substring(1)) : name;
}

const CSS = {
    /* Constants */
    TRANSITIONEND: 'transitionend' + (webkit ? ' webkitTransitionEnd' : ''),
    ANIMATIONEND: 'animationend' + (webkit ? ' webkitAnimationEnd' : ''),

    TRANSFORM: vendorProperty('transform'),
    TRANSFORM_ORIGIN: vendorProperty('transformOrigin'),
    TRANSITION: vendorProperty('transition'),
    TRANSITION_DURATION: vendorProperty('transitionDuration'),
    ANIMATION_PLAY_STATE: vendorProperty('animationPlayState'),
    ANIMATION_DURATION: vendorProperty('animationDuration'),
    ANIMATION_NAME: vendorProperty('animationName'),
    ANIMATION_TIMING: vendorProperty('animationTimingFunction'),
    ANIMATION_DIRECTION: vendorProperty('animationDirection')
};

const MEDIA = {
    'sm': '(max-width: 600px)',
    'gt-sm': '(min-width: 600px)',
    'md': '(min-width: 600px) and (max-width: 960px)',
    'gt-md': '(min-width: 960px)',
    'lg': '(min-width: 960px) and (max-width: 1200px)',
    'gt-lg': '(min-width: 1200px)'
};

export {
    START_EVENTS,
    MOVE_EVENTS,
    END_EVENTS,
    KEY_CODE,
    MEDIA,
    CSS
};
