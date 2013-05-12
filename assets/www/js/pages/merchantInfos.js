define([
	"underscore",
	"jquery",
	"jquerymobile",
	"peanut!ui/page",
	"peanut!ui/basiclayout",
	"text!../../templates/merchantInfos.html"
], function(_, $, Mobile, PeanutPage, BasicLayout, template) {


	/**
	* Izitag Home Page
	*/
	var MerchantInfos = PeanutPage.extend({

		id: "merchant",

		initialize: function(params) {
			this.layout = new BasicLayout({
				//headerTemplate: "<div data-role='header'><h2><%=data%></h2></div>",
				headerData: "Izitag",
				model: this.model,
				template: template
			});

			//PeanutPage.prototype.initialize.call(this, params);
		}

	});

	return MerchantInfos

});