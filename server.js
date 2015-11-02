var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser=require('cookie-parser');
var mongoose = require('mongoose');
var db = require('./models/index.js');
var request = require('request');
// var User = require('./models/user');
var session = require('express-session');
//var where = require('.utils/where');

//ENV
require('dotenv').load();
var randomquoteapitoken=process.env.randomquoteapitoken;

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
// mongoose.connect(config.mongodb);

// var db = mongoose.connection;

// db.on('error', function (err) {
//   console.log('mongodb connection error: %s', err);
//   process.exit();
// });
// db.once('open', function () {
//   console.log('Successfully connected to mongodb');
//   app.emit('dbopen');
// });
// mongoose.connect('mongodb://localhost/project-1');
// mongoose.connect(
//   process.env.MONGOLAB_URI ||
//   process.env.MONGOHQ_URL ||
//   'mongodb://localhost/project-1' // plug in the db name you've been using
// );

//ROUTES//
app.get("/", function(req, res){
	db.Quote.find().exec(function(err, posts){
		if (err){console.log("err! cannot get");}
	res.render('index', {posts: posts});
});
});

app.get("/api/posts", function(req, res){
	db.Quote.find(function(err, posts){
		res.send(posts);
	});
});

app.post("/api/posts", function (req, res){
	console.log('the quote is :', req.body.quote);
	var newPost={
		quote: req.body.quote,
		author:req.body.author
	};
	db.Quote.create(newPost, function(err, newquote){
		if (err){console.log("err! cannot create");}
		res.json(newquote);
		console.log(newquote + "created!");
	});

 });
 
app.delete("/api/posts/:id", function(req, res){
	db.Quote.findById(req.params.id).exec(function(err,newquote){
		newquote.remove();
		res.status(200).json({});
	console.log(req.params.id+" removed!");
	});
  });

app.get("/usercookie", function(req,res){
	res.cookie("user email", user.email);
});

// ////// LOGIN LOGOUT ///////
// //SIGNUP
 app.post('/users', function (req,res){
 	// var newUser=
 	// {email: req.body.email,
 	// password: req.body.password
 	//  	};
 	User.createSecure(req.body.email, req.body.password, function(err, user){
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
 	// console.log('logged out');
 	// res.redirect('/');
 });
//END OF LOGIN LOGOUT


app.listen(process.env.PORT || 5000, function(){
	console.log("GO Project One GO!");
});