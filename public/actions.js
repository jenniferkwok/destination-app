var footernav = footer.find('a');

var actions = function(){

		// $(window).scroll(function(){

		// }).scroll();
		if(!mobile){
			computeScroll();
			setScrollActions();
		}else{
			// setMobileActions();
			setScrollActions();
		}

		nav.off().on(event_release, function(e){
			if(desktop){
				gotoSection(this);
				e.preventDefault();
			}else if(tablet){
				gotoSection(this);
				e.preventDefault();
			}else{
				var location = $(this).attr('href');
				// window.location = "#"+location;
				var section = $("#"+location);

				var offsetTop = skrollrbody.scrollTop()+section.offset().top - 59;
					// console.log(offsetTop);
				skrollrbody.scrollTop(offsetTop);
				header.removeClass('open');
			}

		}).on("click", stopEvents);

		footernav.off().on(event_release, function(e){
			gotoOverlay(this);
			e.preventDefault();
			e.stopPropagation();
		}).on("click", stopEvents);

		$('.footer-panel .close').off().on(event_release, close);

		$('.footer-panel').off().on(event_release, stopEvents);

		$('.next').off().on(event_release, function(){
			goNext(1);
		});

		$('#toplogo').off().on(event_release, function(){
			gotoSection('home');
		});

		if(tablet){
			$('input, textarea').off(event_release).on(event_release, function(){
				$(this).focus();
			});
			// Fix links on iPad
			$('#neighborhood a').off().on(event_down, function(e){
				window.open($(this).attr('href'));
				e.preventDefault();
				e.stopPropagation();
			});
		}


		// Gallery actions
		residenceGalleries.off().on(event_release, openGallery).on("click", stopEvents);
		$('#gallery .close').off().on(event_release, closeGallery).on("click", stopEvents);

		// Floorplan actions
		availability.off().on(event_release, '.row:not(.inactive)', openFloorplan).on("click", '.row:not(.inactive)', stopEvents);
		$('#floorplan .close').off().on(event_release, closeFloorplan).on("click", stopEvents);

		menubut.off().on(event_release, function(){
			header.addClass('open');
		});

		headerclose.off().on(event_release, function(){
			header.removeClass('open');
		});

		$(window).off().on('resize', function(){
			if(desktop){
				clearTimeout(resizeTimer);
				// console.log($(window).scrollTop()+":"+totalHeight);
				// var pc = $(window).scrollTop()/totalHeight;
				// console.log(totalHeight);
				// init();
				body.removeClass('loaded');
				resizeTimer = setTimeout(function(){
					// location.reload(false);
					// init();
					var page = getNearestPage().current.id;
					// console.log(page);

					// snapToSection();
					// window.location = "/home";//+page;
					setState('home');
					location.reload(false);

					// makePageDetail(function(){
						// goNext(0);
						// console.log(totalHeight);
						// console.log(pc);
						// if(pc!==Infinity){
						// 	s.animateTo(totalHeight*pc, {duration:2000});
						// }
						// if(!overlayOpen){
						// 	snapToSection();
						// }

					// });
				},500);
			}else if(tablet){
				// body.removeClass('loaded');
				// gotoSection('home', 1);
				// location.reload(false);
			}
		});

		if(!desktop){
			window.removeEventListener('orientationchange');
			window.addEventListener('orientationchange', function(){
				// $(window).trigger('resize');
					clearTimeout(resizeTimer);
					body.removeClass('loaded');
					resizeTimer = setTimeout(function(){
						gotoSection('home', 1);
						setTimeout(function(){
							location.reload(false);
						},250);
					}, 500);
			}, false);
		}

		footerSection.mousewheelStopPropagation();
		// console.log("mousewheelStopPropagation");
		$("#gallery").mousewheelStopPropagation();
		$("#floorplan").mousewheelStopPropagation();


		body.off().on('button', function(e){
			if(overlayOpen){
				return true;
			}
			if(e.keyCode === 32 || e.keyCode === 40){
				e.preventDefault();
				e.stopPropagation();
				goNext(1);
			}
			if(e.keyCode === 38){
				e.preventDefault();
				e.stopPropagation();
				goNext(-1);
			}
		});
		// $(window).resize();



	};
