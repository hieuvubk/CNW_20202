import MaleficComponent from '../../../core/components/MaleficComponent';
import { html } from '../../../core/components/malefic-html';
import { commonStyles } from '../../../shared/styles/common-styles';
import { newsCardStyle } from './news-card-style';

import '../../Dropdown/Dropdown';
import '../../Modal/SearchBar/SearchBar';
import '../../Dropdown/ProfileMenu/ProfileMenu';

class NewsCard extends MaleficComponent {
    static get properties() {
        return {
            avatar:{type:String},
            recruitImage:{type:String},
            recruitVideo:{type:String}
        };
    }
    
    static get styles() {
        return [newsCardStyle];
    }
    
    constructor() {
        super();
    }
    
    render() {
        return html`
            ${commonStyles}
            
            <div class="news-card">
<div class="news-header">
    <div class="poster">
        <img id="poster-avatar" src=${this.avatar}/>
        <div class="poster-info">
            <div style="font-weight: bold; font-size: 18px;"><slot name="name"/></div>
            <div style="font-size: 12px;"><slot name="followers"/></div>
            <div style="font-size: 12px;"><slot name="time"/></div>
        </div>
    </div>
</div>

<div class="recruit-info">
    <div><slot name="recruit-text"/></div>
    <img id="recruit-image" src=${this.recruitImage}/>
    <iframe src=${this.recruitVideo}></iframe>
</div>

<div class="news-react">
    <div class="react">
        <div>
            <div class="react-icon" id="react-icon-like"><slot name="react-like"/></div>
        </div>
        <div>
            <div class="react-icon" id="react-icon-comment"><slot name="react-comment"/></div>
        </div>
        <div>
            <div class="react-icon"><slot name="react-share"/></div>
        </div>
    </div>
</div>

<div class="comment" id="comment">
    <div class="comment__card">
        <div class="comment__card__avatar">
            <img id="comment__card__avatar" src="https://cdn.theculturetrip.com/wp-content/uploads/2018/05/shutterstock_89159080.jpg">
        </div>

        <div class="comment__card__content">
            <div class="comment__card__content__name">
                <a href="#">Some account</a>
            </div>

            <div class="comment__card__content__detail">
                <p>This is a beautiful sight!</p>
            </div>
            
            <div class="comment__card__content__react">
                <div id="comment__card__react__like" > Like </div>
                <div id="comment__card__react__reply"> Reply </div>
            </div>
        </div>
    </div>
</div>
</div>
        `;
    }
}

customElements.define('news-card', NewsCard);
