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
// NEW POST
function pageload(){
	$('#newpost').submit(function(e){
		e.preventDefault();
		console.log('the serialize gives :',$(this).serialize() );
		$.post("api/posts", $(this).serialize(), function(response){
		$('#newpost')[0].reset();
		$('#newpost').append("<hr><h5>Thanks for your contribution!</h5");
			// var qString = makeNewPost(response);
			// $('#content').prepend(qString);
			            var $this = $(this);
            $this.toggleClass('disabled', true);	

			location.reload();

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
// LOGO EVERYWHERE
            window.onLoad = Prep();
            
            function Prep(){
                window_Height = window.innerHeight;
                window_Width = window.innerWidth;
                
                image_Element = document.getElementById("pin");
                image_Height = image_Element.clientHeight;
                image_Width = image_Element.clientWidth;
                
                availSpace_V = window_Height - image_Height;
                availSpace_H = window_Width - image_Width;
                
                var changeInterval = 1000; // Time has to be in miliseconds. So, 3000 is 3 seconds
                setInterval(moveImage, changeInterval);
            }
            
            function moveImage(){
                var randNum_V = Math.round(Math.random() * availSpace_V);
                var randNum_H = Math.round(Math.random() * availSpace_H);
                
                image_Element.style.top = randNum_V + "px";
                image_Element.style.left = randNum_H + "px";
            }

// RUN!
function moveDiv() {
    var $span = $("#pin");
    
    $span.fadeOut(1000, function() {
        var maxLeft = $(window).width() - $span.width();
        var maxTop = $(window).height() - $span.height();
        var leftPos = Math.floor(Math.random() * (maxLeft + 1))
        var topPos = Math.floor(Math.random() * (maxTop + 1))
     
        $span.css({ left: leftPos, top: topPos }).fadeIn(1000);
    });
};

moveDiv();
setInterval(moveDiv, 5000);

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