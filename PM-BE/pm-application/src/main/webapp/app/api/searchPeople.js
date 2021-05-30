const searchPeople = (query) => {
    const url = `/api/v1/_search/profile/${query}`;
    return fetch(url)
        .then(res => res.json());
};

export default searchPeople;