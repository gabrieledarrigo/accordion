const jsdom = require('jsdom');
const document = jsdom.jsdom('<!doctype html><html><body></body></html>');
const window = document.defaultView;

global.document = document;
global.window = window;

if (window.Element && !window.Element.prototype.closest) {
    window.Element.prototype.closest = function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {}
        } while ((i < 0) && (el = el.parentElement));

        return el;
    };
}

for (let key in window) {
    if (!window.hasOwnProperty(key)) {
        continue;
    }

    if (key in global) {
        continue;
    }

    global[key] = window[key]
}

