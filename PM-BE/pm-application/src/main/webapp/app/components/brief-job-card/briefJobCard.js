import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { commonStyles } from '../../shared/styles/common-styles';
import { briefJobCardStyle} from './briefJobCard-style';

import '../../components/layouts/Header/Header';
import '../../components/Sidebar/PeopleSidebar';
import '../../components/layouts/Footer/Footer';

import getJob from "../../api/getJob";

class BriefCard extends MaleficComponent{
    static get properties(){
        return{
            id: { type: Int16Array },
            job: { type: Object },
            company: { type: Object},
        }
    }

    static get styles(){
        return [briefJobCardStyle];
    }

    constructor(){
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        getJob(this.id)
            .then(res => {
                this.job = res;
                console.log(res);
            })
        // getCompany(this.job.company_id)
        //     .then(res => {
        //         this.company = res;
        //         console.log(res)
        //     })
    }

    render(){
        return html`
            ${commonStyles}

            <div id="brief__info">
                <div id="brief__info__avatar">
                </div>

                <div id="brief__info__content">
                    <h3><a href="#">${this.job.name}</a></h3>
                    <p style="font-size:12px">${this.job.location}</p>
                    <span style="font-size:12px">${this.job.created_at}</span>
                    <span style="font-size:12px; color: rgb(54, 87, 185); font-weight: bold; margin-left: 5px;">${this.job.contact_email}</span>
                </div>
            </div>
        `;

    }

    // render(){
    //     return html`
    //         ${commonStyles}
    //
    //         <div slot="jobName">${this.job.name}</div>
    //         <div slot="companyName">ABC</div>
    //         <div slot="address">${this.job.location}</div>
    //         <span slot="time">${this.job.created_at}</span>
    //         <span slot="applicant">8 applicants</span>
    //
    //     `;
    // }
}

customElements.define('brief-job-card', BriefCard);



