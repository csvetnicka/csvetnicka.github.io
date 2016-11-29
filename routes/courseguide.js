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


guide.get("/rmp",function(req,res,next){
  var professorName = req.query.name;
  console.log("Professor's name is " + professorName);

  function professorCallback(professor){

  //  console.log(professor);
    res.writeHead(200, {"Content-Type": "application/json"});
   var json = JSON.stringify({"rating": professor});
   //console.log("JSON" + json);
    //console.log(professor);
   res.end(json);
  }

  rmp.get(professorName,professorCallback)

});

guide.post("/addcomment",function(req,res,next){

  var department = "";
  var courseNum = ""
  for(var i = 0; i < req.body.course.length; i++){
    if(req.body.course.charAt(i) === ' '){
      department = req.body.course.substring(0,i);
      courseNum = req.body.course.substring(i + 1, i + 4);
      break;
    }
  }
  db.collection("courses").find({"department": department,"coursenumber": courseNum}).toArray(function(err,results){
      if(results.length === 0){
        console.log("Shouldn't be here");
        var comments = [];
        comments.push(req.body.comment);
        db.collection("courses").insert({"department": department, "coursenumber": courseNum, "comments": comments});
      }
      else if(typeof(results[0].comments) === "undefined"){
         var comments = [];
        comments.push(req.body.comment);
        db.collection("courses").update({"department": department,"coursenumber": courseNum},{"$set":{"comments": comments}});
      }
      else{
        db.collection("courses").update({"department": department,"coursenumber": courseNum},{"$push": {"comments": req.body.comment}});
        }
        res.sendStatus(200);
      }
  );

});


function sectionDescription(section){
    var info = {};

      info.SectionNumber = section.SectionNumber;
      info.SectionTypeDescr = section.SectionTypeDescr;
      info.CreditHours = section.CreditHours;
      info.AvailableSeats = section.AvailableSeats;
      info.Days = [];
      info.Times = [];

      info.Instructors = [];
      if(typeof(section.ClassInstructors) != "undefined"){
        if(typeof(section.ClassInstructors.length) == "undefined"){
         var name = section.ClassInstructors.InstrName;
         for(var j = 0; j < name.length; j++){
          if(name.charAt(j) == ","){
            name = name.substring(j + 1) + " " + name.substring(0,j);
            break;
          }
         }
         info.Instructors.push({"name": name, "rating": ""});
        }
        else{
          for(var j = 0; j < section.ClassInstructors.length; j++){
             var name = section.ClassInstructors[j].InstrName;
         for(var j = 0; j < name.length; j++){
          if(name.charAt(j) == ","){
            name = name.substring(j + 1) + " " + name.substring(0,j);
            break;
          }
         }
        info.Instructors.push({"name": name, "rating": ""});          }
        }
      }
      if(typeof(section.Meeting.length) == "undefined"){
        info.Times.push(section.Meeting.Days);
        info.Days.push(section.Meeting.Times);
      }
      else{
        for(var i = 0; i < section.Meeting.length; i++){
          info.Days.push(section.Meeting[i].Days);
          info.Times.push(section.Meeting[i].Times);
        }
      }
      return info;
}
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
    var title = "";
    for(var i = 0; i < description.description.length; i++){
        if(description.description.charAt(i) === '-'){
          title = description.description.substring(0,i);
          description["title"] = title;
          break;
        }
    }
    if(title === ""){
      description["title"] = "";
    }
    description["department"] = departmentCode;
    description["courseNumber"] = courseNumber;

   // return initialRes.render("courselist",description);

    request({
  url:  "https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/" + termCode + "/Schools/" + schoolCode + "/Subjects/" + departmentCode + "/CatalogNbrs/" + courseNumber + "/Sections",
  headers: {
    "Authorization": "Bearer " + config.token,
  "Accept": "application/json"},
  method: 'GET',

}, function(err, sectionRes) {
    var sectionResponse = JSON.parse(sectionRes.body);
    console.log("The SECTION RESPONSE");
    console.log(sectionResponse);
    var sections = sectionResponse.getSOCSectionsResponse.Section;
    console.log(sections);
    var sectionInformation = [];
  //  console.log("SECTIONs");
    //console.log("SECTOIN UNDEFINED" + sections.length);
    if(typeof(sections.length) == "undefined"){
      sectionInformation.push(sectionDescription(sections));
    }
    for(var i = 0; i < sections.length; i++){
      sectionInformation.push(sectionDescription(sections[i]))
      /*
      var info = {};
      info.SectionNumber = sections[i].SectionNumber;
      info.SectionTypeDescr = sections[i].SectionTypeDescr;
      info.CreditHours = sections[i].CreditHours;
      info.AvailableSeats = sections[i].AvailableSeats;
      info.Days = sections[i].Meeting.Days;
      info.Times = sections[i].Meeting.Times;
      info.Instructors = [];
      if(typeof(sections[i].ClassInstructors) != "undefined"){
        if(typeof(sections[i].ClassInstructors.length) == "undefined"){
         var name = sections[i].ClassInstructors.InstrName;
         for(var j = 0; j < name.length; j++){
          if(name.charAt(j) == ","){
            name = name.substring(j + 1) + " " + name.substring(0,j);
            break;
          }
         }
         info.Instructors.push({"name": name, "rating": ""});
        }
        else{
          for(var j = 0; j < sections[i].ClassInstructors.length; j++){
             var name = sections[i].ClassInstructors[j].InstrName;
         for(var j = 0; j < name.length; j++){
          if(name.charAt(j) == ","){
            name = name.substring(j + 1) + " " + name.substring(0,j);
            break;
          }
         }
        info.Instructors.push({"name": name, "rating": ""});          }
        }
      }
      sectionInformation.push(info);

    //  console.log(info);
    */

   }
    description["sectionInformation"] = sectionInformation;

    db.collection("courses").find({"department": departmentCode, "coursenumber": courseNumber}).toArray(function(err, response){
      if(response.length > 0){
      description.comments = response[0].comments;
    //  console.log(description.comments);
    }
   return initialRes.render("courselist",description);
    });


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
    console.log(schoolCode);
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
   console.log("SCHOOLCODE= " + schoolCode);
    console.log("Deparmetn code = " + department);
      request({

  url: "https://api-gw.it.umich.edu/Curriculum/SOC/v1/Terms/2120/Schools/" + schoolCode + "/Subjects/" + departmentCode +"/CatalogNbrs",
  headers: {
    "Authorization": "Bearer " + config.token,
  "Accept": "application/json"},
  method: 'GET',

}, function(err, apiDepartmentResult) {
    console.log("This is the response" + apiDepartmentResult);
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


