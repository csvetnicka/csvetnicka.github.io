var express = require("express");
var guide = express.Router();

guide.get("/",function(req,res,next){
	console.log("Here in the course guide homepage");
	res.render("courseguide");
});


module.exports = guide;