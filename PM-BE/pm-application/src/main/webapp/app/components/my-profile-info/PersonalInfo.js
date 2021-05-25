import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { personalInfoStyle } from './personal-info-style';
import { commonStyles } from '../../shared/styles/common-styles';
// import {
//     updateProfile
// } from '../../store/actions/updateProfile';

import '../Button/Button';
import getProfile from '../../api/getProfile';
import getAccount from '../../api/getAccount';
import updatePersonalInfo from '../../api/updatePersonalInfo';
// import store from '../../store/store';

class PersonalInfo extends MaleficComponent {
    static get styles() {
        return [personalInfoStyle];
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
        };
    }

    submitForm() {
        // const personalForm = this.shadowRoot.querySelector("#personalForm");
        // const request = new XMLHttpRequest();
        // let config = {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //       'X-XSRF-TOKEN': '1be6e0e2-8ab6-4e71-a4c0-e050d33153f0',
        //     }
        //   }
        // request.open("PATCH", "http://localhost:9002/api/v1/profile", config);
        // request.onload = function() {
        //     console.log(request.responseText);
        // }
        // request.send(new FormData(personalForm));
        updatePersonalInfo('Hello')
            .then(res => console.log(res))
            .catch(e => console.log(e));
    }

    render() {
        getProfile()
            .then(res => {
                this.about = res.about;
                this.address = res.address;
                this.bgImageUrl = res.bgImageUrl;
                this.birthday = res.birthday;
                this.country = res.country;
                this.headline = res.headline;
                this.industry = res.industry;
                this.location = res.location;
                this.phoneNumber = res.phoneNumber;
            })
            .catch(e => console.log(e));

        const days = [];
        const months = [];
        const years = [];
        for (var i = 1; i <= 31; i++) {
            days.push(i);
        }
        for (var i = 1; i <= 12; i++) {
            months.push(i);
        }
        for (var i = 1980; i <= 2004; i++) {
            years.push(i);
        }

        return html`
            ${commonStyles}
         
            <h1>Personal Information</h1>
            <form id="personalForm">
                <div class="row">
                <div class="col span-1-of-4 title">
                    <h5>About</h5>
                    <h5>Address</h5>
                    <h5>Cover Picture</h5>
                    <h5>Date Of Birth</h5>
                    <h5>Country</h5>
                    <h5>Headline</h5>
                    <h5>Industry</h5>
                    <h5>Location</h5>
                    <h5>Phone Number</h5>
                </div>
                <div class="col span-3-of-4 info">
                    <input type="text" class="input" id="about" name="about" value="${this.about}">
                    <input type="text" class="input" id="address" name="address" value="${this.address}">
                    <input type="text" class="input" id="bgImageUrl" name="bgImageUrl" value="${this.bgImageUrl}">
                    <div class="dob" data-="selectors">
                        <select class="selector" aria-label="Day" name="birthday_day" id="birthday">
                            <option value="0">Day</option>
                            ${days.map((day) =>
                                html`<option value="${day}">${day}</option>`
                            )}
                        </select>
                        <select class="selector" aria-label="Month" name="birthday_month" id="month">
                            <option value="0">Month</option>
                            ${months.map((month) =>
            html`<option value="${month}">${month}</option>`
        )}
                        </select>
                        <select class="selector" aria-label="Year" name="birthday_year" id="year">
                            <option value="0">Year</option>
                            ${years.map((year) =>
            html`<option value="${year}">${year}</option>`
        )}
                        </select>
                    </div>
                    <input type="text" class="input" id="country" value="${this.country}">
                    <input type="text" class="input" id="headline" value="${this.headline}">
                    <input type="text" class="input" id="address" value="${this.industry}">
                    <input type="text" class="input" id="about" value="${this.location}">
                    <input type="text" class="input" id="industry" value="${this.phoneNumber}">
                    <div class="update-btn">
                        <app-button btnclass="btn-save" @click="${this.submitForm}">Save</app-button>
                        <app-button btnclass="btn-cancel">Cancel</app-button>
                    </div>
                </div>
            </div>
            </form>
           
        `;
    }
}

customElements.define('personal-info', PersonalInfo);
