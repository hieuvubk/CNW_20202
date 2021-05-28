import { getXSRFToken } from '../shared/utils/header-utils';
const uploadBackground = (companyId, asString) => {
    const url = `http://localhost:9002/api/v1/companies/${companyId}/admin/logo`;
    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('X-XSRF-TOKEN', getXSRFToken(document.cookie));
    const request = new Request(url, {
        method: 'POST',
        headers: headers,
        body: asString,
    });
    return fetch(request)
        .then(res => res.json())
}
export default uploadBackground;