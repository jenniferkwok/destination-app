
console.log("Sanity Check: JS is working!");

$(document).ready(function(){
	var url = "http://api.theysaidso.com/qod";

	$.ajax({
		url: url,
		method: 'GET',
	}).done(function(object){

	//	debugger

		for(index in object.data){
			console.log(object.data[index])
			$('#welcome').append('qod');
		}
	});
});

  });