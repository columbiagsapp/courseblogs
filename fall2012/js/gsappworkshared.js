$(document).ready(function () {

	var MENU_ANIMATE_TIME_MILLISECONDS = 500;


	$('.headertitle').hover(function(){
			$('.headertitle').addClass('active');
		}, 
		function(){
			$('.headertitle').removeClass('active');
		});


	// HTML Helper
	var documentHtml = function(html){
		// Prepare
		var result = String(html)
			.replace(/<\!DOCTYPE[^>]*>/i, '')
			.replace(/<(html|head|body|title|meta|script)([\s\>])/gi,'<div class="document-$1"$2')
			.replace(/<\/(html|head|body|title|meta|script)\>/gi,'</div>')
		;
		
		// Return
		return result;
	};

	var navClickFunc = function(){
		var err = false;

		if($(this).hasClass('active'))
		//simply close the open menu item
		{
			$('.active').removeClass('active');//clear active class
			$('#ajax').slideToggle(MENU_ANIMATE_TIME_MILLISECONDS);//close the #ajax div
		}
		else
		//need to use the .get() request to pull the menu item in with ajax
		{
			$('.active').removeClass('active');//clear any other active nav link
			$(this).addClass('active');

			$.get($(this).attr('href'), function(data) {
				var $data = $(documentHtml(data));

				//animate the closing of the div if it is already full with content
				if( $('#ajax').is(":visible") ){
					$('#ajax').slideToggle(MENU_ANIMATE_TIME_MILLISECONDS);
					//delay changing #ajax content until menu closes
					setTimeout( function(){ 
						$('#ajax').html( $data.find('.realpost').html() );
					}, MENU_ANIMATE_TIME_MILLISECONDS);
				}else{
					//populate the #ajax div with the ajax data then animate the opening of the div
					$('#ajax').html( $data.find('.realpost').html() );
				}
			})
			.error(function() { err = true; })
			.complete(function() { 
				//slide open the menu
				$('#ajax').slideToggle(MENU_ANIMATE_TIME_MILLISECONDS);
			});

		}

		if(!err){ return false; }//else, let the page reload

	}


	if( (window.location.pathname == '/') || (window.location.pathname == '') ){
		$('#nav .ajaxpage a').bind('click', navClickFunc);
	}



});