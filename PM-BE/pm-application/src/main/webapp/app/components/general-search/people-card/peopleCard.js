import MaleficComponent from '../../../core/components/MaleficComponent';
import { html } from '../../../core/components/malefic-html';
import { commonStyles } from '../../../shared/styles/common-styles';
import { PeopleCardStyle } from './peopleCard-style';


class PeopleCard extends MaleficComponent {
    static get properties() {
        return {
            id: {type: Int16Array},
            image: {type:String},
            Name:  {type:String},
            email:  {type:String},
            job:  {type:String}
        };
    }
    
    static get styles() {
        return [PeopleCardStyle];
    }
    
    constructor() {
        super();
    }
    
    render() {
        return html`
            ${commonStyles}
  
            <div class="people__card">
                <div class="people__card__avatar">
                    <img src=${this.image} height="40px" width="40px">
                </div>

                <div class="people__card__info">
                    <h3>${this.Name}</h3>
                    <p>${this.email}</p>
                </div>

            </div>
        `;
    }
}

customElements.define('app-people-card', PeopleCard);
