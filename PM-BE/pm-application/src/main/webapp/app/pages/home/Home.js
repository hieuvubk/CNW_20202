import AbstractComponent from '../../components/AbstractComponent';
import { importCss } from '../../utils/css-utils';

export default class Home extends AbstractComponent {
    constructor() {
        super();
        importCss(['content/css/style-intro.css']);
        this.render('home.html').then(page => {
            this.innerHTML = page;
        });
    }
    
    connectedCallback() {
        console.log('connected');
    }
}

window.customElements.define('app-home', Home);
