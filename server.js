var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser=require('cookie-parser');
var mongoose = require('mongoose');
var db = require('./models/index');
var request = require('request');
var session = require('express-session');

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
	res.render('index', {posts: posts});
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
		author:req.body.author
	};
	db.Post.create(newPost, function(err, newpost){
		if (err){console.log("err! cannot create");}
		res.json(newpost);
		console.log(newpost + "created!");
	});

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
 	db.User.createSecure(req.body.email, req.body.firstname, req.body.lastname, req.body.password, function(err, user){
 		if(err){
 			console.log("cannot create user:", err);
 		} 
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
 	if(req.session.userId===undefined){
 		res.redirect('/');
 	}
// 	console.log('session user id:', req.session.userId);
 	db.User.findOne({_id: req.session.userId}, function(err, user){
 		console.log("req.session.userId is: " + req.session.userId);
 		console.log("user is: " + user);
 		console.log("error is: " + err);
 		if (err){console.log("get profile error");}
 		res.render('profile', {user:user.email});
 		// res.render('profile', {user: req.session.userId});
 	});
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


app.listen(7777, function(){
	console.log("7777 GO GO GO");
});