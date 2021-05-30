import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { jobCardStyle } from './job-card-style';
import { commonStyles } from '../../shared/styles/common-styles';

import '../Button/Button';
import '../PostCard/commentCard';
import getAttachment from '../../api/getAttachment';

class JobCard extends MaleficComponent {
    static get styles() {
        return [jobCardStyle];
    }

    static get properties() {
        return {
            accountImg: {type: String},
            title: {type: String},
            company: {type: String},
            location: {type: String},
            postText: {type: String},
            postId: {type: Int16Array},
            showComment:{type:String},
            showEdit: {type: Boolean},
            showDropdownEdit: {type: String},
            attachment: {type: Object}
        };
    }

    handleToggleShowComment(){
        this.showComment = (this.showComment=="block")?"none":"block";
    }

    handleToggleEdit(){
        this.showEdit = !this.showEdit;
        this.placeHolderImage = (this.postImg==undefined)?"./content/images/avatar.png":this.postImg;
    }

    handleToggleDropdown(){
        //let dropdownIcon = this.shadowRoot.querySelector(".edit-icon");
        //dropdownIcon.stopPropagation();
        this.showDropdownEdit = (this.showDropdownEdit=="none")?"block":"none";
        /*window.addEventListener("click",()=>{
            if(this.showDropdownEdit=="block") this.showDropdownEdit="none";
            console.log("test");
        })*/
    }

    closeEdit(){
        this.showEdit=false;
    }

    handleDeletePost(){
        this.showPost="none";
    }

    connectedCallback() {
        super.connectedCallback();
        getAttachment(this.postId)
        .then(res => this.attachment = res._embedded.attachmentList[0])
        .catch( e => console.log(e));
    }

    constructor() {
        super();
        this.showDropdownEdit="none";
        this.showPost="block";
        this.attachment={};  
    }

    render() {
        return html`
            ${commonStyles}

        <div style="display:${this.showPost};">
            <div class="news-card">
                <div class="news-header">
                    <div class="poster">
                        <img src="${this.accountImg}" alt="">
                        <div class="poster-info">
                            <div style="font-weight: bold; font-size: 18px;">${this.title}</div>
                            <div style="font-size: 12px;">${this.company}</div>
                            <div style="font-size: 12px;">${this.location}</div>
                        </div>
                    </div>

                    <div class="edit" >
                        <div class="edit-icon" @click="${this.handleToggleDropdown}">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>

                        <div id="dropdown-edit" style="display:${this.showDropdownEdit}">
                            <div id="edit-post" @click="${this.handleToggleEdit}">Edit post</div>
                            <div id="delete-post" @click="${this.handleDeletePost}">Delete post</div>
                        </div>
                    </div>

                    <app-upload-post
                        typePost="Edit your post"
                        editText="${this.postText}"
                        .show="${this.showEdit}"
                        @close-modal="${this.closeEdit}"
                        placeHolderImage=${this.placeHolderImage}>
                    </app-upload-post>
                </div>

                <div class="recruit-info">
                    <div>${this.postText}</div>
                    <img src="${this.attachment.thumbUrl}" alt="" style="display: ${this.attachment.thumbUrl==undefined?'none':'block'}">
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('job-card', JobCard);
