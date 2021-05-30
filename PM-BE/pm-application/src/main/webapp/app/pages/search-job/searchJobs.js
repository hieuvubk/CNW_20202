import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { commonStyles } from '../../shared/styles/common-styles';
import { searchJobStyle} from './search-job-style';

import '../../components/layouts/Header/Header';
import '../../components/Sidebar/PeopleSidebar';
import '../../components/layouts/Footer/Footer';
import '../../components/brief-job-card/briefJobCard';
import '../../components/recruit-detail-card/recruitDetailCard';
import '../../components/recruit-detail-card/poupJobtype';
import '../../components/recruit-detail-card/popupCreatedat';

import '../../components/search-job/job'
import searchJobs from "../../api/searchJobs";
import {data} from "autoprefixer";
import {withRouter} from "../../core/router/malefic-router";
import getAllJobs from "../../api/getAllJobs";
import postCompany from "../../api/postCompany";

class SearchJobs extends withRouter(MaleficComponent){
    static get properties(){
        return{
            showJobtype: {type:String},
            showCreatedat: {type:String},
            jobsList : {type: Array},
            htmlList : {type: String},
            formData: { type: FormData},
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

    constructor() {
        super();
        this.showJobtype = "none";
        this.showCreatedat = "none";
        this.jobsList = [];
    }

    connectedCallback() {
        super.connectedCallback();
        getAllJobs()
            .then(data => {
                this.jobsList = data._embedded.jobList
                console.log(data._embedded.jobList)
                console.log(this.query)
            })
    }

    submitForm() {
        let filter = this.shadowRoot.getElementsByClassName("search__filter");
        filter.addEventListener("submit", (e) => e.preventDefault());
        this.formData = new FormData(filter);

        // Convert formData to a query string
        const data = [...this.formData.entries()];
        const asString = data
            .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
            .join('&');

        const url = new URL("/api/v1/_search/jobs")

        const jobType = this.shadowRoot.getElementsByName("jobType");
        if(jobType != null) {
            url.searchParams.append("job_type", jobType)
        }

        const keyWord = this.shadowRoot.getElementsByName("keywords")
        if(keyWord != null) {
            url.searchParams.append("keyword", keyWord)
        }
        fetch(url)
            .then(data => {
                this.jobsList = data._embedded.jobList
            })
            .catch((e) => {
                console.log(e)
            })
    }

    render() {
        return html`
            ${commonStyles}

            <app-header></app-header>

            <div>
                <form class="search__filter">
                    <input type="text" name="keywords">
                        <!--div id="search__filter__jobtype" @click="${this.handleToggleShowPopupJobtype}
                        ">Job type <i class="fas fa-sort-down"></i></div-->
                        <!--div id="search__filter__createdat" @click="${this.handleToggleShowPopupCreatedat}
                        ">Created at <i class="fas fa-sort-down"></i></div-->
                    <input type="text" name="jobType" placeholder="Job type">
                    <button @click="${this.submitForm}">Search</button>
                </form>

                <popup-jobtype showPopup=${this.showJobtype}></popup-jobtype>

                <popup-createdat showPopup=${this.showCreatedat}></popup-createdat>
                <div class="main">
                    <div class="main__left">

                    ${this.jobsList.map((job) =>
                        html`
                            <brief-job-card id=${job.id}></brief-job-card>
                            <div @click="${html`<job-detail id=${job.id}></job-detail>`}"></div>`
                        
                    )}
                    </div>
            
                </div>
        `;
    }
}

customElements.define('app-search-job', SearchJobs);



// <job-detail id=${jobList[0].id}></job-detail>
