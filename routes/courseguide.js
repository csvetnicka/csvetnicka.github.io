var express = require("express");
var guide = express.Router();
var request = require("request");
var config = require("./../app.js");
var rmp = require("rmp-api");
var schoolCodes = {"Architecture & Urban Planning": "AUP", "Dental Hygiene": "DH", "Dentistry": "DEN",
"School of Education": "EDU", "College of Engineering": "ENG", "Information": "INF", "Kinesiology": "KIN", "Literature, Science & the Arts": "LSA",
"Ross School of Business": "BA"};
var terms = {"Winter 2017": "2120", "Fall 2016": "2110"};
guide.get("/",function(req,res,next){
  var initialRes = res;
  //console.log("Here in the course guide homepage");
  console.log(typeof(req.query.term) + " TYPES");
 res.render("courseguide");


});


guide.get("/search",function(req,initialRes,next){

 var departmentCode = "";
 var courseNumber = "";
 var termCode = terms[req.query.term];
 var schoolCode = schoolCodes[req.query.school];
 for(var i = 0; i < req.query.course.length; i++){
  if(req.query.course.charAt(i) === ' '){
    departmentCode = req.query.course.substring(0,i);
    courseNumber = req.query.course.substring(i + 1, i + 4);
    break;
  }
 }
 console.log(termCode);
 console.log(schoolCode);
 
  request({
  url:  "https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/" + termCode + "/Schools/" + schoolCode + "/Subjects/" + departmentCode + "/CatalogNbrs/" + courseNumber,
  headers: {    
    "Authorization": "Bearer " + config.token,
  "Accept": "application/json"},
  method: 'GET',
 
}, function(err, apiRes) {
    var subjectsResponse = JSON.parse(apiRes.body);
    var description = {
      "course": req.query.course,
      "description": subjectsResponse.getSOCCourseDescrResponse.CourseDescr
    };

   // return initialRes.render("courselist",description);

    request({
  url:  "https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/" + termCode + "/Schools/" + schoolCode + "/Subjects/" + departmentCode + "/CatalogNbrs/" + courseNumber + "/Sections",
  headers: {    
    "Authorization": "Bearer " + config.token,
  "Accept": "application/json"},
  method: 'GET',
 
}, function(err, sectionRes) {
    var sectionResponse = JSON.parse(sectionRes.body);
    var sections = sectionResponse.getSOCSectionsResponse.Section;
    var sectionInformation = [];
    console.log("SECTIONs");
    console.log(sections);
    for(var i = 0; i < sections.length; i++){
      var info = {};
      info.SectionNumber = sections[i].SectionNumber;
      info.SectionTypeDescr = sections[i].SectionTypeDescr;
      info.CreditHours = sections[i].CreditHours;
      info.AvailableSeats = sections[i].AvailableSeats;
      info.Days = sections[i].Meeting.Days;
      info.Times = sections[i].Meeting.Times;
      info.InstructorNames = sections[i].ClassInstructors
      sectionInformation.push(info);
      console.log(info.InstructorNames);
    //  console.log(info);

    }

    description["sectionInformation"] = sectionInformation;
    console.log("Section Information: ");
    console.log(sectionInformation);
    return initialRes.render("courselist",description);
  
})
   
  
})

});




//Get Departments
guide.get("/getdepartments",function(req,res,next){
 // console.log("SCHooz" + req.query.school);

  var schoolCode = schoolCodes[req.query.school];
 
  request({
  url:  'https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/2120/Schools/' + schoolCode +  "/Subjects",
  headers: {    
    "Authorization": "Bearer " + config.token,
  "Accept": "application/json"},
  method: 'GET',
 
}, function(err, apiRes) {
    var subjectsResponse = JSON.parse(apiRes.body);
    console.log(subjectsResponse);
   
   var schoolSubjects = subjectsResponse.getSOCSubjectsResponse.Subject;
   if(!schoolSubjects){
    res.end();
   }
   var subjectsResponse = []
   for(var i = 0; i < schoolSubjects.length; i++){
    subjectsResponse.push(schoolSubjects[i]["SubjectDescr"]);
   }
    res.writeHead(200, {"Content-Type": "application/json"});
   var json = JSON.stringify({departments: subjectsResponse});
   //console.log("JSON" + json);
   res.end(json);
})
  //res.end();
});





//Get autocomplete courses
guide.get("/getcourses",function(req,res,next){
    var schoolCode = schoolCodes[req.query.school];
    var department = req.query.department;
    console.log("This is " + department);
     request({
  url:  'https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/2120/Schools/' + schoolCode +  "/Subjects",
  headers: {    
    "Authorization": "Bearer " + config.token,
  "Accept": "application/json"},
  method: 'GET',
 
}, function(err, apiRes) {

    var subjectsResponse = JSON.parse(apiRes.body);
    console.log(subjectsResponse);
   var schoolSubjects = subjectsResponse.getSOCSubjectsResponse.Subject;
   var departmentCode = "";
   for(var i = 0; i < schoolSubjects.length; i++){
    if(department === schoolSubjects[i]["SubjectDescr"]){
      departmentCode = schoolSubjects[i]["SubjectCode"];
      break;
    }
   }
   
      request({
  url:  'https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/2120/Schools/' + schoolCode +  "/Subjects/" + departmentCode + "/CatalogNbrs",
  headers: {    
    "Authorization": "Bearer " + config.token,
  "Accept": "application/json"},
  method: 'GET',
 
}, function(err, apiDepartmentResult) {
    var departmentResponse = JSON.parse(apiDepartmentResult.body);
    console.log(departmentResponse);

    var courseNames = [];
    var courses = departmentResponse.getSOCCtlgNbrsResponse.ClassOffered;
    if(courses){
    for(var i = 0; i < courses.length; i++){
      courseNames.push(departmentCode + " " + courses[i].CatalogNumber + ": " + courses[i].CourseDescr);
    }
  
  res.writeHead(200, {"Content-Type": "application/json"});
   var json = JSON.stringify({"courses": courseNames});
   //console.log("JSON" + json);
   res.end(json);
 }
 else{
  res.sendStatus(404);
 }
   
    
})
    
})

})


module.exports = guide;


