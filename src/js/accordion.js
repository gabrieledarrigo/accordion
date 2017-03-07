/**
 * A very basic template.
 * @param data
 * @returns {string}
 */
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

        ${data.panels.map((panel, i) => {
            return `<div class="panel" data-id="${i}">
                        <header class="panel__header ${panel.subtitle ? 'panel__header--large' : 'panel__header--small'}">
                            <section class="panel__hgroup">
                                <h3 class="panel__title">${panel.title}</h3>
                                <h5 class="panel__subtitle">${panel.subtitle}</h5>
                            </section>
                            <button class="panel__control"></button>
                        </header>
                        <div class="panel__content">
                            <p>${escape(panel.content)}</p>
                        </div>
                </div>`;
        }).join('')}
    </article>`;
};

/**
 * A vanilla Javascript accordion component
 * @author Gabriele D'Arrigo - darrigo.g@gmail.com
 */
class Accordion {

    /**
     * Initialize the accordion with injected options
     * @param opt
     * @throw Error
     */
    constructor(opt) {
        this.opt = opt || {};
        this.container = this.opt.container || { container: null };

        if (!this.opt.container) {
            throw new Error('Missing container option');
        }

        if (document.querySelectorAll(this.container).length === 0) {
            throw new Error('Container element cannot be found');
        }

        this.el = document.querySelector(this.container);
        this.init();
    }

    /**
     * Open / close the accordion
     * @param e
     */
    toggle(e) {
        const header = e.target.closest('.panel__header');

        if (header === null) {
            return;
        }

        header.parentNode.classList.toggle('is-open');
    }

    /**
     * Attach a single event listener
     * to check if a user want to open / close the accordion
     */
    addEventListeners() {
        this.el.addEventListener('click', this.toggle);
    }

    /**
     * Render the template with the data
     */
    render() {
        return this.el.insertAdjacentHTML('beforeend', template(this.opt));
    }

    /**
     * Init the component
     */
    init() {
        this.render();
        this.addEventListeners();
    }
}

/**
 * Export accordion with UMD(Universal Module Definition) pattern.
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