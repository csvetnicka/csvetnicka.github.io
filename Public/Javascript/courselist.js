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
});