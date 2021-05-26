import MaleficComponent from '../../core/components/MaleficComponent';
import { html } from '../../core/components/malefic-html';
import { workCardStyle } from './word-card-style';
import { commonStyles } from '../../shared/styles/common-styles';

import '../Button/Button';

class WorkCard extends MaleficComponent {
    static get styles() {
        return [workCardStyle];
    }

    static get properties() {
        return {
            title: {type: String},
            employmentType: {type: String},
            company: {type: String},
            startDate: {type: Date},
            endDate: {type: Date},
            location: {type: String},
        };
    }

    constructor() {
        super();
        this.title = '';
        this.employmentType = '';
        this.company = '';
        this.startDate = '';
        this.endDate = 'Now';
        this.location = '';
    }

    render() {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        const startMonth = start.getMonth() + 1;
        const endMonth = end.getMonth() + 1;
        const startYear = end.getFullYear();
        const endYear = end.getFullYear();
        const endText = endYear == 1970 ? 'Now' : `${endMonth}/${endYear}`;
        return html`
            ${commonStyles}
            <div class="news-card">
                <div class="news-header">
                    <div class="poster">
                        <i class="fas fa-briefcase brief"></i>
                        <div class="poster-info">
                            <div style="font-weight: bold; font-size: 18px;">${this.title}</div>
                            <p>${this.company}</p>
                            <p>${this.employmentType}</p>
                            <p>${this.location}</p>
                            <p>${startMonth}/${startYear} - ${endText}</p>
                        </div>
                        <i class="fas fa-pen edit"></i>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('work-card', WorkCard);
