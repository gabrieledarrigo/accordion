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
        document.body.removeChild(document.querySelector('#placeholder'))
    });

    it('should throw an error if no container option is specified', () => {
        assert.throws(() => { new Accordion() }, /Missing container option/);
    });

    it('should render an accordion component', () => {
        const accordion = new Accordion(options);
        const component = document.querySelector('.accordion');

        assert.equal(component.querySelector('.accordion__title').innerHTML, options.mainTitle);
        assert.equal(component.querySelectorAll('.panel').length, options.panels.length);
    });

});