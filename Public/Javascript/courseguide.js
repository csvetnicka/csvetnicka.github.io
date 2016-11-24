
function getDepartments(school){
	var encodedSchool = encodeURI(school);
	console.log(school + " IS");
		$("#department-input").empty();
	$.ajax({url: "http://localhost:3000/courseguide/getdepartments?school=" + encodeURIComponent(school),
method: "GET", success: function(data,status,xhr){
		var departments = data.departments;
		console.log("DATA" + data);
	
		for(var i = 0; i < departments.length; i++){
			$("#department-input").append("<option>" + departments[i] + "</option>");
		}
		getCourses($("#department-input").val());
}});
}

function getCourses(department){
	var encodedDepartment = encodeURIComponent(department);
	var encodedSchool = encodeURIComponent($("#school-input").val());
	console.log(encodedSchool);
	$.ajax({url: "http:///localhost:3000/courseguide/getcourses?department=" + encodedDepartment + "&school=" + encodedSchool,
		method: "GET",success: function(data,status,xhr){
			var courses = data.courses;
			if(courses){
			$("#courses").empty();
			$("#dataholder").append("<datalist id='courses' >");
			for(var i = 0; i < courses.length; i++){
				$("#courses").append("<option>" + courses[i] + "</option>");

			}
			$("#dataholder").append("</datalist>")
		}

		} });
}


function courseInformation(){
	var term = $("#term-input").val()
	var school =  $("#school-input").val();
	var department = $("#department-input").val();
	var course = $("#course-input").val();
	console.log(term + " " + school + " " + department + " " + course-input);

}

$(document).ready(function(){
	console.log("Course guide loaded");
	getDepartments($("#school-input").val());

	$("#school-input").change(function(){
		getDepartments($("#school-input").val());
	});

	$("#department-input").change(function(){
		getCourses($("#department-input").val());
	});

});




