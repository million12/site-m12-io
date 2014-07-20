/**
 * M12 Namespace
 */
var M12 = (function() {
	'use strict';
	return {};
})();

/**
 * M12.Site Namespace
 * @returns {Object}.<string, function>:Animation, Scrolling
 */
M12.Site = (function() {
	'use strict';

	/**
	 * Animation Module
	 * @return {Object.<string, function>}
	 */
	var Animation = (function() {

		var init = function() {
			animateSplashScreen();
		};

		/**
		 * Animate the list items so that one item is visible and moves out of view and the next list item is shown.
		 * The animation goes through all the list items in the unordered list and starts from the first list item again.
		 * To show only one list item at a time, the height is set on the ul and overview is set to hidden.
		 * The next list item is shown by changing the margin-top to (height of ul * -(the item's position in the list)
		 *
		 * @return {void}
		 */
		var animateSplashScreen = function() {
			// keep references to html elements so that I can give it to jQuery selectors
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
				} else {
					currentItem++;
				}
			}, 3000);
		};

		// Public function
		return {
			init: init
		};
	})();

	/**
	 * Scrolling Module
	 * @return {object.<string, function>}
	 */
	var Scrolling = (function() {
		var init = function() {
			initSmoothScrolling();
		};

		/**
		 * Use jQuery.localScroll plugin for smooth scrolling. Specify the element contain our local links.
		 * If element not specified, includes all the local links. Hash settings are passed to jQuery.scrollTo for
		 * the animation.
		 * @return {void}
		 */
		var initSmoothScrolling = function(){
			$('.top-bar, .splashScreen').localScroll({
				target:'body',
				duration:'150',
				ease:'swing'
			});
		};

		// Public function
		return {
			init: init
		};
	})();

	// Return the Modules within M12.Site
	return {
		Animation: Animation,
		Scrolling: Scrolling
	};
})();

// Invoke Zurb Foundation
$(document).foundation();

$(document).ready(function() {
	'use strict';
	// Animations
	M12.Site.Animation.init();
	// Smooth scrolling
	M12.Site.Scrolling.init();
});
