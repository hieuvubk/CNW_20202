const getUserAvt = (id) => {
    const url = `http://localhost:9002/api/v1/storage/users/${id}/avatar`;
    return fetch(url)
        .then(res => res.json());
};

export default getUserAvt;
