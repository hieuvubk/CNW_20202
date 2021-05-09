import { css } from '../../core/components/css-tag';

export const modalStyle = css`
    .modal {
        z-index: 10000;
        background-color: #fff;
        position: fixed;
        top: 12%;
        left: 28%;
        width: 30%;
        max-width: 30%;
        transition: 200ms ease-in-out;
        transform: scale(0);
        padding: 10px 15px;
    }
    
    .active {
        transform: scale(1);
    }
`;
