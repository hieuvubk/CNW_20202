import { css } from '../../core/components/css-tag';

export const modalStyle = css`
    .modal {
        z-index: 10000;
        background-color: #fff;
        position: absolute;
        top: 70px;
        left:50%;
        right: 50%;
        width: 50%;
        min-width: 500px;
        transition: 200ms ease-in-out;
        transform: translateX(-50%);
        padding: 10px 15px;
        display: none;
    }
    .active {
        display: block;
    }
`;

