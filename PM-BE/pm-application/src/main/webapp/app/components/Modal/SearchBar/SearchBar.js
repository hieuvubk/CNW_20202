import MaleficComponent from '../../../core/components/MaleficComponent';
import { html } from '../../../core/components/malefic-html';
import { searchbarStyle } from './searchbar-style';

import '../Modal';
import { commonStyles } from '../../../shared/styles/common-styles';

class SearchBar extends MaleficComponent {
    static get properties() {
        return {
            show: {type: Boolean}
        };
    }
    
    static get styles() {
        return [searchbarStyle];
    }
    
    handleCloseModal() {
        this.show = false;
        const event = new CustomEvent('close-modal', {
            detail: {},
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    search() {
        const keyWords = this.shadowRoot.querySelector("search-input")
        keyWords.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                location.replace("http://localhost:9002/general-search/" + keyWords.innerHTML)
            }
        });
    }

    connectedCallback() {
        super.connectedCallback();
        this.search();
    }


    render() {
        return html`
            ${commonStyles}
            
            <app-modal .show="${this.show}">
                <div class="modal-header">
                    <form name="search">
                        <button class="close-button" @click="${this.handleCloseModal}"><i class="fas fa-long-arrow-alt-left"></i></button>
                        <input class="search-input" type="text" placeholder="Search">
                        <i class="fas fa-search"></i>
                    </form>
                </div>
            </app-modal>
        `;
    }
}

customElements.define('app-searchbar', SearchBar);
