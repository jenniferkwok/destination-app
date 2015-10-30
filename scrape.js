var request = require('request');
var cheerio = require('cheerio');

request('https://www.goodreads.com/quotes?page=4', function (error, response, html) {
	if(!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		var quotes = [];
		$('div.quoteText').each(function(i, element){
			console.log("starts here7");
			//console.log( $(this).text() );
			var newQuote = {};
			newQuote.quotes = $(this).first().text();
			//console.log(newQuote.quote);
			newQuote.quotes = newQuote.quotes.split(/[―]/g);
			newQuote.quote = newQuote.quotes[0].replace(/“/g,'').replace(/”/g,'').trim();
			newQuote.author = newQuote.quotes[1].replace(/^\/.*.*[>$]/g, '');

			console.log("the quote", newQuote.quote);
			console.log("the author", newQuote.author);
			//newQuote.quote = newQuote.quote.trim().replace(/[-\n]*/g, "").replace(/―\s*\.*.*\w/g, '').replace(/“/g,'').replace(/”/g,'').trim();
			//newQuote.quote = newQuote.quote.replace("\"", "");
			// newQuote.quote = newQuote.quote.trim().replace(/[\n]/g, "").replace("\\/", '');
			//newQuote.author = $(this).children().text();
			quotes.push( newQuote );
			//console.log($(this).children().text() );
			 // var a = $(this).prev();
			 // var quote = a.children().first().children().next().text();
			 // var author = a.children();
			 // var mydata = {
			 // 	quote: quote,
			 // 	author: author
			 // };
	//		console.log(mydata['quote']);
		});
	// console.log( quotes ); 

// request('http://www.brainyquote.com/quotes/topics/topic_inspirational.html', function (error, response, html) {
// 	if(!error && response.statusCode == 200) {
// 		var $ = cheerio.load(html);
// 		$('div.boxyPaddingBig').each(function(i, element){
// 			 var a = $(this).prev();
// 			 //var quote = a.children().first().children().next().text();
// 			// var author = a.children();
// 			 //var mydata = {
// 			 //	quote: quote,
// 			// 	author: author
// 			// };
// 			console.log(a.text());
// 		});
// 	}
// });

// request('http://www.quotes.net/random.php', function (error, response, html) {
// 	if(!error && response.statusCode == 200) {
// 		var $ = cheerio.load(html);
// 		$('span.wselect-cnt').each(function(i, element){
// 			 var b = $(this).prev();
// 			console.log(b.text());
// 		});
// 	}
// });

var db = require('./models');
var scraped_quotes = quotes;

//db.Quote.remove({}, function(err, posts){

	db.Quote.create(scraped_quotes, function(err,posts){
		if (err) { return console.log("cannot load seed");}
		console.log("Total:", posts.length);
//	});
});

	}
});
