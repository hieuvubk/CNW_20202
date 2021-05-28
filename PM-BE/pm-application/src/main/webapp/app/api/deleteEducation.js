import { getXSRFToken } from '../shared/utils/header-utils';

const deleteEducation = (id) => {
    const url = `http://localhost:9002/api/v1/profile/educations/${id}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('X-XSRF-TOKEN', getXSRFToken(document.cookie));
    const request = new Request(url, {
        method: 'DELETE',
        headers: headers
    });
    return fetch(request)
        .then(res => res.status);
}
export default deleteEducation;
