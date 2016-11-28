
function professorRating(name, id){
	console.log(name);
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
		$("#" + id).append("<p>Rate My Professors("+ data.rating.quality + ")</p>");
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