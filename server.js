var express = require('express');

var app = express();
app.use(express.static('static'));

app.get('/',function(req,res) {
	res.send('hello world');
})

app.get('/search', function(req,res){
	
	console.log(req.query.num);
})
var server = app.listen(8081,function(){
	var host = server.address().address
	var port = server.address().port

	console.log("Listening");
});
