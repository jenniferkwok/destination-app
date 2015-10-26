var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = require('./models/index.js');
//var where = require('.utils/where');

//CONFIG//
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded ({ extended:true}));
//mongoose.connect('mongodb://localhost/project-1');




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

	// var targetId = req.params._id;
	// console.log(targetId);
	// db.Quote.findOneAndRemove({_id:targetId}, function(err,deletedItem){
	// 	if (err) {console.log("err! connot delete");}
	console.log(req.params.id+" removed!");
	});
  });

app.listen(5000, function(){
	console.log("GO Project One GO!");
});