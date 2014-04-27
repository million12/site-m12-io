$(document).foundation();

$(document).ready(function() {
	M12.Site.AnimationFunctions.animateSplashScreen();
});

var M12 = {};
M12.Site = {
	AnimationFunctions: {
		/**
		 * Animate the list items so that one item is visible and moves out of view and the next list item is shown.
		 * The animation goes through all the list items in the unordered list and starts from the first list item again.
		 * To show only one list item at a time, the height is set on the ul and overview is set to hidden.
		 * The next list item is shown by changing the margin-top to (height of ul * -(the items position in the list
		 * ie, 1 to length of list))
		 */
		animateSplashScreen: function() {
			var current = 1;
			// keep references to html elements so that I can give it to jQuery selectors
			var rootEl = $('.animatedList');
			var ulEl = $('ul', rootEl);
			var height = ulEl.height();
			var numberDivs = ulEl.children().length;
			var first = ulEl.children().first();

			setInterval(function() {
				var number = current * -height;
				first.css('margin-top', number + 'px');
				if (current === numberDivs) {
					first.css('margin-top', '0px');
					current = 1;
				} else current++;
			}, 3000);
		}
	}
};

