var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PostSchema = new Schema({
	imgurl: String,
	location: String,
	author: String
	//votes: { type: Number, default: 0 }
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;