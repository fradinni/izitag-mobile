define([
	"underscore",
	"jquery", 
	"jquerymobile",
	"backbone",
	"../models/merchantModel"
], function(_, $, Mobile, Backbone, MerchantModel) {

	var MerchantsCollection = Backbone.Collection.extend({

		initialize: function(models, options) {
			options = options || {};
			this.userId = options.userId;
			this.url = 'http://izitag.herokuapp.com/api/merchantList' + (this.userId ? '?userId='+this.userId : '');
		},

		model: MerchantModel,

	});

	return MerchantsCollection;

});