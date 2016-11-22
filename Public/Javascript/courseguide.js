
function getDepartments(school){
	var encodedSchool = encodeURI(school);
		$("#department-input").empty();
	$.ajax({url: "http://localhost:3000/courseguide/getdepartments?school=" + encodeURIComponent(school),
method: "GET", success: function(data,status,xhr){
		var departments = data.departments;

		console.log(departments);
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
			console.log(courses);
			$("#dataholder").empty();
			$("#dataholder").append("<datalist id='courses' >");
			for(var i = 0; i < courses.length; i++){
				$("#courses").append("<option>" + courses[i] + "</option>");

			}
			$("#dataholder").append("</datalist>")

		} });
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




