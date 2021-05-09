import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { modalStyle } from './modal-style';

class Modal extends MaleficComponent {
    static get properties() {
        return {
            show: {type: Boolean}
        };
    }
    
    static get styles() {
        return [modalStyle];
    }
    
    render() {
        return html`
            <div id="modal" class="modal ${this.show ? 'active' : ''}">
                <div class="modal-header">
                    <slot></slot>
                </div>
            </div>
            <div id="overlay" class="${this.show ? 'active' : ''}"></div>
        `;
    }
}

customElements.define('app-modal', Modal);
