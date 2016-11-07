

$(document).ready(function(){
var numAdded = 0;
var course = "course";
var firstPadding = true
	$("#add-class").click(function(){
		var courseAddition = 'id="'+course + numAdded.toString() + '">';
		//console.log(courseAddition)
			if(firstPadding){


				$("#add-class-form").append('<div class="form-group top-input input-sm" ><input type="text" class="form-control"' + 
					courseAddition + '</div>');
				firstPadding = false
				numAdded += 1;
			}
			else{
				$("#add-class-form").append('<div class="form-group top-input input-sm" ><input type="text" class="form-control"' + courseAddition+
					'</div>');
				numAdded += 1;
			}

	});

	$("#course-submit").click(function(){
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
				$("#rec-list").append("<h4 class='text-center'> Your Course Recommendations </h4>");
				for(var i = 0; i < reqs.length; i++){
					newId = "req" + i.toString();
					newButtonId = "info" + i.toString();
					var coursename = reqs[i].substring(0,4) + "-" + reqs[i].substring(5,8);
					//console.log(coursename);
					$("#rec-list").append("<div>");
					$("#rec-list").append("<p id='" + newId + "'>" + reqs[i] + "</p>");
					$("#rec-list").append("<button class='course-info' type='button' id='" + coursename + "' class='btn btn-info'>Info</button>");
					$("#rec-list").append("</div>");

				
				}
			
			}});
		return false;
	});


	$("#help").on("click","button.course-info",function(){
		var course = event.target.id.substring(0,4) + event.target.id.substring(5,8);
			var id = event.target.id;
			console.log(id);
			$.ajax({type:"GET", url: "http://localhost:3000/courseinformation?term=2120&course=" +course, async: true,
			success: function(data,status, xhr){
					$("#" + id).append("<div class='well'><p>" + data.description + "</p> </div>");
				}
			
			});
		
	});
});