import AbstractComponent from '../../components/AbstractComponent';
import { importCss } from '../../shared/utils/css-utils';

export default class Profile extends AbstractComponent {
    constructor() {
        super();
        importCss([
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            'content/css/style_profile.css'
        ]);
        this.render('profile.html').then(page => {
            this.innerHTML = page;
        });
    }
    
    connectedCallback() {
        window.onload = () => {
            let openContactInfo = document.getElementById('contact-info');
            let closeContactInfo = document.getElementById('contact-info-close');
            let overlay = document.getElementById('overlay');
            let contactInfoDiv = document.getElementById('contact-info-div');
            let body = Array.from(document.getElementsByTagName('body'));
    
            openContactInfo.addEventListener('click', () => {
                contactInfoDiv.style.display = 'block';
                body.forEach(ele => {
                    ele.style.overflow = 'hidden';
                });
                overlay.style.display = 'block';
            });
    
            closeContactInfo.addEventListener('click', () => {
                contactInfoDiv.style.display = 'none';
                Array.prototype.forEach.call(body, ele => {
                    ele.style.overflow = 'auto';
                });
                overlay.style.display = 'none';
            });
        };
    }
}

window.customElements.define('app-profile', Profile);
