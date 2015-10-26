console.log("Sanity Check: JS is working!");

$(document).ready(function(){
		pageload();
		getRandomQuote();
	});
// 	var url = "http://api.theysaidso.com/qod";

// 	$.ajax({
// 		url: url,
// 		method: 'GET',
// 	}).done(function(object){

// 	//	debugger

// 		for(index in object.data){
// 			console.log(object.data[index])
// 			$('#welcome').append('qod');
// 		}
// 	});
// });

function pageload(){
	$('#submitnewquote').submit(function(e){
		e.preventDefault();
		console.log('the serialize gives :',$(this).serialize() );
		$.post("api/posts", $(this).serialize(), function(response){

			var qString = makeNewPost(response);
			$('#content').prepend(qString);
		$('#submitnewquote')[0].reset();
		});
	});

//EventListener for delte button
$(document).on('click', '.deletebutton', function(e){
	e.preventDefault();
	deletePost(this);
});
}

function deletePost(context){
	var postId= $(context).data().id;
	console.log(postId);
	$.ajax({
		url: 'api/posts/' + postId,
		type: 'DELETE',
		success: function(response){
			$(context).closest('section').remove();
		}
	});
}

function makeNewPost(newquote){
	return '<section class="posts"><button class="deletebutton close">&times;</button><h3>“' + submitnewquote.quote.value + '”</h3><br><h5>- ' + submitnewquote.author.value + '</h5></section>';
}
//VOTE UP/DOWN

$(document).on('click', '#up', function(e){
	e.preventDefault();
	$(this.parentElement).append('0');
});

// var votes = $('.votecount').val();
// 	console.log(votes);
// 	$('#up').click(function(){
// 	votes=votes+1;

// });
// $('#down').click(function(){
// 	('.v').append('0');
// });

function getRandomQuote(){
//RANDOM QUOTE FROM API
	var url = "http://www.stands4.com/services/v2/quotes.php?uid=4469&tokenid=aamCAHxAPjwukaVI&searchtype=RANDOM";
	$.ajax({
		url: url,
		method: 'GET',
	}).done(function(object){
	console.log(object);
		var xml = object;
	 	var quote= $(xml).find("quote").text();
	 	var author=$(xml).find("author").text();
	 	$("#randomquote").append('<h2>' + quote + '</h2>');
	 	$("#randomquote").append('<h5> - ' + author + '</h5>');

	});
}
	$(document).on('click', '#morerandom', function(){
//	$("#morerandom").click(function(){
		$("#randomquote").empty();
		getRandomQuote();
		console.log("morerandom clicked");
	});
