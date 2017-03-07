const assert = require('assert');
const Accordion = require('../src/js/accordion.js');

const options = {
    container: '#placeholder',
    mainTitle: 'Main title',
    panels: [
        {
            title: 'A title',
            subtitle: 'A subtitle',
            content: '<p>Lorem Ipsum</p>'
        },
        {
            title: 'A second title',
            subtitle: 'dolor sit amet',
            content: '<p>Lorem Ipsum</p>'
        }
    ]
};

describe('Accordion', () => {
    beforeEach(() => {
        const placeholder = document.createElement('div');
        placeholder.setAttribute('id', 'placeholder');
        document.body.appendChild(placeholder);
    });

    afterEach(() => {
        document.body.removeChild(document.querySelector('#placeholder'));
    });

    it('should throw an error if no container option is specified', () => {
        assert.throws(() => { new Accordion() }, /Missing container option/);
    });

    it('should render an accordion component', () => {
        new Accordion(options);
        const component = document.querySelector('.accordion');

        assert.equal(component.querySelector('.accordion__title').innerHTML, options.mainTitle);
        assert.equal(component.querySelectorAll('.panel').length, options.panels.length);

        [].slice.call(component.querySelectorAll('.panel')).forEach(panel => {
            const id = panel.getAttribute('data-id');

            assert.equal(panel.querySelector('.panel__title').textContent, options.panels[id].title);
            assert.equal(panel.querySelector('.panel__subtitle').textContent, options.panels[id].subtitle);
        });
    });

    it('should not render the accordion header if the main title is not present', () => {
        new Accordion({
            container: '#placeholder',
            panels: []
        });

        assert.equal(document.querySelector('.accordion__header'), null);
    });

    it('should escape the panel content', () => {
        new Accordion({
            container: '#placeholder',
            panels: [{
                title: 'A second title',
                subtitle: 'dolor sit amet',
                content: '<p>Lorem Ipsum</p>'
            }]
        });

        assert.equal(document.querySelector('.panel__content').innerHTML, '&lt;p&gt;Lorem Ipsum&lt;/p&gt;');
    });
});