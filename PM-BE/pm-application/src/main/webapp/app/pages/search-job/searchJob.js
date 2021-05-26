import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { commonStyles } from '../../shared/styles/common-styles';
import { searchJobStyle} from './search-job-style';

import '../../components/layouts/Header/Header';
import '../../components/Sidebar/PeopleSidebar';
import '../../components/layouts/Footer/Footer';
import '../../components/brief-job-card/briefJobCard';
import '../../components/recruit-detail-card/recruitDetailCard';

class SearchJob extends MaleficComponent{
    static get properties(){
        return{

        }
    }

    static get styles(){
        return [searchJobStyle];
    }

    constructor(){
        super();
    }

    render(){
        return html`
            ${commonStyles}

            <app-header></app-header>

            <div>
        <div class="search__filter">
            <input type="text" name="keywords">
            <div id="search__filter__jobtype">Job type <i class="fas fa-sort-down"></i></div>
            <div id="search__filter__createdat">Created at <i class="fas fa-sort-down"></i></div>
            <div>Search</div>
        </div>
 
        <div id="overlay__jobtype">
            <div class="overlay__jobtype__header">
            </div>
            <div class="overlay__jobtype__checkbox">
                <form>
                    <input type="checkbox" name="fulltime" value="fulltime">
                        <label for="fulltime">Full time</label></br>
                    <input type="checkbox" name="contract" value="contract">
                        <label for="contract">Contract</label></br>
                    <input type="checkbox" name="internship" value="internship">
                        <label for="internship">Internship</label></br>
                    <div>
                        <button>Cancel</button>
                        <button type="submit">Show result</button>
                    </div>
                </form>
            </div>
        </div>

        <div id="overlay__createdat">
            <div class="overlay__createdat__header">
            </div>

            <div class="overlay__createdat__checkbox">
                <form>
                    <input type="checkbox" name="anytime" value="fulltime">
                        <label for="anytime">Any time</label></br>
                    <input type="checkbox" name="passmonth" value="contract">
                        <label for="passmonth">Pass month</label></br>
                    <input type="checkbox" name="passweek" value="internship">
                        <label for="passweek">Pass week</label></br>
                    <input type="checkbox" name="passday" value="internship">
                        <label for="passday">Pass 24 hours</label></br>
                    <div>
                        <button>Cancel</button>
                        <button type="submit">Show result</button>
                    </div>
                </form>
            </div>
            
        </div>
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
                    jobBriefInfo="Example Info"
                    companyBriefInfo="Example Info"> 
                </recruit-detail-card>
            </div>
        </div>

    </div>
        `;
    }
}

customElements.define('app-search-job', SearchJob);