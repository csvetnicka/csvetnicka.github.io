var request = require('request');


request({
  url: 'https://api-km.it.umich.edu/token',
  headers: {    
    "Authorization": "Basic MlBXNFFEM2dHT2d5RElDQm0zZjIyZnZhcGFnYTpnNzJrUUlfZjRuMjRkWlBWMWNlZjZackFOODBh",
  "Content-Type": "application/x-www-form-urlencoded"},
  method: 'POST',
 
  form: {
  'grant_type': 'client_credentials',
    'scope': 'PRODUCTION',
  }
}, function(err, res) {
  var json = JSON.parse(res.body);
  var token = json.access_token;
  //console.log(err);
// console.log("Access Token:", json.access_token);
console.log("Bearer " + token);
request({
  url:  'https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/1220/Schools',
  headers: {    
    "Authorization": "Bearer " + token,
  "Accept": "application/json"},
  method: 'GET',
 
}, function(err, res) {
  var json = JSON.parse(res.body);
  console.log(json.getSOCSchoolsResponse.School);
  //console.log(err);
// console.log("Access Token:", json.access_token);


});


});

