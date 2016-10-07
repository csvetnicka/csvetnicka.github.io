
$(document).ready(function(){
$("#add").click(function(){

	var coursenum = $("#num").val();
	nurl = "http://localhost:8001/search?num=" + String(coursenum);
	console.log(nurl);
	$.ajax({url:nurl, type: 'GET', success: function(data){
		console.log(data);
	}});
})});




