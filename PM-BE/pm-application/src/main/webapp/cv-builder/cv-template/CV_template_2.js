const headers = new Headers();
headers.append('Content-Type', 'application/x-www-form-urlencoded');
headers.append('X-XSRF-TOKEN', "1be6e0e2-8ab6-4e71-a4c0-e050d33153f0");

const fetchParams = {
    method: "GET",
    mode: "no-cors",
    cache: "default",
    headers: headers,
  }
const profileUrl = `http://localhost:9002/api/v1/profile`;

fetch(profileUrl, fetchParams)
.then(res => console.log(res.json()))
.catch(e => console.log(e))




  
