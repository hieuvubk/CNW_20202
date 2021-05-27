import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { commonStyles } from '../../shared/styles/common-styles';
import { profileStyle } from './profile-style';
import { withRouter } from '../../core/router/malefic-router';

import '../../components/layouts/Header/Header';
import '../../components/Sidebar/PeopleSidebar';
import '../../components/layouts/Footer/Footer';
import '../../components/Modal/ContactInfo/ContactInfo';
import '../../api/getPublicProfile';
import getPublicProfile from '../../api/getPublicProfile';
import getPublicWorkEx from '../../api/getPublicWorkEx';
import getPublicEducation from '../../api/getPublicEducation';

class Profile extends withRouter(MaleficComponent) {
    static get properties() {
        return {
            showModal: { type: Boolean },
            profile: { type: Object },
            work: { type: Array },
            education: { type: Array },
        };
    }

    static get styles() {
        return [profileStyle];
    }

    constructor() {
        super();
        window.addEventListener('beforeunload', () => {
            window.scrollTo(0, 0);
        });
        this.profile = {};
    }

    connectedCallback() {
        super.connectedCallback();
        document.getElementsByTagName('title')[0].innerHTML = this.data.title;

        getPublicProfile(this.params.id)
            .then(res => this.profile = res)
            .catch(e => console.log(e));

        getPublicWorkEx(this.params.id)
            .then(res => this.work = res._embedded.workExperienceList)
            .catch(e => console.log(e));

        getPublicEducation(this.params.id)
            .then(res => this.education = res._embedded.educationList)
            .catch(e => console.log(e));
    }

    handleOpenContactModal() {
        this.showModal = true;
    }

    handleCloseContactModal() {
        this.showModal = false;
    }

    scrollIntoEducation(e) {
        e.preventDefault();
        this.shadowRoot.querySelector('#education').scrollIntoView({
            block: 'center'
        });
    }

    render() {
        const startDate = new Date(this.education[0].startDate);
        const endDate = new Date(this.education[0].endDate);  
        const endYear = endDate.getFullYear();
        const startYear = startDate.getFullYear();
        const endText = endYear == 1970 ? 'Now' : endYear;
        return html`
            ${commonStyles}
            <app-header></app-header>

            <main>
                <div id="main-content">
                    <div class="main-content-div" id="basic-info-div">
                        <div id="background-avatar">
                            <img src="content/images/4853433.jpg" alt="">
                            <a class="link-icon" href="#">
                                <div class="material-icons md-24">
                                    photo_camera
                                </div>
                            </a>
                        </div>
            
                        <div id="main-avatar">
                            <img src="content/images/user.svg" style="height: 100px;width: 100px;" alt="">
                            <a class="link-icon" href="#">
                                <div class="material-icons md-24">
                                    edit
                                </div>
                            </a>
                        </div>
            
                        <div id="info">
                            <div id="personal-info">
                                <h1 id="personal-name">${this.profile.user.firstName} ${this.profile.user.lastName}</h1>
                                <h3 class="light" id="personal-jobs">${this.profile.headline}</h3>
                                <h4 class="light" id="personal-address">${this.profile.address}</h4>
                                <h4 class="light" id="contact-info" @click="${this.handleOpenContactModal}">Contact info</h4>
                            </div>
                
                            <div id="workplace">
                                <a style="cursor: pointer" @click="${this.scrollIntoEducation}">
                                    <p>${this.work[0].company}</p>
                                </a>
                            </div>
                        </div>
                    </div>
        
                    <app-contact-info .show="${this.showModal}" @close-modal="${this.handleCloseContactModal}"></app-contact-info>

                    <div class="main-content-div" id="experience">
                        <h2>About</h2>
                        <p class="profile-text">${this.profile.about}</p>
                    </div>
        
                    <div class="main-content-div" id="experience">
                        <h2>Experience</h2>
                        <div class="certification">
                            <h3 class="certification__title">Certification</h3>
                            <div class="certification__list">
                
                            </div>
                        </div>
            
                        <div class="skill">
                            <h3 class="skill__title">Skill</h3>
                            <div class="skill__list">
                            </div>
                        </div>
            
                        <div class="workExperience">
                            <h3 class="workExperience__title">Work Experience</h3>
                            <div class="workExperience__list">
                
                            </div>
                        </div>
            
                        <div class="project">
                            <h3 class="project__title">Project</h3>
                            <div class="project__list">
                            </div>
                        </div>
            
                        <div class="publication">
                            <h3 class="publication__title">Publication</h3>
                            <div class="publication__div">
                            </div>
                        </div>
                    </div>
        
                    <div class="main-content-div" id="education">
                        <h2>Education</h2>
                        <div class="education">
                            <img class="education__logo" src="content/images/HUST_logo.png">
                            <div class="education__info">
                                <h3 class="education__info__name">${this.education[0].school}</h3>
                                <h4 class="education__info__degree">${this.education[0].degree}, ${this.education[0].fieldOfStudy}</h4>
                                <h4 class="education__info__degree">${this.education[0].grade}</h4>
                                <h4 class="education__info__time">${startYear} - ${endText}</h4>
                            </div>
                        </div>
                    </div>
        
                    <div class="main-content-div" id="interest">
                        <h2>Interest</h2>
                        <div class="interest">
                            <div class="interest__page">
                                <a href="#" class="interest__page__link">
                                    <img class="interest__page__logo" src="content/images/HUST_logo.png">
                        
                                    <div class="interest__page__info">
                                        <h3>Hanoi University of Science and Technology</h3>
                                    </div>
                                </a>
                
                            </div>
                        </div>
                    </div>
                </div>
    
                <app-people-sidebar></app-people-sidebar>
            </main>
            <app-footer></app-footer>
        `;
    }
}

customElements.define('app-profile', Profile);
