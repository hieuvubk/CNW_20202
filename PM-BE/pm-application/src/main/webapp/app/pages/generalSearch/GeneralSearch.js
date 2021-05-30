import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { commonStyles } from '../../shared/styles/common-styles';
import {GeneralSearchStyle } from '../generalSearch/generalSearch-style';


import '../../components/layouts/Header/Header';
import '../../components/Sidebar/PeopleSidebar';
import '../../components/nameCard_Contact/nameCard_Contact';
import '../../components/general-search/company-card/company-card';
import '../../components/general-search/people-card/peopleCard';
import searchCompany from "../../api/searchCompany";
import {withRouter} from "../../core/router/malefic-router";
import searchPeople from "../../api/searchPeople";


class GeneralSearch extends withRouter(MaleficComponent){
    static get properties(){
        return{
            companyList: {type: Array},
            userList: {type: Array},
        }
    }

    static get styles(){
        return [GeneralSearchStyle];
    }

    
    constructor(){
        super();
        this.companyList = [];
        this.userList = [];
    }

    connectedCallback() {
        super.connectedCallback();
        searchCompany(this.params.query)
            .then(data => {
                console.log(data._embedded)
            })
        searchPeople(this.params.query)
            .then(data => {
                console.log(data._embedded)
            })
    }

    render(){
        return html`
            ${commonStyles}

            <app-header></app-header>

            <main>
        <div class="search__filter">
            <form id="search__form">
                <input type="text" name="keywords">
                <select name="search__filter">
                    <option value="people">People</option>
                    <option value="company">Company</option>
                </select>
                <!--div id="search__filter__jobtype">Job type <i class="fas fa-sort-down"></i></div>
                <div id="search__filter__createdat">Created at <i class="fas fa-sort-down"></i></div-->
                <button type="submit">Search</button>
            </form>            
        </div>
            

        <div class="main">
            ${this.userList.map((user) =>
                    html`
                                    <app-people-card id=${user.id}></app-people-card>`
            )}
            ${this.companyList.map((company) =>
                        html`
                                    <app-company-card id=${company.id}></app-company-card>`
                    )}
            <app-people-card
                Name="abc"
                job="abc"
                email="abc@gmail.com">
            </app-people-card>

            <app-people-card
            Name="abc"
            job="abc"
            email="abc@gmail.com">
        </app-people-card>

            <app-company-card
                Name="abc"
                location="hanoi"
                follower="1000 followers">
            </app-company-card>
        </div>

    </main>
        `;}
}

customElements.define('app-general-search', GeneralSearch);