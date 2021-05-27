import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { commonStyles } from '../../shared/styles/common-styles';
import { searchJobStyle} from './search-job-style';

import '/home/hieuvu/Desktop/Web/pmApp/PM-BE/pm-application/src/main/webapp/app/components/layouts/Header/Header.js';
import '../../components/Sidebar/PeopleSidebar';
import '/home/hieuvu/Desktop/Web/pmApp/PM-BE/pm-application/src/main/webapp/app/components/layouts/footer/Footer.js';
import '../../components/brief-job-card/briefJobCard';
import '../../components/recruit-detail-card/recruitDetailCard';
import '../../components/recruit-detail-card/poupJobtype';
import '../../components/recruit-detail-card/popupCreatedat';

class SearchJob extends MaleficComponent{
    static get properties(){
        return{
            showJobtype: {type:String},
            showCreatedat: {type:String}
        }
    }

    static get styles(){
        return [searchJobStyle];
    }

    handleToggleShowPopupJobtype(){
        let jobtype = this.shadowRoot.querySelector("popup-jobtype").showPopup;
        this.shadowRoot.querySelector("popup-jobtype").showPopup = (jobtype=="none")?"block":"none";
        this.shadowRoot.querySelector("popup-createdat").showPopup ="none";
    }

    handleToggleShowPopupCreatedat(){
        let createdat = this.shadowRoot.querySelector("popup-createdat").showPopup;
        this.shadowRoot.querySelector("popup-createdat").showPopup = (createdat=="none")?"block":"none";
        this.shadowRoot.querySelector("popup-jobtype").showPopup ="none";
    }

    constructor(){
        super();
        this.showJobtype = "none";
        this.showCreatedat ="none";
    }

    render(){
        return html`
            ${commonStyles}

            <app-header></app-header>

            <div>
        <div class="search__filter">
            <input type="text" name="keywords">
            <div id="search__filter__jobtype" @click="${this.handleToggleShowPopupJobtype}">Job type <i class="fas fa-sort-down"></i></div>
            <div id="search__filter__createdat" @click="${this.handleToggleShowPopupCreatedat}">Created at <i class="fas fa-sort-down"></i></div>
            <div>Search</div>
        </div>
 
        <popup-jobtype showPopup=${this.showJobtype}></popup-jobtype>

        <popup-createdat showPopup=${this.showCreatedat}></popup-createdat>
        <div class="main">
            <div class="main__left">
                <brief-job-card 
                    companyAvatar="https://i.pinimg.com/originals/d5/7e/f5/d57ef5d4d6bae63dce5b5c8a14f200e7.jpg"
                    companyName="XYZ"
                    jobName="abc"
                    address="ghk"
                    time="2 days ago"
                    applicants="8 applicants">
                </brief-job-card>

                <brief-job-card 
                    companyAvatar="https://i.pinimg.com/originals/d5/7e/f5/d57ef5d4d6bae63dce5b5c8a14f200e7.jpg"
                    companyName="XYZ"
                    jobName="abc"
                    address="ghk"
                    time="2 days ago"
                    applicants="8 applicants">
                </brief-job-card>

                <brief-job-card 
                    companyAvatar="https://i.pinimg.com/originals/d5/7e/f5/d57ef5d4d6bae63dce5b5c8a14f200e7.jpg"
                    companyName="XYZ"
                    jobName="abc"
                    address="ghk"
                    time="2 days ago"
                    applicants="8 applicants">
                </brief-job-card>

                <brief-job-card 
                    companyAvatar="https://i.pinimg.com/originals/d5/7e/f5/d57ef5d4d6bae63dce5b5c8a14f200e7.jpg"
                    companyName="XYZ"
                    jobName="abc"
                    address="ghk"
                    time="2 days ago"
                    applicants="8 applicants">
                </brief-job-card>

                <brief-job-card 
                    companyAvatar="https://i.pinimg.com/originals/d5/7e/f5/d57ef5d4d6bae63dce5b5c8a14f200e7.jpg"
                    companyName="XYZ"
                    jobName="abc"
                    address="ghk"
                    time="2 days ago"
                    applicants="8 applicants">
                </brief-job-card>

                <brief-job-card 
                    companyAvatar="https://i.pinimg.com/originals/d5/7e/f5/d57ef5d4d6bae63dce5b5c8a14f200e7.jpg"
                    companyName="XYZ"
                    jobName="abc"
                    address="ghk"
                    time="2 days ago"
                    applicants="8 applicants">
                </brief-job-card>

                <brief-job-card 
                    companyAvatar="https://i.pinimg.com/originals/d5/7e/f5/d57ef5d4d6bae63dce5b5c8a14f200e7.jpg"
                    companyName="XYZ"
                    jobName="abc"
                    address="ghk"
                    time="2 days ago"
                    applicants="8 applicants">
                </brief-job-card>

                <brief-job-card 
                    companyAvatar="https://i.pinimg.com/originals/d5/7e/f5/d57ef5d4d6bae63dce5b5c8a14f200e7.jpg"
                    companyName="XYZ"
                    jobName="abc"
                    address="ghk"
                    time="2 days ago"
                    applicants="8 applicants">
                </brief-job-card>

            </div>

            <div class="main__right">
                <recruit-detail-card
                    avatar="https://i.pinimg.com/originals/d5/7e/f5/d57ef5d4d6bae63dce5b5c8a14f200e7.jpg"
                    description="
                        Quality in higher education is not a simple one-dimensional 
                        notion about academic quality. In view of the varied needs 
                        and expectations of stakeholders, quality in higher education 
                        can be said to be a multi-dimensional concept which should embrace
                        all its functions and activities. It is related to teaching and 
                        academic programs, research and scholarship, staffing, students, 
                        buildings, facilities, equipment, services to the community and 
                        the academic environment. In general, quality assurance in higher 
                        education is a systematic management and assessment procedures to 
                        monitor performance of higher education institutions.

                        Quality in higher education is not a simple one-dimensional 
                        notion about academic quality. In view of the varied needs 
                        and expectations of stakeholders, quality in higher education 
                        can be said to be a multi-dimensional concept which should embrace
                        all its functions and activities. It is related to teaching and 
                        academic programs, research and scholarship, staffing, students, 
                        buildings, facilities, equipment, services to the community and 
                        the academic environment. In general, quality assurance in higher 
                        education is a systematic management and assessment procedures to 
                        monitor performance of higher education institutions."
                    companyName="XYZ"
                    address="District Hai Ba Trung, Ha Noi City"
                    time="2 days ago"
                    requirement="Degree in Electrical Engineering"
                    level="Entry level"
                    type="Full-time"
                    industry="Electrical & Electronic Manufactoring"
                    function="Engineering"
                    jobBriefInfo="List info"
                    companyBriefInfo="Example Info"> 
                </recruit-detail-card>
            </div>
        </div>


    
    </div>
        `;
    }
}

customElements.define('app-search-job', SearchJob);