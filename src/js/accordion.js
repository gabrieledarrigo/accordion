const template = (data) => {
    const header = (mainTitle) => {
        return mainTitle
            ? `<header class="accordion__header">
                   <h2 class="accordion__title">${data.mainTitle}</h2>
               </header>`
            : '';
    };

    return `<article class="accordion">
        ${header(data.mainTitle)}

        <div class="accordion__panels">
            ${data.panels.map((panel) => {
                return `<div class="panel">
                        <header class="panel__header">
                            <section class="panel__hgroup">
                                <h3 class="panel__title">${panel.title}</h3>
                                <h5 class="panel__description">${panel.subtitle}</h5>
                            </section>
                            <button class="panel__control">${panel.content}</button>
                        </header>

                        <div class="panel__content"></div>
                    </div>`;
            }).join()}
        </div>
    </article>`;
};

class Accordion {
    constructor(opt) {
        this.opt = opt || {};
        this.container = this.opt.container;

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