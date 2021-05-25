import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { commonStyles } from '../../shared/styles/common-styles';
import { recruitDetailCardStyle } from './recruitDetailCard-style';

import '../../components/layouts/Header/Header';
import '../../components/Sidebar/PeopleSidebar';
import '../../components/layouts/Footer/Footer';

class RecruitDetailCard extends MaleficComponent{
    static get properties(){
        return{
            companyName:{type:String},
            address:{type:String},
            time:{type:String},
            jobBriefInfo:{type:String},
            companyBriefInfo:{type:String},
            requirement:{type:String},
            level:{type:String},
            type:{type:String},
            function:{type:String},
            industry:{type:String},
            description:{type:String},
            avatar:{type:String}
        }
    }

    static get styles(){
        return [recruitDetailCardStyle];
    }

    constructor(){
        super();
    }

    render(){
        return html`
            ${commonStyles}
            <div id="recruit__info">
        <div id="recruit__info__overview">
            <img id="recruit__info__company__avatar" height="60px" width="60px" src=${this.avatar}>
            <div>
                <h3>${this.companyName}</h3>
                <span>${this.address}</span>
                <span>${this.time}</span>
                <div id="recruit__info__web__feature">
                    <div>Apply</div>
                    <div>Save</div>
                </div>
            </div>
        </div>

        <div id="recruit__info__brief__info">
            <div id="recruit__info__brief__job">
                <h4>Job</h4>
                <ul>
                    ${this.jobBriefInfo}
                </ul>
            </div>
            <div id="recruit__info__brief__company">
                <h4>Company</h4>
                <ul>
                    ${this.companyBriefInfo}
                </ul>
            </div>
        </div>

        <div id="recruit__info__detail__job">
            <h3>Description</h3>
                <div style="text-indent: 20px;">${this.description}</div>
                <div id="recruit__info__detail__job__criteria">
                    <div class="recruit__info__detail__job__criteria__tag">Requirement</div>
                        <div class="recruit__info__detail__job__criteria__detail">${this.requirement} </div>    
                    <div class="recruit__info__detail__job__criteria__tag">Seniority Level</div>
                        <div class="recruit__info__detail__job__criteria__detail">${this.level} </div> 
                    <div class="recruit__info__detail__job__criteria__tag">Employment Type</div>
                        <div class="recruit__info__detail__job__criteria__detail">${this.type} </div> 
                    <div class="recruit__info__detail__job__criteria__tag">Industry</div>
                        <div class="recruit__info__detail__job__criteria__detail">${this.industry} </div> 
                    <div class="recruit__info__detail__job__criteria__tag">Job Functions</div>
                        <div class="recruit__info__detail__job__criteria__detail">${this.function} </div> 
                </div>
        </div>

    </div>
            `;
    }
}

customElements.define('recruit-detail-card', RecruitDetailCard);