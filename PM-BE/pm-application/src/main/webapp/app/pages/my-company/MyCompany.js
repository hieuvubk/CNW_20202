import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { commonStyles } from '../../shared/styles/common-styles';
import { myCompanyStyle } from './my-company-style';

import '../../components/layouts/Header/Header';
import '../../components/Sidebar/PeopleSidebar';
import '../../components/layouts/Footer/Footer';
import '../../components/PostCard/PostCard';

import getPublicCompany from '../../api/getPublicCompany';
import {withRouter} from "../../core/router/malefic-router";
import getMyCompanies from '../../api/getMyCompanies';

class MyCompany extends withRouter(MaleficComponent) {
    static get properties() {
        return {
            background: {type:String},
            avatar: {type:String},
            showIcon: {type: String},
            id: {type: Int16Array},
            company : {type: JSON},
            showAlert: { type: Boolean },
            companyList: {type: Array},
        };
    }
    
    static get styles() {
        return [myCompanyStyle];
    }
    
    constructor() {
        super();
        window.addEventListener('beforeunload', () => {
            window.scrollTo(0, 0);
        });
        this.background = "content/images/4853433.jpg";
        this.avatar ="content/images/avatar.png";
        this.showIcon = "plus";
        this.showAlert = false;
        this.company = {};
    }


    connectedCallback() {
        super.connectedCallback()
        getMyCompanies()
        .then(res => {
            this.company = res._embedded.companyList[0];
            this.companyList = res._embedded.companyList;
        })
        .catch(e => console.log(e))
    }
    handleToggleFollow(){
        if(this.showIcon=="plus") this.showIcon = "check";
        else this.showIcon = "plus";
    }

    render() {
        console.log(this.params.id)
        return html`
            ${commonStyles}
            
            <app-header></app-header>
            <main class="main">
            <main>
            <div id="main-content">
            <div class="main-content-div" id="basic-info-div">
                <div id="background-avatar">
                    <img src="${this.company.bgImageUrl}">
                </div>
                
                <div id="main-avatar">
                    <img src="${this.company.logoUrl}">
                    <a class="edit-company" href="update-company/${this.company.id}"><i class="fas fa-pencil-alt"></i></a>
                </div>
               
            
                <div id="info">
                    <div id="company-info">
                        <h1>${this.company["name"]}</h1>
                        <p>${this.company.tagline}</p>
                        <span>Ha Noi</span>
                        <span>Followers</span>
                        <span>${this.company.companySize} Employees</span>
                    </div>
                </div>
            
                <div id="basic-info-follow" @click="${this.handleToggleFollow}">
                    <i class="fas fa-${this.showIcon}" ></i>Follow
                </div>
            
                <div id="basic-info-nav">
                    <div><a href="#">Home</a></div>
                    <div><a href="#about">About</a></div>
                    <div><a href="#post">Posts</a></div>
                </div>
            </div>
            
            <div class="main-content-div" id="about">
                <h2>About</h2>
                <div id="about__detail">
                    <div id="about__detail__overview">
                            <h3>Overview</h3>
                            <div>Quality in higher education is not a simple one-dimensional 
                                notion about academic quality. In view of the varied needs 
                                and expectations of stakeholders, quality in higher education 
                                can be said to be a multi-dimensional concept which should embrace
                                 all its functions and activities. It is related to teaching and 
                                 academic programs, research and scholarship, staffing, students, 
                                 buildings, facilities, equipment, services to the community and 
                                 the academic environment.</div>
                        
                    </div>
                    <div id="about__detail__specified">
                        <div class="about__detail__specified__tag">
                            Website
                        </div>
                        <div class="about__detail__specified__content">
                            <a href="${this.company["website"]}">${this.company["website"]}</a>
                        </div>
            
                        <div class="about__detail__specified__tag">
                            Industry
                        </div>
                        <div class="about__detail__specified__content">
                            ${this.company["industry"]}
                        </div>
            
                        <div class="about__detail__specified__tag">
                            Company size
                        </div>
                        <div class="about__detail__specified__content">
                            ${this.company["companySize"]} employees
                        </div>
            
                        <div class="about__detail__specified__tag">
                            Type
                        </div>
                        <div class="about__detail__specified__content">
                            ${this.company["companyType"]}
                        </div>
            
                    </div>
                </div>
            
            </div>
            
            <div class="main-content-div" id="post">
                <h2>Page posts</h2>
                <div id="page-post">
                   <post-card
                        accountImg="https://cdn.theculturetrip.com/wp-content/uploads/2018/05/shutterstock_89159080.jpg"
                        numFollowers=10
                        time="5w"
                        postText="This a test"
                        postImg="https://cdn.theculturetrip.com/wp-content/uploads/2018/05/shutterstock_89159080.jpg">    
                   </post-card>
                </div>
            </aside>
            </main>


            <div class="main__content ads">
                    <div class="quote">
                        <img src="content/images/background_footer.jpeg" style="height: 100%;width: 100%; border-radius: 10px;">
                    </div>
                    <div class="suggest">
                        <h3 class="suggest__title">My Companies</h3>

                        ${this.companyList.map((company) =>
                            html`
                            <a class="suggest__link" href="company-admin/${company.id}">
                            <div class="suggest__info">
                                <img class="suggest__info__avatar" src="${company.logoUrl}">
                                <h4 class="suggest__info__name">${company.name}</h4>
                            </div>
                        </a>
                            `
                        )}

                    </div>
        
                    <div class="web__info">
                        <a href="#">About Us</a>
                        <a href="#">Contact Us</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Complaint Handling</a>
                        <a href="#">Term & Conditions</a>
                        <a href="#">Help Center</a>
                        <a href="#">Advertising</a>
                    </div>
                </div>
            </main>  


           
    <app-footer></app-footer>
        `;
    }
}

customElements.define('app-my-company', MyCompany);

