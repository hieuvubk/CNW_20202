import { css } from '../../core/components/css-tag';

export const modalStyle = css`
    .modal {
        z-index: 10000;
        background-color: #fff;
        position: fixed;
        top: 15vh;
        left: 25%;
        width: 50%;
        max-width: 100%;
        transition: 200ms ease-in-out;
        transform: scale(0);
        padding: 10px 15px;
        max-height: calc(130vh - 210px);
        overflow-y: auto;
    }
    .active {
        transform: scale(1);
    }
`;
