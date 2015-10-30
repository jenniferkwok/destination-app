console.log("Sanity Check: JS is working!");

$(document).ready(function(){

		pageload();
		getRandomQuote();
					$.scrollify({section : "section",});
					$('.modal').appendTo("body");
					// init controller
//var controller = new ScrollMagic.Controller();
// new ScrollMagic.Scene({
//         duration: 100,    // the scene should last for a scroll distance of 100px
//         offset: 50        // start this scene after scrolling for 50px
//     })
//     .setPin(".posts") // pins the element for the the scene's duration
//     scene.addTo(controller); // assign the scene to the controller

//SIGNUP
	$("#signup").submit(function(e){
		e.preventDefault();
	//var signupData = $("#signup").serialize();
	// console.log(signupData);
	//Y U NO WORKING??? 
		$.post("/users", $("#signup").serialize(), function(response){
		//	console.log(signupData);
			console.log(response);
		});
	});

//LOGIN
	$("#login").submit(function(e){
		e.preventDefault();	
		$.post("/login", $("#login").serialize(), function(response){
		}).success(function(data){
			window.location=data;
		});
	});

});
function pageload(){
	$('#submitnewquote').submit(function(e){
		e.preventDefault();
		console.log('the serialize gives :',$(this).serialize() );
		$.post("api/posts", $(this).serialize(), function(response){

			// var qString = makeNewPost(response);
			// $('#content').prepend(qString);
		$('#submitnewquote')[0].reset();
		$('#submitnewquote').append("<hr><h5>Thanks for your contribution!</h5");
		});
	});
// function makeNewPost(newquote){
// 	return '<section class="posts"><button class="deletebutton close">&times;</button><h3>“' + submitnewquote.quote.value + '”</h3><br><h5>- ' + submitnewquote.author.value + '</h5></section>';
// }

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



//MOVE UP/DOWN
$(document).on('click', '.movetonext', function(){
$.scrollify.next();
});
$(document).on('click', '.movetoprev', function(){
$.scrollify.previous();
});
$(document).on('click', '#top', function(){
	$.scrollify.move("#1");
});
//////VOTE///////
$(document).on('click', '#vote', function(e){
	e.preventDefault();
	$(this).append('0');
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
		var xml = object;
	 	var quote= $(xml).find("quote").text();
	 	var author=$(xml).find("author").text();
	 	$("#randomquote").append('<h2>' + quote + '</h2><br>');
	 	$("#randomquote").append('<h5> - ' + author + '</h5>');

	});
}
	$(document).on('click', '#morerandom', function(){
	//  $("#randomquote").animate({left: '500px'},slow);
		$("#randomquote").empty();
		getRandomQuote();
		console.log("morerandom clicked");
	});
