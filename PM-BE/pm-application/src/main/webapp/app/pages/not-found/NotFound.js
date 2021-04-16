import AbstractComponent from '../../components/AbstractComponent';
import { importStyle } from '../../utils/css-utils';

const style = `
    * {
        line-height: 1.2;
        margin: 0;
    }
    
    html {
        color: #888;
        display: table;
        font-family: sans-serif;
        height: 100%;
        text-align: center;
        width: 100%;
    }
    
    body {
        display: table-cell;
        vertical-align: middle;
        margin: 2em auto;
    }
    
    h1 {
        color: #555;
        font-size: 2em;
        font-weight: 400;
    }
    
    p {
        margin: 0 auto;
        width: 280px;
    }
    
    @media only screen and (max-width: 280px) {
        body,
        p {
            width: 95%;
        }
        
        h1 {
            font-size: 1.5em;
            margin: 0 0 0.3em;
        }
    }
`;

export default class NotFound extends AbstractComponent {
    constructor() {
        super();
        importStyle(style);
        this.render('not-found.html').then(page => {
            this.innerHTML = page;
        });
    }
}

window.customElements.define('app-not-found', NotFound);
