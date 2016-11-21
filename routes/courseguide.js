var express = require("express");
var guide = express.Router();
var request = require("request");
var config = require("./../app.js");
var schoolCodes = {"Architecture & Urban Planning": "AUP", "Dental Hygiene": "DH", "Dentistry": "DEN",
"Education": "EDU", "College of Engineering": "ENG", "Information": "INF", "Kinesiology": "KIN", "Literature, Science & the Arts": "LSA"};
var terms = {"Winter 2017": "2120", "Fall 2016": "2110"};
guide.get("/",function(req,res,next){
	var initialRes = res;
	console.log("Here in the course guide homepage");
	if(typeof(req.query.term) == "undefined"){
	res.render("courseguide");
}
else{
	request({
  url:  'https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/' + terms[req.query.term] + "/Schools/" + schoolCodes[req.query.school] + "/Subjects",
  headers: {    
    "Authorization": "Bearer " + config.token,
  "Accept": "application/json"},
  method: 'GET',
 
}, function(err, res) {
  var json = JSON.parse(res.body);
  //console.log(json.getSOCSubjectsResponse.Subject);
  var subjectCode = ""
  for(var i = 0; i < json.getSOCSubjectsResponse.Subject.length; i++){
  			if(json.getSOCSubjectsResponse.Subject[i].SubjectShortDescr == req.query.department){
  				subjectCode = json.getSOCSubjectsResponse.Subject[i].SubjectCode;
  			}
  }
  console.log("Subject code = " + subjectCode);

  request({url:'https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/' + terms[req.query.term] + "/Schools/" + schoolCodes[req.query.school] + "/Subjects/" + subjectCode + "/CatalogNbrs",
   headers: {
   	"Authorization": "Bearer " + config.token,
   	"Accept": "application/json"},
   	method: "GET"
   }, function(err,res){
   		var thisjson = JSON.parse(res.body);
   	
   		console.log(thisjson.getSOCCtlgNbrsResponse.ClassOffered);
   		console.log(thisjson.getSOCCtlgNbrsResponse.ClassOffered.length);
   		initialRes.render("courselist",{courses: thisjson.getSOCCtlgNbrsResponse.ClassOffered});

   } );
});


}

});


module.exports = guide;


