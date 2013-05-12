define([
	"underscore",
	"jquery",
	"jquerymobile",
	"peanut!ui/page",
	"peanut!ui/basiclayout",
	"text!../../templates/login.html"
], function(_, $, Mobile, PeanutPage, BasicLayout, template) {


	/**
	* Izitag Home Page
	*/
	var LoginPage = PeanutPage.extend({

		id: "login",
		
		className: 'izitag-background',

		events: {
			"submit form": "formSubmit"
		},

		initialize: function(params) {

			params = params || {};
			this.application = params.application;

			this.layout = new BasicLayout({
				//headerTemplate: "<div data-role='header'><h2><%=data%></h2></div>",
				//headerData: "Izitag",
				template: template
			});
		},

		formSubmit: function(e) {
			e.preventDefault();
			e.stopPropagation();
			this.application.navigate('userHome', {trigger: true});
		}

	});

	return LoginPage

});