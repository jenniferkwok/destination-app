var mongoose = require("mongoose");
var Post = require("./post");
var User = require("./user");
mongoose.connect("mongodb://localhost/project-3");

module.exports.Post = Post;
module.exports.User = User;