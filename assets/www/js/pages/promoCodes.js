define([
	"underscore",
	"jquery",
	"jquerymobile",
	"backbone",
	"peanut!ui/page",
	"peanut!ui/basiclayout",
	"peanut!ui/list",
	"collections/promoCodesCollection",
	"text!../../templates/promoCodes.html",
	"text!../../templates/promoCodeItem.html"
], function(_, $, Mobile, Backbone, PeanutPage, BasicLayout, ListView, PromocodesCollection, template, itemTemplate) {


	/**
	* Izitag Home Page
	*/
	var PromocodesPage = PeanutPage.extend({

		id: "promoCodes",
		
		initialize: function(params) {

			var self = this;

			params = params || {};
			self.application = params.application;

			//self.collection = new PromocodesCollection([], {userId: self.application.user.id});

			self.layout = new BasicLayout({
				application: self.application,
				headerData: "My Promotion Codes",
				content: new ListView({
					collection: new PromocodesCollection([], {userId: self.application.user.id}),
					itemTemplate: itemTemplate,
					filter: true,
					inset: false,
					autoDividers: true
				})
			});	
	
			// Bind collection 'reset' event
			self.layout.content.collection.on('reset', function() {
				self.layout.content.render();
				this.$el.find(".peanut-list").listview('refresh');
			}, this);
		}

	});

	return PromocodesPage

});