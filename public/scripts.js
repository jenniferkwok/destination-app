console.log("Sanity Check: JS is working!");

$(document).ready(function(){

	$(function(){
		$("#page-wrap").wrapInner("<table cellspacing='30'><tr>");
		$(".post").wrap("<td>");
	});
		pageload();
		$('.modal').appendTo("body");
//SIGNUP
	$("#signup").submit(function(e){
		e.preventDefault();
		var signupdata = $("#signup").serialize();
		console.log(signupdata);
		$.post("/users", signupdata, function(response){
		}).success(function(newuser){
			location.reload();
		});
	});

//LOGIN
	$("#login").submit(function(e){
		e.preventDefault();	
		$.post("/login", $("#login").serialize(), function(response){
		}).success(function(data){
			// window.location=data;
			// window.location.href = "/profile";
			// window.onload.href = "/index";
			location.reload();
		});
	});

// SIGNOUT
	$("#logout").submit(function(e){
		e.preventDefault();	
		$.get("/logout", function(response){
		}).success(function(data){
			// window.location=data;
			window.onload.href = "/index";
		});
	});

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

// if($('checkbox').val()==true){
// console.log(this +'is starred');
// star.push(user.email);
// }

// if ($('#star').is(":checked"))
// {
// console.log(this +'is starred');
// }

$(document).on('click', '#want', function(e){
	e.preventDefault();
            var $this = $(this);
            $this.toggleClass('disabled', true);	
            userFav(this);
})

function userStar(context){
	console.log(context);
	var postId= $(context).data().id;
	console.log(postId);
	$.ajax({
		url: 'api/posts/' + postId,
		type: 'PATCH',
		success: function(response){
	console.log(response);
		}
	});
}

function userFav(context){
	console.log(context);
	var userId= $(context).data().id;
	console.log(userId);
	$.ajax({
		url: 'api/users/' + userId,
		type: 'PATCH',
		success: function(response){
	console.log(response);
		}
	});
}

// RANDOM
    var collection = $("div.container div").get();
    collection.sort(function() {
        return Math.random()*10 > 5 ? 1 : -1;
    });
    $.each(collection,function(i,el) {
        var color = this.className,
            $el = $(el);
        $el.css({backgroundColor: color}).appendTo( $el.parent() );
    });