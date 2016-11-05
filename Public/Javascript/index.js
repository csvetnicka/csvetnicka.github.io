

$(document).ready(function(){
var firstPadding = true
	$("#add-class").click(function(){
			if(firstPadding){
				$("#add-class-form").append('<div class="form-group top-input input-sm" ><input type="text" class="form-control"></div>');
				firstPadding = false
			}
			else{
				$("#add-class-form").append('<div class="form-group input-sm" ><input type="text" class="form-control"></div>');
			}

	});
});