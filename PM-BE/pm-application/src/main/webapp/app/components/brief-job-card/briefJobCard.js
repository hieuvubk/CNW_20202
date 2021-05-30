import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { commonStyles } from '../../shared/styles/common-styles';
import { briefJobCardStyle} from './briefJobCard-style';

import '/home/hieuvu/Desktop/Web/pmApp/PM-BE/pm-application/src/main/webapp/app/components/layouts/Header/Header.js';
import '../../components/Sidebar/PeopleSidebar';
import '/home/hieuvu/Desktop/Web/pmApp/PM-BE/pm-application/src/main/webapp/app/components/layouts/footer/Footer.js';
import getJob from "../../api/getJob";
import getCompany from "../../api/getCompany";

class BriefCard extends MaleficComponent{
    static get properties(){
        return{
            id: { type: Int16Array },
            companyAvatar:{type:String},
            companyName:{type:String},
            jobName:{type:String},
            address:{type:String},
            time:{type:String},
            applicants:{type:String},

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
        getCompany(this.job.company_id)
            .then(res => {
                this.company = res;
                console.log(res)
            })
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


