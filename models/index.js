var mongoose = require("mongoose");
var Post = require("./post");
var User = require("./user");
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/project-3'
);
module.exports.Post = Post;
module.exports.User = User;