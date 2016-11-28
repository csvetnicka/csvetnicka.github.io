var request = require('request');
const MongoClient = require('mongodb').MongoClient

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
//console.log("Bearer " + token);


MongoClient.connect('mongodb://ksandera:number18@ds145667.mlab.com:45667/myscheduleplus', (err, database) => {
      if (err) return console.log(err)
   db = database
  //console.log(db);
 
  //console.log("Is running");


 
});

})

