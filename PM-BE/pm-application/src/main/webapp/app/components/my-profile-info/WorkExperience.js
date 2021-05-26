import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { workExperienceStyle } from './work-experience-style';
import { commonStyles } from '../../shared/styles/common-styles';

import '../Button/Button';
import '../Modal/UploadWorkExperience/UploadWork'

class WorkExperience extends MaleficComponent {
    static get styles() {
        return [workExperienceStyle];
    }

    static get properties() {
        return {
            tabShow: { type: Int16Array },
            showModal: { type: Boolean },

            about: { type: String },
            address: { type: String },
            bgImageUrl: { type: String },
            birthday: { type: Date },
            country: { type: String },
            headline: { type: String },
            industry: { type: String },
            location: { type: String },
            phoneNumber: { type: String },
            showAlert: {type: Boolean}
        };
    }

    constructor() {
        super();
        window.addEventListener('beforeunload', () => {
            window.scrollTo(0, 0);
        });
        this.showModal = false;

        // getProfile()
        //     .then(res => {
        //         this.about = res.about;
        //         this.address = res.address;
        //         this.bgImageUrl = res.bgImageUrl;
        //         this.birthday = new Date(res.birthday);
        //         this.country = res.country;
        //         this.headline = res.headline;
        //         this.industry = res.industry;
        //         this.location = res.location;
        //         this.phoneNumber = res.phoneNumber;
        //         this.shadowRoot.querySelector('#day').value = this.birthday.getDate();
        //         this.shadowRoot.querySelector('#month').value = this.birthday.getMonth() + 1;
        //         this.shadowRoot.querySelector('#year').value = this.birthday.getFullYear();
        //     })
        //     .catch(e => console.log(e));
    }

    handleToggleModal() {
        this.showModal = !this.showModal;
    }
    
    closeModal() {
        this.showModal = false;
    }

    submitForm() {
        // const personalForm = this.shadowRoot.querySelector("#personalForm");
        // const formData = new FormData(personalForm);

        // const day = this.shadowRoot.querySelector('#day');
        // const month = this.shadowRoot.querySelector('#month');
        // const year = this.shadowRoot.querySelector('#year');
        // const birthday = new Date(year.value, month.value - 1, day.value);
        // const ISODate = new Date(birthday.getTime() - (birthday.getTimezoneOffset() * 60000)).toISOString();
        // formData.append('birthday', ISODate);

        // // Convert formData to a query string
        // const data = [...formData.entries()];
        // const asString = data
        //     .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
        //     .join('&');
        // console.log(asString);

        // patchPersonalProfile(asString)
        //     .then(data => {
        //         console.log(data);
        //         if(data) {
        //             const alertBox = this.shadowRoot.querySelector('.show-alert');
        //             console.log(alertBox);
        //             alertBox.classList.add('active');
        //             setTimeout(function(){ 
        //                 alertBox.classList.remove('active')
        //             }, 2000);
        //         }
        //     })
        //     .catch(console.warn);
    }


    render() {
        return html`
            ${commonStyles}
            <h1>Work Experience</h1>
            <div class="row">
                <app-button btnclass="custom-btn" @click="${this.handleToggleModal}"><i class="fas fa-plus"></i>Add Experience</app-button>
                <app-upload-work .show="${this.showModal}" @close-modal="${this.closeModal}"></app-upload-work>
            </div>
        `;
    }
}

customElements.define('work-experience', WorkExperience);

        