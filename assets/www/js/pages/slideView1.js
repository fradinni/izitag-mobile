define([
	"underscore",
	"jquery",
	"jquerymobile",
	"peanut!ui/page",
	"peanut!ui/basiclayout",
	"text!../../templates/home.html"
], function(_, $, Mobile, PeanutPage, BasicLayout, template) {


	/**
	* Izitag Home Page
	*/
	var HomePage = PeanutPage.extend({

		id: "home",
		className: 'izitag-background',

		initialize: function() {
			this.layout = new BasicLayout({
				//headerTemplate: "<div data-role='header'><h2><%=data%></h2></div>",
				//headerData: "Izitag",
				template: template
			});
		}

	});

	return HomePage

});