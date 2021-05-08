import { css } from '../../core/components/css-tag';

export const buttonStyle = css`
    .btn {
        text-decoration: none;
        color: white;
        background-color: #e67e22;
        padding: 15px 30px;
        border-radius: 20px;
        margin: 0 30px;
        display: inline-block;
        width: 180px;
        text-align: center;
        transition: all 0.3s;
    }

    .btn:hover,
    .btn:active {
        background-color: #d35400;
    }
    
    .btn-post {
        text-decoration: none;
        color: #265077;
        padding: 15px 15px;
        border-radius: 20px;
        border: 2px solid #265077;
        display: inline-block;
        width: 155px;
        text-align: center;
        transition: all 0.3s;
        margin-left: 23%;
        font-weight: bold;
    }
    
    .btn-post:hover,
    .btn-post:active {
        background-color: #e67e22;
        color: white;
        border-color: #e67e22;
    }
`;
