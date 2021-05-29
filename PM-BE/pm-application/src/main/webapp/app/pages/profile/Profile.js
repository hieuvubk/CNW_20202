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
import '../../components/Modal/ExperienceCard/ExperienceCard';

import getPublicProfile from '../../api/getPublicProfile';
import getPublicWorkEx from '../../api/getPublicWorkEx';
import getPublicEducation from '../../api/getPublicEducation';
import '../../components/Modal/UploadAvatar/UploadBackground';
import '../../components/Modal/ExperienceCard/ExperienceCard';
import getPublicCert from '../../api/getPublicCert';
import getPublicSkill from '../../api/getPublicSkill';

class Profile extends withRouter(MaleficComponent) {
    static get properties() {
        return {
            showModal: { type: Boolean },
            profile: { type: Object },
            work: { type: Array },
            education: { type: Array },
            showCertification: {type:String},
            showSkill: {type: String},
            showWorkExperience: {type: String},
            showProject: {type:String},
            showPublication: {type: String},
            showModalAvt: { type: Boolean },
            certification: { type: Array },
            skills: { type: Array},

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
        this.showCertification = "none";
        this.showProject = "none";
        this.showPublication = "none";
        this.showSkill = "none";
        this.showWorkExperience= "none";
    }

    handleToggleCertification(){
        this.showCertification = (this.showCertification=="grid")?"none":"grid";
    }

    handleToggleSkill(){
        this.showSkill = (this.showSkill=="grid")?"none":"grid";
    }

    handleToggleWorkExperience(){
        this.showWorkExperience = (this.showWorkExperience=="grid")?"none":"grid";
    }

    handleToggleProject(){
        this.showProject = (this.showProject=="grid")?"none":"grid";

        this.showModalAvt = false;
        this.showModal = false;
        this.education = [];
        this.profile = {};
        this.work = [];
        this.certification = [];
        this.skills = [];

    }

    handleTogglePublication(){
        this.showPublication = (this.showPublication=="grid")?"none":"grid";
    }

    /*connectedCallback() {
        super.connectedCallback();
        document.getElementsByTagName('title')[0].innerHTML = this.data.title;

        getPublicProfile(this.params.id)
            .then(res => {
                this.profile = res;
            })
            .catch(e => console.log(e));

        getPublicWorkEx(this.params.id)
            .then(res => this.work = res._embedded.workExperienceList)
            .catch(e => console.log(e));

        getPublicEducation(this.params.id)
            .then(res => {
                this.education = res._embedded.educationList;
            })
            .catch(e => console.log(e));

        getPublicCert(this.params.id)
        .then(res => {
            this.certification = res._embedded.certificationList;
        })
        .catch(e => console.log(e));

        getPublicSkill(this.params.id)
        .then(res => {
            this.skills = res._embedded.skillList;
        })
        .catch(e => console.log(e));
    }

    handleOpenContactModal() {
        this.showModal = true;
    }

    handleCloseContactModal() {
        this.showModal = false;
    }

    handleToggleModal() {
        this.showModalAvt = !this.showModal;
    }

    closeModal() {
        this.showModalAvt = false;
    }

    scrollIntoEducation(e) {
        e.preventDefault();
        this.shadowRoot.querySelector('#education').scrollIntoView({
            block: 'center'
        });
    }

*/

       /* const startDate = new Date(this.education[0].startDate);
        const endDate = new Date(this.education[0].endDate);  
        const endYear = endDate.getFullYear();
        const startYear = startDate.getFullYear();
        const endText = endYear == 1970 ? 'Now' : endYear;*/


    scrollIntoWork(e) {
        e.preventDefault();
        this.shadowRoot.querySelector('#work-experience').scrollIntoView({
            block: 'center'
        });
    }

    render() {
        return html`
            ${commonStyles}
            <app-header></app-header>
            <app-upload-avt .show="${this.showModalAvt}" @close-modal="${this.closeModal}" id=${this.id}></app-upload-avt>
            <main>
                <div id="main-content">
                    <div class="main-content-div" id="basic-info-div">
                        <div id="background-avatar">
                            <img src="${this.profile.bgImageUrl}" alt="">
                            <a class="link-icon" @click="${this.handleToggleModal}">
                                <div class="material-icons md-24">
                                    photo_camera
                                </div>
                            </a>
                        </div>
            
                        <div id="main-avatar">
                            <img src="${this.profile.user.imageUrl}" alt="">
                        </div>
            
                        <div id="info">
                            <div id="personal-info">
                                <h1 id="personal-name"></h1>
                                <h3 class="light" id="personal-jobs"></h3>
                                <h4 class="light" id="personal-address"></h4>
                                <h4 class="light" id="contact-info" >Contact info</h4>
                            </div>
                
                            <div id="workplace">
                                <a style="cursor: pointer" @click="${this.scrollIntoWork}">
                                    <p>${this.work[0].company}</p>
                                </a>
                                <a style="cursor: pointer" @click="${this.scrollIntoEducation}">
                                    <p>${this.education[0].school}</p>
                                </a>
                            </div>
                        </div>
                    </div>
        
                    <app-contact-info id=${this.params.id} email=${this.profile.user.email} .show="${this.showModal}" @close-modal="${this.handleCloseContactModal}"></app-contact-info>


                    <div class="main-content-div" id="experience">
                        <h2>About</h2>
                        <p class="profile-text"></p>
                    </div>
        
                    <div class="main-content-div" id="work-experience">
                        <h2>Work Experience</h2>
                        <div class="education__list">
                            ${this.work.map((e) => {
                                const start = new Date(e.startDate);
                                const end = new Date(e.endDate);
                                const startMonth = start.getMonth() + 1;
                                const endMonth = end.getMonth() + 1;
                                const startYear = start.getFullYear();
                                const endYear = end.getFullYear();
                                const endText = endYear == 1970 ? 'Now' : `${endMonth}/${endYear}`;
                            return html`
                            <div class="education">
                            <img class="education__logo" src="content/images/suitcase.png">
                                <div class="education__info">
                                    <h3 class="education__info__name">${e.title}</h3>
                                    <h4 class="education__info__degree">${e.company}</h4>
                                    <h4 class="education__info__degree">${e.employmentType}</h4>
                                    <h4 class="education__info__time">${startMonth}/${startYear} - ${endText}</h4>
                                </div>
                            </div>
                                
                            `})}
                        </div>
                    </div>
                    

                    <div class="main-content-div" id="education">
                        <h2>Education</h2>
                        <div class="education__list">

                        ${this.education.map((e) => {
                            const startDate = new Date(e.startDate);
                            const endDate = new Date(e.endDate);
                            const endYear = endDate.getFullYear();
                            const startYear = startDate.getFullYear();
                            const endText = (this.endYear == 1970) ? 'Now' : endYear;
                            return html`
                            <div class="education">
                                <img class="education__logo" src="content/images/graduation-hat.png">
                                <div class="education__info">
                                    <h3 class="education__info__name">${e.school}</h3>
                                    <h4 class="education__info__degree">${e.degree}, ${e.fieldOfStudy}</h4>
                                    <h4 class="education__info__degree">${e.grade}</h4>
                                    <h4 class="education__info__time">${startYear} - ${endText}</h4>
                                </div>
                            </div>
                                
                            `})}
                        </div>
                    </div>


                    <div class="main-content-div" id="work-experience">
                    <h2>Certification</h2>
                    <div class="education__list">
                    ${this.certification.map((e) => {
                        const start = new Date(e.issDate);
                        const end = new Date(e.expDate);
                        const startMonth = start.getMonth() + 1;
                        const endMonth = end.getMonth() + 1;
                        const startYear = start.getFullYear();
                        const endYear = end.getFullYear();
                        return html`

                        <div class="education">
                            <img class="education__logo" src="content/images/certificate.png">
                            <div class="education__info">
                                <h3 class="education__info__name">${e.name}</h3>
                                <h4 class="education__info__degree">${e.issOrganization}</h4>
                                <h4 class="education__info__degree">Issued: ${startMonth}/${startYear}</h4>
                                <h4 class="education__info__time">Expired: ${endMonth}/${endYear}</h4>
                            </div>
                        </div>
                            
                        `})}
                    </div>
                </div>

                <div class="main-content-div" id="skill">
                    <h2>Skill</h2>
                    <div class="skill-list">
                    ${this.skills.map((e) => {
                        return html`
                        <div class="education">
                            <i class="fas fa-star-of-life"></i>
                            <div class="education__info">
                                <p class="education__info__name">${e.name}</p>
                            </div>
                        </div>
                        `})}
                    </div>
                    
                </div>
                     
                    </div>
                </div>
            </main>
            <app-footer></app-footer>
        `;
    }
}

customElements.define('app-profile', Profile);




