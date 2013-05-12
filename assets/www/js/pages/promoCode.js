define([
	"underscore",
	"jquery",
	"jquerymobile",
	"peanut!ui/page",
	"peanut!ui/basiclayout",
	"text!../../templates/promoCode.html"
], function(_, $, Mobile, PeanutPage, BasicLayout, template) {


	/**
	* Izitag Home Page
	*/
	var PromoPage = PeanutPage.extend({

		id: "promoCode",

		className: '',

		events: {
			"click .izitag-gray-content": "back"
		},

		initialize: function(params) {
			var self = this;

			params = params || {};
			this.application = params.application;
			this.model = params.model;

			this.layout = new BasicLayout({
				headerTemplate: '<div class="izitag-header">&nbsp;</div>',
				headerData: "Izitag",
				template: template,
				model: self.model
			});

		},

		back: function() {
			this.application.navigate('home');
		}

	});

	return PromoPage

});