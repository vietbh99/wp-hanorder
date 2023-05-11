jQuery(document).ready(function($) {
// Jquery Dependency

	//number counter
	$(window).scroll(testScroll);
	var viewed = false;

	function isScrolledIntoView(elem) {
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}

	function testScroll() {
	  if (isScrolledIntoView($(".item-counter")) && !viewed) {
		  viewed = true;
		  $('.count').each(function () {
		  $(this).prop('Counter',0).animate({
			  Counter: $(this).text().replace(/,/g, '')
		  }, {
			  duration: 1000,
			  easing: 'swing',
			  step: function (now) {
				  $(this).text(Math.ceil(now));
			  }
		  });
		});
	  }
	}
	
});