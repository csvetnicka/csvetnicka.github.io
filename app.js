/* app.js is the entry point to the application and contians middleware common to 
all routes */
var express = require("express");
var morgan = require("morgan");
var path = require("path");
var url = require("url");
var bodyParser = require('body-parser');

var fs = require("fs");
var http = require("http");
var request = require("request");
var https = require("https");

var app = express();
var index = require("./routes/index");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
//Set up view engine
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine", "ejs");


app.use(morgan("short"));
var publicPath = path.join(__dirname,"Public"); //Joins current working directory with Public
app.use("/",index);
app.use(express.static(publicPath)); //Every file available in the Public folder can be requested


/* Set up connection to database hosted at mlab.com */

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://<username>:<password>@ds145667.mlab.com:45667/myscheduleplus', (err, database) => {
  	  if (err) return console.log(err)
  db = database
 
  app.listen(3000, () => {
    console.log('listening on 3000')
  });
});






