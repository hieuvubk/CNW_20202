import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { commonStyles } from '../../shared/styles/common-styles';
import { companyPageStyle } from './company-Page-style';

import '../../components/layouts/Header/Header';
import '../../components/Sidebar/PeopleSidebar';
import '../../components/layouts/Footer/Footer';
import '../../components/PostCard/PostCard';

import getCompany from '../../api/getCompany';
import getProfile from '../../api/getProfile';

class CompanyPage extends MaleficComponent {
    static get properties() {
        return {
            background: {type:String},
            avatar: {type:String},
            showIcon: {type: String},

            id: {type: Int16Array},

            company : {type: JSON},
            showAlert: { type: Boolean }

        };
    }
    
    static get styles() {
        return [companyPageStyle];
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

        // getCompany()
        //     .then(res => {
        //         // this.companySize = res.companySize;
        //         // this.companyType = res.companyType;
        //         // this.industry = res.industry;
        //         // this.logoUrl = res.logoUrl;
        //         // this.name = res.name;
        //         // this.tagline = res.tagline;
        //         // this.website = res.website;
        //         console.log(res.json()._embedded.companyList[0]);
        //     })
        //     .catch(e => {
        //         console.log(e)
        //         alert("Error")
        //     });

    }


    connectedCallback() {
        super.connectedCallback()
        getCompany(this.id).then(res => {
            this.company = res._embedded.companyList[0];
            console.log(this.company);
            console.log(this.params);
        })
            .catch(e => console.log(e));
    }
    // handleToggleFollow(){
    //     if(this.showIcon=="plus") this.showIcon = "check";
    //     else this.showIcon = "plus";
    // }

    render() {
        return html`
            ${commonStyles}
            
            <app-header></app-header>

            <main>
        <div id="main-content">
            <div class="main-content-div" id="basic-info-div">
                <div id="background-avatar">
                    <img src="${this.background}">
                </div>

                <div id="main-avatar">
                    <img src="${this.avatar}" style="height: 90px;width: 90px;">
                </div>

                <div id="info">
                    <div id="company-info">
                        <h1>${this.company["name"]}</h1>
                        <p>Slogan</p>
                        <span>Address</span>
                        <span>Followers</span>
                        <a href="#">Employees</a>
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
                <!--div class="main-content-div-expand">
                    <a href="#">See all details</a>
                </div-->
                <div id="about__detail">
                    <div id="about__detail__overview">
                        
                            <h3>Overview</h3>
                            <p>Quality in higher education is not a simple one-dimensional 
                                notion about academic quality. In view of the varied needs 
                                and expectations of stakeholders, quality in higher education 
                                can be said to be a multi-dimensional concept which should embrace
                                 all its functions and activities. It is related to teaching and 
                                 academic programs, research and scholarship, staffing, students, 
                                 buildings, facilities, equipment, services to the community and 
                                 the academic environment. In general, quality assurance in higher 
                                 education is a systematic management and assessment procedures to 
                                 monitor performance of higher education institutions.</p>
                        
                    </div>
                    <div id="about__detail__specified">
                        <div class="about__detail__specified__tag">
                            Website
                        </div>
                        <div class="about__detail__specified__content">
                            <a href="#">${this.company["website"]}</a>
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

<!--                        <div class="about__detail__specified__tag">-->
<!--                            Founded-->
<!--                        </div>-->
<!--                        <div class="about__detail__specified__content">-->
<!--                            2000-->
<!--                        </div>-->

<!--                        <div class="about__detail__specified__tag">-->
<!--                            Specialties-->
<!--                        </div>-->
<!--                        <div class="about__detail__specified__content">-->
<!--                            Recruitment Solutions-->
<!--                        </div>-->
                    </div>
                </div>

<!--                <div id="about__location">-->
<!--                    <h3>Location</h3>-->
<!--                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6408192902422!2d105.840947314245!3d21.007030293897216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac76ccab6dd7%3A0x55e92a5b07a97d03!2sHanoi%20University%20of%20Science%20%26%20Technology%20(HUST)!5e0!3m2!1sen!2s!4v1621399599154!5m2!1sen!2s" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>-->
<!--                </div>-->
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

    <app-footer></app-footer>
        `;
    }
}

customElements.define('app-company-page', CompanyPage);
