const template = (data) => {

    /**
     * Thank you mustache : P
     * @param str
     * @return {string}
     * @see https://github.com/janl/mustache.js/blob/master/mustache.js#L60
     */
    const escape = (str) => {
        var entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };

        return String(str).replace(/[&<>"'`=\/]/g, s => entityMap[s]);
    };

    return `<article class="accordion">
        ${
            data.mainTitle
                ? `<header class="accordion__header">
                        <h2 class="accordion__title">${data.mainTitle}</h2>
                    </header>`
                : ''
        }

        <div class="accordion__panels">
            ${data.panels.map((panel, i) => {
                return `<div class="panel" data-id="${i}">
                            <header class="panel__header ${panel.subtitle ? '' : ''}">
                                <section class="panel__hgroup">
                                    <h3 class="panel__title">${panel.title}</h3>
                                    <h5 class="panel__subtitle">${panel.subtitle}</h5>
                                </section>
                                <button class="panel__control"></button>
                            </header>
                            <div class="panel__content">${escape(panel.content)}</div>
                    </div>`;
            }).join()}
        </div>
    </article>`;
};

class Accordion {
    constructor(opt) {
        this.opt = opt || {};
        this.container = this.opt.container || { container: null };

        if (!this.opt.container) {
            throw new Error('Missing container option');
        }

        this.render();
    }

    render() {
        return document.querySelector(this.container)
            .insertAdjacentHTML('beforeend', template(this.opt));
    }
}

/**
 * Export Accordion component with UMD(Universal Module Definition) pattern.
 * @see https://github.com/umdjs/umd
 */
(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.returnExports = factory();
    }
}(this, function () {
    return Accordion;
}));