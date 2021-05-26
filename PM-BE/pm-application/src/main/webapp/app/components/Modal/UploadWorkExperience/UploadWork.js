import MaleficComponent from '../../../core/components/MaleficComponent';
import { html } from '../../../core/components/malefic-html';
import { uploadWorkStyle } from './upload-work-style';
import { commonStyles } from '../../../shared/styles/common-styles';

import '../Modal';
import '../../Button/Button';

class UploadWork extends MaleficComponent {
    static get properties() {
        return {
            show: { type: Boolean }
        };
    }

    static get styles() {
        return [uploadWorkStyle];
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

    render() {
        const months = [];
        const years = [];
        for (var i = 1; i <= 12; i++) {
            months.push(i);
        }
        for (var i = 1800; i <= 2021; i++) {
            years.push(i);
        }

        return html`
            ${commonStyles}
            <app-modal .show="${this.show}">
                <div class="avt-modal" id="avt-modal">
                    <div class="post__edit__header">
                        <h3>Create your post</h3>
                        <div class="post__edit__close" @click=${this.handleCloseModal}><i class="fas fa-times"></i></div>
                    </div>
                    <form id="work-form">
                    <div class="row">
                        <div class="col span-1-of-4 title">
                            <h5>Title</h5>
                            <h5>Employment type</h5>
                            <h5>Company</h5>
                            <h5>Industry</h5>
                            <h5>Location</h5>
                            <h5>Start Date</h5>
                            <h5>End Date</h5>
                            <h5>Description</h5>
                        </div>
                        <div class="col span-3-of-4 info">
                            <input type="text" class="input" id="title" name="title" value="">
                            <input type="text" class="input" id="employmentType" name="employmentType" value="">
                            <input type="text" class="input" id="company" name="company" value="">
                            <input type="text" class="input" id="industry" name="industry" value="">
                            <input type="text" class="input" id="location" name="location" value="">
                            <div class="dob" data-="selectors">
                                <select class="selector" aria-label="Month" id="month">
                                    <option>Month</option>
                                    ${months.map((month) => html`<option value="${month}">${month}</option>`)}
                                </select>
                                <select class="selector" aria-label="Year" id="year">
                                    <option>Year</option>
                                    ${years.map((year) => html`<option value="${year}">${year}</option>`)}
                                </select>
                            </div>
                            <div class="dob" data-="selectors">
                                <select class="selector" aria-label="Month" id="month">
                                    <option>Month</option>
                                    ${months.map((month) => html`<option value="${month}">${month}</option>`)}
                                </select>
                                <select class="selector" aria-label="Year" id="year">
                                    <option>Year</option>
                                    ${years.map((year) => html`<option value="${year}">${year}</option>`)}
                                </select>
                            </div>
                            <div class="post__edit__text">
                                <textarea name="post_text" placeholder="Type something"></textarea>
                            </div>
                            <div class="update-btn">
                                <app-button btnclass="btn-save" @click="${this.submitForm}">Save</app-button>
                                <app-button btnclass="btn-cancel">Cancel</app-button>
                            </div>
                        </div>
                    </div>
                </form>
                  
             
                   
              
                </div>   
            </app-modal>
        `;
    }
}

customElements.define('app-upload-work', UploadWork);


