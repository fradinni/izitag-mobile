define([
	"underscore",
	"jquery",
	"jquerymobile",
	"peanut!core/application",

	"pages/home",
	"pages/login",
	"pages/userHome",
	"pages/merchants",
	"pages/merchants",
	"pages/merchantInfos",
	"pages/promoCode",
], function(_, $, Mobile, PeanutApplication, HomePage, LoginPage, UserHomePage, MerchantsPage, PromoCodesPage, MerchantInfosPage, PromoPage) {


	var Application = PeanutApplication.extend({
		initialize: function() {

			this.firstPage = true;

			// Set fake user for demo app
			this.user = {
				id: '1',
				firstname: 'Nicolas',
				lastname: 'FRADIN',
				email: "fradinni@gmail.com"
			}

			// Initialize static views
			this.staticViews = {};
			this.staticViews.loginPage = new LoginPage({application: this});
			this.staticViews.loginPage.render();
			//$('body').append(this.staticViews.loginPage.$el);

			this.staticViews.home = new HomePage({application: this});
			this.staticViews.home.render();
			$('body').append(this.staticViews.home.$el);
			//this.staticViews.userHome = new UserHomePage({application: this}).render();
			//this.staticViews.merchants = new MerchantsPage({application: this});
			//$('body').append(this.staticViews.merchants.$el);

			// Call super method
			PeanutApplication.prototype.initialize.call(this);
		},

		setRoutes: function() {
			this.route('', 'home');
			this.route('home', 'home');
			this.route('login', 'login');
			this.route('register', 'register');

			//
			this.route('userHome', 'userHome');
			this.route('merchants', 'merchants');
			this.route('promoCodes', 'promoCodes');

			this.route('merchant?id=:id', 'merchantInfos');
			this.route('promoCode?id=:id', 'promoCode');
		},

		// Display home page
		home: function() {
			if(this.firstPage) {
				$.mobile.changePage('#home', {transition: 'none'});
				this.firstPage = false;
			} else {
				$.mobile.changePage('#home', {transition: 'flip'});
			}
		},

		login: function() {
			$.mobile.changePage('#login', {transition: 'flip'});
		},

		register: function() {
			$.mobile.changePage('#register', {transition: 'flip'});
		},

		userHome: function() {
			// Show page
			$.mobile.changePage('#userHome', {transition: 'flip'});
		},
		merchants: function() {
			var self = this;
			//$.mobile.changePage('#merchants', {transition: 'none'});
			var view = new MerchantsPage({application: this});
			view.remove();
			view.render();
			$('body').append(view.$el);
			$.mobile.changePage('#merchants', {transition: 'none'});
			//$.mobile.loading(true);
			view.layout.content.collection.fetch({reset: true});
		},
		merchantInfos: function(id) {
			console.log('infos: ' + id);
			var self = this;
			//$.mobile.changePage('#merchants', {transition: 'none'});
			var view = new MerchantInfosPage({application: this, model: new Backbone.Model()});
			view.remove();
			// view.render();
			// $('body').append(view.$el);
			// $.mobile.changePage('#merchant', {transition: 'slide'});

			$.get('http://izitag.herokuapp.com/api/merchant?merchantId='+id, function(merchant) {
				var model = new Backbone.Model(merchant);
				console.log(model);
				view.layout.model = model;
				view.render();
				//view.page('destroy').page();
				//view.$el.trigger('create');
				$('body').append(view.$el);
				$.mobile.changePage('#merchant?', {transition: 'fade'});
				//view.page('destroy').page();
			});
			//$.mobile.loading(true);
			//view.layout.content.collection.fetch({reset: true});
		},
		promoCodes: function() {
			var self = this;
			//$.mobile.changePage('#merchants', {transition: 'none'});
			var view = new PromoCodesPage({application: this});
			view.remove();
			view.render();
			$('body').append(view.$el);
			$.mobile.changePage('#promoCodes', {transition: 'slide'});
			//$.mobile.loading(true);
			view.layout.content.collection.fetch({reset: true});
		},
		promoCode: function(id) {
			var self = this;
			//$.mobile.changePage('#merchants', {transition: 'none'});
			var view = new PromoPage({application: this, model: new Backbone.Model()});
			view.remove();


			$.get('http://izitag.herokuapp.com/api/code?codeId='+id, function(promo) {
				var model = new Backbone.Model(promo);
				console.log(model);
				view.layout.model = model;
				view.render();
				//view.page('destroy').page();
				//view.$el.trigger('create');
				$('body').append(view.$el);
				$.mobile.changePage('#promoCode', {transition: 'flip'});
				//view.page('destroy').page();
			});

			// view.render();
			// $('body').append(view.$el);
			// $.mobile.changePage('#promoCode', {transition: 'flip'});
			// //$.mobile.loading(true);
			// view.layout.content.collection.fetch({reset: true});	
		}
	});


	return Application;
});