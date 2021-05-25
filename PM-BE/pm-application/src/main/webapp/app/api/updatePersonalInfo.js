const changeInfo = (phoneNumber) => (
    fetch('http://localhost:9002/api/v1/profile',
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'X-XSRF-TOKEN': '1be6e0e2-8ab6-4e71-a4c0-e050d33153f0'
            },
            body: JSON.stringify({ phoneNumber })
        })
        .then(res =>res.json())
);

module.exports = changeInfo;
