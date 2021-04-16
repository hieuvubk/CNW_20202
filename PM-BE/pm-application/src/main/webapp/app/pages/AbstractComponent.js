export default class AbstractComponent extends HTMLElement {
    constructor() {
        super();
    }
    
    async render(page) {
        const response = await fetch(page);
        
        return await response.text();
    }
}
