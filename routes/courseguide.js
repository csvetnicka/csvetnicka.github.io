var express = require("express");
var guide = express.Router();
var request = require("request");
var config = require("./../app.js");
var schoolCodes = {"Architecture & Urban Planning": "AUP", "Dental Hygiene": "DH", "Dentistry": "DEN",
"School of Education": "EDU", "College of Engineering": "ENG", "Information": "INF", "Kinesiology": "KIN", "Literature, Science & the Arts": "LSA"};
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

guide.get("/getdepartments",function(req,res,next){
  console.log("SCHooz" + req.query.school);
  var schoolCode = schoolCodes[req.query.school];
  request({
  url:  'https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/2120/Schools/' + schoolCode +  "/Subjects",
  headers: {    
    "Authorization": "Bearer " + config.token,
  "Accept": "application/json"},
  method: 'GET',
 
}, function(err, apiRes) {
    var subjectsResponse = JSON.parse(apiRes.body);
   var schoolSubjects = subjectsResponse.getSOCSubjectsResponse.Subject;
   var subjectsResponse = []
   for(var i = 0; i < schoolSubjects.length; i++){
    subjectsResponse.push(schoolSubjects[i]["SubjectDescr"]);
   }
    res.writeHead(200, {"Content-Type": "application/json"});
   var json = JSON.stringify({departments: subjectsResponse});
   console.log("JSON" + json);
   res.end(json);
})
  //res.end();
});


module.exports = guide;


