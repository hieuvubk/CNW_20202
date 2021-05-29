import MaleficComponent from '../../../core/components/MaleficComponent';
import { html } from '../../../core/components/malefic-html';
import { companyMenuStyle } from './company-menu-style';
import { commonStyles } from '../../../shared/styles/common-styles';

class CompanyMenu extends MaleficComponent {
    static get properties() {
        return {
            firstName: {type: String},
            lastName: {type: String},
            title: {type: String},
            avtImg: {type: String},
            id: {type: String}
        };
    }
    
    static get styles() {
        return [companyMenuStyle];
    }
    
    constructor() {
        super();
        this.firstName = '';
        this.title = '';
        this.lastName = '';
        this.avtImg = '';
        this.id = '';
    }
    
    render() {
        return html`
            ${commonStyles}
            <div class="setting-list">
                <ul>
                    <li><i class="fas fa-pager"></i><a href='create-company'>Create Company Page</a></li>
                    <li><i class="fas fa-eye"></i><a href="my-company">My Companies</a></li>
                    <li><i class="fas fa-briefcase"></i><a href="">Post A Job</a></li>
                </ul>
            </div>
        `;
    }
}

customElements.define('app-company-menu', CompanyMenu);
