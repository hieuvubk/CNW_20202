import MaleficComponent from '../../core/components/MaleficComponent';

class NotAuthenticated extends MaleficComponent {
    connectedCallback() {
        super.connectedCallback();
        location.href = 'https://www.google.com';
    }
}

customElements.define('app-not-authenticated', NotAuthenticated);
