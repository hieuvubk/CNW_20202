import MaleficComponent from '../../../core/components/MaleficComponent';
import { html } from '../../../core/components/malefic-html';
import { commonStyles } from '../../../shared/styles/common-styles';
import { CompanyCardStyle } from './companyCard-style';


class CompanyCard extends MaleficComponent {
    static get properties() {
        return {
            image: {type:String},
            Name: {type: String},
            location: {type: String},
            follower: {type: String}
        };
    }
    
    static get styles() {
        return [CompanyCardStyle];
    }
    
    constructor() {
        super();
    }
    
    render() {
        return html`
            ${commonStyles}
  
            <div class="company__card">
            <div class="company__card__logo">
                <img src=${this.image} height="40px" width="40px">
            </div>

            <div class="company__card__info">
                <h3>${this.Name}</h3>
                <p>${this.location}</p>
                <p>${this.follower}</p>
            </div>
        </div>
        `;
    }
}

customElements.define('app-company-card', CompanyCard);
