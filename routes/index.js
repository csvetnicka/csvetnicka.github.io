var express = require("express");
var router = express.Router();

router.get("/recommendation",function(req,res,next){
console.log("Here");

	res.render("index");
});

router.get("/",function(req,res,next){
	res.render("landing");
})

var courses = {"EECS": ["183",   //List of courses in EECS department?
"203","270","285","382", "280", "281", "370", "373","376",
"381", "388", "441", "427", "442", "445",
"467", "470", "481","482","483", "484", "485",
"486", "489","490", "492", "494", "475", "477",
"487",
"490", "493","497"],
"ENGR": ["101"] };
courses["EECS"].sort();

//Terms 2110 2120
//School ENG LSA
//Departments: EECS, ENGR
//Course Prerequisite Dictionary
//course_Prereqs['course name'][0] will always be the course's title
//"|" allows for differentiation: [(Course Name), All Required,..., | , One Of,..., |, No Credit,...]
/*
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
*/
var descriptions = {"EECS183" : "Elementary Programming Concepts --- Fundamental concepts and skills of programming in a high level language.  Flow of control:  selection, iteration, subprograms.  Data structures:  strings, arrays, records, lists, tables.  Algorithms using selection and iteration (decision making, finding maxima/minima, searching, sorting, simulation, etc.).  Good program design, structure, and style are emphasized.  Testing and debugging. Not intended for Engineering students (who should take ENGR 101), nor for CS majors in LSA who qualify for EECS 280.",
					"ENGR101": "Introduction to Computers and Programming\n\nAlgorithms and programming in C++ and Matlab, computing as a tool in engineering, introduction to the organization of digital computers.",
					"EECS203": "Discrete Math --- Introduction to the mathematical foundations of computer science.  Topics covered include:  prepositional and predicate logic, set theory, function and relations, growth of functions and asymptotic notation, introduction to algorithms, elementary combinatorics, and graph theory, and discrete probability theory.",
					"EECS270": "Introduction to Logic Design --- Binary and non-binary systems, Boolean algebra digital design techniques, logic gates, logic minimization, standard combinational circuits, sequential circuits, flip-flops, synthesis of synchronous sequential circuits, PLA's, ROM's, RAM's, arithmetic circuits, computer-aided design.  Laboratory includes hardware design and CAD experiments.",
					"EECS280": "Programming and Introductory Data Structures --- Techniques and algorithm development and effective programming, top-down analysis, structured programming, testing, and program correctness.  Program language syntax and static and runtime semantics.  Scope, procedure instantiation, recursion, abstract data types, and parameter passing methods.  Structured data types, pointers, linked data structures, stacks, queues, arrays, records, and trees.",
					"EECS281": "Data Structures and Algorithms --- Introduction to the algorithm analysis and O-notation; Fundamental data structures including lists, stacks, queues, priority queues, hash tables, binary trees, search trees, balanced, trees, and graphs; searching and sorting algorithms; recursive algorithms; basic graph algorithms; introduction to greedy algorithms and divide and conquer strategy.  Several programming assignments.",
					"EECS370": "Basic concepts of computer organization and hardware. Instructions executed by a processor and how to use these instructions in simple assembly-language programs. Stored-program concept. Data-path and control for multiple implementations of a processor. Performance evaluation, pipelining, caches, virtual memory, input/output.",
					"EECS373": "Principles of hardware and software microcomputer interfacing; digital logic design and implementation. Experiments with specially designed laboratory facilities. Introduction to digital development equipment and logic analyzers. Assembly language programming. Lecture and laboratory.",
					"EECS376": "An introduction to computation theory: finite automata, regular languages, pushdown automata, context-free languages, Turing machines, recursive languages and functions, and computational complexity.",
					"EECS475": "Cryptography plays a fundamental role in building secure computing and communication systems. With its fascinating history through centuries and intriguing connections to deep mathematical ('how quickly can we factor an integer?') and philosophical ('what is randomness?') questions, Cryptography is an important and beautiful subject. With increasing concerns over privacy, security, and authenticity of data and communications in our wired (and wireless) society, cryptographic applications are bound to pervade our lives. Cryptography is, and will continue to be, a vast and exciting area of research in Computer Science and Mathematics. This course is an introduction to the art and science of cryptography. At the end of the course, students should be well-prepared to apply the core scientific principles of cryptography to build secure software and communication systems as well as to pursue more advanced courses and state of the art research in cryptography.",
					"EECS381": "Course goals. This is a relatively new elective course that introduces advanced concepts and techniques in practical C/C++ programming. We will start with a quick, but deep, introduction to important topics in C programming, and then the course will emphasize object-oriented programming with the use of single and multiple inheritance and polymorphism, and using the Standard Library algorithms and containers. Key ideas in object-oriented analysis and design and common design patterns will be introduced. Programming projects will focus on learning and using techniques that are valuable for professional practice in developing and extending large scale or high-performance software relatively easily. In addition to these content goals, an important function of the course is to help students develop good programming practices, style, and skill, with as much personalized coaching and critique of individual student’s code as possible. In short, the course is intended for those who want to become outstanding programmers.",

					"EECS477": "Fundamental techniques for designing effi cient algorithms and basic mathematical methods for analyzing their performance. Paradigms for algorithm design: divide-and-conquer, greedy methods, graph search techniques, dynamic programming. Design of efficient data structures and analysis of the running time and space requirements of algorithms in the worst and average cases.",
					"EECS490": "This is a 4-credit course that introduces fundamental concepts in programming languages. The course covers different programming languages including functional, imperative, object-oriented, and logic programming languages; different programming language constructs for naming, control flow, memory management, concurrency, and modularity; as well as methodologies, techniques, and tools for writing correct and maintainable programs.EECS 490 counts as an upper-level CS technical elective for CS-ENGR and CS-LSA undergraduate students. It also counts as a 400-level elective for CSE graduate students",

					"EECS388": "This course introduces the principles and practices of computer security as applied to software, host systems, and networks. It covers the foundations of building, using, and managing secure systems. Topics include standard cryptographic functions and protocols, threats and defenses for real-world systems, incident responses, and computer forensics. There will be homework exercises, programming projects, and a final exam",
					"EECS441": "The use of mobile technologies is fast becoming integral to lives of individuals and groups across the planet. In this course, working in teams, students will propose, design, develop, test, and market software for mobile devices. Not only will best practices for mobile software development be learned, but best practices for entrepreneurs will also be learned. As well, students will put their creations up for sale/distribution by uploading their apps to the appropriate market place.",
					"EECS442": "Computational methods for the recovery, representation, and application of visual information. Topics from image formation, binary images, digital geometry, similarity and dissimilarity detection, matching, curve and surface fitting, constraint propagation relaxation labeling, stereo, shading texture, object representation and recognition, dynamic scene analysis, and knowledge based techniques. Hardware, software techniques",
					"EECS445": "Theory and implementation of state of the art machine learning algorithms for large-scale real-world applications. Topics include supervised learning (regression, classification, kernal methods, neural networks, and regularization) and unsupervised learning, (clustering, density estimation, and dimensionality and reduction).",
					"EECS467":"A theoretical and hands-on introduction to robotics from a computer science perspective. Topics: kinematics, inverse kinematics, sensors, sensor processing, motion planning, control, Kalman filters, dynamics, embedded systems, real time operating systems, state estimation and mapping, and artificial intelligence methods. Emphasizes laboratory design and programming of robotic systems.",
					"EECS470":"Basic concepts of computer architecture and organization. Computer evolution. Design methodology. Performance evaluation. Elementary queueing models. CPU architecture. Introduction sets. ALU design. Hardware and microprogrammed control. Nanoprogramming. Memory hierarchies. Virtual memory. Cache design. Input-output architectures. Interrupts and DMA. I/O processors. Parallel processing. Pipelined processors. Multiprocessors",
					"EECS481": "Advanced concepts and methods for the creation of software systems, dealing with structuring principles, design methodologies, and informal analysis. Emphasis is on process steps that are necessary in the development of large, complex software systems. Material emphasizes systems-level thinking (and builds upon EECS 481 Software Engineering currently offered)",
					"EECS482": "Operating system design and implementation: multi-tasking; concurrency and synchronization; inter-process communication; deadlock; scheduling; resource allocation; memory and storage management; input-output; file systems; protection and security. Students write several substantial programs dealing with concurrency and synchronization in a multi-task environment, with file systems, and with memory management",
					"EECS483": "Introduction to compiling techniques including parsing algorithms, semantic processing and optimization. Students implement a compiler for a substantial programming language using a compiler generating system.",
					"EECS484": "Concepts and methods for the design, creation, query and management of large enterprise databases. Functions and characteristics of the leading database management systems. Query languages such as SQL, forms, embedded SQL, and application development tools. Database design, integrity, normalization, access methods, query optimization, transaction management and concurrency control and recovery.",
					"EECS485": "Design and use of databases in the Web context; data models, database design, replication issues, client/server systems, information retrieval, web server design; substantial project involving the development of a databasebacked web site.",
					"EECS486": "Covers background and recent advances in information retrieval (IR): indexing, processing, querying, classifying data. Basic retrieval models, algorithms, and IR system implementations. Focuses on textual data, but also looks at images/videos, music/audio, and geospatial information. Web search, including Web crawling, link analysis, search engine development, social media, and crowdsourcing",
					"EECS489": "Protocols and architectures of computer networks. Topics include client-server computing, socket programming, naming and addressing, media access protocols, routing and transport protocols, flow and congestion control, and other application-specific protocols. Emphasis is placed on understanding protocol design principles. Programming problems to explore design choices and actual implementation issues assigned",
					"EECS492": "Fundamental concepts of AI, organized around the task of building computational agents. Core topics include search, logic, representation and reasoning, automated planning, decision making under uncertainty, and machine learning.",
					"EECS493": "Concepts and techniques for designing computer system user interfaces to be easy to learn and use, with an introduction to their implementation. Task analysis, design of functionality, display and interaction design, and usability evaluation. Interface programming using an object-oriented application framework. Fluency in a standard object-oriented programming language is assumed.",

					"EECS494": "Concepts and methods for the design and development of computer games. Topics include: history of games, 2D graphics and animation, sprites, 3D animation, binary space partition trees, software engineering, game design, interactive fiction, user interfaces, artificial intelligence, game SDK’s, networking, multi-player games, game development environments, commercialization of software."
				};

