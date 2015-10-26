var request = require('request');
var cheerio = require('cheerio');

request('https://www.goodreads.com/quotes', function (error, response, html) {
	if(!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		var quotes = [];
		$('div.quoteText').each(function(i, element){
			console.log("starts here2");
			//console.log( $(this).text() );
			var newQuote = {};
			newQuote.quote = $(this).text();
			newQuote.quote = newQuote.quote.trim().replace(/[\n]/g, "").replace('/\\\\/', '');
			newQuote.author = $(this).children().text();
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
	console.log( quotes[0] ); 
	}
});

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