var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var QuoteSchema = new Schema({
	quote: String,
	author: String
});

var Quote = mongoose.model('Quote', QuoteSchema);
module.exports = Quote;