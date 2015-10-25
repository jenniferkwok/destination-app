console.log("Sanity Check: JS is working!");

$(document).ready(function(){
		pageload();
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