
$(document).ready(function(){
var once = false; //Have course recommendations already been given
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
	$(".t").click(function(){
		console.log(event.target.text);  //Change term dropdown to selected element
		$("#term").html(event.target.text);

	});

	$(".s").click(function(){
		$("#school").html(event.target.text); //Change school dropdown to selected element
	});
	$(".m").click(function(){
		$("#major").html(event.target.text); //Cange Major dropdown to selected element
	});

	var courseInformation = {};
	$("#course-submit").click(function(){
		if(!once){
		var coursesTaken = {}
		for(var i = 0; i < numAdded; i++){
			coursesTaken[course + i.toString()] = $("#" + course + i.toString()).val();
		}
		coursesTaken["numCourses"] = numAdded;

		//console.log(coursesTaken);
		$.ajax({type:"POST", url: "http://localhost:3000/createsuggestions", 
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: true, data: JSON.stringify(coursesTaken),
			success: function(data,status, xhr){
				console.log("success");  //
				reqs = data.courseReqs;
				$("#rec-list").append("<h2 class='text-center'> Your Computer Science Course Recommendations </h2>");
				for(var i = 0; i < reqs.length; i++){
					newId = "req" + i.toString();
					newButtonId = "info" + i.toString();
					var coursename = reqs[i].substring(0,4) + "-" + reqs[i].substring(5,8);
					//console.log(coursename);
					$("#rec-list").append("<div>");
					$("#rec-list").append("<li class='list-inline' ><p id='" + newId + "'>" + reqs[i] + "</p> <div id='div" + coursename + "'>");
					$("#rec-list").append("<button class='course-info btn btn-info' type='button' id='" + coursename + "' >Info</button> </li>");
					$("#rec-list").append("</div> </div>");
					courseInformation[coursename] = false;

				
				}
			once = true;
			}});
	}
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
					$("#" + "div" + id).append("<div class='well img-rounded' style='padding:-100px;'><p>" + data.description + "</p> </div>");
				}
			
			});

		}

		courseInformation[event.target.id] = true;
		
	});
});