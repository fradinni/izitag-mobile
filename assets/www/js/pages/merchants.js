define([
	"underscore",
	"jquery",
	"jquerymobile",
	"backbone",
	"peanut!ui/page",
	"peanut!ui/basiclayout",
	"peanut!ui/list",
	"collections/merchantsCollection",
	"text!../../templates/merchants.html",
	"text!../../templates/merchantItem.html"
], function(_, $, Mobile, Backbone, PeanutPage, BasicLayout, ListView, MerchantsCollection, template, itemTemplate) {


	/**
	* Izitag Home Page
	*/
	var MerchantsPage = PeanutPage.extend({

		id: "merchants",
		
		initialize: function(params) {

			var self = this;

			params = params || {};
			self.application = params.application;

			//self.collection = new MerchantsCollection([], {userId: self.application.user.id});

			self.layout = new BasicLayout({
				application: self.application,
				headerData: "My Merchants",
				content: new ListView({
					collection: new MerchantsCollection([], {userId: self.application.user.id}),
					itemTemplate: itemTemplate,
					filter: true,
					inset: false,
					autoDividers: true
				})
			});	
	
			self.layout.content.collection.on('reset', function() {
				self.layout.content.render();
				this.$el.find(".peanut-list").listview('refresh');
			}, this);
		},

		/*
		loadMerchants: function(callback) {
			var self = this;
			this.collection.fetch({reset: true});
		}
		*/

	});

	return MerchantsPage

});