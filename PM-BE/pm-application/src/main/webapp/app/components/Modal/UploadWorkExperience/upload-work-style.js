import { css } from '../../../core/components/css-tag';

export const uploadWorkStyle = css`
    .post__edit__header{
        display: flex;
        padding-bottom: 10px;
        border-bottom: 1px solid black;
    }
    
    .post__edit__header h3{
        flex: 1 1 auto;
    }

    .post__edit__close{
        border-radius: 50%;
        height: 25px;
        width: 25px;
        border: 1px solid black;
        position: relative;
        cursor: pointer;
    }

    .post__edit__close i{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    .post__edit__close:hover {
        color: #265077;
    }

    .avt-modal {
        padding: 5px 10px;
        width: 100%;
    }

    :host {
        font-size: 1rem;
    }
    h5 {
        font-size: 0.9rem;
        font-weight: lighter;
        line-height: 30px;
        color: #777;
        padding-bottom: 12px;
        padding-top: 2px;
    }
    h1, h3 {
        color: #1e4258;
    }
    h3 {
        font-weight: lighter;
    }
    .input {
        position: relative;
        text-align: left;
        border: 1px solid #ccd0d5;
        border-radius: 4px;
        width: 98%;
        height: 30px;
        line-height: 20px;
        margin-bottom: 2%;
        color: #777;
        padding: 10px;
        outline: none;
    }
    input:focus {
        border: 1px solid #265077;
    }
    .selector {
        background-position: right 5px center;
        background-repeat: no-repeat;
        background-size: 14px;
        padding-right: 5%;
        height: 30px;
        margin-bottom: 2%;
        width: 25%;
        color: #777;
        border: 1px solid #ccd0d5;
        border-radius: 4px;
        display: inline-block;
    }
    .gender {
        margin-bottom: 1%;
    }
    .select {
        margin-top: 0px;
        margin-right: 4px;
        border-radius: 4px;
        border-width: 1px;
        display: inline-block;
        line-height: 18px;
        color: #777;
        font-size: 15px;
        padding: 0 10px 0 3px;
    }
    .post__edit__text textarea{
        display: block;
        resize: none;
        width: 98%;
        height: 80px;
        outline: none;
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #ccd0d5;
    }
`;
