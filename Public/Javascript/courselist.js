var ratings = 0;
var professorsRatings = [];

function professorRating(name, id){
	console.log(name);
	if(typeof(professorsRatings[name]) != "undefined"){
		return;
	}
	professorsRatings[name] = 1;
	var nameBreak = [];
	var prev = 0
	for(var i = 0; i < name.length; i++){
		if(name.charAt(i) === ' '){
			nameBreak.push(name.substring(prev,i));
			prev = i + 1;
		}
	}
	nameBreak.push(name.substring(prev,name.length));
	if(nameBreak.length > 2){
		name = nameBreak[0] + " " + nameBreak[2];
	}
	console.log("The professor's name is " + name);
	$.ajax({url: "http://localhost:3000/courseguide/rmp?name=" + encodeURIComponent(name),
type: "get", success: function(data,status,xhr){
		console.log(id);
		console.log(data);
		//$("#" + id).append("<p>Rate My Professors("+ data.rating.quality + ")</p>");
		$("#rmp").append("<table class='pure-table pure-table-bordered'><thead> <tr> <th>" + name + " Rate My Professor </th> </tr> </thead> <tbody id='rating" + ratings.toString() + "'>");
		var currentRating = ratings;
		ratings += 1;
		var c = $("#course-name").text();
		console.log("Course is" + c);

		for(var j = 0; j < c.length; j++){
			if(c.charAt(j) == ' '){
				c = c.substring(0,j) + c.substring(j + 1,j + 4);
				break;
			}
		}
		for(var i = 0; i < data.rating.courses.length; i++){
			if(data.rating.courses[i] == c){
				$("#rating" + currentRating.toString()).append("<tr> <td>" + data.rating.comments[i] + "</td>  </tr>");
			}
		}
		$("#rmp").append("</tbody> </table");

		return;
}})
}


$(document).ready(function(){
	console.log("This document is in fact ready");
	$("form").submit(function(e){
		e.preventDefault();
		var comment = $("#comment-text").val();
		//console.log($("#comment-text").val());
		console.log($("#course-name").text())
		event.preventDefault();
		$.ajax({url: "http://localhost:3000/courseguide/addcomment", type: "post",
		data: {"comment": comment, "time": Date.getTime,
		course: $("#course-name").text()}, success:
		function(data,status,xhr){
			console.log("Completed");
			if(status === "success"){
				$("#comment-body").append("<tr> <td>" + comment + "</td> </tr>");
			}
		}});

	return false;
	});
	$(".Lecture").each(function(prof){
		professorRating($(this).text(),$(this).attr("id"));
	})

});