router.post("/createsuggestions",function(req,res){
	console.log("Post request received");

	//Store Courses user has taken (For comparison)
	var takenKeys = Object.keys(req.body);
	console.log("THESE are the taken keys " + takenKeys);
	Taken = []
	console.log("Ascending = " + req.body.ascending);
	console.log("descending =" + req.body.descending);
	for (var i = 0; i < req.body.numCourses; i++) {
		var took_course = req.body[takenKeys[i]].toUpperCase();
		Taken.push(took_course);
	}
	console.log(Taken);

	//Compare taken courses to prereqs and return recommendations
	db.collection("courses").find().toArray(function(err,result){


	var recommendations =[]
	var key = result;
	var size = result.length;

	var course_additions = []
	for (var i = 0; i < Taken.length; i++) {
		for (var j = 0; j < size; j++) {
			if (Taken[i].substring(5) == key[j]["coursenumber"]) {
				for (var course = 1; course < key[j]["prerequisites"].length; course++) {
					if (key[j]["prerequisites"][course] != "|" && key[j]["prerequisites"][course] != "EECS 270") {
						course_additions.push(key[j]["prerequisites"][course].toUpperCase());
					}
				}
			}
		}
	}
	Taken = Taken.concat(course_additions);

	for (var i = 0; i < size; i++) {
		var check = key[i]["prerequisites"];
		var j = 1;

		if (Taken.indexOf(key[i]["department"] + " " +  key[i]["coursenumber"]) == -1) { //User has not taken this course already
			//All Required
			var canTake = true;
			while((j < check.length) && (check[j] != '|')) {
				if (Taken.indexOf(check[j]) == -1) {
					canTake = false;
					break; //No need to check further
				}
				j++;
			}
			if (canTake == false) {
				continue; //User has not taken all required courses
			}

			//One of
			j++;
			var oneOf = false;
			if (((j < check.length) && (check[j] == '|')) || (j >= check.length)) {
				oneOf = true;
			} else {
				while((j < check.length) && (check[j] != '|')) {
					if (Taken.indexOf(check[j]) != -1) {
						oneOf = true;
					}
					j++;
				}
			}
			if (oneOf == false) {
				continue; //User has not taken at least one of required "OR" courses
			}

			//No Credit will be given
			j++;
			var noCredit = false;
			while(j < check.length) {
				if (Taken.indexOf(check[j]) != -1) {
					noCredit = true;
					break; //No need to check further
				}
				j++;
			}
			if (noCredit == true) {
				continue; //User will not be given credit for this course
			}

			if(((key[i]["coursenumber"] < "270") || (key[i]["deparment"] + " " + key[i]["coursenumber"] == "EECS 280"))) {
				continue;
			}
			if(key[i]["difficulty"]){
			recommendations.push({"course": key[i]["department"] + " " + key[i]["coursenumber"] + ": " + key[i]["prerequisites"][0],"difficulty": key[i]["difficulty"]});
			//recommendations.push(key[i]["department"] + " " + key[i]["coursenumber"] + ": " + key[i]["prerequisites"][0] + " Difficulty: " + key[i]["difficulty"].toString());
		}
			else{
				recommendations.push(key[i]["department"] + " " + key[i]["coursenumber"] + ": " + key[i]["prerequisites"][0]);
			}
		}

	}
/*
	if(req.body.ascending){
		recommendations = recommendations.sort(function(a,b){
			return a["difficulty"] - b["difficulty"];
		});
}


	if(req.body.descending){

		recommendations = recommendations.sort(function(a,b){
			return b['difficulty'] - a["difficulty"];
		});
}

*/

	console.log(recommendations);
	res.writeHead(200, {"Content-Type": "application/json"});
	var json = JSON.stringify({courseReqs: recommendations});

	res.end(json);

});
  });



router.get("/create",function(req,res,next){
	res.render("create");
});

//Autocomplete function, seems to work I think we should use the html alternative



router.get("/courseinformation",function(req,res){
	console.log("Course Information");
	console.log(req.query.course);
	console.log(req.query.course);
	var json = JSON.stringify({description: descriptions[req.query.course]});
	res.writeHead(200,{"Content-Type": "application/json"});
	res.end(json);

});

router.get("/login",function(req,res){
	res.render("login");
});

router.post("/logininformation",function(req,res){
		console.log(req.body.email);
		console.log(req.body.password);
		var result = db.collection('users').find({_id: "ksandera@umich.edu"});

  if(result){
  	console.log("Found user");
  }
  else{
  	console.log("Did not find the user");
  }
  // send HTML file populated with quotes here

});


router.post("/createaccount",function(req,res){
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var password = req.body.password;
	var email = req.body.email;
	console.log("Dis " + email);
	db.collection("users").save({"firstname": firstname, "lastname": lastname, "password": password,"_id": email});
	res.end();

});
module.exports = router;