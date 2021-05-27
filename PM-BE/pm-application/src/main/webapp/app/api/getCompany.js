const getCompany = () => {
    const url = `http://localhost:9002/api/v1/companies`;
    return fetch(url)
        .then(res => res.json());
};
export default getCompany;
