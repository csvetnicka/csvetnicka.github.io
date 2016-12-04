


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
	var encodedTerm = encodeURIComponent($("#term-input").val());
	console.log($("#term-input").val());
	$.ajax({url: "http:///localhost:3000/courseguide/getcourses?department=" + encodedDepartment + "&school=" + encodedSchool + "&term=" + encodedTerm,
		method: "GET",success: function(data,status,xhr){
			var courses = data.courses;
			if(courses){
			$("#course-input").empty();
			$("#dataholder").append("<datalist id='courses' >");
			for(var i = 0; i < courses.length; i++){
				$("#course-input").append("<option>" + courses[i] + "</option>");

			}
			$("#dataholder").append("</datalist>")
		}

		} });
}


$(document).ready(function(){
//var once = false; //Have course recommendations already been given
var numAdded = 0;
var course = "course";
var firstPadding = true
	$("#add-class").click(function(){
		var courseAddition = 'id="'+course + numAdded.toString() + '">';
		//console.log(courseAddition)
			if(firstPadding){


				$("#add-class-form").append('<div class="form-group top-input input-sm" style="padding-top: 15px; padding-bottom: 30px;" ><input list="classes" type="text" class="form-control"' +
					courseAddition + '</div>');
				firstPadding = false
				numAdded += 1;
			}
			else{
				$("#add-class-form").append('<div class="form-group top-input input-sm" ><input list="classes" type="text" class="form-control"' + courseAddition+
					'</div>');
				numAdded += 1;
			}

	});
	$("#ascending").click(function(){
			reqs = reqs.sort(function(a,b){
			return a["difficulty"] - b["difficulty"];
		});
		printSuggestions(reqs);
	})

	$("#descending").click(function(){
			reqs = reqs.sort(function(a,b){
			return b["difficulty"] - a["difficulty"];
		});
		printSuggestions(reqs);
	})
	$(".t").click(function(){
		console.log(event.target.text);  //Change term dropdown to selected element
		$("#term").html(event.target.text);

	});

	$(".s").click(function(){
		$("#school").html(event.target.text); //Change school dropdown to selected element
	});
	$(".m").click(function(){
		$("#major").html(event.target.text); //Change Major dropdown to selected element
	});
	console.log("Course guide loaded");
	getDepartments($("#school-input").val());

	$("#school-input").change(function(){
		getDepartments($("#school-input").val());
	});

	$("#department-input").change(function(){
		getCourses($("#department-input").val());
	});
	var courseInformation = {};

		function printSuggestions(reqs){
				$("#rec-list").empty();
				$("#rec-list").append("<h2 class='text-center'> Your Computer Science Course Recommendations </h2>");
				for(var i = 0; i < reqs.length; i++){
					newId = "req" + i.toString();
					newButtonId = "info" + i.toString();
					//console.log(reqs[i]["course"]);
					var coursename = reqs[i]["course"].substring(0,4) + "-" + reqs[i]["course"].substring(5,8);
					//console.log(coursename);
					$("#rec-list").append("<div class='row'> ");
					$("#rec-list").append("<a href='http://localhost:3000/courseguide/search/?term=Winter+2017&department=Elec+Engin+%26+Computer+Sci&course=EECS+" + encodeURIComponent(reqs[i]["course"].substring(5,8)) + "'><h5 id='" + newId + "'>" + reqs[i]["course"] +  " Difficulty: " + reqs[i]["difficulty"].toString() + "</h5> <div id='div" + coursename + "'>");

					$("#rec-list").append("</div> </div>");
					courseInformation[coursename] = false;


				}
			}
	$("#course-submit").click(function(){

		var coursesTaken = {}
		for(var i = 0; i < numAdded; i++){
			coursesTaken[course + i.toString()] = $("#" + course + i.toString()).val();
		}
		coursesTaken["numCourses"] = numAdded;
	//	coursesTaken["ascending"] = $("#ascending").is(":checked");
	  //  coursesTaken["descending"] = $("#descending").is(":checked");
	  	reqs = [];

		//console.log(coursesTaken);
		$.ajax({type:"POST", url: "http://localhost:3000/createsuggestions",
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: true, data: JSON.stringify(coursesTaken),
			success: function(data,status, xhr){
				console.log("success");  //
				reqs = data.courseReqs;
				console.log(reqs);
				printSuggestions(reqs);

			}});

		return false;
	});


	$(".help").on("click","button.course-info",function(){
		console.log("id");
		if(!courseInformation[event.target.id]){
		var course = event.target.id.substring(0,4) + event.target.id.substring(5,8);
			var id = event.target.id;
			console.log(id);
			$.ajax({type:"GET", url: "http://localhost:3000/courseinformation?term=2120&course=" +course, async: true,
			success: function(data,status, xhr){
					$("#" + "div" + id).append("<div class='well course-info img-rounded' style='padding:-100px;'><p>" + data.description + "<h4> <a href='http://www.lsa.umich.edu/cg/cg_detail.aspx?content=2110EECS" + course.substring(4,7) + "001&termArray=f_16_2110'> Course Schedule </a> </h4>" + "</p> </div>");
				}

			});

		}

		courseInformation[event.target.id] = true;

	});
});