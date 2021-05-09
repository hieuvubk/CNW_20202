import { css } from '../../core/components/css-tag';

export const modalStyle = css`
    .modal {
        z-index: 10;
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
    
    .modal-header {
        display: flex;
    }
    
    #overlay {
        position: fixed;
        opacity: 0;
        transition: 200ms ease-in-out;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .5);
        pointer-events: none;
    }
    
    #overlay.active {
        opacity: 1;
        pointer-events: all;
    }
    
    .active {
        transform: scale(1);
    }
`;
