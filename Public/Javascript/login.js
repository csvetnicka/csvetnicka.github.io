$(document).ready(function(){
	$("#login-submit").click(function(){
		var email = $("#login-email").val();
		var password = $("#login-password").val();
		console.log("submitted");
		$.ajax({type: "POST",url:"http://localhost:3000/logininformation",
			contentType: "application/json; charset=utf-8", dataType: 'json',
			async: true, data: JSON.stringify({"email": email, "password": password}),
			success: function(){
				console.log("log in information submitted");
			}});
	});

});