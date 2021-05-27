import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { commonStyles } from '../../shared/styles/common-styles';
import { briefJobCardStyle} from './briefJobCard-style';

import '/home/hieuvu/Desktop/Web/pmApp/PM-BE/pm-application/src/main/webapp/app/components/layouts/Header/Header.js';
import '../../components/Sidebar/PeopleSidebar';
import '/home/hieuvu/Desktop/Web/pmApp/PM-BE/pm-application/src/main/webapp/app/components/layouts/footer/Footer.js';

class BriefCard extends MaleficComponent{
    static get properties(){
        return{
            companyAvatar:{type:String},
            companyName:{type:String},
            jobName:{type:String},
            address:{type:String},
            time:{type:String},
            applicants:{type:String}
        }
    }

    static get styles(){
        return [briefJobCardStyle];
    }

    constructor(){
        super();
    }

    render(){
        return html`
            ${commonStyles}
            <div id="brief__info">
                <div id="brief__info__avatar">
                    <img id="brief__info__avatar__img" height="60px" width="60px" src=${this.companyAvatar}>
                </div>
            
                <div id="brief__info__content">
                    <h3><a href="#">${this.jobName}</a></h3>
                    <p style="font-size:12px">${this.companyName}</p>
                    <p style="font-size:12px">${this.address}</p>
                    <span style="font-size:12px">${this.time}</span>
                    <span style="font-size:12px; color: rgb(54, 87, 185); font-weight: bold; margin-left: 5px;">${this.applicants}</span>
                </div>
            </div>
            `;
    }
}

customElements.define('brief-job-card', BriefCard);


