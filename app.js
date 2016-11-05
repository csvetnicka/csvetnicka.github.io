var express = require("express");
var morgan = require("morgan");
var path = require("path");
var url = require("url");
var bodyParser = require('body-parser');

var fs = require("fs");
var http = require("http");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
var courses = {"EECS": ["183",   //List of courses in EECS department?
"203","270","285","382", "280", "281", "370", "373","376",
"381", "388", "441", "427", "442", "445",
"467", "470", "481","482","483", "484", "485",
"486", "489","490", "492", "494", "475", "477",
"487",
"490", "493","497"],
"ENGR": ["101"] };

courses["EECS"].sort();
app.use(morgan("short"));
var publicPath = path.join(__dirname,"Public"); //Joins current working directory with Public

app.use(express.static(publicPath)); //Every file available in the Public folder can be requested

//Autocomplete function, seems to work I think we should use the html alternative   

app.get("/autocomplete",function(req,res){
	console.log("In autocomplete");
	var departmentInput = req.query.input.substring(0,4);
	var numberInput = req.query.input.substring(4,req.query.input.length);
	console.log(departmentInput);
	
	if(!courses.hasOwnProperty(departmentInput)){
		console.log("Not found in dictionary");
		res.end();
		return;
	}
	
	var departmentArray = courses[departmentInput];

	
	var className = "class";
	var returnValues  = {}
	var numReturned = 0;
	for(var i = 0; i < departmentArray.length; i++){
		if(departmentArray[i].length >= numberInput.length  && departmentArray[i].substring(0,numberInput.length) === numberInput){
			console.log(className + numReturned.toString());
			returnValues[className + numReturned.toString()] = departmentInput + " " +  departmentArray[i];
			numReturned++;
		}
	}
	console.log("Results");
	console.log(returnValues);

	//return returnValues;
	res.json(returnValues);
	res.end();



});

app.post("/createaccount",function(req,res){
		console.log(req.body.lastName);
		console.log(req.body.firstName);
		console.log(req.body.password);
		console.log(req.body.email);
});



//Creates sever to listen on port 3000
http.createServer(app).listen(3000,function(){
	console.log("App listenening on port 3000");
});