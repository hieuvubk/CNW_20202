import AbstractComponent from '../../../pages/AbstractComponent';

export default class Footer extends AbstractComponent {
    constructor() {
        super();
        this.render('footer.html').then(page => {
            this.innerHTML = page;
        });
    }
}

window.customElements.define('app-footer', Footer);
