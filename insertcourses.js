var course_Prereqs = { "ENGR 101" : ["Intro Comp&Prog", "|", "|", "ENGR 151", "EECS 183"],
					   "EECS 183" : ["Elementary Programming Concepts", "|", "|", "ENGR 101", "ENGR 151"], 
					   "EECS 203" : ["Discrete Mathematics", "|", "MATH 115", "MATH 116", "MATH 119", "MATH 120", "MATH 121", "MATH 156", "MATH 175",
					   				 "MATH 176", "MATH 185", "MATH 186", "MATH 214", "MATH 215", "MATH 216", "MATH 217", "MATH 255", "MATH 256",
					   				 "MATH 285", "MATH 286", "MATH 295", "MATH 296", "MATH 417", "MATH 419"],
					   "EECS 270" : ["Introduction to Logic Design", "|", "EECS 183", "ENGR 101"],
					   "EECS 280" : ["Programming and Introductory Data Structures", "|", "EECS 182", "EECS 183", "ENGR 101", "ENGR 151"],
					   "EECS 281" : ["Data Structures and Algorithms", "EECS 280", "|", "EECS 203", "MATH 465", "MATH 565"],
					   "EECS 370" : ["Introduction to Computer Organization", "EECS 280", "|", "EECS 203", "EECS 270", "MATH 465", "MATH 565"],
					   "EECS 373" : ["Design of Microprocessor Based Systems", "EECS 270", "EECS 370"],
					   "EECS 376" : ["Foundations of Computer Science", "EECS 280", "|", "EECS 203", "MATH 465", "MATH 565"],
					   "EECS 381" : ["Object Orientated and Advanced Programming", "EECS 281", "EECS 370"],
					   "EECS 382" : ["Internet-scale Computing", "|", "EECS 281", "EECS 282"],
					   "EECS 388" : ["Introduction to Computer Security", "EECS 281"],
					   "EECS 427" : ["VLSI Design I", "EECS 270", "EECS 312", "EECS 320"],
					   "EECS 441" : ["Mobile App Development for Entrepreneurs", "EECS 281", "EECS 370", "|", "EECS 373", "EECS 381", "EECS 388",
					   				 "EECS 427", "EECS 442", "EECS 445", "EECS 467", "EECS 470", "EECS 475", "EECS 477", "EECS 478", "EECS 482", 
					   				 "EECS 483", "EECS 484", "EECS 485", "EECS 486", "EECS 487", "EECS 489", "EECS 490", "EECS 492", "EECS 493"],
					   "EECS 442" : ["Computer Vision", "EECS 281"],
					   "EECS 445" : ["Introduction to Machine Learning", "EECS 281"],
					   "EECS 467" : ["Autonomous Robotics", "EECS 281"],
					   "EECS 470" : ["Computer Architecture", "EECS 270", "EECS 370"],
					   "EECS 475" : ["Introduction to Cryptography", "EECS 280", "EECS 376", "|", "EECS 203", "MATH 312", "MATH 412"],
					   "EECS 477" : ["Introduction to Algorithms", "EECS 281", "EECS 376"],
					   "EECS 481" : ["Software Engineering", "EECS 281"],
					   "EECS 482" : ["Introduction to Operating Systems", "EECS 281", "EECS 370"],
					   "EECS 483" : ["Compiler Construction", "EECS 281"],
					   "EECS 484" : ["Database Management Systems", "EECS 281"],
					   "EECS 485" : ["Web Database and Information Systems", "|", "EECS 281", "EECS 382"],
					   "EECS 486" : ["Information Retrieval and Web Search", "EECS 281"],
					   "EECS 487" : ["Interactive Computer Graphics", "EECS 281"],
					   "EECS 489" : ["Computer Networks", "EECS 482"],
					   "EECS 490" : ["Programming Languages", "EECS 281"],
					   "EECS 492" : ["Introduction to Artificial Intelligence", "EECS 281"],
					   "EECS 493" : ["User Interface Development", "EECS 281"],
					   "EECS 494" : ["Computer Game Design and Development", "EECS 281"]
					   };




for (var key in course_Prereqs){
	var str = "db.courses.insert('department': '" + key.substring(0,5) + "', 'coursenumber': '" + key.substring(5,8) + "' , 'prerequisites': [";
	var a = course_Prereqs[key];
	for(var i = 0; i < a.length; i++){
		str += "'" + a[i] + "'";
		if(i < a.length - 1){
			str += ",";
		}	
	}
	str += ']});';
	console.log(str);
}