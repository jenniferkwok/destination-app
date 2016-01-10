var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser=require('cookie-parser');
var mongoose = require('mongoose');
var db = require('./models/index');
var request = require('request');
var session = require('express-session');
var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/upload' enctype='multipart/form-data'>" +
"<input type='file' name='image'/>" +
"<input type='submit' /></form>" +
"</body></html>";
var fs = require('fs');

var im = require('imagemagick');

//HEROKU MONGODB
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/project-3'
);
//CONFIG//
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded ({ extended:true}));
app.use(cookieParser());
app.use(session({
	saveUninitialized:true,
	resave: true,
	secret: 'Secret',
	cookie: { maxAge: 30 * 60 * 1000}
 }));

//ROUTES//
app.get("/", function(req, res){
	db.Post.find().exec(function(err, posts){
		if (err){console.log("err! cannot get");}

 	db.User.findOne({_id: req.session.userId}, function(err, user){
 		if(err){console.log(err)};
 		res.render('index', {user: user, posts: posts});	
 	})
});
});

app.get("/api/posts", function(req, res){
	db.Post.find(function(err, posts){
		res.send(posts);
	});
});

app.post("/api/posts", function (req, res){
	console.log('the quote is :', req.body.quote);
	var newPost={
		imgurl: req.body.imgurl,
		location:req.body.location,
		author:req.body.author,
		star: req.body.star
	};
	db.Post.create(newPost, function(err, newpost){
		if (err){console.log("err! cannot create");}
		res.json(newpost);
		console.log(newpost + "created!");
	});

 });

/// Post files
app.post('/upload', function(req, res) {

	fs.readFile(req.files.image.path, function (err, data) {

		var imageName = req.files.image.name

		/// If there's an error
		if(!imageName){

			console.log("There was an error")
			res.redirect("/");
			res.end();

		} else {

		   var newPath = __dirname + "/uploads/fullsize/" + imageName;

		  var thumbPath = __dirname + "/uploads/thumbs/" + imageName;

		  /// write file to uploads/fullsize folder
		  fs.writeFile(newPath, data, function (err) {

		  	/// write file to uploads/thumbs folder
			  im.resize({
				  srcPath: newPath,
				  dstPath: thumbPath,
				  width:   200
				}, function(err, stdout, stderr){
				  if (err) throw err;
				  console.log('resized image to fit within 200x200px');
				});

			   res.redirect("/uploads/fullsize/" + imageName);

		  });
		}
	});
});

/// Show files
app.get('/uploads/fullsize/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync(__dirname + "/uploads/fullsize/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');

});

app.get('/uploads/thumbs/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync(__dirname + "/uploads/thumbs/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');

});



app.delete("/api/posts/:id", function(req, res){
	db.Post.findById(req.params.id).exec(function(err,thepost){
		thepost.remove();
		res.status(200).json({});
	console.log(req.params.id+" removed!");
	});
  });

app.get("/usercookie", function(req,res){
	res.cookie("user email", user.email);
});

//SIGNUP
 app.post('/users', function (req,res){
 	// var newUser=
 	// {email: req.body.email,
 	// password: req.body.password
 	//  	};
 	console.log(req.body);
 	db.User.createSecure(req.body.email, req.body.firstname, req.body.lastname, req.body.password, req.body.fav, function(err, user){
 		if(err){
 			console.log("cannot create user:", err);
 		} 
 		req.session.userId = user._id;
 		res.json(user);
 	});
 });
// //AUTHENTICATE
 app.post('/login', function (req,res){
 	console.log(req.body.email);
 	db.User.authenticate(req.body.email, req.body.password, function(err, user){
 		if (err){console.log("login err: " , err);}
		req.session.userId = user._id;
		console.log("logged in as:", 	req.body.email);
		res.redirect('/profile');
		// res.render('/profile');
 	});
 });

// //PROFILE PAGE
 app.get('/profile', function (req,res){
 	if(req.session.userId===null){
 		res.redirect('/');
 	}
// 	console.log('session user id:', req.session.userId);
 	db.User.findOne({_id: req.session.userId}, function(err, user){
 		console.log("req.session.userId is: " + req.session.userId);
 		// console.log("user is: " + user.email);
 		if (err){console.log("get profile error");}
 		res.render('profile', {user:user});
 	});
 });
/////ADD STARRED USER TO INDIVIDUAL POST
// app.patch("/api/posts/:id", function(req, res){
// 	db.Post.update( {_id: req.params.id}, { $push: { "star": req.session.userId}},
// 	function(err, pushedItem){
// 		if(err) { console.log(err);}
// 			else{
// 				console.log(pushedItem + " is pushed to post.star array!")
// 			}
// 	} );
// 	res.send("post update!!!!")
// });

//////ADD FAVORITE POSTS FOR USERS 
app.patch("/api/users/:id", function(req, res){
	// var locationname = 
    // console.log(post[req.params].id.location);
    db.Post.findOne({_id: req.params.id}, function(err, city){
		db.User.update( {_id: req.session.userId}, { $push: { "fav": city.location}},
		function(err, pushedItem){
			if(err) { console.log(err);}
				else{
					console.log(pushedItem)
				}
		} );
    	
    })
});


// //LOGOUT
 app.get('/logout', function (req,res){
 	// req.session.userId=null;
 	console.log("in the logout path");
 	req.session.destroy(function(){  
 	 console.log('logged out');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
     res.redirect('/');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  }); 
 });
//END OF LOGIN LOGOUT


app.listen(process.env.PORT || 7777);