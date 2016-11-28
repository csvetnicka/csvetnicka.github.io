var request = require("request");
var config = require("./app.js");
var schoolCodes = {"Architecture & Urban Planning": "AUP", "Dental Hygiene": "DH", "Dentistry": "DEN",
"School of Education": "EDU", "College of Engineering": "ENG", "Information": "INF", "Kinesiology": "KIN", "Literature, Science & the Arts": "LSA",
"Ross School of Business": "BA"};
/* Accepts name of school.  Then queries that UMICH public api
for the names of every department in the school, which is returned in an array */
function getDepartments(school){
	var schoolCode = schoolCodes[school];
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

   return subjectsResponse;
}

);

}


exports.getDepartments = getDepartments;