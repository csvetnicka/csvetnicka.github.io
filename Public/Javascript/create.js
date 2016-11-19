


$(document).ready(function(){
	console.log("Create works!");




	$("#account-submit").click(function(){
		console.log("submitted");
		var firstName = $("#user-firstname").val(); //First name from form 
		
		var lastName = $("#user-lastname").val(); //Last name from form
		var email = $("#user-email").val(); //Email from form
		var password = $("#user-password").val(); //Password from form
		$.ajax({type:"POST", url: "http://localhost:3000/createaccount", 
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: true, data: JSON.stringify({"firstname":
			firstName, "lastname": lastName, "email": email, "password": password}),
			success: function(){
				console.log("success")  //
			}});




		
	})
});//7Gt0:2dDzSB4