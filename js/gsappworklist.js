$(document).ready(function () {
	var MAX_CAPTION_LENGTH = 400;
	var MAX_TEXTPOST_LENGTH = 500;
	var MAX_QUOTEPOST_LENGTH = 200;
	
	$.fn.trunc = function(){
		$(this).find('.caption').truncate({max_length: MAX_CAPTION_LENGTH});
		$(this).find('.text-body').truncate({max_length: MAX_TEXTPOST_LENGTH});
	  	$(this).find('.post.quote .realpost').truncate({max_length: MAX_QUOTEPOST_LENGTH});
	}

	var $container = $('#main .autopagerize_page_element');

	$container.infinitescroll({
		navSelector  : '#page-nav',    // selector for the paged navigation 
		nextSelector : '#page-nav a',  // selector for the NEXT link (to page 2)
		itemSelector : '.postwrapper',     // selector for all items you'll retrieve
		loading: {
			finishedMsg: 'No more pages to load.',
			img: 'http://i.imgur.com/6RMhx.gif'
			}
		},
		// trigger Masonry as a callback
		function( newElements ) {
		// hide new items while they are loading
			var $newElems = $( newElements ).css({ opacity: 0 });
			$newElems.trunc();
			//$newElems.truncation();
			// ensure that images load before adding to masonry layout
			//$newElems.imagesLoaded(function(){
			// show elems now they're ready
				$newElems.animate({ opacity: 1 });
			//});
		}
	);
});