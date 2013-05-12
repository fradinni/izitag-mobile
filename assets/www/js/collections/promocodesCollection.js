define([
	"underscore",
	"jquery", 
	"jquerymobile",
	"backbone"
], function(_, $, Mobile, Backbone) {

	var PromocodesCollection = Backbone.Collection.extend({

		initialize: function(models, options) {
			options = options || {};
			this.userId = options.userId;
			this.url = 'http://izitag.herokuapp.com/api/promocodeList' + (this.userId ? '?userId='+this.userId : '');
		},

		model: Backbone.Model,

	});

	return PromocodesCollection;

});