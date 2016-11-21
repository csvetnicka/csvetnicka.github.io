	$(document).ready(function(){
	$("#register-submit").click(function(arg){
		arg.preventDefault();
		console.log("submitted");
		var firstName = $("#firstname-creation").val(); //First name from form 
		
		var lastName = $("#lastname-creation").val(); //Last name from form
		var email = $("#email-creation").val(); //Email from form
		var password = $("#user-creation").val(); //Password from form
		var passwordConfirmation = $("#password-creation-confirm").val();
		$.ajax({type:"POST", url: "http://localhost:3000/createaccount", 
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    async: true, data: JSON.stringify({"firstname":
			firstName, "lastname": lastName, "email": email, "password": password,
			confirm: passwordConfirmation}),
			success: function(){
				console.log("success")  //
			}});




		
	});

});