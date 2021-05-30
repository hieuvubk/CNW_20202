import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { commonStyles } from '../../shared/styles/common-styles';
import {GeneralSearchStyle } from '../generalSearch/generalSearch-style';


import '../../components/layouts/Header/Header';
import '../../components/Sidebar/PeopleSidebar';
import '../../components/nameCard_Contact/nameCard_Contact';
import '../../components/general-search/company-card/company-card';
import '../../components/general-search/people-card/peopleCard';


class GeneralSearch extends MaleficComponent{
    static get properties(){
        return{
            
        }
    }

    static get styles(){
        return [GeneralSearchStyle];
    }

    
    constructor(){
        super();
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
        `;
    }
}

customElements.define('app-general-search', GeneralSearch);