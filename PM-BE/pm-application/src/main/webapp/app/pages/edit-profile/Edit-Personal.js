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

class EditPersonal extends MaleficComponent {
    static get properties() {
        return {
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
       
        this.showModal = false;
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
                        <a href="/edit-profile/personal" id="tab-active">
                        <i class="fas fa-user"></i>
                        <span class="setting-title">Personal Info</span>
                    </a>
                    <a href="/edit-profile/experience">
                        <i class="fas fa-briefcase"></i>
                        <span class="setting-title">Work Experience</span>
                    </a>
                    <a href="/edit-profile/education"">
                        <i class="fas fa-graduation-cap"></i>
                        <span class="setting-title">Education</span>
                    </a>
                    <a href="/edit-profile/certification">
                        <i class="fas fa-certificate"></i>
                        <span class="setting-title">Certification</span>
                    </a>
                    <a href="/edit-profile/skill" >
                        <i class="fas fa-american-sign-language-interpreting"></i>
                        <span class="setting-title">Skill</span>
                    </a>
                        </nav>
                    </div>

                    <div class="col span-4-of-5 account-info">
                        <div class="profile tab-show" id="tab-show-active">
                            <personal-info></personal-info>
                        </div>
                    </div>
                </div>
            </section>
            <app-small-footer></app-small-footer>
        `;
    }
}

customElements.define('app-edit-personal', EditPersonal);
