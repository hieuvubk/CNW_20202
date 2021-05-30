import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { commonStyles } from '../../shared/styles/common-styles';
import { chatStyle } from './chat-style';
import { RSocketClient, JsonSerializer, IdentitySerializer } from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';
import store from '../../store/store';

import '../../components/layouts/Header/Header';
import { repeat } from '../../core/components/directives/repeat';
import { withRouter } from '../../core/router/malefic-router';

class Chat extends withRouter(MaleficComponent) {
    static get properties() {
        return {
            messages: {type: Array},
            textInput: {type: String},
            rsocket: {type: Object},
            toggleMenu: {type: Boolean}
        };
    }
    
    static get styles() {
        return [chatStyle];
    }
    
    constructor() {
        super();
        this.auth = {};
        this.messages = [];
        this.textInput = '';
        this.conversationId = '';
        this.toggleMenu = false;
    }
    
    async connectedCallback() {
        super.connectedCallback();
        const state = await store.getState();
        this.auth = state.auth;
        this.conversationId = this.params.conversationId;
        
        this.client = new RSocketClient({
            serializers: {
                data: JsonSerializer,
                metadata: IdentitySerializer
            },
            setup: {
                payload: {
                    data: this.auth.userId,
                    metadata: this.sendTo('user-id')
                },
                keepAlive: 60000,
                lifetime: 180000,
                dataMimeType: 'application/json',
                metadataMimeType: 'message/x.rsocket.routing.v0',
            },
            transport: new RSocketWebSocketClient({
                url: 'ws://localhost:8000/rsocket'
            }),
        });
    
        this.client.connect().subscribe({
            onComplete: (socket) => {
                this.rsocket = socket;
                this.rsocket
                    .requestStream({
                        data: null,
                        metadata: this.sendTo(`channels.${this.conversationId}`)
                    })
                    .subscribe({
                        onComplete: (data) => {
                            console.log(data);
                            console.log('complete');
                        },
                        onError: (error) => {
                            console.log("Connection has been closed due to:: " + error);
                        },
                        onNext: (payload) => {
                            console.log(payload);
                            this.addMessage(payload.data);
                        },
                        onSubscribe: (subscription) => {
                            subscription.request(0x7fffffff);
                        },
                    });
            },
            onError: (error) => {
                console.log("Connection has been refused due to:: " + error);
            },
            onSubscribe: (cancel) => {
            
            }
        });
    }
    
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.client) {
            this.client.close();
        }
    }
    
    sendTo(route) {
        return String.fromCharCode(route.length) + route;
    }
    
    addMessage(newMessage) {
        console.log("add message:" + JSON.stringify(newMessage))
        this.messages = [...this.messages, newMessage];
    }
    
    sendMessage() {
        if (this.rsocket && this.textInput !== '') {
            const newMessage = {
                senderId: this.auth.userId,
                content: this.textInput
            };
            this.rsocket.fireAndForget({
                data: newMessage,
                metadata: this.sendTo(`channels.${this.conversationId}`)
            });
            this.textInput = '';
        }
    }
    
    handleOnChangeInput(e) {
        this.textInput = e.target.value;
    }
    
    checkSenderIsMe(userId) {
        return this.auth.userId === userId;
    }
    
    toggleActionMenu() {
        this.toggleMenu = !this.toggleMenu;
    }
    
    render() {
        return html`
            <style>
                @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
            </style>
            ${commonStyles}
            
            <app-header></app-header>
            
            <div class="container-fluid h-100" style="margin-top: 100px">
                <div class="row justify-content-center h-100">
                    <div class="col-md-4 col-xl-3 chat"><div class="card mb-sm-3 mb-md-0 contacts_card">
                        <div class="card-header">
                            <div class="input-group">
                                <input type="text" placeholder="Search..." name="" class="form-control search">
                                <div class="input-group-prepend">
                                    <span class="input-group-text search_btn"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="card-body contacts_body">
                            <ui class="contacts">
                                <li class="active">
                                    <div class="d-flex bd-highlight">
                                        <div class="img_cont">
                                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">
                                        </div>
                                        <div class="user_info">
                                            <span>Khalid</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="d-flex bd-highlight">
                                        <div class="img_cont">
                                            <img src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg" class="rounded-circle user_img">
                                        </div>
                                        <div class="user_info">
                                            <span>Taherah Big</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="d-flex bd-highlight">
                                        <div class="img_cont">
                                            <img src="https://i.pinimg.com/originals/ac/b9/90/acb990190ca1ddbb9b20db303375bb58.jpg" class="rounded-circle user_img">
                                        </div>
                                        <div class="user_info">
                                            <span>Sami Rafi</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="d-flex bd-highlight">
                                        <div class="img_cont">
                                            <img src="http://profilepicturesdp.com/wp-content/uploads/2018/07/sweet-girl-profile-pictures-9.jpg" class="rounded-circle user_img">
                                        </div>
                                        <div class="user_info">
                                            <span>Nargis Hawa</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="d-flex bd-highlight">
                                        <div class="img_cont">
                                            <img src="https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg" class="rounded-circle user_img">
                                        </div>
                                        <div class="user_info">
                                            <span>Rashid Samim</span>
                                        </div>
                                    </div>
                                </li>
                            </ui>
                        </div>
                        <div class="card-footer"></div>
                    </div></div>
                    <div class="col-md-8 col-xl-6 chat">
                        <div class="card">
                            <div class="card-header msg_head">
                                <div class="d-flex bd-highlight">
                                    <div class="img_cont">
                                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">
                                    </div>
                                    <div class="user_info">
                                        <span>Chat with Khalid</span>
                                        <p>1767 Messages</p>
                                    </div>
                                </div>
                                <span id="action_menu_btn" @click=${this.toggleActionMenu}><i class="fas fa-ellipsis-v"></i></span>
                                ${this.toggleMenu ?
                                    html`
                                        <div class="action_menu">
                                            <ul>
                                                <li><i class="fas fa-user-circle"></i> View profile</li>
                                                <li><i class="fas fa-plus"></i> Add to group</li>
                                                <li><i class="fas fa-ban"></i> Block</li>
                                            </ul>
                                        </div>
                                    ` : null
                                }
                            </div>
                            <div class="card-body msg_card_body">
                                ${repeat(this.messages, (m) => m.id, (m, index) => html`
                                    ${!this.checkSenderIsMe(m.senderId) ?
                                        html`
                                            <div class="d-flex justify-content-start mb-4">
                                                <div class="img_cont_msg">
                                                    <img src="${m.avatar}" class="rounded-circle user_img_msg">
                                                </div>
                                                <div class="msg_container">
                                                    ${m.content}
                                                    <span class="msg_time">8:40 AM, Today</span>
                                                </div>
                                            </div>
                                        ` :
                                        html`
                                            <div class="d-flex justify-content-end mb-4">
                                                <div class="msg_container_send">
                                                    ${m.content}
                                                    <span class="msg_time_send">8:55 AM, Today</span>
                                                </div>
                                            </div>
                                        `
                                    }
                                `)}
                            </div>
                            <div class="card-footer">
                                <div class="input-group">
                                    <textarea
                                        id="msg-input"
                                        name="" class="form-control type_msg"
                                        placeholder="Type your message..."
                                        @input=${this.handleOnChangeInput}
                                        .value=${this.textInput}
                                    ></textarea>
                                    <div class="input-group-append">
                                        <span class="input-group-text send_btn" @click=${this.sendMessage}>
                                            <i class="fas fa-location-arrow"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('app-chat', Chat);
