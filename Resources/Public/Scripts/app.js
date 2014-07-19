$(document).foundation();

$(document).ready(function() {
	// Animations
	M12.Site.Animation.init();
	// Smooth scrolling
	M12.Site.Scrolling.init();
});

var M12 = {};
M12.Site = {
	Animation: {
		/**
		 * Animate the list items so that one item is visible and moves out of view and the next list item is shown.
		 * The animation goes through all the list items in the unordered list and starts from the first list item again.
		 * To show only one list item at a time, the height is set on the ul and overview is set to hidden.
		 * The next list item is shown by changing the margin-top to (height of ul * -(the item's position in the list)
		 */
		init: function() {
			this.animateSplashScreen();
		},
		animateSplashScreen: function() {
			// keep references to html elements so that I can give it to jQuery selectors

			//var parentDiv = $('.animatedList'),

			var ulEl = $('ul', $('.animatedList')),
			    height = ulEl.height(),
			    numberItems = ulEl.children().length,
			    first = ulEl.children().first(),
				currentItem = 1,
				marginTop = 0;

			setInterval(function() {
				marginTop = currentItem * -height;
				first.css('margin-top', marginTop + 'px');
				if (currentItem === numberItems) {
					first.css('margin-top', '0px');
					currentItem = 1;
				} else currentItem++;
			}, 3000);
		}
	},

	/**
	 * Use jQuery.localScroll plugin for smooth scrolling. Specify the element contain our local links
	 * (if not specified, includes all the local links). Hash settings are passed to jQuery.scrollTo fo the animation.
	 */
	Scrolling: {
		init: function() {
			this.initSmoothScrolling();
		},

		initSmoothScrolling: function(){
			$('.top-bar, .splashScreen').localScroll({
				target:'body',
				duration:'150',
				ease:'swing'
			});
		}
	}
};

