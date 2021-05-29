import MaleficComponent from '../../../core/components/MaleficComponent';
import { html } from '../../../core/components/malefic-html';
import { profileMenuStyle } from './profile-menu-style';
import { commonStyles } from '../../../shared/styles/common-styles';

class ProfileMenu extends MaleficComponent {
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
        return [profileMenuStyle];
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

            <div class="profile">
                <img src="${this.avtImg}" alt="Avatar">
                <h3>${this.firstName} ${this.lastName}<br> <span>${this.title}</span></h3>
            </div>
            <div class="setting-list">
                <ul>
                    <li ><i class="fas fa-user-circle"></i><a href='profile/${this.id}'>View Profile</a></li>
                    <li><i class="fas fa-edit"></i><a href="edit-profile">Edit Profile</a></li>
                    <li><i class="fas fa-users-cog"></i><a href="account">Account Settings</a></li>
                    <li><i class="fas fa-building"></i><a href="account">My Company</a></li>
                    <li><i class="fas fa-sign-out-alt"></i><a href="#">Sign Out</a></li>
                </ul>
            </div>
        `;
    }
}

customElements.define('app-profile-menu', ProfileMenu);
