import Ember from 'ember';
import { raw } from 'ic-ajax';

var config = {
    defaultIconSize: 24
};


var urlRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i;

function Icon(el, config) {
    if (el.tagName != 'svg') {
        el = Ember.$('<svg xmlns="http://www.w3.org/2000/svg">').append(el)[0];
    }

    el = $(el);

    // inject the namespace if not available...
    if (!el.attr('xmlns')) {
        el.attr('xmlns', "http://www.w3.org/2000/svg");
    }

    this.element = el;
    this.config = config;
    this.prepare();
}

Icon.prototype = {
    clone: cloneSVG,
    prepare: prepareAndStyle
};

/**
 * Clone the Icon DOM element; which is stored as an angular.element()
 */
function cloneSVG(){
    return Ember.$( this.element[0].cloneNode(true) );
}

/**
 * Prepare the DOM element that will be cached in the
 * loaded iconCache store.
 */
function prepareAndStyle() {
    var iconSize = this.config ? this.config.iconSize : config.defaultIconSize;
    var svg = this.element;

        svg.attr({
            'fit' : '',
            'height': '100%',
            'width' : '100%',
            'preserveAspectRatio' : 'xMidYMid meet',
            'viewBox' : svg.attr('viewBox') || ('0 0 ' + iconSize + ' ' + iconSize)
        })
        .css({
                'pointer-events' : 'none',
                'display' : 'block'
            });

    this.element = svg;
}


var IconService = Ember.Service.extend({

    iconCache: {},
    templateCache: {},

    preloadIcons: function() {

        var svgRegistry = [
            {
                id : 'tabs-arrow',
                url: 'tabs-arrow.svg',
                svg: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24"><g id="tabs-arrow"><polygon points="15.4,7.4 14,6 8,12 14,18 15.4,16.6 10.8,12 "/></g></svg>'
            },
            {
                id : 'close',
                url: 'close.svg',
                svg: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24"><g id="close"><path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"/></g></svg>'
            },
            {
                id:  'cancel',
                url: 'cancel.svg',
                svg: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24"><g id="cancel"><path d="M12 2c-5.53 0-10 4.47-10 10s4.47 10 10 10 10-4.47 10-10-4.47-10-10-10zm5 13.59l-1.41 1.41-3.59-3.59-3.59 3.59-1.41-1.41 3.59-3.59-3.59-3.59 1.41-1.41 3.59 3.59 3.59-3.59 1.41 1.41-3.59 3.59 3.59 3.59z"/></g></svg>'
            }
        ];

        svgRegistry.forEach((asset) => {
            config[asset.id] = {
                url: asset.url,
                iconSize: config.defaultIconSize
            };

            this.templateCache[asset.url] = asset.svg;
        });


    },

    init: function() {
        this._super();
        this.preloadIcons();
    },

    getIcon: function(id) {
        id = id || '';


        // if already loaded and cached, use a clone of the cached icon.
        if (this.get('iconCache')[id]) {
            return Ember.RSVP.Promise.resolve(this.get('iconCache')[id].clone());
        }

        if (urlRegex.test(id)) {
            return this.loadByURL(id)
                .then(this.cacheIcon(id));
        }
    },

    loadByURL: function(url) {

        // first check templateCache

        var req;

        if (this.templateCache[url]) {
            req = Ember.RSVP.Promise.resolve(this.templateCache[url]);
        } else {
            req = raw(url, { dataType: 'text'});
        }

        return req
            .then(function(response) {
                var els = Ember.$(response.jqXHR.responseText);

                for(var i = 0; i < els.length; ++i) {
                    if (els[i].nodeName === 'svg') {
                        return els[i];
                    }
                }
            });
    },

    isIcon: function(target) {
        return (typeof target.element !== 'undefined') && (typeof target.config !== 'undefined');
    },

    cacheIcon: function(id) {
        var self = this;
        return function updateCache(icon) {
            self.iconCache[id] = self.isIcon(icon) ? icon : new Icon(icon, config[id]);

            return self.iconCache[id].clone();
        }
    }

});

export default IconService;
