console.log("Sanity Check: JS is working!");

$(document).ready(function(){

		pageload();
		$('.modal').appendTo("body");
//SIGNUP
	$("#signup").submit(function(e){
		e.preventDefault();
		$.post("/users", $("#signup").serialize(), function(response){
			console.log(response);
		});
	});

//LOGIN
	$("#login").submit(function(e){
		e.preventDefault();	
		$.post("/login", $("#login").serialize(), function(response){
		}).success(function(data){
			// window.location=data;
			window.location.href = "/profile";
		});
	});

//SIGNOUT
	// $("#logout").submit(function(e){
	// 	e.preventDefault();	
	// 	$.get("/logout", function(response){
	// 	}).success(function(data){
	// 		// window.location=data;
	// 		window.location.href = "/index";
	// 	});
	// });

});
function pageload(){
	$('#newpost').submit(function(e){
		e.preventDefault();
		console.log('the serialize gives :',$(this).serialize() );
		$.post("api/posts", $(this).serialize(), function(response){
		$('#newpost')[0].reset();
		$('#newpost').append("<hr><h5>Thanks for your contribution!</h5");
			// var qString = makeNewPost(response);
			// $('#content').prepend(qString);
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
