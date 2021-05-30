import MaleficComponent from '../../../core/components/MaleficComponent';
import { html } from '../../../core/components/malefic-html';
import { uploadJobStyle } from './upload-job-style';
import { commonStyles } from '../../../shared/styles/common-styles';

import '../Modal';
import '../../Button/Button';
import postEducation from '../../../api/postEducation';
import postJob from '../../../api/postJob';

class UploadJob extends MaleficComponent {
    static get properties() {
        return {
            show: { type: Boolean }
        };
    }

    static get styles() {
        return [uploadJobStyle];
    }

    handleCloseModal() {
        this.show = false;
        const event = new CustomEvent('close-modal', {
            detail: {},
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    submitForm() {
        const jobForm = this.shadowRoot.querySelector("#job-form");
        jobForm.addEventListener("submit", (e) => e.preventDefault());
        const formData = new FormData(jobForm);
        formData.append('activated',"true");
        // Convert formData to a query string
        const data = [...formData.entries()];
        const asString = data
            .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
            .join('&');
        console.log(asString);

        postJob(asString)
            .then(data => {
                console.log(data);
                if(data == 201) {
                     location.reload();
                }
            })
            .catch(e => {
                console.log(e);
                alert("Fail to add a work experience!");
            })
    }

    render() {
        return html`
            ${commonStyles}
            <app-modal .show="${this.show}">
                <div class="avt-modal" id="avt-modal">
                    <div class="post__edit__header">
                        <h3>Post A Job</h3>
                        <div class="post__edit__close" @click=${this.handleCloseModal}><i class="fas fa-times"></i></div>
                    </div>
                    <form id="job-form">
                    <div class="row">
                    <div class="col span-1-of-4 title">
                    <h5>Job Title *</h5>
                    <h5>Company</h5>
                    <h5>Location *</h5>
                    <h5>Employment Type</h5>
                    <h5>Contact Email</h5>
                    <h5>Description</h5>
                </div>
                <div class="col span-3-of-4 info">
                    <input type="text" class="input" id="title" name="title"required>
                    <input type="text" class="input" id="company" name="company" required>
                    <input type="text" class="input" id="location" name="location">
                    <div class="dob" data-="selectors">
                    <select class="selector" aria-label="Employment Type" id="jobType" name="jobType">
                        <option value="FULL_TIME">Full-time</option>
                        <option value="PART_TIME">Part-time</option>
                        <option value="SELF_EMPLOYED">Self-employed</option>
                        <option value="FREE_LANCE">Freelance</option>
                        <option value="INTERNSHIP">Internship</option>
                    </select>
                    </div>
                    <input type="text" class="input" id="contactEmail" name="contactEmail">
                    <div class="post__edit__text">
                        <textarea name="description" id="description" placeholder="Job Detail"></textarea>
                    </div>
                    <div class="update-btn">
                        <button type="submit" class="btn-save" @click="${this.submitForm}">Save</button>
                        <button type="reset"class="btn-cancel">Cancel</button>
                    </div>
                </div>
                    </div>
                </form>
                </div>   
            </app-modal>
        `;
    }
}

customElements.define('app-upload-job', UploadJob);

