import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { myAccountStyle } from './my-account-style';
import { commonStyles } from '../../shared/styles/common-styles';

import '../Button/Button';

class MyAccount extends MaleficComponent {
    static get styles() {
        return [myAccountStyle];
    }

    render() {
        return html`
            ${commonStyles}
         
            <h1>My account</h1>
            <h3>Manage and protect your account</h3>
            <div class="row">
                <div class="col span-1-of-4 title">
                    <h5>Username</h5>
                    <h5>Full Name</h5>
                    <h5>Email</h5>
                    <h5>Phone Number</h5>
                    <h5>Date Of Birth</h5>
                    <h5>Gender</h5>
                </div>
                <div class="col span-3-of-4 info">
                    <input type="text" class="input" id="username" value="admin">
                    <input type="text" class="input" id="fullname" value="Alex">
                    <input type="text" class="input" id="email" value="Hieu@gmail.com">
                    <input type="text" class="input" id="phone" value="0366951607">
                    <div class="dob" data-="selectors">
                        <select class="selector" aria-label="Day" name="birthday_day" id="day">
                            <option value="0">Day</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                        <select class="selector" aria-label="Month" name="birthday_month" id="month">
                            <option value="0">Month</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <select class="selector" aria-label="Year" name="birthday_year" id="year">
                            <option value="0">Year</option>
                            <option value="2005">2005</option>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000">2000</option>
                            <option value="1999">1999</option>
                            <option value="1998">1998</option>
                            <option value="1997">1997</option>
                            <option value="1996">1996</option>
                            <option value="1995">1995</option>
                            <option value="1994">1994</option>
                            <option value="1993">1993</option>
                            <option value="1992">1992</option>
                            <option value="1991">1991</option>
                            <option value="1990">1990</option>
                            <option value="1989">1989</option>
                            <option value="1988">1988</option>
                            <option value="1987">1987</option>
                            <option value="1986">1986</option>
                            <option value="1985">1985</option>
                            <option value="1984">1984</option>
                            <option value="1983">1983</option>
                            <option value="1982">1982</option>
                        </select>
                    </div>
                    <div class="gender" data-="radio">
                        <span class="select">
                            <input type="radio" name="gender" id="fmale">
                            <label class="choose" for="fmale">Female</label>
                        </span>
                        <span class="select">
                            <input type="radio" name="gender" id="male">
                            <label class="choose" for="male">Male</label>
                        </span>
                        <span class="select">
                            <input type="radio" name="gender" id="other">
                            <label class="choose" for="other">Other</label>
                        </span>
                    </div>
                    <div class="update-btn">
                    <app-button btnclass="btn-save">Save</app-button>
                    <app-button btnclass="btn-cancel">Cancel</app-button>
                    </div>
                </div>

            </div>
      
        `;
    }
}

customElements.define('my-account', MyAccount);
