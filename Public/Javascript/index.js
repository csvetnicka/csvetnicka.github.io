

$(document).ready(function(){
var numAdded = 0;
var course = "course";
var firstPadding = true
	$("#add-class").click(function(){
		var courseAddition = 'id="'+course + numAdded.toString() + '">';
		console.log(courseAddition)
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

		console.log(coursesTaken);
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
					$("#rec-list").append("<p id='" + newId + "'>" + reqs[i] + "</p>");
					$("#rec-list").append("<button type='button' id='" + newButtonId + "' class='btn btn-info'>Info</button>");
					
				
				}
			
			}});
		return false;
	});
});