import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { commonStyles } from '../../shared/styles/common-styles';
import { CreatedCompanyStyle } from '../../pages/create-company/createCompany-style';

import '../../components/layouts/Header/Header';
import '../../components/Sidebar/PeopleSidebar';
import patchPersonalProfile from "../../api/patchPersonalProfile";
import postCompany from "../../api/postCompany";
import {withRouter} from "../../core/router/malefic-router";

class UpdateCompany extends MaleficComponent{

    static get properties(){
        return{
            tabShow: { type: Int16Array },
            showModal: { type: Boolean },
            formData: { type: FormData}
        }
    }

    static get styles(){
        return [CreatedCompanyStyle];
    }

    handleReviewName(){
        console.log("test");
        let reviewName = this.shadowRoot.querySelector("#company-info h1");
        let name = this.shadowRoot.getElementById("name");

        reviewName.innerHTML=name.value;
    }

    handleReviewSize(){
        let reviewSize = this.shadowRoot.querySelector("#company-info a");
        let size = this.shadowRoot.getElementById("companySize");

        reviewSize.innerHTML = size.value + " Employees";
    }

    handleReviewLogo(){
        let reviewLogo = this.shadowRoot.querySelector("#main-avatar img");
        let avatar = this.shadowRoot.getElementById("logo");

        let img = avatar.files[0];
        reviewLogo.src = URL.createObjectURL(img);
    }

    handleReviewBackground(){
        let reviewBackground = this.shadowRoot.querySelector("#background-avatar img");
        let background = this.shadowRoot.getElementById("background");

        let img = background.files[0];
        reviewBackground.src = URL.createObjectURL(img);
    }

    constructor(){
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        ge
    }

    submitForm() {
        let companyForm = this.shadowRoot.getElementById("main__basic__info__form");
        companyForm.addEventListener("submit", (e) => e.preventDefault());
        this.formData = new FormData(companyForm)

        // Convert formData to a query string
        const data = [...this.formData.entries()];
        const asString = data
            .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
            .join('&');

        postCompany(asString)
            .then(data => {
                if(data) {
                    // const alertBox = this.shadowRoot.querySelector('.show-alert');
                    // alertBox.classList.add('active');
                    console.log(data)
                    setTimeout(function(){
                        // alertBox.classList.remove('active')
                    }, 2000);
                }
            })
            .catch(() => {
                console.log("Hello")
                // const alertBox = this.shadowRoot.querySelector('.show-alert-fail');
                // alertBox.classList.add('active');
                setTimeout(function(){
                    // alertBox.classList.remove('active')
                }, 2000);
            });
    }


    render(){
        return html`

            ${commonStyles}

            <app-header></app-header>

            <main>
                <div id="main__left">
                    <div id="main__basic__info">
                        <h2>Let’s get started with a few details about your business</h2>
                        <form id="main__basic__info__form">
                            <label for="name" >Name *</label></br>
                            <input type="text" id="name" name="name" 
                                @keyup=${this.handleReviewName} required></br>
                            
                            <label for="website">Website *</label></br>
                            <input type="url" id="website" name="website" required></br>
                            
                            <label for="companySize">Company size *</label></br>
                            <input type="text" id="companySize" name="companySize"
                                @keyup=${this.handleReviewSize} required></br>
                            
                            <label for="companyType">Company type *</label></br>
                            <input type="text" id="companyType" name="companyType" required></br>
                            
                            <label for="industry">Industry *</label></br>
                            <input type="text" id="industry" name="industry" required></br>
                            
                            <label for="tagLine">Tag line *</label></br>
                            <input type="text" id="tagLine" name="tagLine" required></br>
                            
                            <label for="logo">Logo *</label></br>
                            <input type="file" id="logo" name="logo" accept="image/*" 
                                @change=${this.handleReviewLogo} required></br>
                            
                            <label for="background">Background *</label></br>
                            <input type="file" id="background" name="background" accept="image/*" 
                                @change=${this.handleReviewBackground} required></br>
                            
                            <div id="term__agree">
                                <div><input type="checkbox" id="term" name="term" required></div>
                                <div for="term">I verify that I am an authorized representative of this organization 
                                and have the right to act on its behalf in the creation and management of this page.
                                The organization and I agree to the additional terms for Pages.</div>
                            </div>
                            
                            <button type="submit" @click="${this.submitForm}">Create company</button>
                        </form>
                        <div id="filter__jobtitle">
                        </div>
                    </div>
                </div>

                <div id="main__right">
                    <div id="review">Review</div>
                    <div class="main-content-div" id="basic-info-div">
                        <div id="background-avatar">
                            <img src="./content/images/4853433.jpg" style="height: 200px;width: 100%;">
                        </div>

                        <div id="main-avatar">
                            <img src="./content/images/user.svg" style="height: 90px;width: 90px;">
                        </div>

                        <div id="info">
                            <div id="company-info">
                                <h1>Name</h1>
                                <p>Slogan</p>
                                <span>Address</span>
                                <span>Followers</span>
                                <a href="#">Employees</a>
                            </div>
                        </div>

                        <div id="basic-info-follow">
                            <i class="fas fa-plus"></i>Follow
                        </div>

                        <div id="basic-info-nav">
                            <div><a href="#">Home</a></div>
                            <div><a href="#about">About</a></div>
                            <div><a href="#post">Posts</a></div>
                        </div>
                    </div>
                </div>
            </main>
            
        `;
    }
}

customElements.define("app-create-company", UpdateCompany);