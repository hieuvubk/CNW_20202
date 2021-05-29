import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { editProfileStyle } from './edit-profile-style';
import { commonStyles } from '../../shared/styles/common-styles';

import '../../components/layouts/Header/Header';
import '../../components/layouts/footer/SmallFooter';
import '../../components/my-profile-info/PersonalInfo';
import '../../components/my-profile-info/ChangePass';
import '../../components/Modal/UploadAvatar/UploadBackground';
import '../../components/Button/Button';
import '../../components/my-profile-info/WorkExperience';
import '../../components/my-profile-info/Education';
import '../../components/my-profile-info/Certification';
import '../../components/my-profile-info/Skill';

class EditProfile extends MaleficComponent {
    static get properties() {
        return {
            tabShow: {type: Int16Array},
            showModal: {type: Boolean},
        };
    }

    static get styles() {
        return [editProfileStyle];
    }

    constructor() {
        super();
        window.addEventListener('beforeunload', () => {
            window.scrollTo(0, 0);
        });
        this.tabShow = 0;
        this.showModal = false;
    }

    showTab(panelIndex) {
        this.tabShow = panelIndex;
    }

    handleToggleModal() {
        this.showModal = !this.showModal;
    }
    
    closeModal() {
        this.showModal = false;
    }

    render() {
        return html`
            ${commonStyles}
            <app-header></app-header>
            <section class="container">
                <div class="row">
                    <div class="col span-1-of-5 sidemenu">
                        <nav>
                            <a class="tab" @click="${() => this.showTab(0)}" id="${this.tabShow == 0 ? 'tab-active' : ''}">
                                <i class="fas fa-user"></i>
                                <span class="setting-title">Personal Info</span>
                            </a>
                            <a @click="${() => this.showTab(1)}" class="tab" id="${this.tabShow == 1 ? 'tab-active' : ''}">
                                <i class="fas fa-briefcase"></i>
                                <span class="setting-title">Work Experience</span>
                            </a>
                            <a @click="${() => this.showTab(2)}" class="tab" id="${this.tabShow == 2 ? 'tab-active' : ''}">
                                <i class="fas fa-graduation-cap"></i>
                                <span class="setting-title">Education</span>
                            </a>
                            <a @click="${() => this.showTab(3)}" class="tab" id="${this.tabShow == 3 ? 'tab-active' : ''}">
                                <i class="fas fa-certificate"></i>
                                <span class="setting-title">Certification</span>
                            </a>
                            <a @click="${() => this.showTab(4)}" class="tab" id="${this.tabShow == 4 ? 'tab-active' : ''}">
                                <i class="fas fa-american-sign-language-interpreting"></i>
                                <span class="setting-title">Skill</span>
                            </a>
                        </nav>
                    </div>

                    <div class="col span-4-of-5 account-info">
                        <div class="profile tab-show" id="${this.tabShow == 0 ? 'tab-show-active' : ''}">
                            <personal-info></personal-info>
                        </div>
        
                        <div class="profile tab-show" id="${this.tabShow == 1 ? 'tab-show-active' : ''}">
                            <work-experience></work-experience>
                        </div>
        
                        <div class="profile tab-show" id="${this.tabShow == 2 ? 'tab-show-active' : ''}">
                            <app-education></app-education>
                        </div>
        
                        <div class="profile tab-show" id="${this.tabShow == 3 ? 'tab-show-active' : ''}">
                            <app-cert></app-cert>
                        </div>

                        <div class="profile tab-show" id="${this.tabShow == 4 ? 'tab-show-active' : ''}">
                            <app-skill></app-skill>
                        </div>
                    </div>
                </div>
            </section>
            <app-small-footer></app-small-footer>
        `;
    }
}

customElements.define('app-edit-profile', EditProfile);
