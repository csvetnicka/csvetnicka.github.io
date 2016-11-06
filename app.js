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
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine", "ejs");


var courses = {"EECS": ["183",   //List of courses in EECS department?
"203","270","285","382", "280", "281", "370", "373","376",
"381", "388", "441", "427", "442", "445",
"467", "470", "481","482","483", "484", "485",
"486", "489","490", "492", "494", "475", "477",
"487",
"490", "493","497"],
"ENGR": ["101"] };
courses["EECS"].sort();

//Course Prerequisite Dictionary
//course_Prereqs['course name'][0] will always be the course's title
//"|" allows for differentiation: [(Course Name), All Required,..., | , One Of,..., |, No Credit,...]
var course_Prereqs = { "ENGR 101" : ["Intro Comp&Prog", "|", "|", "ENGR 151", "EECS 183"],
					   "EECS 183" : ["Elementary Programming Concepts", "|", "|", "ENGR 101", "ENGR 151"], 
					   "EECS 203" : ["Discrete Mathematics", "|", "MATH 115", "MATH 116", "MATH 119", "MATH 120", "MATH 121", "MATH 156", "MATH 175",
					   				 "MATH 176", "MATH 185", "MATH 186", "MATH 214", "MATH 215", "MATH 216", "MATH 217", "MATH 255", "MATH 256",
					   				 "MATH 285", "MATH 286", "MATH 295", "MATH 296", "MATH 417", "MATH 419"],
					   "EECS 270" : ["Introduction to Logic Design", "|", "EECS 183", "ENGR 101"],
					   "EECS 280" : ["Programming and Introductory Data Structures", "|", "EECS 182", "EECS 183", "ENGR 101", "ENGR 151"],
					   "EECS 281" : ["Data Structures and Algorithms", "EECS 280", "|", "EECS 203", "MATH 465", "MATH 565"],
					   "EECS 370" : ["Introduction to Computer Organization", "EECS 280", "|", "EECS 203", "EECS 270", "MATH 465", "MATH 565"],
					   "EECS 373" : ["Design of Microprocessor Based Systems", "EECS 270", "EECS 370"],
					   "EECS 376" : ["Foundations of Computer Science", "EECS 280", "|", "EECS 203", "MATH 465", "MATH 565"],
					   "EECS 381" : ["Object Orientated and Advanced Programming", "EECS 281", "EECS 370"],
					   "EECS 382" : ["Internet-scale Computing", "|", "EECS 281", "EECS 282"],
					   "EECS 388" : ["Introduction to Computer Security", "EECS 281"],
					   "EECS 427" : ["VLSI Design I", "EECS 270", "EECS 312", "EECS 320"],
					   "EECS 441" : ["Mobile App Development for Entrepreneurs", "EECS 281", "EECS 370", "|", "EECS 373", "EECS 381", "EECS 388",
					   				 "EECS 427", "EECS 442", "EECS 445", "EECS 467", "EECS 470", "EECS 475", "EECS 477", "EECS 478", "EECS 482", 
					   				 "EECS 483", "EECS 484", "EECS 485", "EECS 486", "EECS 487", "EECS 489", "EECS 490", "EECS 492", "EECS 493"],
					   "EECS 442" : ["Computer Vision", "EECS 281"],
					   "EECS 445" : ["Introduction to Machine Learning", "EECS 281"],
					   "EECS 467" : ["Autonomous Robotics", "EECS 281"],
					   "EECS 470" : ["Computer Architecture", "EECS 270", "EECS 370"],
					   "EECS 475" : ["Introduction to Cryptography", "EECS 280", "EECS 376", "|", "EECS 203", "MATH 312", "MATH 412"],
					   "EECS 477" : ["Introduction to Algorithms", "EECS 281", "EECS 376"],
					   "EECS 481" : ["Software Engineering", "EECS 281"],
					   "EECS 482" : ["Introduction to Operating Systems", "EECS 281", "EECS 370"],
					   "EECS 483" : ["Compiler Construction", "EECS 281"],
					   "EECS 484" : ["Database Management Systems", "EECS 281"],
					   "EECS 485" : ["Web Database and Information Systems", "|", "EECS 281", "EECS 382"],
					   "EECS 486" : ["Information Retrieval and Web Search", "EECS 281"],
					   "EECS 487" : ["Interactive Computer Graphics", "EECS 281"],
					   "EECS 489" : ["Computer Networks", "EECS 482"],
					   "EECS 490" : ["Programming Languages", "EECS 281"],
					   "EECS 492" : ["Introduction to Artificial Intelligence", "EECS 281"],
					   "EECS 493" : ["User Interface Development", "EECS 281"],
					   "EECS 494" : ["Computer Game Design and Development", "EECS 281"]
					   };

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
		res.writeHeader
});


app.post("/createsuggestions",function(req,res){
	console.log("Post request received");

	//Store Courses user has taken (For comparison)
	var takenKeys = Object.keys(req.body);
	Taken = []

	for (var i = 0; i < req.body.numCourses; i++) {
		Taken.push(req.body[takenKeys[i]].toUpperCase());
	}
	
	//Compare taken courses to prereqs and return recommendations
	var recommendations =[]
	var key = Object.keys(course_Prereqs);
	var size = key.length;
	
	for (var i = 0; i < size; i++) {
		var check = course_Prereqs[key[i]];
		var j = 1;

		if (Taken.indexOf(key[i]) == -1) { //User has not taken this course already
			//All Required
			var canTake = true;
			while((j < check.length) && (check[j] != '|')) {
				if (Taken.indexOf(check[j]) == -1) {
					canTake = false;
					break; //No need to check further
				}
				j++;
			}
			if (canTake == false) {
				continue; //User has not taken all required courses
			}

			//One of
			j++;
			var oneOf = false;
			if (((j < check.length) && (check[j] == '|')) || (j >= check.length)) {
				oneOf = true;
			} else {
				while((j < check.length) && (check[j] != '|')) {
					if (Taken.indexOf(check[j]) != -1) {
						oneOf = true;
					}
					j++;
				}
			}
			if (oneOf == false) {
				continue; //User has not taken at least one of required "OR" courses
			}

			//No Credit will be given
			j++;
			var noCredit = false;
			while(j < check.length) {
				if (Taken.indexOf(check[j]) != -1) {
					noCredit = true;
					break; //No need to check further
				}
				j++;
			}
			if (noCredit == true) {
				continue; //User will not be given credit for this course
			}

			//Add This course to reccomendations for user
			recommendations.push(key[i] + ": " + course_Prereqs[key[i]][0]);
		}
	}
	console.log(recommendations);
	res.writeHead(200, {"Content-Type": "application/json"});
var json = JSON.stringify({courseReqs: recommendations});

	res.end(json);
  });
	



/*
app.get("/recommendations",function(req,res){
	console.log("Redirected");
	return res.render("recommendations");

});

*/



//Creates sever to listen on port 3000
http.createServer(app).listen(3000,function(){
	console.log("App listenening on port 3000");
});