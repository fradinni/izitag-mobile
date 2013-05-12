define([
	"underscore",
	"jquery",
	"jquerymobile",
	"application"
], function(_, $, Mobile, Application) {

	

	var init = function() {
		// Create Application and start it
		var app = new Application({
			
			name: "Izitag", 
			version: "0.1.0", 
			debug: true

		}).start();
	}

	if(typeof device !== 'undefined') {
		document.addEventListener('deviceready', init, false);
	} else {
		$(document).ready(function() {
			init();
		});
	}
});