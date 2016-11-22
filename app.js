/* app.js is the entry point to the application and contians middleware common to 
all routes */
var express = require("express");
var morgan = require("morgan");
var path = require("path");
var url = require("url");
var bodyParser = require('body-parser');
var rmp = require("rmp-api");
var fs = require("fs");
var http = require("http");
var request = require("request");
var https = require("https");


var app = express();
var index = require("./routes/index");
var courseGuide = require("./routes/courseguide");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
//Set up view engine
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine", "ejs");


app.use(morgan("short"));
var publicPath = path.join(__dirname,"Public"); //Joins current working directory with Public
app.use("/courseguide",courseGuide);
app.use("/",index);

app.use(express.static(publicPath)); //Every file available in the Public folder can be requested


/* Set up connection to database hosted at mlab.com */

const MongoClient = require('mongodb').MongoClient

var token = undefined;

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
  token = json.access_token;
  console.log("Token = " + token);
  exports.token = token;
  //console.log(err);
// console.log("Access Token:", json.access_token);
//console.log("Bearer " + token);



});
 
var callback = function(professor) {
  if (professor === null) {
    console.log("No professor found.");
    return;
  }
  console.log(professor);
};
 
rmp.get("Michael Smith", callback);
MongoClient.connect('mongodb://ksandera:number18@ds145667.mlab.com:45667/myscheduleplus', (err, database) => {
  	  if (err) return console.log(err)
   db = database
	//console.log(db);
 
  app.listen(3000, () => {
    console.log('listening on 3000')
  });
});






